import { useEffect, useRef, useState } from "react";
import { ActionType, BaseMessage, Message, MessageType } from "../types/Message";
import { Participant, StatusType } from "../types/Participants";

type UseWebSocketReturnType = {
    messages: Message[];
    participants: Participant[];
    sendMessage: (action: ActionType, message: any) => void;
    isConnected: boolean;
};

const useWebSocket = (url: string): UseWebSocketReturnType => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        if (!url) {
            console.error("Server URL is invalid!");
            return;
        }

        const socket = new WebSocket(url);
        socketRef.current = socket;
        let storedUsername = localStorage.getItem("username");
        let storedUserId = localStorage.getItem("userId");

        socket.onopen = () => {
            console.log("WebSocket connected.");
            setIsConnected(true);

            while (!storedUsername) {
                storedUsername = prompt("Please enter your username:");
            }

            localStorage.setItem("username", storedUsername);

            if (storedUsername && !storedUserId) {
                sendMessage(ActionType.Register, storedUsername);
                console.log("Register");
            } else {
                const msg = {
                    UserId: storedUserId,
                    Status: StatusType.Online,
                };
                sendMessage(ActionType.SetStatus, msg);
            }
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Message received:", data);

                if (data.Action === ActionType.Message) {
                    const msg = data.Data;
                    switch (msg.Type) {
                        case MessageType.Add:
                            setMessages((prev) => [...prev, msg]);
                            break;
                        case MessageType.Delete:
                            setMessages((prev) =>
                                prev.map((message) =>
                                    message.MessageId === msg.MessageId
                                        ? { ...message, Content: "[Message Deleted]", Type: MessageType.Delete }
                                        : message
                                )
                            );
                            break;
                        case MessageType.Edit:
                            setMessages((prev) =>
                                prev.map((message) =>
                                    message.MessageId === msg.MessageId
                                        ? { ...message, Content: msg.Content, Type: MessageType.Edit }
                                        : message
                                )
                            );
                            break;
                    }
                }

                if (data.Action === ActionType.Register) {
                    const res = data as BaseMessage;
                    localStorage.setItem("userId", res.Data.toString());
                }

                if (data.Action === ActionType.SetStatus) {
                    const res = data as BaseMessage;
                    const users = res.Data as Participant[];
                    setParticipants(users);
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onclose = () => {
            const message = {
                Action: ActionType.SetStatus,
                Data: { Status: StatusType.Offline, UserId: storedUserId },
            };
            socket.send(JSON.stringify(message));
            setIsConnected(false);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                console.log("WebSocket connection cleaned up.");
            }
        };
    }, [url]);

    const sendMessage = (action: ActionType, message: any) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            const payload = { Action: action, Data: message };
            socketRef.current.send(JSON.stringify(payload));
        } else {
            console.error("WebSocket is not open.");
        }
    };

    const handleVisibilityChange = () => {
        const storedUserId = localStorage.getItem("userId");
        const status = document.visibilityState === "hidden" ? StatusType.Offline : StatusType.Online;
        const message = { Status: status, UserId: storedUserId };
        sendMessage(ActionType.SetStatus, message);
        console.log("Visibility state changed");
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    return { messages, participants, sendMessage, isConnected };
};

export default useWebSocket;
