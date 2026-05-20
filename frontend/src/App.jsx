import { Routes, Route } from 'react-router-dom';
import TopAppBar from './components/TopAppBar.jsx';
import BottomNav from './components/BottomNav.jsx';
import VisitTracker from './components/VisitTracker.jsx';
import Trainer from './pages/Trainer.jsx';
import Pokedex from './pages/Pokedex.jsx';
import Skills from './pages/Skills.jsx';
import Contact from './pages/Contact.jsx';
import Chat from './pages/Chat.jsx';
import { ChatProvider } from './chat/ChatContext.jsx';
import FloatingChatButton from './chat/FloatingChatButton.jsx';

export default function App() {
  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col">
        <VisitTracker />
        <TopAppBar />
        <main className="flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-8">
          <Routes>
            <Route path="/" element={<Trainer />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
        <BottomNav />
        <FloatingChatButton />
      </div>
    </ChatProvider>
  );
}
