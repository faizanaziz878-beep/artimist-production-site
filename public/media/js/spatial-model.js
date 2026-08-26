import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

const ROSE = 0xb93b50;
const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

function skyTexture(stops) {
  const c = document.createElement('canvas');
  c.width = 16; c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 256);
  stops.forEach(([p, col]) => grad.addColorStop(p, col));
  g.fillStyle = grad; g.fillRect(0, 0, 16, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* soft radial contact shadow, drawn once into a texture instead of per-frame shadow work */
function contactTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, 'rgba(0,0,0,.62)');
  grad.addColorStop(0.45, 'rgba(0,0,0,.28)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

class SpatialModel extends HTMLElement {
  connectedCallback() {
    if (this._built) return;
    this._built = true;
    this.style.display = 'block';
    requestAnimationFrame(() => this._init());
  }
  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    this._ro && this._ro.disconnect();
    this._io && this._io.disconnect();
  }

  _status(t) { const el = this.querySelector('[data-status]'); if (el) el.textContent = t; }

  setView(name) {
    const v = this._views && this._views[name];
    if (!v) return;
    this._view = name;
    this._controls.autoRotate = name === 'orbit';
    this._baseTarget = v.target.clone();
    this._tween = { t: 0, fromPos: this._camera.position.clone(), toPos: v.pos.clone(), fromTar: this._controls.target.clone(), toTar: v.target.clone() };
    this._shadowDirty = 2;
  }

  setMode(mode) {
    this._mode = mode === 'xray' ? 'xray' : 'rendered';
    const x = this._mode === 'xray';
    this._shaded.forEach(m => { m.visible = !x; });
    if (this._context) this._context.visible = !x;
    if (this._technical) this._technical.visible = x;
    if (this._floor) this._floor.visible = !x;
    this._wire.visible = x;
    this._scene.background = x ? null : this._sky;
    this._shadowDirty = 2;
    this._status(x ? 'X-RAY / STRUCTURE' : 'RENDERED / DRAG TO ORBIT');
  }
  toggleXray(on) { this.setMode(on ? 'xray' : 'rendered'); }

  /* bake the whole assembled building — 3 storeys, courtyard, site, services — to a .glb */
  exportGLB(name) {
    const out = new THREE.Group();
    this._world.children.forEach(c => { if (c !== this._wire) out.add(c.clone(true)); });
    return new Promise((resolve, reject) => {
      new GLTFExporter().parse(out, buf => {
        const blob = new Blob([buf], { type: 'model/gltf-binary' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = (name || 'artimist-building') + '.glb';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        resolve(blob.size);
      }, reject, { binary: true, onlyVisible: false });
    });
  }
  toggleNight(on) { this._night = on === undefined ? !this._night : !!on; }

  _init() {
    const w = this.clientWidth || 1200, h = this.clientHeight || 800;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    /* cap resolution: this canvas is decorative, 1.15x is plenty and halves fill cost */
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.15));
    renderer.setSize(w, h);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.shadowMap.autoUpdate = false;   /* static scene: render shadows only when lighting changes */
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;touch-action:none';
    this.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const daySky = skyTexture([[0, '#7ea3c9'], [0.42, '#c9d6e2'], [0.52, '#e8d9c6'], [0.62, '#8f7f72'], [1, '#2b2724']]);
    const nightSky = skyTexture([[0, '#0a1020'], [0.44, '#16233c'], [0.53, '#3c2b34'], [0.64, '#20181c'], [1, '#0c0b0d']]);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const dayEnv = pmrem.fromEquirectangular(daySky).texture;
    const nightEnv = pmrem.fromEquirectangular(nightSky).texture;
    pmrem.dispose();
    scene.background = daySky;
    scene.environment = dayEnv;
    scene.fog = new THREE.Fog(0x9aa7b0, 40, 140);

    const camera = new THREE.PerspectiveCamera(34, w / h, 0.5, 300);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.42;
    controls.maxPolarAngle = Math.PI * 0.492;
    renderer.domElement.addEventListener('pointerdown', () => { controls.autoRotate = false; this._tween = null; this._idle = 0; });
    renderer.domElement.addEventListener('pointerup', () => { this._idle = 1; });

    const hemi = new THREE.HemisphereLight(0xdfe8f2, 0x2a2320, 1.25); scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff0dc, 4.6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.normalBias = 0.035;
    scene.add(sun);
    const bounce = new THREE.DirectionalLight(0xc9b49c, 0.85); scene.add(bounce);
    const rim = new THREE.DirectionalLight(ROSE, 1.4); scene.add(rim);
    const moon = new THREE.DirectionalLight(0x9fb6e0, 0); scene.add(moon);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(w * 0.5, h * 0.5), 0.4, 0.7, 0.88);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const world = new THREE.Group(); scene.add(world);
    const wireGroup = new THREE.Group(); wireGroup.visible = false; world.add(wireGroup);

    Object.assign(this, {
      _renderer: renderer, _scene: scene, _camera: camera, _controls: controls, _composer: composer, _bloom: bloom,
      _shaded: [], _wire: wireGroup, _world: world,
      _sun: sun, _hemi: hemi, _bounce: bounce, _rim: rim, _moon: moon,
      _sky: daySky, _daySky: daySky, _nightSky: nightSky, _dayEnv: dayEnv, _nightEnv: nightEnv,
      _mode: 'rendered', _night: false, _view: 'orbit', _lamps: [], _windows: [], _nightK: 0,
      _visible: true, _shadowDirty: 2
    });

    this._ro = new ResizeObserver(() => {
      const W = this.clientWidth, H = this.clientHeight;
      if (!W || !H) return;
      camera.aspect = W / H; camera.updateProjectionMatrix();
      renderer.setSize(W, H, false);
      composer.setSize(W, H);
      this._shadowDirty = 2;
    });
    this._ro.observe(this);

    /* stop rendering entirely while the section is off screen */
    this._io = new IntersectionObserver(([e]) => { this._visible = e.isIntersecting; }, { rootMargin: '120px' });
    this._io.observe(this);

    new GLTFLoader().load(
      this.getAttribute('src') || '',
      gltf => this._mount(gltf.scene),
      e => { if (e && e.total) this._status('RENDERING MODEL / ' + Math.round((e.loaded / e.total) * 100) + '%'); },
      () => this._mount(null)
    );
    this._loop();
  }

  _mount(loaded) {
    let model = loaded, meshes = 0;
    if (model) model.traverse(o => { if (o.isMesh && o.geometry) meshes++; });
    if (!model || meshes === 0) model = new THREE.Group();

    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3(), center = new THREE.Vector3();
    box.getSize(size); box.getCenter(center);
    const span = Math.max(size.x, size.z, size.y * 0.8) || 1;
    model.position.set(-center.x, -center.y, -center.z);
    model.scale.setScalar(12 / span);

    const holder = new THREE.Group();
    holder.add(model);
    const rebased = new THREE.Box3().setFromObject(holder);
    holder.position.y = -rebased.min.y;
    holder.position.x = -(rebased.min.x + rebased.max.x) / 2;
    holder.position.z = -(rebased.min.z + rebased.max.z) / 2;

    /* merge the imported mesh soup by material: 289 draw calls become a handful */
    holder.updateMatrixWorld(true);
    const groups = new Map();
    model.traverse(o => {
      if (!o.isMesh || !o.geometry) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      const mat = mats[0] || new THREE.MeshStandardMaterial({ color: 0xb9b1a4 });
      let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      const keep = ['position', 'normal', 'uv'];
      Object.keys(g.attributes).forEach(k => { if (!keep.includes(k)) g.deleteAttribute(k); });
      if (!g.attributes.normal) g.computeVertexNormals();
      if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array((g.attributes.position.count) * 2), 2));
      g.applyMatrix4(o.matrixWorld);
      g.clearGroups();
      if (!groups.has(mat.uuid)) groups.set(mat.uuid, { mat, geos: [] });
      groups.get(mat.uuid).geos.push(g);
    });

    const wirePos = [];
    const level = new THREE.Group();
    groups.forEach(({ mat, geos }) => {
      let merged;
      try { merged = geos.length > 1 ? BufferGeometryUtils.mergeGeometries(geos, false) : geos[0]; } catch (err) { merged = geos[0]; }
      if (!merged) return;
      if (mat.roughness !== undefined) mat.roughness = Math.min(0.9, Math.max(0.12, mat.roughness));
      if (mat.metalness !== undefined && mat.metalness > 0.85) mat.metalness = 0.7;
      mat.envMapIntensity = 1.15;
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      level.add(mesh);
      this._shaded.push(mesh);
      if (wirePos.length < 300000) {
        const eg = new THREE.EdgesGeometry(merged, 26);
        const p = eg.attributes.position.array;
        for (let i = 0; i < p.length && wirePos.length < 300000; i++) wirePos.push(p[i]);
        eg.dispose();
      }
      geos.forEach(g => { if (g !== merged) g.dispose(); });
    });
    holder.remove(model);

    /* ── stack the plan into a multi-storey building ── */
    const plan = new THREE.Box3().setFromObject(level);
    const planH = Math.max(plan.max.y - plan.min.y, 0.6);
    const slabT = Math.max(planH * 0.06, 0.16);
    const floorH = planH + slabT;
    const storeys = Math.max(3, parseInt(this.getAttribute('storeys') || '3', 10) || 3);

    const wireMat = new THREE.LineBasicMaterial({ color: 0xe9bcc4, transparent: true, opacity: 0.5 });
    const stack = new THREE.Group();
    stack.add(level);
    this._levels = [level];
    for (let k = 1; k < storeys; k++) {
      const copy = level.clone(true);   /* clone shares geometry + material */
      copy.position.y = k * floorH;
      stack.add(copy);
      this._levels.push(copy);
      this._shaded.push(...copy.children.filter(c => c.isMesh));
    }
    this._world.add(stack);
    this._stack = stack;

    if (wirePos.length) {
      const base = new THREE.BufferGeometry();
      base.setAttribute('position', new THREE.Float32BufferAttribute(wirePos, 3));
      for (let k = 0; k < storeys; k++) {
        const gk = k === 0 ? base : base.clone().translate(0, k * floorH, 0);
        this._wire.add(new THREE.LineSegments(gk, wireMat));
      }
    }

    /* floor slabs as a ring around a central courtyard void */
    const slabW = Math.max(plan.max.x - plan.min.x, 1) * 1.02;
    const slabD = Math.max(plan.max.z - plan.min.z, 1) * 1.02;
    const voidW = slabW * 0.34, voidD = slabD * 0.34;
    const bandX = (slabW - voidW) / 2, bandZ = (slabD - voidD) / 2;
    const slabMat = new THREE.MeshStandardMaterial({ color: 0xc4bdb0, roughness: 0.62, envMapIntensity: 1.1 });
    const strips = [
      { w: slabW, d: bandZ, x: 0, z: -(voidD / 2 + bandZ / 2) },
      { w: slabW, d: bandZ, x: 0, z: (voidD / 2 + bandZ / 2) },
      { w: bandX, d: voidD, x: -(voidW / 2 + bandX / 2), z: 0 },
      { w: bandX, d: voidD, x: (voidW / 2 + bandX / 2), z: 0 }
    ];
    const slabWire = [];
    const sv = new THREE.Vector3();
    strips.forEach(s => {
      const geo = new THREE.BoxGeometry(s.w, slabT, s.d);
      const im = new THREE.InstancedMesh(geo, slabMat, storeys);
      const sm = new THREE.Matrix4();
      const eg = new THREE.EdgesGeometry(geo, 25);
      const sp = eg.attributes.position.array;
      for (let k = 0; k < storeys; k++) {
        const y = k * floorH + planH + slabT / 2;
        im.setMatrixAt(k, sm.makeTranslation(s.x, y, s.z));
        for (let i = 0; i < sp.length; i += 3) {
          sv.set(sp[i] + s.x, sp[i + 1] + y, sp[i + 2] + s.z);
          slabWire.push(sv.x, sv.y, sv.z);
        }
      }
      eg.dispose();
      im.castShadow = true; im.receiveShadow = true;
      this._world.add(im);
      this._shaded.push(im);
    });

    /* courtyard balustrades on every level */
    const railMat = new THREE.MeshStandardMaterial({ color: 0x1f1e1c, roughness: 0.4, metalness: 0.6, envMapIntensity: 1.3 });
    const rails = [
      { w: voidW, d: 0.07, x: 0, z: -voidD / 2 },
      { w: voidW, d: 0.07, x: 0, z: voidD / 2 },
      { w: 0.07, d: voidD, x: -voidW / 2, z: 0 },
      { w: 0.07, d: voidD, x: voidW / 2, z: 0 }
    ];
    rails.forEach(r => {
      const geo = new THREE.BoxGeometry(r.w, 0.06, r.d);
      const im = new THREE.InstancedMesh(geo, railMat, storeys);
      const rm = new THREE.Matrix4();
      const eg = new THREE.EdgesGeometry(geo, 25);
      const rp = eg.attributes.position.array;
      for (let k = 0; k < storeys; k++) {
        const y = k * floorH + planH + slabT + 0.52;
        im.setMatrixAt(k, rm.makeTranslation(r.x, y, r.z));
        for (let i = 0; i < rp.length; i += 3) slabWire.push(rp[i] + r.x, rp[i + 1] + y, rp[i + 2] + r.z);
      }
      eg.dispose();
      im.castShadow = true;
      this._world.add(im);
      this._shaded.push(im);
    });

    /* courtyard at grade: planting, paving, one specimen tree */
    const court = new THREE.Group();
    const courtFloor = new THREE.Mesh(
      new THREE.BoxGeometry(voidW, 0.08, voidD),
      new THREE.MeshStandardMaterial({ color: 0x2f3a26, roughness: 0.9 })
    );
    courtFloor.position.y = 0.04; courtFloor.receiveShadow = true; court.add(courtFloor);
    const path = new THREE.Mesh(
      new THREE.BoxGeometry(voidW * 0.34, 0.09, voidD),
      new THREE.MeshStandardMaterial({ color: 0xb5aea1, roughness: 0.6 })
    );
    path.position.y = 0.05; court.add(path);
    const specimen = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, planH * 1.5, 10),
      new THREE.MeshStandardMaterial({ color: 0x6b4a2f, roughness: 0.6 }));
    trunk.position.y = planH * 0.75; trunk.castShadow = true; specimen.add(trunk);
    for (let i = 0; i < 4; i++) {
      const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(voidW * 0.15, 1),
        new THREE.MeshStandardMaterial({ color: 0x4a6234, roughness: 0.88 }));
      crown.position.set((i % 2 ? 0.12 : -0.12) * voidW * 0.4, planH * (1.35 + i * 0.32), (i > 1 ? 0.1 : -0.1) * voidD * 0.4);
      crown.scale.multiplyScalar(1 - i * 0.13);
      crown.castShadow = true;
      specimen.add(crown);
    }
    court.add(specimen);
    this._world.add(court);
    this._court = court;

    /* courtyard open to sky — only a slim coping ring at roof level */
    const copingY = storeys * floorH + slabT + 0.12;
    [
      { w: voidW + 0.3, d: 0.14, x: 0, z: -(voidD / 2 + 0.07) },
      { w: voidW + 0.3, d: 0.14, x: 0, z: (voidD / 2 + 0.07) },
      { w: 0.14, d: voidD, x: -(voidW / 2 + 0.07), z: 0 },
      { w: 0.14, d: voidD, x: (voidW / 2 + 0.07), z: 0 }
    ].forEach(c => {
      const geo = new THREE.BoxGeometry(c.w, 0.12, c.d);
      const mesh = new THREE.Mesh(geo, slabMat);
      mesh.position.set(c.x, copingY, c.z);
      mesh.castShadow = true; mesh.receiveShadow = true;
      this._world.add(mesh);
      this._shaded.push(mesh);
      const eg = new THREE.EdgesGeometry(geo, 25);
      const ep = eg.attributes.position.array;
      for (let i = 0; i < ep.length; i += 3) slabWire.push(ep[i] + c.x, ep[i + 1] + copingY, ep[i + 2] + c.z);
      eg.dispose();
    });

    const swg = new THREE.BufferGeometry();
    swg.setAttribute('position', new THREE.Float32BufferAttribute(slabWire, 3));
    this._wire.add(new THREE.LineSegments(swg, wireMat));

    this._model = stack;
    this._floorH = floorH;
    this._storeys = storeys;

    const fitted = new THREE.Box3();
    this._shaded.forEach(m => fitted.expandByObject(m));
    const fs = new THREE.Vector3(); fitted.getSize(fs);
    const R = Math.max(fs.x, fs.z) * 0.5 || 6;
    const H = fs.y || 4;

    this._context = this._buildSite(R, H);
    this._world.add(this._context);

    /* services + structure, repeated on every storey */
    const planBox = new THREE.Box3(new THREE.Vector3(plan.min.x, 0, plan.min.z), new THREE.Vector3(plan.max.x, planH, plan.max.z));
    const detail = this._buildDetail(R, planH, planBox);
    const detailStack = new THREE.Group();
    detailStack.add(detail);
    for (let k = 1; k < storeys; k++) {
      const c = detail.clone(true);
      c.position.y = k * floorH;
      detailStack.add(c);
    }
    /* the detail wireframe was written for level 0 — repeat it up the building */
    if (this._detailWires) {
      for (let k = 1; k < storeys; k++) {
        this._detailWires.forEach(w => {
          this._wire.add(new THREE.LineSegments(w.geometry.clone().translate(0, k * floorH, 0), w.material));
        });
      }
    }
    this._context.add(detailStack);
    this._detail = detailStack;

    /* vertical circulation core tying the storeys together */
    const coreMat = new THREE.MeshStandardMaterial({ color: 0xb4ada0, roughness: 0.56, envMapIntensity: 1.1 });
    const coreH = storeys * floorH + slabT;
    const core = new THREE.Mesh(new THREE.BoxGeometry(slabW * 0.16, coreH, slabD * 0.2), coreMat);
    core.position.set(plan.min.x + slabW * 0.14, coreH / 2, plan.max.z - slabD * 0.16);
    core.castShadow = true; core.receiveShadow = true;
    this._world.add(core);
    this._shaded.push(core);
    const coreEdges = new THREE.EdgesGeometry(core.geometry, 25);
    const coreLines = new THREE.LineSegments(coreEdges, wireMat);
    coreLines.position.copy(core.position);
    this._wire.add(coreLines);

    /* stair flights inside the core */
    const flightMat = new THREE.MeshStandardMaterial({ color: 0x8f887c, roughness: 0.7 });
    const flights = new THREE.InstancedMesh(new THREE.BoxGeometry(slabW * 0.13, 0.09, slabD * 0.14), flightMat, storeys * 2);
    const fm = new THREE.Matrix4();
    for (let k = 0; k < storeys * 2; k++) {
      const y = (k / 2) * floorH + 0.5;
      fm.makeRotationX(k % 2 ? 0.42 : -0.42).setPosition(core.position.x, y, core.position.z + (k % 2 ? 0.3 : -0.3));
      flights.setMatrixAt(k, fm);
    }
    flights.castShadow = true;
    this._world.add(flights);
    this._shaded.push(flights);

    this._technical = this._buildTechnical(R, H);
    this._technical.visible = false;
    this._world.add(this._technical);

    /* glossy floor: sky reflection via envMap instead of a second scene render */
    const floor = new THREE.Group();
    const plaza = new THREE.Mesh(
      new THREE.CircleGeometry(R * 3.2, 96),
      new THREE.MeshStandardMaterial({ color: 0x25231f, roughness: 0.22, metalness: 0.62, envMapIntensity: 1.5 })
    );
    plaza.rotation.x = -Math.PI / 2;
    plaza.position.y = -0.03;
    plaza.receiveShadow = true;
    floor.add(plaza);
    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(R * 2.9, R * 2.9),
      new THREE.MeshBasicMaterial({ map: contactTexture(), transparent: true, depthWrite: false, opacity: 0.85 })
    );
    contact.rotation.x = -Math.PI / 2;
    contact.position.y = 0.012;
    floor.add(contact);
    this._world.add(floor);
    this._floor = floor;

    const sc = this._sun.shadow.camera;
    const e = R * 2.1;
    sc.left = -e; sc.right = e; sc.top = e; sc.bottom = -e; sc.near = 1; sc.far = e * 7;
    sc.updateProjectionMatrix();
    this._sun.position.set(R * 1.6, R * 2.5, R * 1.35);
    this._bounce.position.set(-R * 1.2, R * 0.6, -R * 1.4);
    this._rim.position.set(-R * 2, R * 1.2, -R * 1.8);
    this._moon.position.set(-R * 1.2, R * 2.2, R * 0.6);
    this._scene.fog.near = R * 3.6;
    this._scene.fog.far = R * 12;

    const d = R * 2.5;
    this._views = {
      orbit: { pos: new THREE.Vector3(d * 0.74, H * 0.9, d * 0.88), target: new THREE.Vector3(0, H * 0.4, 0) },
      aerial: { pos: new THREE.Vector3(R * 0.25, R * 3.1, R * 1.35), target: new THREE.Vector3(0, 0, 0) },
      eye: { pos: new THREE.Vector3(d * 1.02, H * 0.17, d * 0.14), target: new THREE.Vector3(0, H * 0.3, 0) },
      detail: { pos: new THREE.Vector3(R * 0.82, H * 0.8, R * 0.98), target: new THREE.Vector3(0, H * 0.45, 0) }
    };
    this._controls.minDistance = R * 0.8;
    this._controls.maxDistance = d * 2.4;
    this._camera.position.copy(this._views.orbit.pos);
    this._controls.target.copy(this._views.orbit.target);
    this._baseTarget = this._views.orbit.target.clone();
    this._driftY = H * 0.05;

    this._spots = [
      { at: new THREE.Vector3(0, H * 1.02, 0), label: 'CANOPY', note: 'Roof plane / daylight' },
      { at: new THREE.Vector3(R * 0.82, H * 0.2, R * 0.5), label: 'ARRIVAL', note: 'Public entry sequence' },
      { at: new THREE.Vector3(-R * 0.75, H * 0.3, -R * 0.55), label: 'COURT', note: 'Planted circulation' },
      { at: new THREE.Vector3(R * 1.45, H * 0.06, -R * 0.9), label: 'WATER', note: 'Reflecting basin' }
    ];
    const layer = document.createElement('div');
    layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:4';
    this._spots.forEach(s => {
      const el = document.createElement('div');
      el.style.cssText = 'position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:9px;white-space:nowrap;opacity:0;transition:opacity .5s';
      el.innerHTML = '<i style="width:8px;height:8px;border-radius:50%;background:#b93b50;box-shadow:0 0 0 5px rgba(185,59,80,.2),0 0 14px 3px rgba(185,59,80,.55)"></i>' +
        '<b style="font-size:7.5px;font-weight:500;letter-spacing:.17em;color:#fff;text-shadow:0 1px 8px rgba(0,0,0,.95)">' + s.label +
        '<span style="display:block;margin-top:4px;font-weight:400;letter-spacing:.1em;color:rgba(255,255,255,.62)">' + s.note + '</span></b>';
      layer.appendChild(el);
      s.el = el;
    });
    this.appendChild(layer);

    /* --- refit: frame the assembled world, whatever the source model's proportions --- */
    {
      /* frame the building, not the whole district — the district is context */
      const sb = new THREE.Box3().setFromObject(this._stack || this._world);
      const ss = new THREE.Vector3(); sb.getSize(ss);
      const wb = new THREE.Box3().setFromObject(this._world);
      const ws = new THREE.Vector3(); wb.getSize(ws);
      const RR = Math.max(Math.max(ss.x, ss.z) * 1.25, Math.max(ws.x, ws.z) * 0.34) || R;
      const HH = ss.y || H;
      const WORLD_R = (Math.max(ws.x, ws.z) * 0.5) || RR;
      const dd = RR * 2.5;
      this._views = {
        orbit:  { pos: new THREE.Vector3(dd * 0.74, HH * 0.95, dd * 0.88), target: new THREE.Vector3(0, HH * 0.32, 0) },
        aerial: { pos: new THREE.Vector3(RR * 0.3, RR * 2.5, RR * 1.4),    target: new THREE.Vector3(0, 0, 0) },
        eye:    { pos: new THREE.Vector3(dd * 1.02, HH * 0.2, dd * 0.16),  target: new THREE.Vector3(0, HH * 0.3, 0) },
        detail: { pos: new THREE.Vector3(RR * 0.9, HH * 0.85, RR * 1.05),  target: new THREE.Vector3(0, HH * 0.45, 0) }
      };
      this._controls.minDistance = RR * 0.7;
      this._controls.maxDistance = dd * 2.8;
      this._camera.far = Math.max(dd * 9, WORLD_R * 6); this._camera.updateProjectionMatrix();
      this._camera.position.copy(this._views.orbit.pos);
      this._controls.target.copy(this._views.orbit.target);
      this._baseTarget = this._views.orbit.target.clone();
      this._driftY = HH * 0.05;
      this._scene.fog.near = WORLD_R * 1.6; this._scene.fog.far = WORLD_R * 6.5;
      const sc2 = this._sun.shadow.camera, e2 = WORLD_R * 1.15;
      sc2.left = -e2; sc2.right = e2; sc2.top = e2; sc2.bottom = -e2; sc2.near = 1; sc2.far = e2 * 7;
      sc2.updateProjectionMatrix();
      this._sun.position.set(WORLD_R * 1.1, WORLD_R * 1.6, WORLD_R * 0.9);
      this._bounce.position.set(-RR * 1.2, RR * 0.6, -RR * 1.4);
      this._rim.position.set(-RR * 2, RR * 1.2, -RR * 1.8);
      this._moon.position.set(-RR * 1.2, RR * 2.2, RR * 0.6);
      if (this._spots) {
        const place = [[0, HH * 1.02, 0], [RR * 0.82, HH * 0.2, RR * 0.5],
                       [-RR * 0.75, HH * 0.3, -RR * 0.55], [RR * 1.45, HH * 0.06, -RR * 0.9]];
        this._spots.forEach((sp, i) => { if (place[i]) sp.at.set(place[i][0], place[i][1], place[i][2]); });
      }
    }

    this._shadowDirty = 3;
    this.setMode(this.getAttribute('mode') || 'rendered');
    this.classList.add('loaded');
  }

  /* structural + services layer: columns, joists, ducts, sprinklers, lighting, mullions.
     Instanced for speed, and its edges are pushed into the x-ray wireframe. */
  _buildDetail(R, H, bbox) {
    const g = new THREE.Group();
    const X = Math.max(bbox.max.x - bbox.min.x, 1);
    const Z = Math.max(bbox.max.z - bbox.min.z, 1);
    const Y = Math.max(H, 1);
    const x0 = bbox.min.x, z0 = bbox.min.z;
    const M = {
      steel: new THREE.MeshStandardMaterial({ color: 0xa9ada7, roughness: 0.3, metalness: 0.95, envMapIntensity: 1.4 }),
      pale: new THREE.MeshStandardMaterial({ color: 0xcfc8bb, roughness: 0.5, envMapIntensity: 1.2 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x1e1d1c, roughness: 0.42, metalness: 0.5, envMapIntensity: 1.3 }),
      duct: new THREE.MeshStandardMaterial({ color: 0x9aa0a2, roughness: 0.34, metalness: 0.85, envMapIntensity: 1.5 }),
      lamp: new THREE.MeshStandardMaterial({ color: 0xfdf6e6, emissive: 0xffe7bf, emissiveIntensity: 0.35, roughness: 0.4 }),
      fire: new THREE.MeshStandardMaterial({ color: 0x8f2b2b, roughness: 0.44, metalness: 0.6, envMapIntensity: 1.3 }),
      plumb: new THREE.MeshStandardMaterial({ color: 0x3f6f58, roughness: 0.42, metalness: 0.55, envMapIntensity: 1.3 }),
      elec: new THREE.MeshStandardMaterial({ color: 0x8a7434, roughness: 0.46, metalness: 0.6, envMapIntensity: 1.3 })
    };

    const SYS = {
      structure: { color: 0xe6ded2, opacity: 0.3, pts: [] },
      hvac: { color: 0x4fc3f7, opacity: 0.75, pts: [] },
      electrical: { color: 0xffcf4a, opacity: 0.75, pts: [] },
      fire: { color: 0xff4d4d, opacity: 0.85, pts: [] },
      plumbing: { color: 0x5fd39a, opacity: 0.72, pts: [] }
    };
    const m4 = new THREE.Matrix4(), v = new THREE.Vector3();
    /* one InstancedMesh + one edge pass per element type, bucketed by building system */
    const add = (geo, mat, mats, sys) => {
      const im = new THREE.InstancedMesh(geo, mat, mats.length);
      im.castShadow = true; im.receiveShadow = true;
      mats.forEach((m, i) => im.setMatrixAt(i, m));
      im.instanceMatrix.needsUpdate = true;
      g.add(im);
      const bucket = SYS[sys || 'structure'];
      if (bucket.pts.length < 260000) {
        const eg = new THREE.EdgesGeometry(geo, 25);
        const p = eg.attributes.position.array;
        mats.forEach(mm => {
          if (bucket.pts.length > 260000) return;
          for (let i = 0; i < p.length; i += 3) {
            v.set(p[i], p[i + 1], p[i + 2]).applyMatrix4(mm);
            bucket.pts.push(v.x, v.y, v.z);
          }
        });
        eg.dispose();
      }
      return im;
    };
    const T = (x, y, z, sx, sy, sz, ry) => {
      const m = new THREE.Matrix4();
      m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ry || 0), new THREE.Vector3(sx || 1, sy || 1, sz || 1));
      return m;
    };

    /* column grid through the plan */
    const cols = [], colsX = 6, colsZ = 5;
    for (let i = 1; i < colsX; i++) for (let j = 1; j < colsZ; j++) {
      cols.push(T(x0 + (X * i) / colsX, Y * 0.5, z0 + (Z * j) / colsZ, 1, Y / 2.6, 1));
    }
    add(new THREE.BoxGeometry(0.2, 2.6, 0.2), M.pale, cols, 'structure');

    /* primary beams + secondary joists at ceiling */
    const beams = [], joists = [];
    for (let j = 1; j < colsZ; j++) beams.push(T(0, Y * 0.94, z0 + (Z * j) / colsZ, X, 1, 1));
    add(new THREE.BoxGeometry(1, 0.26, 0.16), M.steel, beams, 'structure');
    const joistCount = 26;
    for (let i = 0; i <= joistCount; i++) joists.push(T(x0 + (X * i) / joistCount, Y * 0.985, 0, 1, 1, Z));
    add(new THREE.BoxGeometry(0.075, 0.14, 1), M.pale, joists, 'structure');

    /* service ducts */
    const ducts = [];
    [0.28, 0.52, 0.76].forEach(f => ducts.push(T(0, Y * 0.86, z0 + Z * f, X * 0.92, 1, 1)));
    add(new THREE.BoxGeometry(1, 0.3, 0.42), M.duct, ducts, 'hvac');
    const risers = [];
    [[0.2, 0.3], [0.78, 0.7]].forEach(([fx, fz]) => risers.push(T(x0 + X * fx, Y * 0.5, z0 + Z * fz, 1, Y / 2.6, 1)));
    add(new THREE.CylinderGeometry(0.16, 0.16, 2.6, 12), M.duct, risers, 'hvac');

    /* sprinkler drops */
    const drops = [];
    for (let i = 1; i < 9; i++) for (let j = 1; j < 7; j++) {
      drops.push(T(x0 + (X * i) / 9, Y * 0.9, z0 + (Z * j) / 7, 1, 1, 1));
    }
    add(new THREE.CylinderGeometry(0.022, 0.022, 0.22, 6), M.steel, drops, 'fire');

    /* fire main + sprinkler branch runs */
    const fireMains = [], branches = [];
    [0.34, 0.66].forEach(f => fireMains.push(T(0, Y * 0.93, z0 + Z * f, X * 0.94, 1, 1)));
    add(new THREE.CylinderGeometry(0.05, 0.05, 1, 8).rotateZ(Math.PI / 2), M.fire, fireMains, 'fire');
    for (let i = 1; i < 9; i++) branches.push(T(x0 + (X * i) / 9, Y * 0.93, 0, 1, 1, Z * 0.9));
    add(new THREE.CylinderGeometry(0.028, 0.028, 1, 6).rotateX(Math.PI / 2), M.fire, branches, 'fire');

    /* domestic water + waste stacks */
    const pipes = [], stacks = [];
    [0.24, 0.58].forEach(f => pipes.push(T(0, Y * 0.8, z0 + Z * f, X * 0.9, 1, 1)));
    add(new THREE.CylinderGeometry(0.038, 0.038, 1, 8).rotateZ(Math.PI / 2), M.plumb, pipes, 'plumbing');
    [[0.14, 0.22], [0.86, 0.76], [0.5, 0.9]].forEach(([fx, fz]) => stacks.push(T(x0 + X * fx, Y * 0.5, z0 + Z * fz, 1, Y / 2.6, 1)));
    add(new THREE.CylinderGeometry(0.055, 0.055, 2.6, 10), M.plumb, stacks, 'plumbing');

    /* cable tray + conduit drops */
    const trays = [], conduit = [];
    [0.42, 0.72].forEach(f => trays.push(T(0, Y * 0.9, z0 + Z * f, X * 0.9, 1, 1)));
    add(new THREE.BoxGeometry(1, 0.05, 0.2), M.elec, trays, 'electrical');
    for (let i = 1; i < 7; i++) conduit.push(T(x0 + (X * i) / 7, Y * 0.62, z0 + Z * 0.5, 1, Y / 2.6, 1));
    add(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 6), M.elec, conduit, 'electrical');

    /* recessed lighting grid */
    const lights = [];
    for (let i = 1; i < 8; i++) for (let j = 1; j < 6; j++) {
      lights.push(T(x0 + (X * i) / 8, Y * 0.955, z0 + (Z * j) / 6, 1, 1, 1));
    }
    add(new THREE.BoxGeometry(0.5, 0.04, 0.16), M.lamp, lights, 'electrical');
    this._ceilingLamp = M.lamp;

    /* perimeter mullions + head/sill rails */
    const mull = [], rails = [];
    const per = 22;
    for (let i = 0; i <= per; i++) {
      const fx = x0 + (X * i) / per;
      mull.push(T(fx, Y * 0.45, bbox.min.z, 1, Y / 2.4, 1));
      mull.push(T(fx, Y * 0.45, bbox.max.z, 1, Y / 2.4, 1));
    }
    const perZ = 16;
    for (let i = 0; i <= perZ; i++) {
      const fz = z0 + (Z * i) / perZ;
      mull.push(T(bbox.min.x, Y * 0.45, fz, 1, Y / 2.4, 1));
      mull.push(T(bbox.max.x, Y * 0.45, fz, 1, Y / 2.4, 1));
    }
    add(new THREE.BoxGeometry(0.06, 2.4, 0.06), M.dark, mull, 'structure');
    [0.16, 0.88].forEach(f => {
      rails.push(T(0, Y * f, bbox.min.z, X, 1, 1));
      rails.push(T(0, Y * f, bbox.max.z, X, 1, 1));
    });
    add(new THREE.BoxGeometry(1, 0.09, 0.09), M.dark, rails, 'structure');

    /* floor setting-out grid */
    const gx = [], gz = [];
    for (let i = 0; i <= 20; i++) gx.push(T(x0 + (X * i) / 20, 0.008, 0, 1, 1, Z));
    for (let j = 0; j <= 14; j++) gz.push(T(0, 0.008, z0 + (Z * j) / 14, X, 1, 1));
    add(new THREE.BoxGeometry(0.012, 0.006, 1), M.dark, gx, 'structure');
    add(new THREE.BoxGeometry(1, 0.006, 0.012), M.dark, gz, 'structure');

    /* roof plant: units, stair box, parapet */
    const plant = [];
    [[0.3, 0.35], [0.55, 0.3], [0.42, 0.68], [0.7, 0.6]].forEach(([fx, fz]) => plant.push(T(x0 + X * fx, Y * 1.06, z0 + Z * fz, 1, 1, 1)));
    add(new THREE.BoxGeometry(0.9, 0.42, 0.7), M.duct, plant, 'hvac');
    const fans = [];
    [[0.36, 0.5], [0.64, 0.42]].forEach(([fx, fz]) => fans.push(T(x0 + X * fx, Y * 1.09, z0 + Z * fz, 1, 1, 1)));
    add(new THREE.CylinderGeometry(0.26, 0.3, 0.24, 16), M.steel, fans, 'hvac');
    const stair = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 1.2), M.pale);
    stair.position.set(x0 + X * 0.82, Y * 1.4, z0 + Z * 0.24);
    stair.castShadow = true; g.add(stair);
    const parapet = [];
    parapet.push(T(0, Y * 1.06, bbox.min.z, X, 1, 1));
    parapet.push(T(0, Y * 1.06, bbox.max.z, X, 1, 1));
    add(new THREE.BoxGeometry(1, 0.24, 0.1), M.pale, parapet, 'structure');
    const parapetZ = [];
    parapetZ.push(T(bbox.min.x, Y * 1.06, 0, 1, 1, Z));
    parapetZ.push(T(bbox.max.x, Y * 1.06, 0, 1, 1, Z));
    add(new THREE.BoxGeometry(0.1, 0.24, 1), M.pale, parapetZ, 'structure');

    this._detailWires = [];
    Object.keys(SYS).forEach(k => {
      const s = SYS[k];
      if (!s.pts.length) return;
      const wg = new THREE.BufferGeometry();
      wg.setAttribute('position', new THREE.Float32BufferAttribute(s.pts, 3));
      const lines = new THREE.LineSegments(wg, new THREE.LineBasicMaterial({ color: s.color, transparent: true, opacity: s.opacity }));
      lines.name = 'sys:' + k;
      this._wire.add(lines);
      this._detailWires.push(lines);
    });
    return g;
  }

  _buildTechnical(R) {
    const g = new THREE.Group();
    const grid = new THREE.GridHelper(R * 6.2, 40, 0x6d2f39, 0x1f1e1d);
    grid.position.y = -0.012; grid.material.transparent = true; grid.material.opacity = 0.34;
    g.add(grid);
    const halo = new THREE.Mesh(new THREE.RingGeometry(R * 1.03, R * 1.06, 96), new THREE.MeshBasicMaterial({ color: ROSE, transparent: true, opacity: 0.65, side: THREE.DoubleSide }));
    halo.rotation.x = -Math.PI / 2; halo.position.y = 0.014; g.add(halo);
    const sweep = new THREE.Mesh(new THREE.RingGeometry(R * 2.02, R * 2.05, 96, 1, 0, Math.PI * 0.45), new THREE.MeshBasicMaterial({ color: 0xf3d3d8, transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
    sweep.rotation.x = -Math.PI / 2; sweep.position.y = 0.018; g.add(sweep);
    this._halo = halo; this._sweep = sweep;
    return g;
  }

  /* every repeated element is one InstancedMesh: ~600 draw calls → ~30 */
  _buildSite(R, H) {
    const g = new THREE.Group();
    const M = {
      stone: new THREE.MeshStandardMaterial({ color: 0xb9b1a4, roughness: 0.52, metalness: 0.04, envMapIntensity: 1.2 }),
      pale: new THREE.MeshStandardMaterial({ color: 0xd7cfc2, roughness: 0.46, metalness: 0.03, envMapIntensity: 1.25 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x1c1b1a, roughness: 0.38, metalness: 0.55, envMapIntensity: 1.4 }),
      steel: new THREE.MeshStandardMaterial({ color: 0xb8bcb6, roughness: 0.24, metalness: 1, envMapIntensity: 1.5 }),
      timber: new THREE.MeshStandardMaterial({ color: 0x7b5433, roughness: 0.58, envMapIntensity: 1.1 }),
      leaf: new THREE.MeshStandardMaterial({ color: 0x4a6234, roughness: 0.86 }),
      hedge: new THREE.MeshStandardMaterial({ color: 0x38492c, roughness: 0.9 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x9fc4d8, roughness: 0.06, metalness: 0, transmission: 0.7, thickness: 0.8, ior: 1.5, envMapIntensity: 1.6 }),
      water: new THREE.MeshStandardMaterial({ color: 0x123540, roughness: 0.04, metalness: 0.8, envMapIntensity: 1.9 }),
      fig: new THREE.MeshStandardMaterial({ color: 0x191713, roughness: 0.85 })
    };
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), pos = new THREE.Vector3(), scl = new THREE.Vector3(1, 1, 1);
    const inst = (geo, mat, list) => {
      const im = new THREE.InstancedMesh(geo, mat, list.length);
      im.castShadow = true; im.receiveShadow = true;
      list.forEach((it, i) => {
        pos.set(it[0], it[1], it[2]);
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), it[3] || 0);
        scl.set(it[4] || 1, it[5] || it[4] || 1, it[4] || 1);
        im.setMatrixAt(i, m4.compose(pos, q, scl));
      });
      im.instanceMatrix.needsUpdate = true;
      g.add(im);
      return im;
    };

    /* plinth + steps */
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.02, R * 1.05, 0.34, 64), M.pale);
    plinth.position.y = 0.17; plinth.castShadow = true; plinth.receiveShadow = true; g.add(plinth);
    const stepList = [];
    for (let i = 0; i < 3; i++) stepList.push([0, 0.055 + (2 - i) * 0.11, 0, 0, 1 + i * 0.065, 1]);
    inst(new THREE.CylinderGeometry(R * 1.08, R * 1.11, 0.11, 64), M.stone, stepList);

    /* colonnade */
    const colList = [], capList = [];
    for (let i = 0; i < 11; i++) {
      const x = -R * 0.9 + (i / 10) * R * 1.8;
      colList.push([x, H * 0.21 + 0.34, R * 1.16]);
      capList.push([x, H * 0.42 + 0.38, R * 1.16]);
    }
    inst(new THREE.CylinderGeometry(0.11, 0.13, H * 0.42, 14), M.pale, colList);
    inst(new THREE.BoxGeometry(0.34, 0.09, 0.34), M.pale, capList);
    const architrave = new THREE.Mesh(new THREE.BoxGeometry(R * 2, 0.16, 0.46), M.pale);
    architrave.position.set(0, H * 0.42 + 0.5, R * 1.16); architrave.castShadow = true; g.add(architrave);

    /* glass pavilion */
    const pav = new THREE.Group();
    const shell = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.3, 2.4), M.glass);
    shell.position.y = 1.15; pav.add(shell);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.12, 2.7), M.pale);
    roof.position.y = 2.36; roof.castShadow = true; pav.add(roof);
    pav.position.set(R * 1.62, 0, R * 0.85); pav.rotation.y = -0.5;
    g.add(pav);

    /* pergola */
    const perg = new THREE.Group();
    const pPosts = [], pSlats = [];
    for (let i = 0; i < 5; i++) { pPosts.push([-2 + i, 1.25, 0]); pPosts.push([-2 + i, 1.25, 2.1]); }
    for (let i = 0; i < 14; i++) pSlats.push([0, 2.52, i * 0.16]);
    const postIM = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 2.5, 0.12), M.steel, pPosts.length);
    pPosts.forEach((p, i) => postIM.setMatrixAt(i, m4.makeTranslation(p[0], p[1], p[2])));
    postIM.castShadow = true; perg.add(postIM);
    const slatIM = new THREE.InstancedMesh(new THREE.BoxGeometry(4.4, 0.07, 0.1), M.timber, pSlats.length);
    pSlats.forEach((p, i) => slatIM.setMatrixAt(i, m4.makeTranslation(p[0], p[1], p[2])));
    slatIM.castShadow = true; perg.add(slatIM);
    perg.position.set(-R * 1.55, 0, -R * 0.35); perg.rotation.y = 0.4;
    g.add(perg);

    /* basin + jets */
    const basin = new THREE.Mesh(new THREE.BoxGeometry(R * 1.5, 0.12, R * 0.85), M.water);
    basin.position.set(R * 1.45, 0.07, -R * 0.9); g.add(basin);
    const kerb = new THREE.Mesh(new THREE.BoxGeometry(R * 1.62, 0.18, R * 0.97), M.pale);
    kerb.position.set(R * 1.45, 0.05, -R * 0.9); kerb.receiveShadow = true; g.add(kerb);
    this._jetIM = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.018, 0.05, 1, 6),
      new THREE.MeshStandardMaterial({ color: 0xeaf6fa, roughness: 0.06, transparent: true, opacity: 0.5 }), 7);
    this._jetBase = [];
    for (let i = 0; i < 7; i++) {
      const jx = R * 1.45 - R * 0.5 + (i / 6) * R;
      this._jetBase.push([jx, -R * 0.9]);
      this._jetIM.setMatrixAt(i, m4.makeTranslation(jx, 0.55, -R * 0.9));
    }
    g.add(this._jetIM);

    /* planting beds */
    const bedList = [[-R * 1.5, R * 0.9, R * 1.3, R * 0.5], [R * 1.1, R * 1.35, R * 0.9, R * 0.42], [-R * 1.7, -R * 0.8, R * 0.55, R * 1.1]];
    bedList.forEach(([x, z, w, d]) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, 0.22, d), M.pale);
      b.position.set(x, 0.11, z); b.castShadow = true; b.receiveShadow = true; g.add(b);
      const hedge = new THREE.Mesh(new THREE.BoxGeometry(w * 0.92, 0.44, d * 0.9), M.hedge);
      hedge.position.set(x, 0.35, z); hedge.castShadow = true; g.add(hedge);
    });

    /* trees: two instanced meshes for the whole avenue */
    const trunks = [], crowns = [];
    const addTree = (x, z, s) => {
      trunks.push([x, 0.75 * s, z, 0, s, s]);
      for (let i = 0; i < 3; i++) crowns.push([x + (i - 1) * 0.12 * s, (1.5 + i * 0.42) * s, z + (i - 1) * 0.1 * s, i, s * (1 - i * 0.16), s * (1 - i * 0.16) * 0.8]);
    };
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2 + 0.2, r = R * (1.75 + (i % 3) * 0.32);
      addTree(Math.cos(a) * r, Math.sin(a) * r, 0.85 + (i % 4) * 0.14);
    }
    for (let i = 0; i < 5; i++) addTree(-R * 1.35 + i * R * 0.6, R * 1.75, 0.7);
    inst(new THREE.CylinderGeometry(0.055, 0.09, 1.5, 8), M.timber, trunks);
    inst(new THREE.IcosahedronGeometry(0.62, 1), M.leaf, crowns);

    /* planters, bollards, lamps, figures */
    const pots = [], shrubs = [], bollards = [], posts = [], heads = [], lanterns = [], bodies = [], headsFig = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + 0.15, r = R * 1.13;
      pots.push([Math.cos(a) * r, 0.22, Math.sin(a) * r]);
      shrubs.push([Math.cos(a) * r, 0.58, Math.sin(a) * r, i, 1, 0.82]);
    }
    inst(new THREE.CylinderGeometry(0.3, 0.24, 0.44, 12), M.pale, pots);
    inst(new THREE.IcosahedronGeometry(0.3, 1), M.hedge, shrubs);
    for (let i = 0; i < 14; i++) bollards.push([-R * 0.85 + (i / 13) * R * 1.7, 0.25, R * 1.62]);
    inst(new THREE.CylinderGeometry(0.055, 0.065, 0.5, 10), M.dark, bollards);

    const lanternMat = new THREE.MeshStandardMaterial({ color: 0xfff0d6, emissive: 0xffd9a0, emissiveIntensity: 0 });
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2, r = R * 1.52;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      posts.push([x, 1.25, z]); heads.push([x, 2.52, z]); lanterns.push([x, 2.4, z]);
    }
    inst(new THREE.CylinderGeometry(0.035, 0.05, 2.5, 8), M.steel, posts);
    inst(new THREE.BoxGeometry(0.3, 0.1, 0.3), M.dark, heads);
    inst(new THREE.SphereGeometry(0.11, 12, 8), lanternMat, lanterns);
    this._lampMat = lanternMat;
    /* three point lights only, added at night */
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2, r = R * 1.52;
      const pl = new THREE.PointLight(0xffcf9a, 0, R * 1.7, 2);
      pl.position.set(Math.cos(a) * r, 2.35, Math.sin(a) * r);
      g.add(pl);
      this._lamps.push({ light: pl });
    }

    const figSpots = [[R * 0.9, R * 1.35], [R * 0.35, R * 1.5], [-R * 0.6, R * 1.42], [-R * 1.2, R * 1.1], [R * 1.3, R * 0.55], [-R * 0.2, R * 1.24], [R * 0.62, -R * 1.28], [-R * 1.42, -R * 0.42], [R * 1.55, -R * 0.2], [-R * 0.85, R * 1.68]];
    figSpots.forEach(([fx, fz], i) => { bodies.push([fx, 0.52, fz, i]); headsFig.push([fx, 1.02, fz]); });
    inst(new THREE.CapsuleGeometry(0.115, 0.62, 4, 8), M.fig, bodies);
    inst(new THREE.SphereGeometry(0.115, 10, 8), M.fig, headsFig);

    /* benches */
    const seats = [], bases = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.4, r = R * 1.24;
      seats.push([Math.cos(a) * r, 0.36, Math.sin(a) * r, -a]);
      bases.push([Math.cos(a) * r, 0.17, Math.sin(a) * r, -a]);
    }
    inst(new THREE.BoxGeometry(1.05, 0.07, 0.34), M.timber, seats);
    inst(new THREE.BoxGeometry(0.9, 0.32, 0.2), M.dark, bases);

    /* totem */
    const totem = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.6, 0.5), M.dark);
    totem.position.set(R * 1.05, 1.3, R * 1.5); totem.castShadow = true; g.add(totem);
    const faceMat = new THREE.MeshStandardMaterial({ color: 0x151515, emissive: ROSE, emissiveIntensity: 0.9 });
    const face = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.1, 0.4), faceMat);
    face.position.set(R * 1.05 - 0.1, 1.4, R * 1.5); g.add(face);
    this._windows.push(faceMat);

    /* flags */
    this._flags = [];
    const poleList = [];
    for (let i = 0; i < 3; i++) {
      const fx = -R * 1.05 - i * 0.55;
      poleList.push([fx, 2.6, R * 1.35]);
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.5), new THREE.MeshStandardMaterial({ color: i === 1 ? ROSE : 0xe4ded2, roughness: 0.8, side: THREE.DoubleSide }));
      flag.position.set(fx + 0.45, 4.85, R * 1.35); g.add(flag);
      this._flags.push(flag);
    }
    inst(new THREE.CylinderGeometry(0.035, 0.045, 5.2, 8), M.steel, poleList);

    /* district: one instanced shell + one instanced glow */
    const blocks = [], glows = [];
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2 + 0.35, r = R * 2.66;
      const hh = H * (0.34 + (i % 3) * 0.2), bw = R * (0.44 + (i % 2) * 0.2);
      blocks.push([Math.cos(a) * r, hh / 2, Math.sin(a) * r, -a, bw, hh]);
      glows.push([Math.cos(a) * r, hh / 2, Math.sin(a) * r, -a, bw * 0.92, hh * 0.64]);
    }
    inst(new THREE.BoxGeometry(1, 1, 0.8), M.stone, blocks);
    const glowMat = new THREE.MeshStandardMaterial({ color: 0x0e0e0e, emissive: 0xffc98a, emissiveIntensity: 0 });
    inst(new THREE.BoxGeometry(1, 1, 0.74), glowMat, glows);
    this._windows.push(glowMat);

    return g;
  }

  _loop() {
    const clock = new THREE.Clock();
    const v3 = new THREE.Vector3();
    const m4 = new THREE.Matrix4();
    const dayFog = new THREE.Color(0x9aa7b0), nightFog = new THREE.Color(0x141a2a);
    let idleFrames = 0, spotTick = 0;
    const tick = () => {
      this._raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!this._visible) return;                 /* off screen: no work at all */
      this._t = (this._t || 0) + dt;
      const t = this._t;

      const target = this._night ? 1 : 0;
      if (Math.abs(this._nightK - target) > 0.002) {
        const n = this._nightK = lerp(this._nightK, target, Math.min(1, dt * 2.4));
        this._hemi.intensity = lerp(1.25, 0.5, n);
        this._sun.intensity = lerp(4.6, 0.25, n);
        this._bounce.intensity = lerp(0.85, 0.3, n);
        this._rim.intensity = lerp(1.4, 4.6, n);
        this._moon.intensity = lerp(0, 3.2, n);
        this._renderer.toneMappingExposure = lerp(1.05, 1.35, n);
        this._scene.fog.color.copy(dayFog).lerp(nightFog, n);
        this._bloom.strength = lerp(0.4, 0.95, n);
        if (this._lampMat) this._lampMat.emissiveIntensity = n * 3.4;
        this._lamps.forEach(l => { if (l.light) l.light.intensity = n * 18; });
        this._windows.forEach((m, i) => { m.emissiveIntensity = n * (0.9 + (i % 3) * 0.2); });
        const wantNight = n > 0.5;
        if (this._skyIsNight !== wantNight && this._mode === 'rendered') {
          this._skyIsNight = wantNight;
          this._sky = wantNight ? this._nightSky : this._daySky;
          this._scene.background = this._sky;
          this._scene.environment = wantNight ? this._nightEnv : this._dayEnv;
        }
        this._shadowDirty = 1;
      }

      if (this._flags) this._flags.forEach((f, i) => { f.rotation.y = Math.sin(t * 0.9 + i) * 0.22; });
      if (this._jetIM) {
        for (let i = 0; i < 7; i++) {
          const s = 1 + Math.sin(t * 2.2 + i) * 0.22;
          const [jx, jz] = this._jetBase[i];
          m4.makeScale(1, s, 1).setPosition(jx, 0.55 * s, jz);
          this._jetIM.setMatrixAt(i, m4);
        }
        this._jetIM.instanceMatrix.needsUpdate = true;
      }
      if (this._mode === 'xray') {
        if (this._halo) this._halo.material.opacity = 0.4 + Math.abs(Math.sin(t * 0.7)) * 0.3;
        if (this._sweep) this._sweep.rotation.z = t * 0.22;
      }

      if (this._tween) {
        this._tween.t = Math.min(1, this._tween.t + dt / 1.3);
        const e = easeInOut(this._tween.t);
        this._camera.position.lerpVectors(this._tween.fromPos, this._tween.toPos, e);
        this._controls.target.lerpVectors(this._tween.fromTar, this._tween.toTar, e);
        if (this._tween.t >= 1) this._tween = null;
      } else if (this._baseTarget) {
        this._controls.target.y = this._baseTarget.y + Math.sin(t * 0.22) * this._driftY;
      }

      /* hotspots only need updating a few times a second */
      if (this._spots && ++spotTick % 3 === 0) {
        const rect = this._renderer.domElement.getBoundingClientRect();
        this._spots.forEach(s => {
          v3.copy(s.at).project(this._camera);
          s.el.style.left = (v3.x * 0.5 + 0.5) * rect.width + 'px';
          s.el.style.top = (-v3.y * 0.5 + 0.5) * rect.height + 'px';
          s.el.style.opacity = (v3.z < 1 && this._mode === 'rendered') ? '1' : '0';
        });
      }

      if (this._idle) { if (++idleFrames > 300) { this._controls.autoRotate = true; this._idle = 0; idleFrames = 0; } } else idleFrames = 0;

      this._controls.update();
      if (this._shadowDirty > 0) { this._renderer.shadowMap.needsUpdate = true; this._shadowDirty--; }
      if (this._mode === 'xray') this._renderer.render(this._scene, this._camera);
      else this._composer.render();
    };
    tick();
  }
}
if (!customElements.get('spatial-model')) customElements.define('spatial-model', SpatialModel);
