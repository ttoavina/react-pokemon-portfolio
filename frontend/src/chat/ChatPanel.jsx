import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useChat } from './ChatContext.jsx';

const suggestions = [
  { label: 'Projets', text: 'Parle-moi de ses projets récents', icon: 'menu_book' },
  { label: 'Skills', text: 'Quelles sont ses spécialités ?', icon: 'military_tech' },
  { label: 'Dispo', text: 'Est-il disponible pour une mission ?', icon: 'event_available' },
  { label: 'Contact', text: 'Comment le contacter directement ?', icon: 'mail' },
];

export default function ChatPanel({ withBack = false, onClose }) {
  const { messages, send, isTyping } = useChat();
  const [input, setInput] = useState('');
  const [atBottom, setAtBottom] = useState(true);
  const listRef = useRef(null);
  const isEmpty = messages.length <= 1 && !isTyping;

  useEffect(() => {
    if (!listRef.current || !atBottom) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isTyping, atBottom]);

  const onListScroll = () => {
    const el = listRef.current;
    if (!el) return;
    setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 60);
  };

  const scrollToBottom = () => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
    setAtBottom(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    send(input);
    setInput('');
    setAtBottom(true);
  };

  const onSuggest = (text) => {
    if (isTyping) return;
    send(text);
  };

  return (
    <div className="bg-surface border-4 border-on-surface shadow-pixel-lg flex flex-col h-full overflow-hidden">
      <header className="bg-primary text-on-primary border-b-4 border-on-surface px-3 py-2 flex items-center gap-2 shrink-0">
        {withBack && (
          <Link
            to="/contact"
            aria-label="Retour"
            className="bg-on-surface text-on-primary border-2 border-on-surface w-9 h-9 flex items-center justify-center pixel-press-sm shadow-pixel-sm shrink-0"
          >
            <Icon name="arrow_back" />
          </Link>
        )}
        <div className="w-9 h-9 rounded-lg border-2 border-on-surface bg-primary-fixed overflow-hidden shrink-0">
          <img src="/avatar.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 leading-tight min-w-0">
          <div className="font-mono-pixel font-bold text-label-md truncate">TOKINIAINA</div>
          <div className="font-mono-pixel text-label-sm opacity-80 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4CAF50] border border-on-surface" />
            {isTyping ? 'TYPING…' : 'ONLINE'}
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="bg-on-surface text-on-primary border-2 border-on-surface w-9 h-9 flex items-center justify-center pixel-press-sm shadow-pixel-sm shrink-0"
          >
            <Icon name="close" />
          </button>
        )}
      </header>

      <div className="flex-1 min-h-0 relative bg-surface-container-low">
        {isEmpty ? (
          <EmptyState welcome={messages[0]} onPick={onSuggest} />
        ) : (
          <div
            ref={listRef}
            onScroll={onListScroll}
            className="absolute inset-0 overflow-y-auto p-4 space-y-3 rpg-grid"
          >
            {messages.map((m) => (
              <Bubble key={m.id} msg={m} />
            ))}
            {isTyping && <BotTyping />}
          </div>
        )}

        {!isEmpty && !atBottom && (
          <button
            type="button"
            onClick={scrollToBottom}
            aria-label="Aller au dernier message"
            className="absolute bottom-3 right-3 bg-tertiary text-on-tertiary border-2 border-on-surface w-10 h-10 rounded-full shadow-pixel-sm pixel-press-sm flex items-center justify-center z-10"
          >
            <Icon name="arrow_downward" />
          </button>
        )}
      </div>

      <form
        onSubmit={submit}
        className="border-t-4 border-on-surface p-3 flex gap-2 bg-surface-container shrink-0"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="TYPE A MESSAGE..."
          className="flex-1 min-w-0 bg-surface border-2 border-on-surface p-3 font-mono-pixel text-label-md focus:outline-none focus:bg-surface-container-lowest placeholder:text-outline-variant/60"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="bg-primary text-on-primary border-2 border-on-surface px-4 shadow-pixel-sm pixel-press-sm flex items-center gap-1 disabled:opacity-40 shrink-0"
        >
          <Icon name="send" />
        </button>
      </form>
    </div>
  );
}

function EmptyState({ welcome, onPick }) {
  return (
    <div className="absolute inset-0 overflow-y-auto p-6 flex flex-col items-center justify-center text-center rpg-grid">
      <div className="w-20 h-20 rounded-2xl border-4 border-on-surface bg-primary-fixed overflow-hidden shadow-pixel mb-4">
        <img src="/avatar.webp" alt="" className="w-full h-full object-cover" />
      </div>
      <p className="font-mono-pixel text-label-md text-primary mb-2">TOKINIAINA</p>
      {welcome && (
        <p className="text-body-md text-on-surface max-w-md leading-relaxed">{welcome.text}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 w-full max-w-md">
        {suggestions.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onPick(s.text)}
            className="bg-surface border-2 border-on-surface p-3 shadow-pixel-sm pixel-press-sm text-left flex items-start gap-2 hover:bg-secondary-container transition-colors"
          >
            <Icon name={s.icon} filled className="text-primary text-xl shrink-0 mt-0.5" />
            <div className="min-w-0 leading-tight">
              <div className="font-mono-pixel text-label-md text-on-surface">{s.label}</div>
              <div className="text-label-sm text-on-surface-variant truncate">{s.text}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Bubble({ msg }) {
  const isBot = msg.role === 'bot';
  return (
    <div className={`flex gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div
        className={`w-9 h-9 shrink-0 border-2 border-on-surface overflow-hidden flex items-center justify-center ${
          isBot ? 'bg-primary-fixed' : 'bg-secondary-container'
        }`}
      >
        {isBot ? (
          <img src="/avatar.webp" alt="" className="w-full h-full object-cover" />
        ) : (
          <Icon name="person" filled className="text-on-secondary-container text-base" />
        )}
      </div>
      <div
        className={`max-w-[80%] border-2 border-on-surface p-3 shadow-pixel-sm text-body-md leading-relaxed whitespace-pre-line ${
          isBot ? 'bg-surface text-on-surface' : 'bg-primary text-on-primary'
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

function BotTyping() {
  return (
    <div className="flex gap-2">
      <div className="w-9 h-9 shrink-0 border-2 border-on-surface bg-primary-fixed overflow-hidden">
        <img src="/avatar.webp" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="bg-surface border-2 border-on-surface px-3 py-2 shadow-pixel-sm flex items-end gap-1">
        <span
          className="inline-block w-2 h-2 bg-on-surface animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="inline-block w-2 h-2 bg-on-surface animate-bounce"
          style={{ animationDelay: '120ms' }}
        />
        <span
          className="inline-block w-2 h-2 bg-on-surface animate-bounce"
          style={{ animationDelay: '240ms' }}
        />
      </div>
    </div>
  );
}
