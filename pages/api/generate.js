import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // bruger miljøvariablen
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const {
    firmanavn,
    kunde,
    opgavebeskrivelse,
    pris,
    deadline,
    kontaktnavn,
    kontaktemail,
    skrivestil = 'professionel',
    tone = '',
  } = req.body;

  const stilvalg = {
    professionel: 'Skriv med professionel og troværdig tone.',
    jordnær: 'Skriv med en imødekommende og uformel tone.',
    kortfattet: 'Skriv kort, præcist og uden overflødige detaljer.',
    brugerdefineret: tone,
  };

  const stiltekst = stilvalg[skrivestil] || stilvalg['professionel'];

  const prompt = `
Du skal skrive et tilbudsbrev på vegne af virksomheden "${firmanavn}" til kunden "${kunde}".

Opgavebeskrivelse:
${opgavebeskrivelse}

Estimeret pris:
${pris} kr.

Deadline:
${deadline}

Kontaktperson:
${kontaktnavn}, ${kontaktemail}

${stiltekst}

Tilbuddet skal:
- Være klart og let at forstå
- Vise professionalisme og tillid
- Indeholde kontaktinfo og venlig afslutning
`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const svar = completion.data.choices[0].message.content;
    res.status(200).json({ result: svar });
  } catch (err) {
    console.error('Fejl fra OpenAI:', err.response?.data || err.message);
    res.status(500).json({ error: 'Kunne ikke generere tilbud' });
  }
}
