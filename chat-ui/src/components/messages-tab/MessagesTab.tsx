import React from "react";
import "./MessagesTab.css";
import { Message, MessageType } from "../../types/Message";

type MessagesTabProps = {
    messages: Message[];
    onSendMessage: (content: string) => void;
    onEditMessage: (messageId: string, newContent: string) => void;
    onDeleteMessage: (messageId: string) => void;
};

const MessagesTab: React.FC<MessagesTabProps> = ({
    messages,
    onSendMessage,
    onEditMessage,
    onDeleteMessage,
}) => {
    const [input, setInput] = React.useState("");

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input);
            setInput("");
        }
    };

    const handleEdit = (messageId: string) => {
        const newContent = prompt("Enter new content:");
        if (newContent) {
            onEditMessage(messageId, newContent);
        }
    };

    const handleDelete = (messageId: string) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            onDeleteMessage(messageId);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const currentUserId = localStorage.getItem("userId");

    return (
        <div className="messages-tab">
            <div className="messages-list">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <strong className="weight-font">{message.Username}:</strong><span className="message-time">
                        {" " + message.Timestamp}</span> <div className="message-content">{message.Content}</div>
                        {message.Type === MessageType.Edit && (
                            <span className="message-edited">edited</span>
                        )}
                        {message.UserId === currentUserId && message.Type !== MessageType.Delete && (
                            <div className="message-actions">
                                <button
                                    className="edit-button"
                                    onClick={() => handleEdit(message.MessageId)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(message.MessageId)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="message-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button onClick={handleSend} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessagesTab;
