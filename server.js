const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = 3000; // Change this to your desired port number

app.get('/shayari/:word', async (req, res) => {
  const word = req.params.word;
  const shayari = await generateShayari(word);
  res.send(shayari);
  return
});

async function generateShayari(word) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo', // Update with the appropriate model
      messages: [
        { role: 'system', content: 'You are a poet.' },
        { role: 'user', content: word },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`, // Fetch API key from environment variable
      },
    }
  );

  return response.data.choices[0].message.content;
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
