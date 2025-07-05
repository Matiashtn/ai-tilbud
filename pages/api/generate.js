export default async function handler(req, res) {
  const {
    firmanavn,
    kunde,
    opgavebeskrivelse,
    pris,
    deadline,
    kontaktnavn,
    kontaktemail,
    skrivestil = "professionel",
    tone = "",
  } = req.body;

  const stilvalg = {
    professionel: "Skriv med professionel og troværdig tone.",
    jordnær: "Skriv med en imødekommende og uformel tone.",
    kortfattet: "Skriv kort, præcist og uden overflødige detaljer.",
    brugerdefineret: tone,
  };

  const stiltekst = stilvalg[skrivestil] || stilvalg["professionel"];

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

  // Her ville du normalt kalde OpenAI med prompt
  // fx const completion = await openai.createChatCompletion(...)

  res.status(200).json({ prompt }); // <-- midlertidigt returneres prompt'en til test
}
