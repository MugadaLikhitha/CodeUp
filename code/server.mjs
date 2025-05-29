import express from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

// Serve static React files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.post('/execute', async (req, res) => {
  const { code, language, input } = req.body;

  const langMap = {
    c: 'c',
    cpp: 'cpp',
    java: 'java',
    python: 'python3'
  };

  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: langMap[language],
      version: "*",
      files: [{ name: "main", content: code }],
      stdin: input
    });

    const result = response.data;
    res.json({ output: result.run.output || result.run.stderr || "No output" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
