
export default async function handler(req, res) {
  const { input } = req.body;

  const prompt = `Skriv et professionelt, venligt og overbevisende tilbud til en kunde baseret på denne beskrivelse:\n\n${input}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Du er en erfaren og professionel tilbudsskriver på dansk." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim() || "Ingen tekst genereret.";
    res.status(200).json({ result });
  } catch (error) {
    console.error("OpenAI-fejl:", error);
    res.status(500).json({ result: "Fejl ved kommunikation med OpenAI." });
  }
}
