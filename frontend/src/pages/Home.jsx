import { Link } from 'react-router-dom';

const cards = [
  {
    path: '/losts',
    title: 'Потеряшки',
    desc: 'Найти или оставить объявление о потерянной вещи',
  },
  {
    path: '/menu',
    title: 'Меню столовой',
    desc: 'Актуальное меню на сегодня',
  },
  {
    path: '/map',
    title: 'Карта',
    desc: 'Расположение корпусов и кабинетов',
  },
];

export default function Home() {
  return (
    <div>
      <h1 style={{ fontSize: 26, marginBottom: 8, color: '#4C1D95', textAlign: 'center' }}>
        Главное меню
      </h1>
      <p style={{ textAlign: 'center', color: '#7C3AED', marginBottom: 28, fontSize: 15 }}>
        Выберите раздел
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {cards.map(card => (
          <Link
            key={card.path}
            to={card.path}
            style={{
              display: 'block',
              background: '#fff',
              borderRadius: 16,
              padding: 24,
              border: '1px solid #EDE9FE',
              boxShadow: '0 2px 8px rgba(109, 40, 217, 0.08)',
              textDecoration: 'none',
              color: '#1a1a1a',
              transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(109, 40, 217, 0.18)';
              e.currentTarget.style.borderColor = '#A78BFA';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(109, 40, 217, 0.08)';
              e.currentTarget.style.borderColor = '#EDE9FE';
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#4C1D95', marginBottom: 8 }}>
              {card.title}
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.5 }}>
              {card.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}