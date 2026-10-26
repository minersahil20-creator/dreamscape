import { useRef } from 'react';
import { Link } from 'react-router-dom';

const practices = [
  { number: '01', title: 'Put it into words', text: 'A quiet, judgment-free conversation can make a hard moment feel a little less tangled.', icon: '✳' },
  { number: '02', title: 'Find a small next step', text: 'Not a perfect plan. Just one kind, manageable thing you can do for yourself today.', icon: '↗' },
  { number: '03', title: 'Keep what resonates', text: 'Explore reflections from timeless stories and writers. Take what helps, leave the rest.', icon: '❋' },
];

const stars = [
  [6, 14, 2, .2], [13, 26, 3, .4], [21, 10, 2, .25], [27, 39, 2, .5],
  [34, 18, 3, .3], [39, 8, 2, .2], [45, 32, 2, .55], [52, 15, 4, .35],
  [57, 43, 2, .6], [63, 8, 2, .25], [68, 24, 3, .45], [76, 12, 2, .3],
  [83, 30, 4, .5], [92, 14, 2, .25], [97, 41, 2, .4], [8, 55, 3, .55],
  [17, 68, 2, .25], [25, 52, 2, .4], [32, 77, 3, .3], [42, 61, 2, .55],
  [48, 83, 2, .35], [58, 70, 3, .45], [66, 57, 2, .25], [73, 82, 3, .6],
  [81, 66, 2, .35], [90, 77, 3, .5], [96, 57, 2, .25], [4, 88, 2, .35],
  [37, 28, 1, .2], [71, 39, 1, .25], [87, 48, 1, .2], [19, 46, 1, .25],
];

function HomePage() {
  const starFieldRef = useRef(null);

  function moveStars(event) {
    if (event.pointerType === 'touch' || !starFieldRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    starFieldRef.current.querySelectorAll('[data-star-depth]').forEach((star) => {
      const depth = Number(star.dataset.starDepth);
      star.style.transform = `translate3d(${pointerX * depth * -42}px, ${pointerY * depth * -34}px, 0)`;
    });
  }

  function resetStars() {
    starFieldRef.current?.querySelectorAll('[data-star-depth]').forEach((star) => {
      star.style.transform = 'translate3d(0, 0, 0)';
    });
  }

  return (
    <>
      <section className="hero hero-cosmos" onPointerMove={moveStars} onPointerLeave={resetStars}>
        <div className="cosmos-stars" ref={starFieldRef} aria-hidden="true">
          {stars.map(([x, y, size, depth], index) => (
            <span
              className={`cosmos-star${size > 2 ? ' cosmos-star-bright' : ''}`}
              data-star-depth={depth}
              key={`${x}-${y}`}
              style={{
                '--star-x': `${x}%`,
                '--star-y': `${y}%`,
                '--star-size': `${size}px`,
                '--star-delay': `${(index % 9) * -0.43}s`,
                '--star-drift-x': `${((index * 17) % 81) - 40}px`,
                '--star-drift-y': `${((index * 23) % 81) - 40}px`,
                '--star-speed': `${4 + (index % 5)}s`,
              }}
            />
          ))}
          <span className="shooting-star shooting-star-one" />
          <span className="shooting-star shooting-star-two" />
          <span className="shooting-star shooting-star-three" />
          <svg className="constellation-lines" viewBox="0 0 500 330" preserveAspectRatio="none">
            <path d="M72 238 143 174 208 205 258 112 334 146 407 72" />
            <path d="M208 205 228 279 306 258 334 146" />
            <path d="M258 112 224 54" />
          </svg>
          <span className="cosmos-halo cosmos-halo-one" />
          <span className="cosmos-halo cosmos-halo-two" />
          <span className="cosmos-horizon" />
        </div>

        <div className="cosmos-copy">
          <span className="eyebrow"><span className="live-dot" /> A softer place to land</span>
          <h1>You don't have<br />to <span>figure it all out</span><br />right now.</h1>
          <p className="hero-description">Some days are heavy. Take a breath, share what's on your mind, and find a little room to see things differently.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/chat">Come as you are <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" to="/quotes">A moment of wisdom <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-trust"><span className="trust-symbol" aria-hidden="true">♡</span><span>No pressure. No judgment. Just a place to begin.</span></div>
        </div>
        <div className="cosmos-note"><span className="cosmos-note-star">✳</span><span>A little light is still light.</span></div>
        <a className="cosmos-scroll" href="#a-note-for-you"><span />Scroll gently</a>
      </section>

      <div className="home-lower-cosmos">
        <div className="cosmos-stars home-lower-stars" aria-hidden="true">
          {Array.from({ length: 3 }, (_, band) => stars.map(([x, y, size, depth], index) => (
              <span
                className={`cosmos-star${size > 2 ? ' cosmos-star-bright' : ''}`}
                key={`lower-${band}-${x}-${y}`}
                style={{
                  '--star-x': `${(x + band * 13) % 100}%`,
                  '--star-y': `${(band * 100 + y) / 3}%`,
                  '--star-size': `${size}px`,
                  '--star-delay': `${(index % 9) * -0.43}s`,
                  '--star-drift-x': `${((index * 17) % 81) - 40}px`,
                  '--star-drift-y': `${((index * 23) % 81) - 40}px`,
                  '--star-speed': `${4 + (index % 5)}s`,
                  '--star-depth': depth,
                }}
              />
            )))}
          <span className="shooting-star shooting-star-one" />
          <span className="shooting-star shooting-star-two" />
          <span className="shooting-star shooting-star-three" />
        </div>

        <section className="intro-section section-wrap" id="a-note-for-you">
          <div className="section-kicker">A NOTE FOR YOU <span>✳</span></div>
          <div className="intro-content">
            <h2>There is no right way<br />to feel <em>better.</em></h2>
            <div className="intro-aside">
              <p>Healing isn't a straight line, and you don't need all the answers to take the next small step. Dreamscape is here to help you make space for what you're feeling—with gentle conversation, grounding ideas, and words worth sitting with.</p>
              <Link to="/chat" className="underlined-link">Find your starting point <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <section className="how-section section-wrap">
          <div className="section-heading">
            <div><div className="section-kicker">A GENTLER WAY THROUGH <span>✳</span></div><h2>Start wherever<br />you are.</h2></div>
            <p>Small moments of care count, too.<br />There is no need to rush.</p>
          </div>
          <div className="practice-grid">
            {practices.map((practice) => (
              <article className="practice-card" key={practice.number}>
                <div className="practice-card-top"><span>{practice.number}</span><span className="practice-icon" aria-hidden="true">{practice.icon}</span></div>
                <h3>{practice.title}</h3>
                <p>{practice.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-quote">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>You are allowed to take this one breath at a time.</blockquote>
          <p>A reminder from Dreamscape</p>
          <Link className="quiet-link" to="/quotes">Read a little more <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="closing-cta section-wrap">
          <div><div className="section-kicker">WHEN YOU'RE READY <span>✳</span></div><h2>This moment can be<br />your <em>beginning.</em></h2></div>
          <Link className="button button-dark" to="/chat">Start a conversation <span aria-hidden="true">↗</span></Link>
        </section>
      </div>
    </>
  );
}

export default HomePage;
