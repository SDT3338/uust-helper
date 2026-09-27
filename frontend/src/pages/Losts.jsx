import { useEffect, useState } from 'react';
import api from '../api';
import Loader from '../components/Loader';

export default function Losts() {
  const [losts, setLosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});

  const load = async () => {
    try {
      const { data } = await api.get('/losts');
      setLosts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const validate = () => {
    const newErrors = {};

    if (!description.trim()) {
      newErrors.description = 'Введите описание';
    } else if (description.trim().length < 5) {
      newErrors.description = 'Слишком короткое описание';
    }

    const cleanPhone = phone.replace(/[^\d]/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Телефон должен содержать минимум 10 цифр';
    }

    if (!photo) {
      newErrors.photo = 'Выберите фото';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('description', description);
    formData.append('phone', phone);
    formData.append('photo', photo);

    try {
      await api.post('/lost', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDescription('');
      setPhone('');
      setPhoto(null);
      setErrors({});
      e.target.reset();
      load();
    } catch (err) {
      alert('Ошибка: ' + (err.response?.data?.error || err.message));
    }
  };

  const filtered = [...losts]
    .reverse()
    .filter(l =>
      l.description?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 20, color: '#4C1D95', textAlign: 'center' }}>
        Потеряшки
      </h1>

      <form
        onSubmit={submit}
        noValidate
        style={{
          background: '#fff',
          padding: 20,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(109, 40, 217, 0.1)',
          border: '1px solid #EDE9FE',
          display: 'grid',
          gap: 12,
          marginBottom: 20,
          maxWidth: '100%',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div>
          <input
            placeholder="Описание (что потеряно, место)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{
              ...inputStyle,
              width: '100%',
              borderColor: errors.description ? '#EF4444' : '#DDD6FE',
            }}
          />
          {errors.description && <p style={errorStyle}>{errors.description}</p>}
        </div>

        <div>
          <input
            placeholder="Телефон для связи"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{
              ...inputStyle,
              width: '100%',
              borderColor: errors.phone ? '#EF4444' : '#DDD6FE',
            }}
          />
          {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={e => setPhoto(e.target.files[0])}
            style={{
              ...inputStyle,
              width: '100%',
              borderColor: errors.photo ? '#EF4444' : '#DDD6FE',
            }}
          />
          {errors.photo && <p style={errorStyle}>{errors.photo}</p>}
          </div>

        <button type="submit" style={buttonStyle}>Добавить</button>
      </form>

      <div style={{ maxWidth: '100%', margin: '0 auto 24px' }}>
        <input
          placeholder="Поиск по описанию или телефону"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, width: '100%' }}
        />
      </div>

      {loading ? (
        <Loader text="Загрузка потеряшек..." />
      ) : filtered.length === 0 ? (
        <p style={{ color: '#7C3AED', textAlign: 'center', padding: 40 }}>
          {search ? 'Ничего не найдено' : 'Пока ничего нет'}
        </p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
        }}>
          {filtered.map(l => {
            const imgUrl = l.photo ? `http://localhost:3000${l.photo}` : null;
            return (
              <div
                key={l.id}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(109, 40, 217, 0.1)',
                  border: '1px solid #EDE9FE',
                  flex: '1 1 240px',
                  maxWidth: 280,
                  minWidth: 0,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(109, 40, 217, 0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(109, 40, 217, 0.1)';
                }}
              >
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt=""
                    onClick={() => setPreview(imgUrl)}
                    style={{
                      width: '100%',
                      height: 220,
                      objectFit: 'cover',
                      cursor: 'zoom-in',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{
                    height: 220,
                    background: '#F3F0FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#A78BFA',
                  }}>
                    Нет фото
                  </div>
                )}
                <div style={{ padding: 14 }}>
                  <p style={{ fontWeight: 600, color: '#4C1D95', marginBottom: 6 }}>
                    {l.description}
                  </p>
                  <p style={{ color: '#1a1a1a', fontSize: 14 }}>
                    <span style={{ filter: 'grayscale(100%)' }}>📞</span> {l.phone}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {preview && (
        <div
          onClick={() => setPreview(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
            padding: 20,
          }}
        >
          <img
            src={preview}
            alt=""
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: 12,
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '10px 12px',
  border: '1px solid #DDD6FE',
  borderRadius: 8,
  fontSize: 14,
  outline: 'none',
  background: '#FAF5FF',
  color: '#4C1D95',
  transition: 'border-color 0.15s',
};

const buttonStyle = {
  padding: '10px 16px',
  background: '#6D28D9',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
};

const errorStyle = {
  color: '#EF4444',
  fontSize: 12,
  marginTop: 4,
  marginLeft: 4,
};