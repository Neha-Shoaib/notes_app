import express from 'express';
import multer from 'multer';
import Groq, { toFile } from 'groq-sdk';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const mimeType = req.file.mimetype || 'audio/webm';
    const audioFile = await toFile(req.file.buffer, 'speech.webm', { type: mimeType });

    // Step 1: Transcribe with Whisper Large v3
    const whisperResult = await groq.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-large-v3',
      response_format: 'json',
      prompt: 'Transcribe English, Urdu (اردو), or Roman Urdu (e.g. aaj meeting 5 baje hai, kaam karna hai).',
      temperature: 0.0,
    });

    const rawTranscript = whisperResult.text;
    if (!rawTranscript || !rawTranscript.trim()) {
      return res.status(200).json({ text: '' });
    }

    // Step 2: Post-process with Llama 3.1 8B (fast, reliable, and active)
    let formattedText = rawTranscript;
    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content:
              'You are a transcript formatter. Clean up punctuation, grammar, and structure while preserving the exact language (Urdu, Roman Urdu, or English) without altering the core meaning.',
          },
          {
            role: 'user',
            content: rawTranscript,
          },
        ],
        temperature: 0.2,
      });

      formattedText = completion.choices[0]?.message?.content?.trim() || rawTranscript;
    } catch (llmError) {
      console.warn('Formatting step failed, returning raw transcript:', llmError.message);
    }

    return res.status(200).json({ text: formattedText });
  } catch (error) {
    console.error('Transcription Error:', error);
    return res.status(500).json({ error: error.message || 'Transcription failed' });
  }
});

export default router;