import React, { useState, useEffect } from 'react';
import './CrosswordGrid.css';
import crosswordData from './crosswordData'; // Import the crossword data
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../NavBar/Navbar';

let level = 0;

const generateInitialGrid = () => {
    const initialGrid = Array(22).fill(0).map(() => Array(25).fill(' '));
    crosswordData[level].forEach(({ answer, startx, starty, orientation }) => {
        let x = startx - 1;
        let y = starty - 1;

        for (let i = 0; i < answer.length; i++) {
            if (orientation === 'across') {
                initialGrid[y][x + i] = '';
            } else if (orientation === 'down') {
                initialGrid[y + i][x] = '';
            }
        }
    });
    return initialGrid;
};

const generateAnswerGrid = () => {
    const answerGrid = Array(22).fill(0).map(() => Array(25).fill(' '));
    crosswordData[level].forEach(({ answer, startx, starty, orientation }) => {
        let x = startx - 1;
        let y = starty - 1;

        for (let i = 0; i < answer.length; i++) {
            if (orientation === 'across') {
                answerGrid[y][x + i] = answer[i];
            } else if (orientation === 'down') {
                answerGrid[y + i][x] = answer[i];
            }
        }
    });
    return answerGrid;
};

const CrosswordGrid = () => {
    const [grid, setGrid] = useState(generateInitialGrid());
    const [hoveredHint, setHoveredHint] = useState('');
    const [hintPosition, setHintPosition] = useState({ top: 0, left: 0 });
    const [showWinMessage, setShowWinMessage] = useState(false);
    const [showLoseMessage, setShowLoseMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setGrid(generateInitialGrid());
        window.scrollTo(0, 0);  // Scroll to the top when the component is mounted
    }, []);

    const handleInputChange = (row, col, text) => {
        const newGrid = [...grid];
        newGrid[row][col] = text.toUpperCase();
        setGrid(newGrid);
    };

    const handleGenerate = () => {
        level = (level + 1) % crosswordData.length;
        setGrid(generateInitialGrid());
    };
    

    const handleVerify = async () => {
        const answerGrid = generateAnswerGrid();
        const isCorrect = JSON.stringify(grid) === JSON.stringify(answerGrid);
        if (isCorrect) {
            // Correct solution: Show win message and update points and challenge status
            setShowWinMessage(true);
    
            // Get user email from localStorage to identify user
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.email) {
                try {
                    // Send request to update points and mark challenge as completed
                    await updatePointsAndStatus(user.email, 2000);
                } catch (error) {
                    console.error("Error updating points and challenge status:", error.response?.data || error.message);
                }
            }
    
            setTimeout(() => {
                navigate('/', { state: { redirectedFromChallengeId: 1 } }); // Pass challengeId in state
            }, 2000);
        } else {
            setShowLoseMessage(true); // Show lose message if incorrect
        }
    };
    
     
    const updatePointsAndStatus = async (email, points) => {
        try {
            console.log('Sending POST request to update points and challenge status:', { email, points });
            const response = await axios.post("http://localhost:5000/api/users/updatePoints", {
                email,
                points,
                challengeId: 1 // Mark challenge ID 1 as completed
            });
    
            console.log("Points and challenge status updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating points and challenge status:", error.response?.data || error.message);
        }
    };
    
    

    const handleReset = () => {
        setGrid(generateInitialGrid());
    };

    const handleSolve = () => {
        const answerGrid = generateAnswerGrid();
        setGrid(answerGrid);
    };

    const closeMessage = () => {
        setShowWinMessage(false);
        setShowLoseMessage(false);
    };

    const renderGrid = () => (
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div key={colIndex} className="cellContainer">
                            {crosswordData[level].map((entry) => {
                                const { startx, starty, position } = entry;
                                if (rowIndex + 1 === starty && colIndex + 1 === startx) {
                                    return (
                                        <span
                                            key={`digit-${position}`}
                                            className="smallDigit"
                                            onMouseEnter={(e) => {
                                                setHoveredHint(entry.hint);
                                                const rect = e.target.getBoundingClientRect();
                                                setHintPosition({
                                                    top: rect.top + window.scrollY + 20,
                                                    left: rect.left + window.scrollX + 5,
                                                });
                                            }} 
                                            onMouseLeave={() => setHoveredHint('')}
                                        >
                                            {position}
                                        </span>
                                    );
                                }
                                return null;
                            })}
                            <input
                                type="text"
                                className={`cell ${grid[rowIndex][colIndex] === ' ' ? 'staticCell' : ''}`}
                                value={cell}
                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                maxLength={1}
                                disabled={grid[rowIndex][colIndex] === ' '}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <div className="container">
            <Navbar />
            <h2>Crossword Challenge</h2>
            {renderGrid()}
             {/* Add Navbar at the top */}
            <div className="buttonContainer">
                <button className="button" onClick={handleGenerate}>Generate</button>
                <button className="button" onClick={handleVerify}>Verify</button>
                <button className="button" onClick={handleReset}>Reset</button>
                <button className="button" onClick={handleSolve}>Solve</button>
            </div>

            {hoveredHint && (
                <div className="hintPopup" style={{ top: hintPosition.top, left: hintPosition.left }}>
                    <p>{hoveredHint}</p>
                </div>
            )}

            {showWinMessage && (
                <div className="win-message" onClick={closeMessage}>
                    Congratulations! You have earned 2000 points!
                </div>
            )}

            {showLoseMessage && (
                <div className="lose-message" onClick={closeMessage}>
                    Incorrect. Please try again.
                </div>
            )}
        </div>
    );
};

export default CrosswordGrid;
