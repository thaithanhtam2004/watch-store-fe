import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './utils/AuthContext'; // ✅ Đường dẫn chính xác tới AuthContext

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* ✅ Thêm AuthProvider ở đây */}
      <App />
    </AuthProvider>
  </StrictMode>
);
