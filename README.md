# TOEFL Practice

Personal TOEFL iBT practice web app — Reading, Listening, Speaking, Writing and Vocab.

- Runs entirely in the browser (installable on iPhone: Safari → Share → Add to Home Screen).
- **No textbook content is stored in this repository.** Passages, audio, images and word lists are imported once on each device from a private data pack (`toefl-pack.bin`) and kept in the browser's IndexedDB.
- Built-in speech-to-text uses Whisper base.en (ONNX, in `asr/`) running locally via onnxruntime-web.
- AI features use your own API key, entered in Settings and stored only on your device.
