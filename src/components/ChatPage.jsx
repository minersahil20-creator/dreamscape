import { useEffect, useRef, useState } from 'react';

const starters = ['I feel overwhelmed', 'I could use a little motivation', 'Help me slow down'];
const greeting = { role: 'assistant', content: 'Hi, I’m glad you’re here. You can share as much or as little as you like. What’s on your mind?' };

function ChatPage() {
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [chatMode, setChatMode] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isSending]);

  async function sendMessage(event) {
    event.preventDefault();
    const content = input.trim();
    if (!content || isSending) return;

    const nextMessages = [...messages, { role: 'user', content }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history: messages.slice(-8) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The conversation could not be reached. Please try again.');
      setMessages([...nextMessages, { role: 'assistant', content: data.response, crisis: data.crisis }]);
      setChatMode(data.mode);
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="chat-page">
      <div className="chat-heading">
        <div className="section-kicker">YOUR QUIET CORNER <span>✳</span></div>
        <h1>Let it out.<br /><em>We’re listening.</em></h1>
        <p>This is your space. Start anywhere, take your time.</p>
      </div>
      <div className="chat-panel-wrap">
        <div className="chat-teddy" aria-hidden="true">
          <span className="teddy-ear teddy-ear-left" />
          <span className="teddy-ear teddy-ear-right" />
          <span className="teddy-head">
            <i className="teddy-eye teddy-eye-left" />
            <i className="teddy-eye teddy-eye-right" />
            <i className="teddy-muzzle"><b /></i>
          </span>
          <span className="teddy-body"><i className="teddy-heart">♥</i></span>
          <span className="teddy-arm teddy-arm-left" />
          <span className="teddy-arm teddy-arm-right" />
          <span className="teddy-foot teddy-foot-left" />
          <span className="teddy-foot teddy-foot-right" />
        </div>
        <div className="chat-panel">
          <div className="chat-panel-header">
            <div className="companion-avatar" aria-hidden="true">d<span>✳</span></div>
            <div><strong>Your Dreamscape companion</strong><span><i className="live-dot" /> Here with you</span></div>
            <span className="chat-private">A gentle space</span>
          </div>
          <div className="message-list" aria-live="polite" aria-label="Conversation">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`message-row ${message.role === 'user' ? 'message-row-user' : ''}`}>
                {message.role === 'assistant' && <div className="message-avatar" aria-hidden="true">d</div>}
                <div className={`message-bubble ${message.role === 'user' ? 'message-user' : 'message-assistant'}${message.crisis ? ' message-crisis' : ''}`}>
                  {message.crisis && <strong className="crisis-label">Immediate support</strong>}
                  {message.content}
                </div>
              </div>
            ))}
            {isSending && <div className="message-row"><div className="message-avatar" aria-hidden="true">d</div><div className="message-bubble message-assistant typing-indicator" aria-label="Dreamscape is thinking"><i /><i /><i /></div></div>}
            {error && <p className="chat-error" role="alert">{error}</p>}
            <div ref={endRef} />
          </div>
          {messages.length === 1 && <div className="starter-prompts" aria-label="Conversation starters">{starters.map((starter) => <button key={starter} type="button" onClick={() => setInput(starter)}>{starter} <span aria-hidden="true">↗</span></button>)}</div>}
          <form className="chat-form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="chat-input">Write a message</label>
            <textarea id="chat-input" rows="1" maxLength="2000" placeholder="Write what’s on your mind…" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) sendMessage(event); }} disabled={isSending} />
            <button className="send-button" type="submit" disabled={isSending || !input.trim()} aria-label="Send message"><span aria-hidden="true">↑</span></button>
          </form>
          <div className="chat-footnote">{chatMode === 'ai' ? 'Gemini AI support is enabled. Messages are sent to Google Gemini and are not stored by Dreamscape.' : chatMode === 'guided' ? 'Guided support mode is active; Gemini is not configured. Your messages are not saved.' : 'A supportive companion, not professional care. Replies are guided unless Gemini is configured.'} <span>·</span> Press Enter to send</div>
        </div>
      </div>
      <p className="chat-safety-note">If you may hurt yourself or someone else, please go to your nearest emergency department or reach out to someone you trust now. This chat is not monitored.</p>
    </section>
  );
}

export default ChatPage;
