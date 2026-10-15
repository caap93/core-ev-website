/* Scientific EV imagery placeholder — simulated nanoscopy vesicles (from the prototype). */
const RINGS = ['#c2d5e8', '#b4c9df', '#cad8e9', '#b8cedf', '#c6d4e5'];
const DOT = '#8cafc8';

function dots(cx: number, cy: number, r: number, n: number, size: number, opacity: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={size} fill={DOT} opacity={opacity} />;
  });
}

export function EVPlaceholder({ height = 400 }: { height?: number }) {
  return (
    <div style={{ width: '100%', height, background: '#e8edf2', borderRadius: 12, position: 'relative', overflow: 'hidden' }} role="img" aria-label="Illustration of extracellular vesicles">
      <svg width="100%" height="100%" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <circle cx="440" cy="240" r="130" fill={RINGS[0]} opacity="0.9" />
        <circle cx="440" cy="240" r="108" fill={RINGS[1]} opacity="0.7" />
        <circle cx="440" cy="240" r="86" fill={RINGS[2]} opacity="0.5" />
        <circle cx="440" cy="240" r="60" fill={RINGS[3]} opacity="0.4" />
        {dots(440, 240, 133, 16, 5, 0.9)}
        <circle cx="185" cy="165" r="72" fill={RINGS[0]} opacity="0.75" />
        <circle cx="185" cy="165" r="55" fill={RINGS[1]} opacity="0.5" />
        <circle cx="185" cy="165" r="36" fill={RINGS[4]} opacity="0.4" />
        {dots(185, 165, 75, 10, 4, 0.8)}
        <circle cx="710" cy="310" r="90" fill={RINGS[0]} opacity="0.8" />
        <circle cx="710" cy="310" r="70" fill={RINGS[2]} opacity="0.55" />
        <circle cx="710" cy="310" r="46" fill={RINGS[4]} opacity="0.4" />
        {dots(710, 310, 93, 12, 4, 0.8)}
        {[[80, 380, 32], [820, 80, 28], [640, 80, 40], [280, 400, 35], [760, 170, 24], [120, 70, 22], [820, 420, 20], [350, 60, 18]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={RINGS[i % RINGS.length]} opacity="0.5" />
        ))}
      </svg>
    </div>
  );
}
