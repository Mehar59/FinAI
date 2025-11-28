// ollama-proxy.cjs
const express = require("express");
const cors = require("cors");

// ✅ If Node < 18, global fetch doesn't exist, so we use node-fetch dynamically
let fetchFn = global.fetch;
if (!fetchFn) {
  fetchFn = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ollama-explain", async (req, res) => {
  try {
    const { userData, recommendations } = req.body || {};

    console.log("🔹 Incoming explain request");
    console.log("userData:", userData);
    console.log("has recommendations:", !!recommendations);

    const prompt = `
You are a friendly Indian financial planner.

Using this data:
User data: ${JSON.stringify(userData, null, 2)}
Recommendations: ${JSON.stringify(recommendations, null, 2)}

Explain the plan in 2–3 short paragraphs.
Use simple language a college student can understand.
Do NOT return JSON, only plain text explanation.
`;

    const response = await fetchFn("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3", // make sure this model exists in Ollama
        stream: false,
        messages: [
          {
            role: "system",
            content: "You are a helpful financial planning assistant.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    console.log("🔹 Ollama raw response:", data);

    const explanation =
      data?.message?.content || "Local AI response not available.";

    res.json({ explanation });
  } catch (err) {
    console.error("❌ Ollama proxy error:", err);
    res
      .status(500)
      .json({ explanation: "Local AI is not running or reachable right now." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Ollama proxy running at http://localhost:${PORT}`);
}); 






