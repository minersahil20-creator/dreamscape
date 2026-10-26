# Dreamscape

A calm, responsive mental-wellbeing reflection space built with React and a Node.js/Express server. It includes a supportive chat, reflections inspired by the Bhagavad Gita and public-domain writers, and a local-only reflections page.

## Run locally

1. Install Node.js 20.19 or newer.
2. In this folder, run `npm install`.
3. Run `npm run dev`.
4. Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

The development server starts the React app and the API together. Without a Gemini key, chat uses a small built-in guided-response mode and AI quote search is unavailable. To enable both, create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey) and set `GEMINI_API_KEY` in your `.env` file. `GOOGLE_API_KEY` is also accepted as an alias, but its value must be a Gemini API key—not a legacy Custom Search key. `GEMINI_MODEL` optionally selects the chat model (default: `gemini-3.5-flash-lite`); `GEMINI_SEARCH_MODEL` optionally selects the Google Search grounding model (default: `gemini-3.8-flash`). Chat messages and quote searches are sent to Google Gemini; Dreamscape does not save conversations.

### Search for quotes

The quote search uses Gemini's built-in [Google Search grounding](https://ai.google.dev/gemini-api/docs/google-search) to find quotes and return source links. It requires the same `GEMINI_API_KEY` as chat. No Google Programmable Search Engine, Search Engine ID, or separate search API key is needed.

For a production build, run `npm run build`, set `NODE_ENV=production`, then run `npm start`. The Express server serves the built app and API on port 5000 (or the port set by `PORT`).

### Deploy to Vercel

1. Import `minersahil20-creator/dreamscape` in Vercel. Set the project root to `.` (the repository root), framework preset to **Vite**, build command to `npm run build`, and output directory to `dist`.
2. In **Project Settings → Environment Variables**, add `GEMINI_API_KEY` with your Google AI Studio key. Set it for Production (and Preview too if you want Gemini on preview deployments). Do not add the key to a `VITE_` variable or commit it to GitHub.
3. Optionally set `GEMINI_MODEL` to `gemini-3.5-flash-lite`; this tested model is also the app default.
4. Deploy or redeploy. The included `vercel.json` serves the Vite app and routes `/api/*` requests through the Express serverless function. Check `/api/health` on the deployed domain; `geminiEnabled` should be `true`, then send a message in the chat.

Vercel needs the environment variable configured separately from local `.env`; changing variables requires a new deployment. Gemini can still return errors if Google’s service is unavailable or the key reaches its quota.

## Care and privacy

Dreamscape is a supportive reflection tool, not a therapist, diagnostic service, or emergency service. The chat is not monitored and does not provide phone or hotline numbers. The reflections page only keeps submissions in browser memory and does not publish or persist them. If someone may be in immediate danger, go to the nearest emergency department or reach out to someone you trust.
