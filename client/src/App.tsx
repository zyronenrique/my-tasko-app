import { useState } from 'react';
import './App.css'
import TasKO from './assets/tasko.webp';
import LoginPage from './features/auth/pages/LoginCard';
import RegisterPage from './features/auth/pages/RegisterCard';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <main className='font-sans shrink-0 min-h-screen flex items-center'>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 flex-1">
        <section className='flex items-center justify-center'>
          <img
            alt="TasKo Icon"
            title='TasKo Icon'
            loading="lazy"
            src={TasKO}
            onClick={() => navigate("/dashboard")}
          />
        </section>
        <section>
          {mode === "login" ? (
            <LoginPage  onSwitch={() => setMode("register")}/>
          ) : (
            <RegisterPage onSwitch={() => setMode("login")}/>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
