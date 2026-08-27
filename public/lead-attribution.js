(function () {
  'use strict';

  var STORAGE_KEY = 'artimist_first_touch';
  var PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'msclkid', 'fbclid'];

  function parseStored() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveStored(value) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch (e) {}
  }

  function currentParams() {
    var out = {};
    var search = new URLSearchParams(location.search || '');
    PARAMS.forEach(function (key) {
      var value = search.get(key);
      if (value) out[key] = String(value).slice(0, 240);
    });
    return out;
  }

  function ensureFirstTouch() {
    var stored = parseStored();
    if (Object.keys(stored).length) return stored;
    var first = currentParams();
    first.first_landing_page = (location.pathname + location.search).slice(0, 500);
    first.first_referrer = (document.referrer || '').slice(0, 500);
    first.first_touch_at = new Date().toISOString();
    saveStored(first);
    return first;
  }

  function attribution() {
    var first = ensureFirstTouch();
    var current = currentParams();
    var combined = {};
    Object.keys(first).forEach(function (key) { combined[key] = first[key]; });
    Object.keys(current).forEach(function (key) { combined[key] = current[key]; });
    combined.landing_page = (location.pathname + location.search).slice(0, 500);
    combined.referrer = (document.referrer || '').slice(0, 500);
    return combined;
  }

  ensureFirstTouch();

  if (typeof window.fetch !== 'function') return;
  var originalFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    try {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      if (url.indexOf('/api/inquiries') !== -1 && init && typeof init.body === 'string') {
        var body = JSON.parse(init.body);
        var attrs = attribution();
        Object.keys(attrs).forEach(function (key) {
          if (!body[key]) body[key] = attrs[key];
        });
        init = Object.assign({}, init, { body: JSON.stringify(body) });
      }
    } catch (e) {}
    return originalFetch(input, init);
  };
})();
