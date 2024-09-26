import React, { useState } from 'react';

const CoinPusher = () => {
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState(0);
    const [adsWatched, setAdsWatched] = useState(0);

    const dropCoin = async () => {
        // Determine the multiplier based on ads watched
        let multiplier = 1;
        if (adsWatched === 1) multiplier = 2;
        else if (adsWatched === 2) multiplier = 4;
        else if (adsWatched === 3) multiplier = 6;
        else if (adsWatched >= 4) multiplier = 8;

        // Simulate dropping a coin and earning points
        const earnedPoints = Math.floor(Math.random() * 10) + 1; // Random points between 1 and 10
        setScore(score + (earnedPoints * multiplier));
        setCoins(coins + 1); // Increase coin count
    };

    const watchAd = () => {
        setAdsWatched(adsWatched + 1);
        // Simulate watching an ad (you might want to add more logic here)
        // e.g., show an ad and then allow dropping a coin
    };

    return (
        <div className="coin-pusher">
            <h2>Coin Pusher Game</h2>
            <p>Watch ads to increase your rewards!</p>
            <button onClick={watchAd}>Watch Ad</button>
            <button onClick={dropCoin}>Drop Coin</button>
            <p>Current Score: {score}</p>
            <p>Coins Dropped: {coins}</p>
            <p>Ads Watched: {adsWatched}</p>
        </div>
    );
};

export default CoinPusher;

