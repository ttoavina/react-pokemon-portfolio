import { useEffect } from 'react';
import ChatPanel from '../chat/ChatPanel.jsx';

export default function Chat() {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="-my-8 -mx-margin-mobile md:-mx-margin-desktop h-[calc(100dvh-160px)] px-margin-mobile md:px-margin-desktop py-3">
      <div className="h-full max-w-container-max mx-auto">
        <ChatPanel withBack />
      </div>
    </div>
  );
}
