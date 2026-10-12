import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rayyan Ahmed – MERN Stack & Front-End Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'radial-gradient(circle at 80% 30%, #2a1f55 0%, #08070d 60%)',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 28, color: '#a78bfa', letterSpacing: 6 }}>PORTFOLIO</div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 16 }}>Rayyan Ahmed</div>
        <div style={{ fontSize: 40, marginTop: 12, color: '#d4d4d8' }}>MERN Stack & Front-End Developer</div>
        <div style={{ fontSize: 28, marginTop: 40, color: '#22d3ee' }}>React · Next.js · Three.js · Node.js · MongoDB</div>
      </div>
    ),
    size
  );
}
