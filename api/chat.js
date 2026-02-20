import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Bạn là AI hỗ trợ lập trình." },
        { role: "user", content: message },
      ],
    });

    res.status(200).json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "Server lỗi: " + error.message,
    });
  }
}
