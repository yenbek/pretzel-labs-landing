// Mounts @paper-design/shaders-react FlutedGlass (esm.sh) into host elements.
let libs;
const load = () => (libs ||= Promise.all([
  import('https://esm.sh/@paper-design/shaders-react@0.0.59?deps=react@18.3.1,react-dom@18.3.1'),
  import('https://esm.sh/react-dom@18.3.1/client'),
  import('https://esm.sh/react@18.3.1'),
]));

export async function mountFlutedGlass(host, image) {
  const [{ FlutedGlass }, { createRoot }, React] = await load();
  const root = createRoot(host);
  const render = () => root.render(React.createElement(FlutedGlass, {
    width: host.clientWidth || 600, height: host.clientHeight || 400, image: new URL(image, document.baseURI).href,
    colorBack: '#00000000', colorShadow: '#ff0000', colorHighlight: '#ffffff',
    size: 0.85, shadows: 0.13, highlights: 0, shape: 'wave', angle: 30,
    distortionShape: 'flat', distortion: 0, shift: -1, stretch: 0.21, blur: 0.3,
    edges: 0.32, margin: 0, grainMixer: 0.1, grainOverlay: 0.1, scale: 1.2, fit: 'cover',
    style: { width: '100%', height: '100%', display: 'block' },
  }));
  render();
  const ro = new ResizeObserver(render); ro.observe(host);
  return () => { ro.disconnect(); root.unmount(); };
}
