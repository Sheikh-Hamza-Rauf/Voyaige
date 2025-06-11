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

  const apiBaseURL = "https://exemplary-wonder-production-6654.up.railway.app/";

  useEffect(() => {
    const initialMessages = [
      {
        sender: "bot",
        text: "Hi, I'm Milo, your personal travel assistant! Let's start planning your trip.",
      },
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

    if (/generate itinerary|plan a trip|form a plan|create a plan|create a trip/i.test(userMessage)) {
      const userInputParts = userMessage.split(" ");
      const startingCity = userInputParts.includes("from")
        ? userInputParts[userInputParts.indexOf("from") + 1]
        : "Islamabad";
      const destinationCity = userInputParts.includes("to")
        ? userInputParts[userInputParts.indexOf("to") + 1]
        : "Lahore";
      const daysMatch = userMessage.match(/(\d+)\s+days/);
      const days = daysMatch ? parseInt(daysMatch[1], 10) : 3;

      endpoint = "/generate-itinerary";
      payload = {
        user_input: userMessage,
        starting_city: startingCity,
        destination_city: destinationCity,
        days,
      };

      setMessages((prev) => [...prev, { sender: "milo", text: "Generating itinerary..." }]);
    } else if (/top|best/i.test(userMessage)) {
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

        setMessages((prev) => [...prev, { sender: "milo", text: "Fetching top items..." }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "milo",
            text: "Please specify what type of top information you need (e.g., 'top 5 hotels in Lahore').",
          },
        ]);
        setIsTyping(false);
        return;
      }
    } else if (/tell me about|what is|describe|give details on|where is|give info on/i.test(userMessage)) {
      endpoint = "/retrieve-details";
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
      console.log("Backend Response:", data);

      if (endpoint === "/retrieve-details" && data.result) {
        botResponse = data.result.replace(/\n/g, "<br>");
        setMessages((prev) => [...prev, { sender: "milo", text: botResponse }]);
      } else if (endpoint === "/retrieve-top-items" && data.result) {
        const recommendations = data.result.split("\n").map((item, index) => (
          <div key={index} className="recommendation-card">
            {item}
          </div>
        ));
        setMessages((prev) => [
          ...prev,
          { sender: "milo", text: "Here are the top recommendations:" },
          { sender: "milo", content: recommendations },
        ]);
      }  else if (endpoint === "/generate-itinerary" && data.messages) {
        const itineraryText = data.messages.join("\n"); // Convert array to a single string
        const daySections = itineraryText.split("----------------------").filter(Boolean); // Split by separator
        
        let itineraryCards = [];
        
        for (let i = 1; i < daySections.length - 1; i++) { // Ignore header and total cost
            const dayDetails = daySections[i].trim().split("\n").filter(line => line);
            const dayNumber = dayDetails[0].match(/Day\s+(\d+)/i)?.[1] || `Unknown`;
            
            const dayContent = dayDetails.slice(1).map((detail, index) => (
                <p key={index}>{detail}</p>
            ));
    
            itineraryCards.push(
                <div key={i} className="itinerary-day-card">
                    <h4>Day {dayNumber}</h4>
                    {dayContent}
                </div>
            );
        }

        // Extract total trip cost
        const totalCost = data.messages.find(msg => msg.includes("Total Trip Cost"));
        const totalCostCard = totalCost ? (
            <div className="total-cost-card">
                <h4>Total Trip Cost</h4>
                <p>{totalCost.replace("Total Trip Cost:", "").trim()}</p>
            </div>
        ) : null;
    
        setMessages((prev) => [
            ...prev,
            { sender: "milo", text: "Generated itinerary is ready!" },
            { sender: "milo", content: itineraryCards },
            totalCostCard ? { sender: "milo", content: totalCostCard } : null,
        ].filter(Boolean)); // Remove null values;
      } else {
        botResponse = "I'm here to assist you!";
        if (!data || !data.messages) {
          botResponse = "Failed to generate itinerary. Please try again.";
        }
        setMessages((prev) => [...prev, { sender: "milo", text: botResponse }]);
      }
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
        setHistoryIndex(-1);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <Navbar />
      {welcomeVisible && (
        <div className="welcome-message">
          <h3>Welcome to a chat with Milo, your personal smart AI Trip Planner!</h3>
          <h4>Click on the input bar to start the chat.</h4>
        </div>
      )}

      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.content ? (
              msg.content
            ) : (
              <span>{msg.sender === "user" ? `You: ${msg.text}` : `Milo: ${msg.text}`}</span>
            )}
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
