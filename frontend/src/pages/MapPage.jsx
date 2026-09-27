import { useState } from 'react';

const buildings = [
  { id: 1, name: 'Корпус 1' },
  { id: 2, name: 'Корпус 2' },
  { id: 3, name: 'Корпус 3' },
  { id: 4, name: 'Корпус 4' },
  { id: 5, name: 'Корпус 5' },
  { id: 6, name: 'Корпус 6' },
  { id: 7, name: 'Корпус 7' },
  { id: 8, name: 'Корпус 8' },
  { id: 9, name: 'Корпус 9' },
];

const floorsByBuilding = {
  9: [1],
};

const availableMaps = {
  '9-1': '/9-1.jpg',
};

export default function MapPage() {
  const [building, setBuilding] = useState(9);
  const [floor, setFloor] = useState(1);

  const floors = floorsByBuilding[building] || [];
  const key = `${building}-${floor}`;
  const mapSrc = availableMaps[key];

  const handleBuilding = (id) => {
    setBuilding(id);
    const list = floorsByBuilding[id] || [];
    setFloor(list[0] || 1);
  };

  return (
    <div>
      <h1 style={{
        fontSize: 28,
        marginBottom: 20,
        color: '#4C1D95',
        textAlign: 'center',
      }}>
        Карта
      </h1>

      <div style={{
        background: '#fff',
        padding: 20,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(109, 40, 217, 0.1)',
        border: '1px solid #EDE9FE',
        maxWidth: 700,
        margin: '0 auto 24px',
        display: 'grid',
        gap: 16,
      }}>
        <div>
          <p style={labelStyle}>Корпус</p>
          <div style={chipsStyle}>
            {buildings.map(b => (
              <button
                key={b.id}
                onClick={() => handleBuilding(b.id)}
                style={chipStyle(building === b.id)}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {floors.length > 0 && (
          <div>
            <p style={labelStyle}>Этаж</p>
            <div style={chipsStyle}>
              {floors.map(f => (
                <button
                  key={f}
                  onClick={() => setFloor(f)}
                  style={chipStyle(floor === f)}
                >
                  {f} этаж
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{
        background: '#fff',
        padding: 24,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(109, 40, 217, 0.1)',
        border: '1px solid #EDE9FE',
        maxWidth: 1000,
        margin: '0 auto',
        textAlign: 'center',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {mapSrc ? (
          <>
            <p style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#4C1D95',
              marginBottom: 16,
            }}>
              Корпус {building}, {floor} этаж
            </p>
            <img
              src={mapSrc}
              alt={`Схема ${building} корпуса, ${floor} этаж`}
              style={{ maxWidth: '100%', borderRadius: 8 }}
            />
          </>
        ) : (
          <div style={{ color: '#7C3AED' }}>
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              В разработке
            </p>
            <p style={{ fontSize: 14, color: '#6B7280' }}>
              Схема корпуса {building} скоро появится
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: '#4C1D95',
  marginBottom: 8,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

const chipsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
};

const chipStyle = (active) => ({
  padding: '8px 14px',
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