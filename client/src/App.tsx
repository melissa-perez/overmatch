import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import MatchesPage from './views/MatchesPage';
import './App.css';
import Footer from './components/footer';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matches" element={<MatchesPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
