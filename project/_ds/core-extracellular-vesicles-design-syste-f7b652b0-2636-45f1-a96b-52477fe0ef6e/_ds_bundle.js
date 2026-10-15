/* @ds-bundle: {"format":4,"namespace":"COREExtracellularVesiclesDesignSystem_f7b652","components":[],"sourceHashes":{"ui_kits/store/app.jsx":"9bc406890a03","ui_kits/store/image-slot.js":"cf5f1791dd04","ui_kits/store/product.jsx":"ea1cea902bd2","ui_kits/store/store.jsx":"880550ba8d69","ui_kits/website/app.jsx":"58009dc258de","ui_kits/website/components.jsx":"ef7073e3d0f7","ui_kits/website/image-slot.js":"cf5f1791dd04","ui_kits/website/tiles.jsx":"934cce138eac"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.COREExtracellularVesiclesDesignSystem_f7b652 = window.COREExtracellularVesiclesDesignSystem_f7b652 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/store/app.jsx
try { (() => {
/* CORE store UI kit — catalog grid + product view, cart, toast. */

const {
  useState
} = React;
const PRODUCTS = [{
  id: 'vesa',
  cat: 'Instruments',
  name: 'Vesa NTA',
  price: 'From $48,000',
  cta: 'Configure',
  tagline: 'Single-particle characterization down to 30 nm — twenty minutes, one button.',
  base: 48000,
  optionLabel: 'Configuration',
  specs: [['Size range', '30–1000 nm'], ['Sample volume', '12 µL'], ['Run time', '~20 min'], ['Footprint', '34 × 28 cm'], ['Warranty', '2 years']]
}, {
  id: 'lumen',
  cat: 'Instruments',
  name: 'Lumen',
  price: 'From $19,500',
  cta: 'Configure',
  tagline: 'Benchtop EV quantification with a readout your whole lab can trust.',
  base: 19500,
  optionLabel: 'Configuration',
  specs: [['Method', 'Fluorescence'], ['Throughput', '96 samples / run'], ['Run time', '~25 min'], ['Footprint', '30 × 24 cm'], ['Warranty', '2 years']]
}, {
  id: 'cd9',
  cat: 'Isolation kits',
  name: 'CoreIsolate CD9 Kit',
  price: 'From $420',
  cta: 'Add to bag',
  tagline: 'Spin-column chemistry that recovers 94% of CD9+ vesicles and leaves free protein behind.',
  base: 420,
  optionLabel: 'Pack size',
  specs: [['Marker', 'CD9'], ['Recovery', '94%'], ['Input', '0.5–2 mL'], ['Format', 'Spin column'], ['Storage', '4 °C']]
}, {
  id: 'cd63',
  cat: 'Isolation kits',
  name: 'CoreIsolate CD63 Kit',
  price: 'From $420',
  cta: 'Add to bag',
  tagline: 'Tetraspanin-specific capture for CD63+ populations, validated lot to lot.',
  base: 420,
  optionLabel: 'Pack size',
  specs: [['Marker', 'CD63'], ['Recovery', '92%'], ['Input', '0.5–2 mL'], ['Format', 'Spin column'], ['Storage', '4 °C']]
}, {
  id: 'ab-cd9',
  cat: 'Antibodies',
  name: 'Anti-CD9 (clone 9C1)',
  price: 'From $295',
  cta: 'Add to bag',
  tagline: 'Monoclonal anti-CD9, validated for flow, WB, and capture.',
  base: 295,
  optionLabel: 'Conjugate',
  specs: [['Host', 'Mouse'], ['Clone', '9C1'], ['Applications', 'FC, WB, IP'], ['Format', '100 µg'], ['Storage', '−20 °C']]
}, {
  id: 'std',
  cat: 'Standards',
  name: 'EV Reference Standard',
  price: 'From $260',
  cta: 'Add to bag',
  tagline: 'Orthogonally validated reference EVs for instrument calibration.',
  base: 260,
  optionLabel: 'Concentration',
  specs: [['Particle conc.', '1e11 / mL'], ['Mode size', '110 nm'], ['Source', 'Recombinant'], ['Format', '0.5 mL'], ['Storage', '−80 °C']]
}, {
  id: 'cons',
  cat: 'Consumables',
  name: 'Low-bind Tube Pack',
  price: 'From $85',
  cta: 'Add to bag',
  tagline: 'Protein-low-bind tubes to protect recovery through every transfer.',
  base: 85,
  optionLabel: 'Pack size',
  specs: [['Material', 'Low-bind PP'], ['Volume', '1.5 mL'], ['Sterile', 'Yes'], ['Count', '500'], ['Storage', 'RT']]
}, {
  id: 'filt',
  cat: 'Consumables',
  name: 'EV Filter Cartridges',
  price: 'From $140',
  cta: 'Add to bag',
  tagline: 'Pre-clearing cartridges that remove debris without shearing vesicles.',
  base: 140,
  optionLabel: 'Pack size',
  specs: [['Pore', '0.8 µm'], ['Material', 'PES'], ['Input', '≤ 5 mL'], ['Count', '50'], ['Storage', 'RT']]
}];
const OPTION_SETS = {
  Instruments: [{
    label: 'Standard',
    note: 'Included',
    delta: 0
  }, {
    label: '+ Autosampler',
    note: '+$6,500',
    delta: 6500
  }, {
    label: '+ CoreOS Pro',
    note: '+$3,200',
    delta: 3200
  }],
  'Isolation kits': [{
    label: '50 reactions',
    note: 'Standard',
    delta: 0
  }, {
    label: '100 reactions',
    note: '+$180',
    delta: 180
  }, {
    label: '250 reactions',
    note: '+$520',
    delta: 520
  }],
  Antibodies: [{
    label: 'Unconjugated',
    note: 'Standard',
    delta: 0
  }, {
    label: 'FITC',
    note: '+$40',
    delta: 40
  }, {
    label: 'PE',
    note: '+$55',
    delta: 55
  }, {
    label: 'APC',
    note: '+$60',
    delta: 60
  }],
  Standards: [{
    label: '1× conc.',
    note: 'Standard',
    delta: 0
  }, {
    label: '5× conc.',
    note: '+$120',
    delta: 120
  }],
  Consumables: [{
    label: '1 pack',
    note: 'Standard',
    delta: 0
  }, {
    label: '5 packs',
    note: '+10%',
    delta: 0.1
  }, {
    label: '10 packs',
    note: '+18%',
    delta: 0.18
  }]
};
const CATS = ['All', 'Instruments', 'Isolation kits', 'Antibodies', 'Standards', 'Consumables'];
function fmt(n) {
  return '$' + n.toLocaleString('en-US');
}
function StToast({
  msg,
  onDone
}) {
  React.useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 84,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 80,
      background: stTokens.frost,
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: 9999,
      padding: '12px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: stTokens.blue,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(StIcon, {
    name: "check",
    size: 16,
    stroke: stTokens.blue
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 14,
      letterSpacing: -0.224,
      color: stTokens.ink
    }
  }, msg));
}
function Grid({
  products,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: '24px 40px 64px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 20
    }
  }, products.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    p: p,
    onOpen: onOpen
  })));
}
function App() {
  const [view, setView] = useState('grid'); // 'grid' | 'product'
  const [cat, setCat] = useState('All');
  const [query, setQuery] = useState('');
  const [bag, setBag] = useState(0);
  const [toast, setToast] = useState('');
  const [current, setCurrent] = useState(null);
  const [selected, setSelected] = useState(null);
  const open = p => {
    const opts = OPTION_SETS[p.cat];
    setCurrent(p);
    setSelected(opts[0]);
    setView('product');
    window.scrollTo({
      top: 0
    });
  };
  const filtered = PRODUCTS.filter(p => (cat === 'All' || p.cat === cat) && (query.trim() === '' || (p.name + ' ' + p.cat).toLowerCase().includes(query.toLowerCase())));
  const price = (() => {
    if (!current || !selected) return '';
    let total = current.base + (selected.delta > 1 ? selected.delta : current.base * (selected.delta || 0));
    return fmt(Math.round(total));
  })();
  if (view === 'product' && current) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StGlobalNav, {
      bag: bag,
      onHome: () => setView('grid')
    }), /*#__PURE__*/React.createElement(ProductPage, {
      product: current,
      options: OPTION_SETS[current.cat],
      selected: selected,
      onSelect: setSelected,
      price: price,
      query: query,
      setQuery: setQuery,
      onBack: () => setView('grid'),
      onAdd: () => {
        setBag(b => b + 1);
        setToast(`${current.name} — ${selected.label} added`);
      }
    }), /*#__PURE__*/React.createElement(StToast, {
      msg: toast,
      onDone: () => setToast('')
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: stTokens.canvas
    }
  }, /*#__PURE__*/React.createElement(StGlobalNav, {
    bag: bag,
    onHome: () => setView('grid')
  }), /*#__PURE__*/React.createElement(StSubNav, {
    title: "Store",
    query: query,
    setQuery: setQuery
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: '40px 40px 0'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: stTokens.fontDisplay,
      fontSize: 40,
      fontWeight: 600,
      letterSpacing: -0.5,
      color: stTokens.ink,
      margin: 0
    }
  }, "Store"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 17,
      letterSpacing: -0.374,
      color: stTokens.ink48,
      margin: '8px 0 0'
    }
  }, "Instruments, reagents, and consumables for extracellular vesicle science.")), /*#__PURE__*/React.createElement(CategoryChips, {
    cats: CATS,
    active: cat,
    onPick: setCat
  }), filtered.length > 0 ? /*#__PURE__*/React.createElement(Grid, {
    products: filtered,
    onOpen: open
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: '60px 40px',
      fontFamily: stTokens.fontText,
      fontSize: 17,
      color: stTokens.ink48
    }
  }, "No products match \u201C", query, "\u201D."), /*#__PURE__*/React.createElement(StToast, {
    msg: toast,
    onDone: () => setToast('')
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/store/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/store/image-slot.js
try { (() => {
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/store/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/store/product.jsx
try { (() => {
/* CORE store UI kit — product / configurator page + floating sticky bar. */

function OptionChip({
  opt,
  selected,
  onPick
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "st-press",
    onClick: () => onPick(opt),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      textAlign: 'left',
      background: stTokens.canvas,
      cursor: 'pointer',
      border: selected ? `2px solid ${stTokens.blueFocus}` : `1px solid ${stTokens.hairline}`,
      borderRadius: 9999,
      padding: selected ? '11px 21px' : '12px 22px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: -0.224,
      color: stTokens.ink
    }
  }, opt.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 12,
      color: stTokens.ink48
    }
  }, opt.note));
}
function SpecRow({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      padding: '12px 0',
      borderBottom: `1px solid ${stTokens.hairline}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 14,
      color: stTokens.ink48,
      letterSpacing: -0.224
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 14,
      fontWeight: 600,
      color: stTokens.ink,
      letterSpacing: -0.224,
      textAlign: 'right'
    }
  }, v));
}

/* Floating sticky bar (parchment 80% + blur) */
function StickyBar({
  price,
  onAdd
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      zIndex: 30,
      height: 64,
      background: stTokens.frost,
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 12,
      color: stTokens.ink48
    }
  }, "Your configuration"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: -0.374,
      color: stTokens.ink
    }
  }, price)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: stTokens.fontText,
      fontSize: 14,
      color: stTokens.ink48
    }
  }, /*#__PURE__*/React.createElement(StIcon, {
    name: "truck",
    size: 16,
    stroke: stTokens.ink48
  }), " Ships in 3\u20135 days"), /*#__PURE__*/React.createElement("button", {
    className: "st-press",
    onClick: onAdd,
    style: {
      background: stTokens.blue,
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 9999,
      padding: '11px 24px',
      fontFamily: stTokens.fontText,
      fontSize: 17,
      letterSpacing: -0.374
    }
  }, "Add to bag")));
}
function GalleryThumb({
  i,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "st-press",
    style: {
      position: 'relative',
      width: 56,
      height: 56,
      borderRadius: 8,
      border: active ? `2px solid ${stTokens.blueFocus}` : `1px solid ${stTokens.hairline}`,
      background: '#eef0f3',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#b6b9c0',
      fontFamily: stTokens.fontText,
      fontSize: 11
    }
  }, i + 1));
}
function ProductPage({
  product,
  options,
  selected,
  onSelect,
  price,
  onBack,
  onAdd,
  query,
  setQuery
}) {
  const [shot, setShot] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: stTokens.canvas
    }
  }, /*#__PURE__*/React.createElement(StSubNav, {
    onBack: onBack,
    query: query,
    setQuery: setQuery
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: '48px 40px',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 64,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 132
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '4/3',
      background: '#eef0f3',
      borderRadius: 18,
      boxShadow: stTokens.shadowProduct
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: `pp-${product.id}-${shot}`,
    shape: "rounded",
    radius: "18",
    placeholder: `${product.name} — view ${shot + 1}`,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      color: '#8a8d94'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 16
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement(GalleryThumb, {
    key: i,
    i: i,
    active: i === shot,
    onClick: () => setShot(i)
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: 0.231,
      color: stTokens.blue
    }
  }, product.cat), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: stTokens.fontDisplay,
      fontSize: 40,
      fontWeight: 600,
      letterSpacing: -0.5,
      lineHeight: 1.1,
      margin: '6px 0 0',
      color: stTokens.ink
    }
  }, product.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: stTokens.fontDisplay,
      fontSize: 24,
      fontWeight: 300,
      lineHeight: 1.4,
      letterSpacing: 0,
      color: stTokens.ink,
      margin: '14px 0 0',
      maxWidth: 460,
      textWrap: 'pretty'
    }
  }, product.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: -0.374,
      color: stTokens.ink,
      marginBottom: 12
    }
  }, product.optionLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, options.map(o => /*#__PURE__*/React.createElement(OptionChip, {
    key: o.label,
    opt: o,
    selected: selected.label === o.label,
    onPick: onSelect
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: -0.374,
      color: stTokens.ink,
      marginBottom: 4
    }
  }, "Specifications"), product.specs.map(s => /*#__PURE__*/React.createElement(SpecRow, {
    key: s[0],
    k: s[0],
    v: s[1]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: stTokens.fontText,
      fontSize: 14,
      color: stTokens.ink48
    }
  }, /*#__PURE__*/React.createElement(StIcon, {
    name: "doc",
    size: 16,
    stroke: stTokens.ink48
  }), " Datasheet (PDF)"))))), /*#__PURE__*/React.createElement(StickyBar, {
    price: price,
    onAdd: onAdd
  }));
}
Object.assign(window, {
  OptionChip,
  SpecRow,
  StickyBar,
  ProductPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/store/product.jsx", error: String((e && e.message) || e) }); }

// ui_kits/store/store.jsx
try { (() => {
/* CORE store UI kit — shared chrome, cards, chips. Exports to window. */

const stTokens = {
  blue: '#0066cc',
  blueFocus: '#0071e3',
  blueDark: '#2997ff',
  ink: '#1d1d1f',
  ink80: '#333',
  ink48: '#7a7a7a',
  canvas: '#fff',
  parchment: '#f5f5f7',
  pearl: '#fafafc',
  tile1: '#272729',
  black: '#000',
  onDark: '#fff',
  onDarkMuted: '#ccc',
  hairline: '#e0e0e0',
  frost: 'rgba(245,245,247,0.8)',
  fontDisplay: '"SF Pro Display", system-ui, -apple-system, "Inter", sans-serif',
  fontText: '"SF Pro Text", system-ui, -apple-system, "Inter", sans-serif',
  shadowProduct: 'rgba(0,0,0,0.22) 3px 5px 30px 0'
};
function StIcon({
  name,
  size = 16,
  stroke = 'currentColor',
  sw = 1.6
}) {
  const paths = {
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 21l-4.3-4.3"
    })),
    bag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M6 7h13l-1.4 9.3a2 2 0 0 1-2 1.7H9.4a2 2 0 0 1-2-1.7z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 7a3 3 0 0 1 6 0"
    })),
    chevron: /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6"
    }),
    back: /*#__PURE__*/React.createElement("path", {
      d: "M15 6l-6 6 6 6"
    }),
    plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    })),
    check: /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5"
    }),
    sliders: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 6h11"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 6h1"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 12h5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13 12h7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 18h9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17 18h3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "6",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "10",
      cy: "12",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "14",
      cy: "18",
      r: "2"
    })),
    truck: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 7h11v8H3z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 10h4l3 3v2h-7z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "7",
      cy: "17",
      r: "1.6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17",
      cy: "17",
      r: "1.6"
    })),
    doc: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M7 3h7l4 4v14H7z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 3v4h4"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: stroke,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flex: 'none'
    }
  }, paths[name]);
}

/* Global nav (black) */
function StGlobalNav({
  bag,
  onHome
}) {
  const links = ['Instruments', 'Reagents', 'Pipeline', 'Science', 'Support'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: 44,
      background: stTokens.black,
      display: 'flex',
      alignItems: 'center',
      gap: 26,
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/vesicle-mark-light.svg",
    alt: "CORE",
    style: {
      height: 20,
      cursor: 'pointer'
    },
    onClick: onHome
  }), links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: '#f5f5f7',
      textDecoration: 'none',
      opacity: 0.88,
      fontFamily: stTokens.fontText,
      fontSize: 12,
      letterSpacing: -0.12
    }
  }, l)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      color: '#f5f5f7'
    }
  }, /*#__PURE__*/React.createElement(StIcon, {
    name: "bag",
    size: 15
  }), bag > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -7,
      right: -8,
      background: stTokens.blue,
      color: '#fff',
      borderRadius: 9999,
      minWidth: 14,
      height: 14,
      fontSize: 9,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 3px'
    }
  }, bag)));
}

/* Frosted store sub-nav with pill search input */
function StSubNav({
  query,
  setQuery,
  onBack,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 44,
      zIndex: 40,
      height: 64,
      background: stTokens.frost,
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '0 40px'
    }
  }, onBack ? /*#__PURE__*/React.createElement("button", {
    className: "st-press",
    onClick: onBack,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: stTokens.blue,
      fontFamily: stTokens.fontText,
      fontSize: 17,
      letterSpacing: -0.374
    }
  }, /*#__PURE__*/React.createElement(StIcon, {
    name: "back",
    size: 18,
    stroke: stTokens.blue
  }), " Store") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: stTokens.fontDisplay,
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: 0.231,
      color: stTokens.ink
    }
  }, title || 'Store'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 44,
      width: 340,
      maxWidth: '40vw',
      background: stTokens.canvas,
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: 9999,
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement(StIcon, {
    name: "search",
    size: 16,
    stroke: stTokens.ink48,
    sw: 1.8
  }), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search reagents, instruments\u2026",
    style: {
      border: 'none',
      outline: 'none',
      flex: 1,
      background: 'transparent',
      fontFamily: stTokens.fontText,
      fontSize: 17,
      letterSpacing: -0.374,
      color: stTokens.ink
    }
  })));
}

/* Category filter chips */
function CategoryChips({
  cats,
  active,
  onPick
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      padding: '28px 40px 0',
      maxWidth: 1440,
      margin: '0 auto'
    }
  }, cats.map(c => {
    const on = c === active;
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      className: "st-press",
      onClick: () => onPick(c),
      style: {
        background: on ? stTokens.ink : stTokens.canvas,
        color: on ? stTokens.onDark : stTokens.ink,
        border: on ? 'none' : `1px solid ${stTokens.hairline}`,
        cursor: 'pointer',
        borderRadius: 9999,
        padding: on ? '9px 17px' : '8px 16px',
        fontFamily: stTokens.fontText,
        fontSize: 14,
        letterSpacing: -0.224
      }
    }, c);
  }));
}

/* Store utility card */
function ProductCard({
  p,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "st-press",
    onClick: () => onOpen(p),
    style: {
      background: stTokens.canvas,
      border: `1px solid ${stTokens.hairline}`,
      borderRadius: 18,
      padding: 24,
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '1/1',
      background: '#eef0f3',
      borderRadius: 8,
      boxShadow: stTokens.shadowProduct,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: `card-${p.id}`,
    shape: "rounded",
    radius: "8",
    placeholder: p.cat,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      color: '#8a8d94'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 12,
      color: stTokens.ink48,
      letterSpacing: -0.12,
      marginBottom: 4
    }
  }, p.cat), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: -0.374,
      color: stTokens.ink
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: stTokens.fontText,
      fontSize: 17,
      letterSpacing: -0.374,
      color: stTokens.ink,
      marginTop: 2
    }
  }, p.price), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpen(p);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      color: stTokens.blue,
      textDecoration: 'none',
      fontFamily: stTokens.fontText,
      fontSize: 17,
      letterSpacing: -0.374,
      marginTop: 12
    }
  }, p.cta || 'Learn more', " ", /*#__PURE__*/React.createElement(StIcon, {
    name: "chevron",
    size: 15,
    stroke: stTokens.blue
  })));
}
Object.assign(window, {
  stTokens,
  StIcon,
  StGlobalNav,
  StSubNav,
  CategoryChips,
  ProductCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/store/store.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* CORE website UI kit — homepage assembly + light interactivity. */

const {
  useState,
  useEffect
} = React;
function Toast({
  msg,
  onDone
}) {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 28,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 80,
      background: cwTokens.frost,
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: 9999,
      padding: '12px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: cwTokens.blue,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    stroke: cwTokens.blue
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: cwTokens.fontText,
      fontSize: 14,
      letterSpacing: -0.224,
      color: cwTokens.ink
    }
  }, msg));
}
function SearchOverlay({
  open,
  onClose
}) {
  const suggestions = ['Vesa NTA instrument', 'CoreIsolate CD9 kit', 'Lumen quantification', 'Exosome standards', 'Tetraspanin antibodies'];
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 70,
      background: 'rgba(245,245,247,0.92)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      padding: '120px 40px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      maxWidth: 760,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      borderBottom: '2px solid #d2d2d7',
      paddingBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 24,
    stroke: cwTokens.ink48,
    sw: 1.6
  }), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    placeholder: "Search CORE",
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      flex: 1,
      fontFamily: cwTokens.fontDisplay,
      fontSize: 34,
      fontWeight: 400,
      letterSpacing: -0.5,
      color: cwTokens.ink
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: cwTokens.ink48
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: cwTokens.fontText,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: cwTokens.ink48,
      marginBottom: 12
    }
  }, "Quick links"), suggestions.map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClose();
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: cwTokens.blue,
      textDecoration: 'none',
      fontFamily: cwTokens.fontText,
      fontSize: 17,
      letterSpacing: -0.374,
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 14,
    stroke: cwTokens.ink48
  }), " ", s)))));
}
function App() {
  const [bag, setBag] = useState(0);
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState(false);
  const addToBag = name => {
    setBag(b => b + 1);
    setToast(`${name} added to your bag`);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: cwTokens.canvas
    }
  }, /*#__PURE__*/React.createElement(GlobalNav, {
    bag: bag,
    onSearch: () => setSearch(true),
    onBag: () => setToast('Your bag')
  }), /*#__PURE__*/React.createElement(SubNav, {
    category: "CORE",
    links: ['Instruments', 'Reagents', 'Pipeline', 'Science'],
    cta: "Request a demo",
    onCta: () => setToast('Demo request started')
  }), /*#__PURE__*/React.createElement(HeroTile, {
    onOrder: () => {
      const el = document.getElementById('vesa');
      if (el) window.scrollTo({
        top: el.offsetTop - 96,
        behavior: 'smooth'
      });
    },
    onLearn: () => setToast('Playing the film')
  }), /*#__PURE__*/React.createElement("div", {
    id: "vesa"
  }, /*#__PURE__*/React.createElement(ProductTile, {
    surface: "dark",
    eyebrow: "Vesa",
    headline: "See every vesicle.",
    tagline: "Single-particle characterization down to 30 nm. Twenty minutes, twelve microliters, one button.",
    primary: "Order",
    ghost: "Learn more",
    renderId: "vesa-render",
    onPrimary: () => addToBag('Vesa'),
    onGhost: () => setToast('Vesa overview')
  })), /*#__PURE__*/React.createElement(ProductTile, {
    surface: "light",
    eyebrow: "CoreIsolate",
    headline: "Isolation, perfected.",
    tagline: "A spin-column chemistry that recovers 94% of CD9+ vesicles \u2014 and leaves the free protein behind.",
    primary: "Order",
    ghost: "Read the data",
    renderId: "isolate-render",
    onPrimary: () => addToBag('CoreIsolate kit'),
    onGhost: () => setToast('Application note')
  }), /*#__PURE__*/React.createElement(ProductTile, {
    surface: "parchment",
    eyebrow: "Lumen",
    headline: "Quantify in twenty minutes.",
    tagline: "Benchtop EV quantification with a readout your whole lab can trust. No core facility required.",
    primary: "Order",
    ghost: "Learn more",
    renderId: "lumen-render",
    onPrimary: () => addToBag('Lumen'),
    onGhost: () => setToast('Lumen overview')
  }), /*#__PURE__*/React.createElement(SplitSection, {
    left: {
      surface: 'dark2',
      eyebrow: 'Reagents',
      headline: 'Standards you can cite.',
      body: 'Reference EVs and antibodies validated against orthogonal methods, lot-traceable end to end.',
      link: 'Browse reagents',
      renderId: 'reagent-render'
    },
    right: {
      surface: 'dark3',
      eyebrow: 'Software',
      headline: 'One record, every run.',
      body: 'CoreOS captures instrument, protocol, and result — so a result is reproducible by definition.',
      link: 'See CoreOS',
      renderId: 'software-render'
    }
  }), /*#__PURE__*/React.createElement(StatTile, {
    surface: "dark",
    stat: "8",
    label: "Pipeline",
    headline: "Engineered vesicles, delivered where they're needed.",
    body: "Eight programs in discovery, built on the same platform our instruments characterize.",
    link: "Explore the pipeline"
  }), /*#__PURE__*/React.createElement(Tile, {
    surface: "parchment",
    style: {
      paddingTop: 64,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement(TileHeadline, null, "Build on CORE."), /*#__PURE__*/React.createElement(TileTagline, null, "Talk to a specialist about isolation, characterization, or a custom EV program."), /*#__PURE__*/React.createElement(CTAPair, {
    primary: "Request a demo",
    ghost: "Contact sales",
    onPrimary: () => setToast('Demo request started'),
    onGhost: () => setToast('Contacting sales'),
    large: true
  })), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(Toast, {
    msg: toast,
    onDone: () => setToast('')
  }), /*#__PURE__*/React.createElement(SearchOverlay, {
    open: search,
    onClose: () => setSearch(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components.jsx
try { (() => {
/* CORE website UI kit — shared chrome & primitives.
   Exports to window for the other Babel scripts. */

const cwTokens = {
  blue: '#0066cc',
  blueFocus: '#0071e3',
  blueDark: '#2997ff',
  ink: '#1d1d1f',
  ink80: '#333',
  ink48: '#7a7a7a',
  canvas: '#fff',
  parchment: '#f5f5f7',
  pearl: '#fafafc',
  tile1: '#272729',
  tile2: '#2a2a2c',
  tile3: '#252527',
  black: '#000',
  onDark: '#fff',
  onDarkMuted: '#ccc',
  hairline: '#e0e0e0',
  frost: 'rgba(245,245,247,0.8)',
  fontDisplay: '"SF Pro Display", system-ui, -apple-system, "Inter", sans-serif',
  fontText: '"SF Pro Text", system-ui, -apple-system, "Inter", sans-serif',
  shadowProduct: 'rgba(0,0,0,0.22) 3px 5px 30px 0'
};

/* ---- Lucide-style monoline icons (inline SVG) ---- */
function Icon({
  name,
  size = 16,
  stroke = 'currentColor',
  sw = 1.6
}) {
  const paths = {
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 21l-4.3-4.3"
    })),
    bag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M6 7h13l-1.4 9.3a2 2 0 0 1-2 1.7H9.4a2 2 0 0 1-2-1.7z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 7a3 3 0 0 1 6 0"
    })),
    chevron: /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6"
    }),
    arrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13 6l6 6-6 6"
    })),
    plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    })),
    menu: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 7h16"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 12h16"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 17h16"
    })),
    check: /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5"
    }),
    close: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M6 6l12 12"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 6L6 18"
    })),
    clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 8v4l3 2"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: stroke,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flex: 'none'
    }
  }, paths[name]);
}

/* ---- Buttons ---- */
function PrimaryButton({
  children,
  onClick,
  large,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "cw-press",
    onClick: onClick,
    style: {
      background: cwTokens.blue,
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 9999,
      fontFamily: cwTokens.fontText,
      fontSize: large ? 18 : 17,
      fontWeight: large ? 300 : 400,
      letterSpacing: large ? 0 : -0.374,
      padding: large ? '14px 28px' : '11px 22px',
      ...style
    }
  }, children);
}
function GhostButton({
  children,
  onClick,
  onDark,
  style
}) {
  const c = onDark ? cwTokens.blueDark : cwTokens.blue;
  return /*#__PURE__*/React.createElement("button", {
    className: "cw-press",
    onClick: onClick,
    style: {
      background: 'transparent',
      color: c,
      border: `1px solid ${c}`,
      cursor: 'pointer',
      borderRadius: 9999,
      fontFamily: cwTokens.fontText,
      fontSize: 17,
      letterSpacing: -0.374,
      padding: '10px 22px',
      ...style
    }
  }, children);
}
function TextLink({
  children,
  onDark,
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick && onClick();
    },
    style: {
      color: onDark ? cwTokens.blueDark : cwTokens.blue,
      textDecoration: 'none',
      fontFamily: cwTokens.fontText,
      fontSize: 17,
      letterSpacing: -0.374,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, children, " ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 15
  }));
}

/* ---- Global nav (black, 44px) ---- */
function GlobalNav({
  bag,
  onSearch,
  onBag
}) {
  const links = ['Vesa', 'CoreIsolate', 'Lumen', 'Pipeline', 'Science', 'Support'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: 44,
      background: cwTokens.black,
      display: 'flex',
      alignItems: 'center',
      gap: 26,
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/vesicle-mark-light.svg",
    alt: "CORE",
    style: {
      height: 20,
      opacity: 0.95
    }
  }), links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: '#f5f5f7',
      textDecoration: 'none',
      opacity: 0.88,
      fontFamily: cwTokens.fontText,
      fontSize: 12,
      letterSpacing: -0.12
    }
  }, l)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onSearch,
    "aria-label": "Search",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#f5f5f7',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onBag,
    "aria-label": "Bag",
    style: {
      position: 'relative',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#f5f5f7',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bag",
    size: 15
  }), bag > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -7,
      right: -8,
      background: cwTokens.blue,
      color: '#fff',
      borderRadius: 9999,
      minWidth: 14,
      height: 14,
      fontSize: 9,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 3px'
    }
  }, bag)));
}

/* ---- Frosted sub-nav (52px) ---- */
function SubNav({
  category,
  links,
  cta,
  onCta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 44,
      zIndex: 40,
      height: 52,
      background: cwTokens.frost,
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: cwTokens.fontDisplay,
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: 0.231,
      color: cwTokens.ink
    }
  }, category), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: cwTokens.ink,
      textDecoration: 'none',
      fontFamily: cwTokens.fontText,
      fontSize: 14,
      letterSpacing: -0.224
    }
  }, l))), /*#__PURE__*/React.createElement("button", {
    className: "cw-press",
    onClick: onCta,
    style: {
      background: cwTokens.blue,
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 9999,
      padding: '6px 15px',
      fontFamily: cwTokens.fontText,
      fontSize: 14,
      letterSpacing: -0.224
    }
  }, cta));
}

/* ---- Footer (parchment, dense link columns) ---- */
function Footer() {
  const cols = [{
    h: 'Instruments',
    items: ['Vesa', 'Lumen', 'CoreIsolate', 'Compare', 'Accessories']
  }, {
    h: 'Science',
    items: ['EV biology', 'Application notes', 'Publications', 'Webinars']
  }, {
    h: 'Pipeline',
    items: ['Programs', 'Platform', 'Partnering', 'Clinical']
  }, {
    h: 'Company',
    items: ['About', 'Careers', 'Newsroom', 'Contact']
  }, {
    h: 'Support',
    items: ['Order status', 'Documentation', 'Service', 'Quotes']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: cwTokens.parchment,
      color: cwTokens.ink80,
      padding: '48px 40px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: cwTokens.fontText,
      fontSize: 12,
      color: cwTokens.ink48,
      lineHeight: 1.5,
      paddingBottom: 18,
      borderBottom: '1px solid #d2d2d7',
      maxWidth: 720
    }
  }, "CORE products are for research use only. Not for use in diagnostic procedures. Specifications subject to change."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 24,
      paddingTop: 24
    }
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: cwTokens.fontText,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: -0.224,
      color: cwTokens.ink,
      marginBottom: 4
    }
  }, c.h), c.items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: 'block',
      color: cwTokens.ink80,
      textDecoration: 'none',
      fontFamily: cwTokens.fontText,
      fontSize: 17,
      lineHeight: 2.41,
      letterSpacing: -0.2
    }
  }, it))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #d2d2d7',
      marginTop: 24,
      paddingTop: 18,
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: cwTokens.fontText,
      fontSize: 12,
      color: cwTokens.ink48
    }
  }, "Copyright \xA9 2026 CORE Extracellular Vesicles, Inc. All rights reserved."), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), ['Privacy', 'Terms', 'Legal', 'Sitemap'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: cwTokens.fontText,
      fontSize: 12,
      color: cwTokens.ink48,
      textDecoration: 'none'
    }
  }, l)))));
}
Object.assign(window, {
  cwTokens,
  Icon,
  PrimaryButton,
  GhostButton,
  TextLink,
  GlobalNav,
  SubNav,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/image-slot.js
try { (() => {
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/website/tiles.jsx
try { (() => {
/* CORE website UI kit — tile components (the museum-gallery building blocks). */

/* Generic full-bleed tile. surface: 'light' | 'parchment' | 'dark' | 'dark2' | 'dark3' */
function Tile({
  surface = 'light',
  children,
  style
}) {
  const bg = {
    light: cwTokens.canvas,
    parchment: cwTokens.parchment,
    dark: cwTokens.tile1,
    dark2: cwTokens.tile2,
    dark3: cwTokens.tile3
  }[surface];
  const isDark = surface.startsWith('dark');
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: bg,
      color: isDark ? cwTokens.onDark : cwTokens.ink,
      padding: '80px 40px',
      textAlign: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto'
    }
  }, children));
}
function TileEyebrow({
  children,
  isDark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: cwTokens.fontText,
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: 0.231,
      color: isDark ? cwTokens.blueDark : cwTokens.blue,
      marginBottom: 8
    }
  }, children);
}
function TileHeadline({
  children,
  hero
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: cwTokens.fontDisplay,
      fontWeight: 600,
      margin: 0,
      fontSize: hero ? 56 : 40,
      lineHeight: hero ? 1.07 : 1.1,
      letterSpacing: hero ? -0.28 : -0.5
    }
  }, children);
}
function TileTagline({
  children,
  isDark
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: cwTokens.fontDisplay,
      fontWeight: 400,
      fontSize: 28,
      lineHeight: 1.14,
      letterSpacing: 0.196,
      margin: '14px auto 0',
      maxWidth: 720,
      color: isDark ? cwTokens.onDarkMuted : cwTokens.ink,
      textWrap: 'pretty'
    }
  }, children);
}
function CTAPair({
  primary,
  ghost,
  isDark,
  onPrimary,
  onGhost,
  large
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      justifyContent: 'center',
      marginTop: 32,
      flexWrap: 'wrap'
    }
  }, primary && /*#__PURE__*/React.createElement(PrimaryButton, {
    large: large,
    onClick: onPrimary
  }, primary), ghost && /*#__PURE__*/React.createElement(GhostButton, {
    onDark: isDark,
    onClick: onGhost
  }, ghost));
}

/* A product render resting on the surface. A backing div carries the surface
   color + system shadow; the image-slot sits on top and covers it once filled. */
function ProductRender({
  id,
  w = 760,
  h = 460,
  shape = 'rounded',
  radius = 16,
  placeholder,
  bg = '#eef0f3'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: w,
      height: h,
      maxWidth: '100%',
      background: bg,
      borderRadius: radius,
      boxShadow: cwTokens.shadowProduct
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: id,
    shape: shape,
    radius: String(radius),
    placeholder: placeholder || 'Drop product photography',
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      color: '#8a8d94'
    }
  })));
}

/* Hero — the opening statement tile */
function HeroTile({
  onOrder,
  onLearn
}) {
  return /*#__PURE__*/React.createElement(Tile, {
    surface: "light",
    style: {
      paddingTop: 64
    }
  }, /*#__PURE__*/React.createElement(TileHeadline, {
    hero: true
  }, "The platform for", /*#__PURE__*/React.createElement("br", null), "extracellular vesicle science."), /*#__PURE__*/React.createElement(TileTagline, null, "Isolate, characterize, and engineer EVs with instruments built for reproducibility \u2014 on the bench, not the core facility."), /*#__PURE__*/React.createElement(CTAPair, {
    primary: "Explore Vesa",
    ghost: "Watch the film",
    onPrimary: onOrder,
    onGhost: onLearn
  }), /*#__PURE__*/React.createElement(ProductRender, {
    id: "hero-render",
    w: 980,
    h: 520,
    placeholder: "Drop hero instrument photography"
  }));
}

/* Standard product tile with a centered render */
function ProductTile({
  surface,
  eyebrow,
  headline,
  tagline,
  primary,
  ghost,
  renderId,
  onPrimary,
  onGhost,
  renderH = 480
}) {
  const isDark = surface.startsWith('dark');
  return /*#__PURE__*/React.createElement(Tile, {
    surface: surface
  }, eyebrow && /*#__PURE__*/React.createElement(TileEyebrow, {
    isDark: isDark
  }, eyebrow), /*#__PURE__*/React.createElement(TileHeadline, null, headline), tagline && /*#__PURE__*/React.createElement(TileTagline, {
    isDark: isDark
  }, tagline), /*#__PURE__*/React.createElement(CTAPair, {
    primary: primary,
    ghost: ghost,
    isDark: isDark,
    onPrimary: onPrimary,
    onGhost: onGhost
  }), /*#__PURE__*/React.createElement(ProductRender, {
    id: renderId,
    w: 820,
    h: renderH,
    bg: isDark ? '#1c1c1e' : '#eef0f3',
    placeholder: "Drop product photography"
  }));
}

/* Two-up split section (occasional homepage rhythm-breaker) */
function SplitSection({
  left,
  right
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0
    }
  }, [left, right].map((c, i) => {
    const isDark = c.surface.startsWith('dark');
    const bg = {
      light: cwTokens.canvas,
      parchment: cwTokens.parchment,
      dark: cwTokens.tile1,
      dark2: cwTokens.tile2,
      dark3: cwTokens.tile3
    }[c.surface];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: bg,
        color: isDark ? cwTokens.onDark : cwTokens.ink,
        padding: '72px 48px',
        textAlign: 'center'
      }
    }, c.eyebrow && /*#__PURE__*/React.createElement(TileEyebrow, {
      isDark: isDark
    }, c.eyebrow), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: cwTokens.fontDisplay,
        fontWeight: 600,
        fontSize: 34,
        letterSpacing: -0.5,
        margin: 0
      }
    }, c.headline), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: cwTokens.fontText,
        fontSize: 17,
        lineHeight: 1.47,
        letterSpacing: -0.374,
        color: isDark ? cwTokens.onDarkMuted : cwTokens.ink,
        maxWidth: 380,
        margin: '12px auto 0'
      }
    }, c.body), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(TextLink, {
      onDark: isDark
    }, c.link)), /*#__PURE__*/React.createElement(ProductRender, {
      id: c.renderId,
      w: 420,
      h: 300,
      bg: isDark ? '#1c1c1e' : '#eef0f3',
      placeholder: "Drop image"
    }));
  }));
}

/* Pipeline tile — one load-bearing number */
function StatTile({
  surface,
  stat,
  label,
  headline,
  body,
  link
}) {
  const isDark = surface.startsWith('dark');
  return /*#__PURE__*/React.createElement(Tile, {
    surface: surface
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: cwTokens.fontDisplay,
      fontWeight: 600,
      fontSize: 96,
      lineHeight: 1,
      letterSpacing: -2,
      color: isDark ? cwTokens.onDark : cwTokens.ink
    }
  }, stat), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: cwTokens.fontText,
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: 0.231,
      color: isDark ? cwTokens.blueDark : cwTokens.blue,
      marginTop: 8
    }
  }, label), /*#__PURE__*/React.createElement(TileHeadline, null, headline), body && /*#__PURE__*/React.createElement(TileTagline, {
    isDark: isDark
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    onDark: isDark
  }, link)));
}
Object.assign(window, {
  Tile,
  TileEyebrow,
  TileHeadline,
  TileTagline,
  CTAPair,
  ProductRender,
  HeroTile,
  ProductTile,
  SplitSection,
  StatTile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tiles.jsx", error: String((e && e.message) || e) }); }

})();
