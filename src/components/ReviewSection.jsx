import { useState } from 'react';

function ReviewSection() {
  const [reflections, setReflections] = useState([]);
  const [name, setName] = useState('');
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function shareReflection(event) {
    event.preventDefault();
    const text = reflection.trim();
    if (!text) return;
    setReflections((current) => [{ id: Date.now(), name: name.trim() || 'Anonymous', text }, ...current]);
    setName('');
    setReflection('');
    setSubmitted(true);
  }

  return (
    <section className="reflection-page section-wrap">
      <div className="reflection-heading">
        <div className="section-kicker">A SPACE FOR YOUR WORDS <span>✳</span></div>
        <h1>Every journey<br />is <em>its own.</em></h1>
        <p>If you’d like, leave a small reflection about what helps you find your footing. You can use a first name or stay anonymous.</p>
      </div>
      <div className="reflection-layout">
        <form className="reflection-form" onSubmit={shareReflection}>
          <h2>Leave a reflection</h2>
          <label htmlFor="reflection-name">Name <span>(optional)</span></label>
          <input id="reflection-name" value={name} onChange={(event) => setName(event.target.value)} maxLength="50" placeholder="First name or anonymous" />
          <label htmlFor="reflection-text">Your words</label>
          <textarea id="reflection-text" value={reflection} onChange={(event) => setReflection(event.target.value)} maxLength="500" rows="5" required placeholder="What would you like to share?" />
          <p className="privacy-note">Your reflection only appears on this page and isn’t saved after you leave.</p>
          <button className="button button-primary" type="submit">Share gently <span aria-hidden="true">↗</span></button>
          {submitted && <p className="submit-confirmation" role="status">Thank you for sharing a little of your story.</p>}
        </form>
        <div className="reflection-list" aria-live="polite">
          <div className="reflection-list-heading"><h2>Shared reflections</h2><span>{reflections.length.toString().padStart(2, '0')}</span></div>
          {reflections.length === 0 ? <div className="empty-reflections"><span aria-hidden="true">❋</span><p>This space is quiet for now.<br />Your words can be the first, if you’d like.</p></div> : reflections.map((item) => (
            <article className="reflection-card" key={item.id}><span className="reflection-quote-mark" aria-hidden="true">“</span><p>{item.text}</p><span className="reflection-name">— {item.name}</span></article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
