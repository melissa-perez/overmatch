import { useState } from 'react';

const CreateMatchButton = ({
  onMatchCreated,
}: {
  onMatchCreated: () => void;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    mode: '',
    outcome: '',
    finalScore: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/v1/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Match created successfully!');
      setShowForm(false);
      onMatchCreated(); // Refresh match list
    } else {
      alert('Error creating match');
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>Create Match</button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
          >
            <option value="">Select Mode</option>
            <option value="Control">Control</option>
            <option value="Escort">Escort</option>
            <option value="Flashpoint">Flashpoint</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Push">Push</option>
            <option value="Clash">Clash</option>
          </select>

          <select
            name="outcome"
            value={formData.outcome}
            onChange={handleChange}
            required
          >
            <option value="">Select Outcome</option>
            <option value="Victory">Victory</option>
            <option value="Loss">Loss</option>
            <option value="Draw">Draw</option>
            <option value="Abandoned">Abandoned</option>
          </select>

          <input
            type="number"
            name="finalScore"
            placeholder="Final Score"
            value={formData.finalScore}
            onChange={handleChange}
          />

          <button type="submit">Submit Match</button>
        </form>
      )}
    </div>
  );
};

export default CreateMatchButton;
