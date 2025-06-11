import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ response: "Message is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ response: reply });

  } catch (error) {
    console.error('OpenAI API error:', error.message);
    res.status(500).json({ response: "Sorry, something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
