
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setOutput(data.result);
    } catch (err) {
      console.error(err);
      setOutput("Der opstod en fejl. Prøv igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Tilbudsgenerator</h1>

      <textarea
        className="w-full max-w-xl h-32 border rounded p-3 mb-4"
        placeholder="Skriv en beskrivelse af kundens opgave..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Genererer..." : "Generer tilbudstekst"}
      </button>

      {output && (
        <div className="mt-6 w-full max-w-xl p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          {output}
        </div>
      )}
    </main>
  );
}
