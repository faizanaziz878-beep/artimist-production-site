import type { Metadata } from "next";
import { ProjectCaseStudy } from "../../case-study-page";

export const metadata: Metadata = {
  title: "RV Park Design & Site Planning Case Study | Artimist",
  description: "RV park design and site planning case study showing layout strategy, landscape thinking and aerial visualization for a wooded United States project.",
  alternates: { canonical: "/case-studies/rv-park-design" },
  openGraph: {
    title: "RV Park Design & Site Planning Case Study | Artimist",
    description: "A wooded RV resort planned around circulation, privacy, a central green and a timber pavilion.",
    url: "https://www.artimistproductions.com/case-studies/rv-park-design",
    type: "article",
  },
};

export default function RvParkCaseStudy() {
  return <ProjectCaseStudy
    slug="rv-park-design"
    eyebrow="Site planning / residential hospitality / USA"
    title="RV Park Design & Site Planning"
    summary="A wooded RV resort concept organized around a looped drive, a shared central green and a timber pavilion, with pad orientation developed to preserve trees, privacy and a clear arrival sequence."
    region="United States"
    hero={{ src: "/img/rvpark.webp", alt: "Aerial visualization of a wooded RV park site plan", caption: "Aerial site-planning visualization / Artimist Productions" }}
    services={["Site Planning", "Landscape", "Architecture", "Aerial Visualization"]}
    brief="The site needed to accommodate vehicle movement, individual RV pads and shared amenities without flattening the character of the wooded setting. The design problem was therefore not simply how many pads could fit, but how circulation, privacy, landscape and a recognizable communal center could work together."
    approach={[
      "Organize the arrival and internal movement as a legible loop so vehicles can circulate without turning the park into a road-first environment.",
      "Angle and separate pads to keep useful spacing between neighboring stays and allow the existing tree structure to contribute to privacy.",
      "Give the plan a social center through a shared green and timber pavilion so the park reads as a place rather than a collection of parking bays.",
    ]}
    deliverables={["Site-planning concept", "RV pad layout strategy", "Internal circulation study", "Landscape and amenity direction", "Aerial 3D visualization", "Presentation imagery"]}
    gallery={[
      { src: "/img/airsidepark.webp", alt: "Aerial site planning and landscape visualization", caption: "Landscape, circulation and public-ground study" },
      { src: "/img/rvpark.webp", alt: "Wooded RV resort aerial visualization showing loop road and pads", caption: "Overall RV park planning concept" },
    ]}
    demonstrates="Artimist can connect site planning, landscape thinking and architectural visualization so a client can evaluate the operational layout and the spatial character in the same project conversation."
    related={[
      { href: "/architecture", label: "Architecture & Site Planning" },
      { href: "/visualization", label: "Architectural Visualization" },
      { href: "/architectural-visualization-services", label: "3D Rendering Services" },
      { href: "/international", label: "International Studio" },
    ]}
  />;
}
