import React, { useState } from "react";
import Tabs from "../tabs/Tabs";
import ParticipantsTab from "../participants-tab/ParticipantsTab";
import MessagesTab from "../messages-tab/MessagesTab";
import useWebSocket from "../../hooks/useWebSocket";
import { MessageType, Message, ActionType } from "../../types/Message";
import "./ChatWindow.css";

const ChatWindow: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Chat"); // Track active tab
    const serverUrl = process.env.REACT_APP_SERVER_URL || ""; // WebSocket server URL

    // Initialize WebSocket hook
    const { messages, sendMessage, participants } = useWebSocket(serverUrl);

    // Handle sending a new message
    const handleSendMessage = (content: string) => {
        const storedUserId = localStorage.getItem("userId") || "unknown";
        const storedUsername = localStorage.getItem("username") || "Anonymous";

        const newMessage: Message = {
            MessageId: "",
            UserId: storedUserId,
            Username: storedUsername,
            Content: content,
            Type: MessageType.Add,
        };

        sendMessage(ActionType.Message, newMessage);
    };

    return (
        <div className="chat-window-container">
            <div className="chat-window">
            <div className="header">Status Meeting Standups</div>
                <Tabs
                    tabs={["Participants", "Chat"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
                {activeTab === "Participants" ? (
                    <ParticipantsTab participants={participants} />
                ) : (
                    <MessagesTab
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        onEditMessage={(messageId, newContent) => {
                            const updatedMessage = {
                                MessageId: messageId,
                                Content: newContent,
                                Type: MessageType.Edit,
                            };
                            sendMessage(ActionType.Message, updatedMessage); // Send to WebSocket
                        }}
                        onDeleteMessage={(messageId) => {
                            const deletedMessage = {
                                MessageId: messageId,
                                Type: MessageType.Delete,
                            };
                            sendMessage(ActionType.Message, deletedMessage); // Send to WebSocket
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
