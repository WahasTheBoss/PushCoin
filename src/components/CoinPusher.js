import React, { useState } from 'react';
import TonWeb from 'tonweb';

// Initialize TonWeb
const providerUrl = 'https://toncenter.com/api/v2/jsonRPC';  // URL of the TON network provider
const apiKey = 'your-api-key';  // Replace with your actual API key from TON provider
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, { apiKey }));

const CoinPusher = () => {
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');  // User wallet address

    // Wallet verification: User needs to send 0.5 TON
    const verifyWallet = async () => {
        const verificationAmount = TonWeb.utils.toNano(0.5); // Convert 0.5 TON to nanoTON

        // Fetch transaction history for the user's wallet
        const transactions = await tonweb.provider.getTransactions(walletAddress, { limit: 10 });
        
        // Check if the user has sent 0.5 TON for verification
        const verified = transactions.some(tx => tx.in_msg.value >= verificationAmount);
        
        if (verified) {
            console.log("Wallet verified!");
            // Continue with airdrop logic after verification
            await rewardUserWithTokens();
        } else {
            console.error("Wallet not verified.");
        }
    };

    // Reward user with COINPSH tokens using TonWeb
    const rewardUserWithTokens = async () => {
        try {
            const wallet = tonweb.wallet.create({
                publicKey: 'your-public-key-here'  // Replace with your actual public key
            });

            await wallet.send({
                toAddress: walletAddress,  // Address of the user
                amount: TonWeb.utils.toNano(1),  // Send 1 COINPSH token (modify amount as needed)
            });
            console.log("Tokens distributed to user!");
        } catch (error) {
            console.error("Error distributing tokens: ", error);
        }
    };

    // Simulate dropping a coin
    const dropCoin = () => {
        const earnedPoints = Math.floor(Math.random() * 10) + 1; // Random points between 1 and 10
        setScore(score + earnedPoints);
        setCoins(coins + 1); // Increase coin count

        // Perform wallet verification after dropping coin
        verifyWallet();
    };

    return (
        <div>
            <h1>Welcome to PUSHCOIN!</h1>
            <p>Drop a coin and earn points!</p>
            <input
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
            />
            <button onClick={dropCoin}>Drop Coin</button>
            <p>Current Score: {score}</p>
            <p>Coins Dropped: {coins}</p>
        </div>
    );
};

export default CoinPusher;

