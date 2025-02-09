import React from 'react';
import ReactDOM from 'react-dom/client';
import '../lib/global.css';
import { MusicPlayer } from '../lib/MusicPlayer/MusicPlayer';

function App() {
  return (
    <div>
      <h1>Component Demo</h1>
      <MusicPlayer
        src="../static/Example.mp3"
        title="Song Title"
        artist="Artist Name"
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
