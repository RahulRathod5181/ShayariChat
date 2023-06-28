const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require("cors");


const app = express();
app.use(cors())
app.use(express.json());
const port = 3000; // Change this to your desired port number

app.get('/shayari/:word', async (req, res) => {
  const word = req.params.word;
  const shayari = await generateShayari(word);
  let firstShayari = shayari.split('\n\n')[0];
  res.send(firstShayari);
});

async function generateShayari(word) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo', // Update with the appropriate model
      messages: [
        { role: 'system', content: 'You are Rahat indori famous indian Shayar.' },
        { role: 'user', content: `Generate Shayari for ${word}` },
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

// async function generateShayari(word) {
//   const response = await axios.post(
//     'https://api.openai.com/v1/engines/davinci-codex/completions',
//     {
//       prompt: `तुम कवि हो।\n${word}`,
//       // max_tokens: 100,
//       temperature: 0.7,
//       top_p: 1,
//       n: 1,
//       stop: '\n',
//       temperature: 0.7,
//       frequency_penalty: 0.0,
//       presence_penalty: 0.0,
//       model: 'gpt-3.5-turbo',
//       language: 'hi',
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.API_KEY}`,
//       },
//     }
//   );

//   return response.data.choices[0].text.trim();
// }


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
