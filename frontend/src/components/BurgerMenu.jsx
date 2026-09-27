import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const items = [
    { path: '/', label: 'Главная' },
    { path: '/losts', label: 'Потеряшки' },
    { path: '/menu', label: 'Меню столовой' },
    { path: '/map', label: 'Карта' },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 200,
          width: 44,
          height: 44,
          borderRadius: 10,
          background: '#fff',
          border: '1px solid #EDE9FE',
          boxShadow: '0 2px 8px rgba(109, 40, 217, 0.12)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
          padding: 0,
        }}
      >
        <span style={line} />
        <span style={line} />
        <span style={line} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(76, 29, 149, 0.35)',
            zIndex: 300,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 260,
        background: '#fff',
        borderRight: '1px solid #EDE9FE',
        boxShadow: open ? '4px 0 24px rgba(109, 40, 217, 0.15)' : 'none',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        zIndex: 400,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#4C1D95',
          marginBottom: 20,
          paddingLeft: 8,
        }}>
          Меню
        </div>

        {items.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                color: active ? '#fff' : '#4C1D95',
                background: active
                  ? 'linear-gradient(135deg, #6D28D9, #8B5CF6)'
                  : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </aside>
    </>
  );
}

const line = {
  display: 'block',
  width: 20,
  height: 2,
  background: '#4C1D95',
  borderRadius: 2,
};