import {ImageResponse} from 'next/og';

export const runtime = 'edge';
export const alt = 'Loros FC | Sitio Oficial';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 65%, #020617 100%)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '72px 92px',
          position: 'relative',
          width: '100%',
        }}
      >
        <div style={{background: '#facc15', height: 18, left: 0, position: 'absolute', top: 0, width: '100%'}} />
        <div style={{background: '#0ea5e9', borderRadius: 999, height: 320, opacity: 0.2, position: 'absolute', right: -80, top: -90, width: 320}} />
        <div style={{background: '#ef4444', borderRadius: 999, bottom: -180, height: 420, opacity: 0.16, position: 'absolute', right: 160, width: 420}} />
        <div style={{color: '#facc15', fontSize: 34, fontWeight: 700, letterSpacing: 8}}>FÚTBOL • PASIÓN • IDENTIDAD</div>
        <div style={{fontSize: 104, fontWeight: 900, letterSpacing: -5, lineHeight: 1, marginTop: 28}}>LOROS FC</div>
        <div style={{color: '#d1fae5', fontSize: 34, marginTop: 28}}>Sitio oficial de Loros Fútbol Club</div>
        <div style={{background: '#facc15', height: 8, marginTop: 52, width: 190}} />
      </div>
    ),
    {...size},
  );
}
