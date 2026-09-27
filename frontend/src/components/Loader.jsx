export default function Loader({ text = 'Загрузка...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 60,
      gap: 16,
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: '3px solid #EDE9FE',
        borderTop: '3px solid #6D28D9',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{
        color: '#7C3AED',
        fontSize: 15,
        fontWeight: 500,
      }}>
        {text}
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}