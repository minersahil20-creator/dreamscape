import { useEffect, useState } from 'react';

function QuotesSection() {
  const [wisdom, setWisdom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quoteSearchEnabled, setQuoteSearchEnabled] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => {
        if (!response.ok) throw new Error('The wisdom library is unavailable right now.');
        return response.json();
      })
      .then((data) => setWisdom(data.wisdom))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch('/api/config')
      .then((response) => {
        if (!response.ok) throw new Error('Gemini search settings could not be loaded.');
        return response.json();
      })
      .then((data) => setQuoteSearchEnabled(Boolean(data.quoteSearchEnabled)))
      .catch((requestError) => setSearchMessage(requestError.message))
      .finally(() => setConfigLoading(false));
  }, []);

  async function searchQuotes(event) {
    event.preventDefault();
    const searchTerm = query.trim();
    if (!searchTerm || searching) return;
    if (!quoteSearchEnabled) {
      setSearchResult(null);
      setSearchMessage('Add GEMINI_API_KEY to your server .env file to let Gemini search for quotes.');
      return;
    }

    setSearching(true);
    setSearchMessage('');
    setSearchResult(null);
    try {
      const response = await fetch('/api/quotes/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Gemini quote search is unavailable right now.');
      setSearchResult(data);
    } catch (requestError) {
      setSearchMessage(requestError.message || 'Gemini quote search is unavailable right now.');
    } finally {
      setSearching(false);
    }
  }

  return (
    <section className="wisdom-page section-wrap">
      <div className="wisdom-heading">
        <div className="section-kicker">WORDS TO KEEP CLOSE <span>✳</span></div>
        <h1>Timeless words.<br /><em>A little more room to breathe.</em></h1>
        <p>Reflections from the Bhagavad Gita and writers across time. Take what feels helpful; let the rest go.</p>
      </div>
      <form className="quote-search" onSubmit={searchQuotes}>
        <label className="sr-only" htmlFor="quote-search-input">Search Google for quotes</label>
        <span className="quote-search-icon" aria-hidden="true">⌕</span>
        <input id="quote-search-input" type="search" maxLength="120" value={query} onChange={(event) => { setQuery(event.target.value); setSearchResult(null); setSearchMessage(''); }} placeholder="Find a quote about hope, courage, or letting go…" />
        <button type="submit" disabled={configLoading || searching || !query.trim()}>{searching ? 'Searching…' : 'Find words'} <span aria-hidden="true">↗</span></button>
      </form>
      <p className="quote-search-note">Gemini searches Google for quotes and shows the sources it used.</p>
      {searchMessage && <div className="quote-search-message" role="status">{searchMessage}</div>}
      {searching && <p className="library-message" role="status">Finding words and checking sources…</p>}
      {searchResult && <section className="grounded-results" aria-label="Gemini quote search results">
        <div className="results-heading"><span>WORDS FOR YOUR MOMENT</span><span>Found with Gemini + Google Search</span></div>
        <div className="grounded-response">{searchResult.response}</div>
        {searchResult.sources?.length > 0 && <div className="grounded-sources"><span>EXPLORE THE SOURCES</span><div>{searchResult.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <span aria-hidden="true">↗</span></a>)}</div></div>}
      </section>}
      <div className="wisdom-library-heading"><span>THE DREAMSCAPE COLLECTION</span></div>
      {loading && <p className="library-message">Gathering a little wisdom…</p>}
      {error && <p className="library-message" role="alert">{error}</p>}
      {!loading && !error && <div className="wisdom-grid">
        {wisdom.map((item) => (
          <article className={`wisdom-card${item.kind === 'verse' ? ' wisdom-card-verse' : ''}`} key={item.id}>
            <div className="wisdom-card-top"><span>{item.kind === 'verse' ? 'BHAGAVAD GITA' : 'A WORD TO SIT WITH'}</span><span aria-hidden="true">{item.kind === 'verse' ? '❋' : '✳'}</span></div>
            <blockquote>{item.text}</blockquote>
            {item.translation && <p className="wisdom-translation">{item.translation}</p>}
            <p className="wisdom-attribution">{item.attribution}</p>
          </article>
        ))}
      </div>}
      <p className="wisdom-note">Gita renderings are brief, modern paraphrases for reflection—not definitive translations.</p>
    </section>
  );
}

export default QuotesSection;
