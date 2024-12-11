import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/Navbar";
import "./MiloChatbot.css";

const MiloChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  const apiBaseURL = "http://127.0.0.1:5001/";

  useEffect(() => {
    const initialMessages = [
      { sender: "bot", text: "Hi, I'm Milo, your personal travel assistant! Let's start planning your trip." },
    ];
    setMessages(initialMessages);
  }, []);

  const handleUserMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setHistory([userMessage, ...history]);
    setInput("");
    setWelcomeVisible(false);
    setIsTyping(true);
  
    let endpoint = "/MiloChatbot";
    let payload = { user_input: userMessage };
  
    if (userMessage.toLowerCase().includes("generate itinerary") || userMessage.toLowerCase().includes("plan a trip")) {
      const userInputParts = userMessage.split(" ");
      const startingCity = userInputParts.includes("from")
        ? userInputParts[userInputParts.indexOf("from") + 1]
        : "Islamabad";
      const destinationCity = userInputParts.includes("to")
        ? userInputParts[userInputParts.indexOf("to") + 1]
        : "Lahore";
      const daysMatch = userMessage.match(/(\d+)\s+days/);
      const days = daysMatch ? parseInt(daysMatch[1], 10) : 3;
      const modeOfTransportMatch = userMessage.match(/by\s+(\w+)/);
      const modeOfTransport = modeOfTransportMatch
        ? modeOfTransportMatch[1].toLowerCase()
        : "bus";
      const budgetMatch = userMessage.match(/budget\s+(\d+)/);
      const budget = budgetMatch ? parseInt(budgetMatch[1], 10) : 50000;
  
      endpoint = "/generate-itinerary";
      payload = {
        user_input: userMessage,
        starting_city: startingCity,
        destination_city: destinationCity,
        days,
        mode_of_transport: modeOfTransport,
        budget,
      };
    } else if (userMessage.toLowerCase().includes("tell me about", "what is", "describe", "give details on", "wheres")) {
      endpoint = "/retrieve-details";
    } else if (userMessage.toLowerCase().includes("top") || userMessage.toLowerCase().includes("best")) {
      const match = userMessage.match(/top\s+(\d+)?\s*(hotels|restaurants|attractions|airbnbs?)\s+in\s+([\w\s]+)/i);
      if (match) {
        const numRecommendations = parseInt(match[1], 10) || 5;
        const category = match[2].toLowerCase();
        const city = match[3].trim().toLowerCase();
  
        endpoint = "/retrieve-top-items";
        payload = {
          user_input: userMessage,
          num_recommendations: numRecommendations,
          category,
          city,
        };
      } else {
        setMessages((prev) => [...prev, { sender: "milo", text: "Please specify what type of top information you need (e.g., 'top 5 hotels in Lahore')." }]);
        setIsTyping(false);
        return;
      }
    } else if (userMessage.toLowerCase().includes("compare")) {
      endpoint = "/compare-two-options";
    }
  
    try {
      const response = await fetch(`${apiBaseURL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
  
      let botResponse;
  
      if (endpoint === "/retrieve-details" && data.result) {
        botResponse = data.result; // Handle "tell me about" queries
      } else if (endpoint === "/retrieve-top-items" && data.result) {
        botResponse = data.result; // Handle "top items" queries
      } else if (endpoint === "/generate-itinerary" && data.response) {
        botResponse = data.response; // Handle "generate itinerary" queries
      } else {
        botResponse = "I'm here to assist you!";
      }
  
      setMessages((prev) => [...prev, { sender: "milo", text: botResponse }]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "milo", text: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUserMessage();
    } else if (e.key === "ArrowUp") {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setInput(history[newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setInput(history[newIndex]);
        setHistoryIndex(newIndex);
      } else {
        setInput("");
        setHistoryIndex(-1);
      }
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <Navbar />
      {welcomeVisible && (
        <div className="welcome-message">
          <p>Welcome to a chat with Milo, your personal smart AI trip planner.</p>
          <p>Click on the input bar to start the chat.</p>
        </div>
      )}

      <div id="chat-container" className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            <span>{msg.sender === "user" ? `You: ${msg.text}` : `Milo: ${msg.text}`}</span>
          </div>
        ))}
        {isTyping && (
          <div className="chat-bubble milo">
            <span>Milo is typing...</span>
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setWelcomeVisible(false)}
        />
        <button onClick={handleUserMessage}>Send</button>
      </div>
    </div>
  );
};

export default MiloChatbot;
