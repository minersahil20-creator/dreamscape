import { useEffect, useState } from 'react';

function QuotesSection() {
  const [wisdom, setWisdom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  async function searchQuotes(event) {
    event.preventDefault();
    const searchTerm = query.trim();
    if (!searchTerm || searching) return;

    setSearching(true);
    setSearchMessage('');
    setSearchResult(null);
    try {
      const response = await fetch('/api/quotes/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm, offset: 0 }),
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

  const wikiquoteUrl = query.trim()
    ? `https://en.wikiquote.org/w/index.php?search=${encodeURIComponent(query.trim())}`
    : 'https://en.wikiquote.org';

  return (
    <section className="wisdom-page section-wrap">
      <div className="wisdom-heading">
        <div className="section-kicker">WORDS TO KEEP CLOSE <span>✳</span></div>
        <h1>Timeless words.<br /><em>A little more room to breathe.</em></h1>
        <p>Reflections from the Bhagavad Gita and writers across time. Take what feels helpful; let the rest go.</p>
      </div>
      <form className="quote-search" onSubmit={searchQuotes}>
        <label className="sr-only" htmlFor="quote-search-input">Search sourced quotes and reflections</label>
        <span className="quote-search-icon" aria-hidden="true">⌕</span>
        <input
          id="quote-search-input"
          type="search"
          maxLength="120"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setSearchResult(null); setSearchMessage(''); }}
          placeholder="Find a quote about hope, courage, or letting go…"
        />
        <button type="submit" disabled={searching || !query.trim()}>
          {searching ? 'Searching…' : 'Find words'} <span aria-hidden="true">↗</span>
        </button>
      </form>
      <p className="quote-search-note">
        Search Gemini and Wikiquote for sourced words. If the services are unavailable, your Dreamscape collection is still searchable.
      </p>

      {/* Wikiquote redirect — shown as soon as results appear */}
      {searchResult && (
        <div className="wikiquote-redirect">
          <span>Want even more quotes?</span>
          <a
            href={wikiquoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wikiquote-redirect-link"
          >
            Browse all results on Wikiquote <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}

      {searchMessage && <div className="quote-search-message" role="status">{searchMessage}</div>}
      {searching && <p className="library-message" role="status">Finding words and checking sources…</p>}
      {searchResult && <section className="grounded-results" aria-label="Quote search results">
        <div className="results-heading"><span>WORDS FOR YOUR MOMENT</span><span>{searchResult.mode === 'library' ? 'Dreamscape collection' : searchResult.mode === 'wikiquote' ? 'Sourced from Wikiquote' : 'Found with Gemini + Google Search'}</span></div>
        {searchResult.notice && <p className="quote-search-message">{searchResult.notice}</p>}
        {searchResult.quotes?.length > 0 && <div className="wisdom-grid wikiquote-grid">
          {searchResult.quotes.map((quote) => (
            <article className="wisdom-card wikiquote-card" key={`${quote.sourceUrl}-${quote.text}`}>
              <div className="wisdom-card-top"><span>WIKIQUOTE · {quote.sourceTitle}</span><span aria-hidden="true">✳</span></div>
              <blockquote>{quote.text}</blockquote>
              <p className="wisdom-attribution">{quote.attribution}</p>
              <a className="wikiquote-source" href={quote.sourceUrl} target="_blank" rel="noopener noreferrer">View source <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>}
        {searchResult.response && <div className="grounded-response">{searchResult.response}</div>}
        {searchResult.sources?.length > 0 && <div className="grounded-sources"><span>EXPLORE THE SOURCES</span><div>{searchResult.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <span aria-hidden="true">↗</span></a>)}</div></div>}

        {/* Bottom Wikiquote link inside results panel */}
        <div className="wikiquote-redirect wikiquote-redirect--bottom">
          <a
            href={wikiquoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wikiquote-redirect-link"
          >
            Explore more on Wikiquote <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>}
      <div className="wisdom-library-heading"><span>THE DREAMSCAPE COLLECTION</span></div>
      {loading && <p className="library-message">Gathering a little wisdom…</p>}
      {error && <p className="library-message" role="alert">{error}</p>}
      {!loading && !error && <div className="wisdom-grid">
        {wisdom.map((item) => (
          <article className={`wisdom-card${item.kind === 'verse' ? ' wisdom-card-verse' : ''}${item.kind === 'inspired' ? ' wisdom-card-inspired' : ''}`} key={item.id}>
            <div className="wisdom-card-top"><span>{item.kind === 'verse' ? item.collection || 'BHAGAVAD GITA' : item.kind === 'inspired' ? 'INSPIRED REFLECTION' : 'A WORD TO SIT WITH'}</span><span aria-hidden="true">{item.kind === 'verse' ? '❋' : item.kind === 'inspired' ? '◌' : '✳'}</span></div>
            <blockquote>{item.text}</blockquote>
            {item.translation && <p className="wisdom-translation">{item.translation}</p>}
            <p className="wisdom-attribution">{item.attribution}</p>
          </article>
        ))}
      </div>}
      <p className="wisdom-note">Scriptural cards are modern paraphrases or reflections, not definitive translations. Author-inspired cards are original reflections, not quotations from those writers. Search quotations link to their Wikiquote source pages.</p>
    </section>
  );
}

export default QuotesSection;
