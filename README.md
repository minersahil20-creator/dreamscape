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

## Care and privacy

Dreamscape is a supportive reflection tool, not a therapist, diagnostic service, or emergency service. The chat is not monitored and does not provide phone or hotline numbers. The reflections page only keeps submissions in browser memory and does not publish or persist them. If someone may be in immediate danger, go to the nearest emergency department or reach out to someone you trust.
