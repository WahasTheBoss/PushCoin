import React from 'react'; // Ensure this is only here once
import CoinPusher from './components/CoinPusher';
import './App.css'; // CSS file for styling

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>PUSHCOIN - Coin Pusher Game</h1>
        <p>Drop coins to earn PUSHcoin POINTS and enjoy the game!</p>
      </header>
      <main className="app-main">
        <CoinPusher />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 PUSHCOIN. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

