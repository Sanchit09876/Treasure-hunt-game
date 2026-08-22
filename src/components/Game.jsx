import React from "react";
import { useState } from "react";
import CardRow from "./CardRow";

import { generateRowCards } from "../utils/gameLogic";
import difficultyConfig from "../data/difficultyConfig";


function Game() {
    const [balance, setBalance] = useState(100);
    const [betAmount, setBetAmount] = useState(0);
    const [difficulty, setDifficulty] = useState("easy");
    const [gameStatus, setGameStatus] = useState("idle");
    const [currentRow, setCurrentRow] = useState(0);
    const [currentMultiplier, setCurrentMultiplier] = useState(1);
    const [rows, setRows] = useState([]);

    function startGame() {
        setBalance(balance - betAmount);
        setCurrentRow(0);
        setCurrentMultiplier(1);
        setGameStatus("playing");

        const newRows = Array.from({ length: 4 }, (_, i) => {
            return { cards: generateRowCards(6, difficultyConfig[difficulty].skull) };
        });
        setRows(newRows);
    }

    return <div>
        <button onClick={startGame}>Start Game</button>
        {console.log(rows)}

        {rows.map((row, index) => {
            return <CardRow key={index} cards={row.cards} />;
        })}
    </div>;
}

export default Game;
