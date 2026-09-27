import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BurgerMenu from './components/BurgerMenu';
import Home from './pages/Home';
import Losts from './pages/Losts';
import Menu from './pages/Menu';
import MapPage from './pages/MapPage';

export default function App() {
  return (
    <BrowserRouter>
      <BurgerMenu />
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: 16,
        paddingTop: 72,
        position: 'relative',
        zIndex: 1,
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/losts" element={<Losts />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}