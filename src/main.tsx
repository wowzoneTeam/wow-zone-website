import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// مسح الكاش القديم فورًا عند التشغيل
if ('caches' in window) {
  caches.keys().then(function (names) {
    for (let name of names) caches.delete(name);
  });
}

// إنشاء التطبيق داخل جذر الصفحة
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
