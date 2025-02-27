import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import MatchesPage from './views/MatchesPage';
import RegisterPage from './views/RegisterPage';
import './App.css';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/matches" element={<MatchesPage />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
