import { useState } from 'react';

const weekDays = [
  { id: 'mon', label: 'Понедельник', short: 'Пн' },
  { id: 'tue', label: 'Вторник', short: 'Вт' },
  { id: 'wed', label: 'Среда', short: 'Ср' },
  { id: 'thu', label: 'Четверг', short: 'Чт' },
  { id: 'fri', label: 'Пятница', short: 'Пт' },
];

const menuByDay = {
  mon: {
    main: 'Борщ',
    extras: [
      'Один кусочек хлеба',
      'Сметана',
      'Чай чёрный',
    ],
    extraPaid: {
      title: 'Плов',
      note: 'Второе блюдо за дополнительную плату',
    },
  },
  tue: null,
  wed: null,
  thu: null,
  fri: null,
};

export default function Menu() {
  const [day, setDay] = useState('mon');
  const menu = menuByDay[day];
  const dayLabel = weekDays.find(d => d.id === day).label;

  return (
    <div>
      <h1 style={{
        fontSize: 28,
        marginBottom: 20,
        color: '#4C1D95',
        textAlign: 'center',
      }}>
        Меню столовой
      </h1>

      <div style={{
        background: '#fff',
        padding: 16,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(109, 40, 217, 0.1)',
        border: '1px solid #EDE9FE',
        maxWidth: 700,
        margin: '0 auto 24px',
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {weekDays.map(d => (
          <button
            key={d.id}
            onClick={() => setDay(d.id)}
            style={chipStyle(day === d.id)}
          >
            {d.short}
          </button>
        ))}
      </div>

      <div style={{
        background: '#fff',
        padding: 28,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(109, 40, 217, 0.1)',
        border: '1px solid #EDE9FE',
        maxWidth: 600,
        margin: '0 auto',
        minHeight: 320,
      }}>
        <p style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#4C1D95',
          marginBottom: 20,
          textAlign: 'center',
        }}>
          {dayLabel}
        </p>

        {menu ? (
          <>
            <div style={{ marginBottom: 20 }}>
              <p style={blockLabelStyle}>Главное блюдо</p>
              <p style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#4C1D95',
              }}>
                {menu.main}
              </p>
            </div>

            {menu.extras && menu.extras.length > 0 && (
              <div style={{
                background: '#FAF5FF',
                borderRadius: 10,
                padding: 16,
                marginBottom: 20,
                border: '1px solid #EDE9FE',
              }}>
                <p style={blockLabelStyle}>В дополнение</p>
                <ul style={{
                  listStyle: 'none',
                  display: 'grid',
                  gap: 6,
                }}>
                  {menu.extras.map((item, i) => (
                    <li key={i} style={{
                      fontSize: 15,
                      color: '#1a1a1a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#8B5CF6',
                        display: 'inline-block',
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {menu.extraPaid && (
              <div style={{
                background: '#F5F3FF',
                borderRadius: 10,
                padding: 16,
                border: '1px dashed #A78BFA',
              }}>
                <p style={blockLabelStyle}>За дополнительную плату</p>
                <p style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#4C1D95',
                  marginBottom: 4,
                }}>
                  {menu.extraPaid.title}
                </p>
                <p style={{ fontSize: 13, color: '#6B7280' }}>
                  {menu.extraPaid.note}
                </p>
              </div>
            )}
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            color: '#7C3AED',
            paddingTop: 60,
          }}>
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              Меню редактируется
            </p>
            <p style={{ fontSize: 14, color: '#6B7280' }}>
              Для этого дня меню пока не готово
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const chipStyle = (active) => ({
  padding: '10px 18px',
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  color: active ? '#fff' : '#4C1D95',
  background: active
    ? 'linear-gradient(135deg, #6D28D9, #8B5CF6)'
    : '#fff',
  border: active ? '1px solid transparent' : '1px solid #DDD6FE',
  boxShadow: active ? '0 2px 8px rgba(109, 40, 217, 0.3)' : 'none',
  transition: 'all 0.15s ease',
});

const blockLabelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: '#4C1D95',
  marginBottom: 8,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};