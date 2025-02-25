import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import MatchesPage from './views/MatchesPage';
import RegisterPage from './views/RegisterPage';
import './App.css';
import Footer from './components/Footer';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/matches" element={<MatchesPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
