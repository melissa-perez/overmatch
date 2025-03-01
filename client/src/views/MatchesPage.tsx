import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMatchButton from '../components/CreateMatchButton';

interface Match {
  _id: string;
  mode: string;
  outcome: string;
  finalScore?: number;
}

const MatchesPage = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const navigate = useNavigate();

  // Fetch Matches
  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/api/v1/matches', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch matches: ${res.status}`);

      const data = await res.json();
      setMatches(data.matches || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // DELETE Match
  const deleteMatch = async (matchId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(
        `http://localhost:5000/api/v1/matches/${matchId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) throw new Error(`Failed to delete match: ${res.status}`);

      setMatches((prevMatches) =>
        prevMatches.filter((match) => match._id !== matchId),
      );
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  // Navigate to Update Match Page
  const handleUpdate = (matchId: string) => {
    navigate(`/update-match/${matchId}`);
  };

  return (
    <div>
      <h1>Matches</h1>
      <CreateMatchButton onMatchCreated={fetchMatches} />

      <ul>
        {matches.map((match) => (
          <li key={match._id}>
            {match.mode} - {match.outcome}
            <button onClick={() => deleteMatch(match._id)}>Delete</button>
            <button onClick={() => handleUpdate(match._id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchesPage;
