import React, { useState, useEffect } from 'react';
import NavBar from "../NavBar/Navbar";
import './MiloChatbot.css'; // Import CSS for styling

function MiloChatbot() {
    const [userInput, setUserInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [conversationState, setConversationState] = useState({
        awaitingInput: null,
        tripDetails: {
            startingCity: '',
            destinationCity: '',
            modeOfTransport: '',
            days: 0,
            budget: 0,
        },
    });
    const [initialMessageShown, setInitialMessageShown] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (initialMessageShown) {
            const initialMessages = [
                { sender: 'bot', message: "Hi, I'm Milo, your personal travel assistant! Let's start planning your trip." },
            ];
            setConversation(initialMessages);
        }
    }, [initialMessageShown]);

    const handleChat = async (e) => {
        e.preventDefault();
        try {
            let response;
            const { awaitingInput, tripDetails } = conversationState;

            // User input message added to conversation
            setConversation((prev) => [...prev, { sender: 'user', message: userInput }]);

            if (awaitingInput) {
                const updatedTripDetails = { ...tripDetails, [awaitingInput]: userInput };
                setConversationState({ ...conversationState, tripDetails: updatedTripDetails, awaitingInput: null });
                setUserInput('');

                const nextInput = getNextDetail(updatedTripDetails);
                if (nextInput) {
                    const botMessage = `Please provide your ${nextInput}.`;
                    setConversation((prev) => [...prev, { sender: 'bot', message: botMessage }]);
                } else {
                    response = await fetch('http://127.0.0.1:5000/generate-itinerary', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedTripDetails),
                    });
                    const data = await response.json();
                    const botMessage = data.response || 'Your itinerary has been generated!';
                    setConversation((prev) => [...prev, { sender: 'bot', message: botMessage }]);
                }
                return;
            }

            if (userInput.includes("generate itinerary")) {
                const nextInput = getNextDetail(tripDetails);
                if (nextInput) {
                    setConversationState({ ...conversationState, awaitingInput: nextInput });
                    const botMessage = `Please provide your ${nextInput}.`;
                    setConversation((prev) => [...prev, { sender: 'bot', message: botMessage }]);
                }
            } else {
                setIsTyping(true); // Set typing state to true
                response = await fetch('http://127.0.0.1:5000/MiloChatbot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_input: userInput }),
                });
                const data = await response.json();
                const botMessage = data.response || 'I am here to assist you!';
                setConversation((prev) => [
                    ...prev,
                    { sender: 'bot', message: botMessage },
                ]);
                setIsTyping(false); // Set typing state to false after response
            }

            setUserInput('');
        } catch (error) {
            console.error('Error communicating with the chatbot:', error);
            setConversation((prev) => [...prev, { sender: 'bot', message: 'Sorry, there was an error. Please try again.' }]);
        }
    };

    const getNextDetail = (details) => {
        if (!details.startingCity) return 'starting city';
        if (!details.destinationCity) return 'destination city';
        if (!details.modeOfTransport) return 'mode of transport';
        if (!details.days) return 'number of days';
        if (!details.budget) return 'budget';
        return null;
    };

    return (
        <div>
            <NavBar />
            <div className="chat-container">
                <div className="chatbox" style={initialMessageShown ? { transform: 'translateY(100px)' } : {}}>
                    {/* Initial Message Displayed on Screen */}
                    {initialMessageShown && (
                        <div className="initial-message">
                            <h1 className="initial-message-title">Welcome to Voyaige!</h1>
                            <h4 className="initial-message-subtitle">Type your message below to start the chat.</h4>
                        </div>
                    )}

                    {/* Chat Messages */}
                    {conversation.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                            {msg.sender === 'user' && <div className="sender-label">You</div>}
                            {msg.sender === 'bot' && <div className="sender-label">Milo</div>}
                            <p>{msg.message}</p>
                            {msg.sender === 'bot' && isTyping && <span className="typing">...</span>} {/* Typing Indicator */}
                        </div>
                    ))}
                </div>

                {/* User Input */}
                <form onSubmit={(e) => { handleChat(e); setInitialMessageShown(false); }} className="chat-input">
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onFocus={() => setInitialMessageShown(false)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default MiloChatbot;
