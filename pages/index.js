import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    firmanavn: '',
    kunde: '',
    opgavebeskrivelse: '',
    pris: '',
    deadline: '',
    kontaktnavn: '',
    kontaktemail: '',
    skrivestil: 'professionel',
    tone: '',
  });

  const [resultat, setResultat] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultat('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResultat(data.prompt || 'Ingen svar modtaget');
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>AI Tilbudsgenerator</h1>
      <form onSubmit={handleSubmit}>
        <input name="firmanavn" placeholder="Firmanavn" onChange={handleChange} required />
        <input name="kunde" placeholder="Kunde" onChange={handleChange} required />
        <textarea name="opgavebeskrivelse" placeholder="Beskrivelse af opgaven" onChange={handleChange} required />
        <input name="pris" placeholder="Pris (kr)" onChange={handleChange} required />
        <input name="deadline" placeholder="Deadline" onChange={handleChange} required />
        <input name="kontaktnavn" placeholder="Dit navn" onChange={handleChange} required />
        <input name="kontaktemail" placeholder="Din e-mail" onChange={handleChange} required />

        <label>Vælg skrivestil:</label>
        <select name="skrivestil" onChange={handleChange}>
          <option value="professionel">Professionel</option>
          <option value="jordnær">Nede på jorden</option>
          <option value="kortfattet">Kortfattet</option>
          <option value="brugerdefineret">Brugerdefineret</option>
        </select>

        {form.skrivestil === 'brugerdefineret' && (
          <textarea name="tone" placeholder="Beskriv din ønskede skrivestil..." onChange={handleChange} />
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Genererer tilbud...' : 'Generér tilbud'}
        </button>
      </form>

      {resultat && (
        <div style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>
          <h2>Genereret tilbud:</h2>
          <p>{resultat}</p>
        </div>
      )}
    </div>
  );
}
