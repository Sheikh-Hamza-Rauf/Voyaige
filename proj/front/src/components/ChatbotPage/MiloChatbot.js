import React, { useState } from 'react';

const MiloChatbot = () => {
    const [userInput, setUserInput] = useState("");
    const [chatbotResponse, setChatbotResponse] = useState("");

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/MiloChatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_input: userInput,
                }),
            });

            const data = await response.json();
            if (data.response) {
                setChatbotResponse(data.response);
            } else {
                setChatbotResponse('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setChatbotResponse('Error occurred while contacting the server.');
        }
    };

    return (
        <div className="chatbot">
            <h2>Welcome to Milo, Your Travel Assistant</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Ask me anything about your trip..."
                />
                <button type="submit">Ask</button>
            </form>
            <div>
                <h3>Response:</h3>
                <p>{chatbotResponse}</p>
            </div>
        </div>
    );
};

export default MiloChatbot;
