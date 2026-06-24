import './App.css'
import TasKO from './assets/tasko.webp';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';

function App() {
  return (
    <main className='font-sans'>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <section className='flex items-center justify-center mb-8'>
          <img
            title='TasKo Icon'
            loading="lazy"
            src={TasKO}
          />
        </section>
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div className='col-span-1'>
            <LoginPage />
          </div>
          <div className='col-span-1'>
            <RegisterPage />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
