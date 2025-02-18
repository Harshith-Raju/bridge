import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you with franchises?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    // Greetings
    if (["hi", "hello", "hey"].includes(lowerCaseMessage)) {
      return "Hello! How can I assist you today?";
    }

    // Basic franchise-related questions
    if (lowerCaseMessage.includes("franchise")) {
      return "We offer various franchise options. Could you specify if you're interested in fitness, food, or tech?";
    }
    if (lowerCaseMessage.includes("cost")) {
      return "Franchise costs vary depending on type and location, generally ranging from $10,000 to $100,000.";
    }
    if (lowerCaseMessage.includes("apply")) {
      return "You can apply for a franchise by filling out our online application form.";
    }
    if (lowerCaseMessage.includes("fitness")) {
      return "Our fitness franchises include gym chains and wellness centers, starting from $20,000.";
    }
    if (lowerCaseMessage.includes("food")) {
      return "We offer restaurant and café franchises, starting from $30,000.";
    }

    return "I'm not sure about that. Could you provide more details about what you need?";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    const botResponseText = getBotResponse(input);
    const botMessage = { text: botResponseText, sender: "bot" };
    setTimeout(() => setMessages((prev) => [...prev, botMessage]), 1000);
    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: "1000" }}>
      {isOpen && (
        <div
          style={{
            background: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "10px",
            width: "300px",
          }}
        >
          <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>Franchise Chatbot</h3>
          <div
            style={{
              height: "200px",
              overflowY: "auto",
              padding: "10px",
              background: "#f1f1f1",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? "#add8e6" : "#ddd",
                  padding: "8px",
                  borderRadius: "6px",
                  marginBottom: "5px",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "10px", display: "flex" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{ flex: "1", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                marginLeft: "8px",
                padding: "8px 12px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "50%",
          padding: "12px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;