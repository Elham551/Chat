import { render, screen, fireEvent } from "@testing-library/react";
import Tabs from "../tabs/Tabs";

describe("Tabs Component", () => {
    const tabs = ["Chat", "Participants"];
    const mockOnTabChange = jest.fn();

    it("renders all tabs", () => {
        render(<Tabs tabs={tabs} activeTab="Chat" onTabChange={mockOnTabChange} />);
        expect(screen.getByText("Chat")).toBeInTheDocument();
        expect(screen.getByText("Participants")).toBeInTheDocument();
    });

    it("highlights the active tab", () => {
        render(<Tabs tabs={tabs} activeTab="Participants" onTabChange={mockOnTabChange} />);
        const activeTab = screen.getByText("Participants");
        expect(activeTab).toHaveClass("active");
    });

    it("calls onTabChange when a tab is clicked", () => {
        render(<Tabs tabs={tabs} activeTab="Chat" onTabChange={mockOnTabChange} />);
        fireEvent.click(screen.getByText("Participants"));
        expect(mockOnTabChange).toHaveBeenCalledWith("Participants");
    });
});
