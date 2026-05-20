import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { API_URL, getSessionId } from '../lib/session.js';

const ChatContext = createContext(null);

const initialMessages = [
  {
    id: 'welcome',
    role: 'bot',
    text:
      "Yo ! Tokiniaina à l'appareil. On peut parler boulot, projets, IA ou juste discuter — vas-y.",
  },
];

const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `m-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const toApiRole = (role) => (role === 'bot' ? 'assistant' : 'user');

async function callLLM({ history, signal }) {
  const payload = {
    session_id: getSessionId(),
    messages: history
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: toApiRole(m.role), content: m.text })),
  };
  const res = await fetch(`${API_URL}/chat/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });
  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body?.detail) detail = body.detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
  const data = await res.json();
  return data.reply;
}

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(initialMessages);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const abortRef = useRef(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  const send = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg = { id: newId(), role: 'user', text: trimmed };

    let nextHistory;
    setMessages((m) => {
      nextHistory = [...m, userMsg];
      return nextHistory;
    });
    setIsTyping(true);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const reply = await callLLM({
        history: nextHistory,
        signal: abortRef.current.signal,
      });
      setMessages((m) => [...m, { id: newId(), role: 'bot', text: reply }]);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setMessages((m) => [
        ...m,
        {
          id: newId(),
          role: 'bot',
          text: `⚠️ Impossible de joindre l'assistant (${err.message}).\nÉcris à ttokiniainatoavina4@gmail.com pour un échange direct.`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping]);

  return (
    <ChatContext.Provider
      value={{ messages, send, isOpen, isTyping, open, close, toggle }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
