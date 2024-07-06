import './App.css';
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={< SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
