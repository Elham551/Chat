import { render, screen } from "@testing-library/react";
import ParticipantsTab from "./ParticipantsTab";
import { Participant, StatusType } from "../../types/Participants";

describe("ParticipantsTab Component", () => {
    const mockParticipants: Participant[] = [
        { Username: "John", Status: StatusType.Online },
        { Username: "Jane", Status: StatusType.Offline },
    ];

    test("renders all participants", () => {
        render(<ParticipantsTab participants={mockParticipants} />);
        expect(screen.getByText("John")).toBeInTheDocument();
        expect(screen.getByText("Jane")).toBeInTheDocument();
    });

    test("shows correct status for participants", () => {
        const { container } = render(<ParticipantsTab participants={mockParticipants} />);

        // Using querySelectorAll to find elements by class
        const onlineStatus = container.querySelectorAll(".status-online");
        const offlineStatus = container.querySelectorAll(".status-offline");

        expect(onlineStatus.length).toBe(1); // One online user
        expect(offlineStatus.length).toBe(1); // One offline user
    });
});
