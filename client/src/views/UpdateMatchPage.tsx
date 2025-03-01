import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateMatchPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState({ mode: '', outcome: '', finalScore: 0 });

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(
          `http://localhost:5000/api/v1/matches/${matchId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (!res.ok) throw new Error(`Failed to fetch match: ${res.status}`);

        const data = await res.json();
        setMatch(data.match);
      } catch (error) {
        console.error('Error fetching match:', error);
      }
    };

    fetchMatch();
  }, [matchId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setMatch({ ...match, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(
        `http://localhost:5000/api/v1/matches/${matchId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(match),
        },
      );

      if (!res.ok) throw new Error(`Failed to update match: ${res.status}`);

      navigate('/');
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  return (
    <div>
      <h1>Update Match</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Mode:
          <select name="mode" value={match.mode} onChange={handleChange}>
            <option value="Control">Control</option>
            <option value="Escort">Escort</option>
            <option value="Flashpoint">Flashpoint</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Push">Push</option>
            <option value="Clash">Clash</option>
          </select>
        </label>
        <br />
        <label>
          Outcome:
          <select name="outcome" value={match.outcome} onChange={handleChange}>
            <option value="Victory">Victory</option>
            <option value="Loss">Loss</option>
            <option value="Draw">Draw</option>
            <option value="Abandoned">Abandoned</option>
          </select>
        </label>
        <br />
        <label>
          Final Score:
          <input
            type="number"
            name="finalScore"
            value={match.finalScore}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateMatchPage;
