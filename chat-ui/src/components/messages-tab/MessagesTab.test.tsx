import { render, screen, fireEvent } from "@testing-library/react";
import MessagesTab from "../messages-tab/MessagesTab";
import { Message, MessageType } from "../../types/Message";

describe("MessagesTab Component", () => {
    const mockMessages: Message[] = [
        { MessageId: "1", UserId: "123", Username: "John", Content: "Hello!", Type: MessageType.Add },
        { MessageId: "2", UserId: "456", Username: "Jane", Content: "Hi!", Type: MessageType.Add },
    ];
    const mockOnSendMessage = jest.fn();
    const mockOnEditMessage = jest.fn();
    const mockOnDeleteMessage = jest.fn();

    it("renders messages correctly", () => {
        render(
            <MessagesTab
                messages={mockMessages}
                onSendMessage={mockOnSendMessage}
                onEditMessage={mockOnEditMessage}
                onDeleteMessage={mockOnDeleteMessage}
            />
        );

        expect(screen.getByText("John:")).toBeInTheDocument();
        expect(screen.getByText("Hello!")).toBeInTheDocument();
        expect(screen.getByText("Jane:")).toBeInTheDocument();
        expect(screen.getByText("Hi!")).toBeInTheDocument();
    });

    it("calls onSendMessage when sending a message", () => {
        render(
            <MessagesTab
                messages={mockMessages}
                onSendMessage={mockOnSendMessage}
                onEditMessage={mockOnEditMessage}
                onDeleteMessage={mockOnDeleteMessage}
            />
        );

        const input = screen.getByPlaceholderText("Type a message...");
        fireEvent.change(input, { target: { value: "New message" } });
        fireEvent.click(screen.getByText("Send"));

        expect(mockOnSendMessage).toHaveBeenCalledWith("New message");
    });

});
