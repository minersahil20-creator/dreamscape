import { useEffect, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import QuotesSection from './components/QuotesSection';
import ReviewSection from './components/ReviewSection';
import './index.css';

const navigation = [
  { to: '/', label: 'Home', end: true },
  { to: '/chat', label: 'Your space' },
  { to: '/quotes', label: 'Words to keep' },
  { to: '/reviews', label: 'Reflections' },
];

function App() {
  const [theme, setTheme] = useState(() => (
    window.localStorage.getItem('dreamscape-theme') === 'dark' ? 'dark' : 'light'
  ));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('dreamscape-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <Link className="brand" to="/" aria-label="Dreamscape home">
            <span className="brand-mark" aria-hidden="true">d</span>
            <span>dreamscape<span className="brand-period">.</span></span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'dark'}
              onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
            >
              <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
              <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>
            <Link className="header-cta" to="/chat">Take a breath <span aria-hidden="true">↗</span></Link>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/quotes" element={<QuotesSection />} />
            <Route path="/reviews" element={<ReviewSection />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <Link className="footer-brand" to="/">dreamscape<span className="brand-period">.</span></Link>
          <p>A gentle place to pause, reflect, and begin again.</p>
          <p className="footer-note">A supportive companion, not a substitute for professional mental health care.</p>
          <p className="love-note">~love sahil</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
