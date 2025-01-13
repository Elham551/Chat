import React from "react";
import "./ParticipantsTab.css";
import { Participant, StatusType } from "../../types/Participants";

type ParticipantsTabProps = {
    participants: Participant[];
};

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({ participants }) => {
    const getStatusClass = (status: StatusType) =>
        status === StatusType.Online ? "status-online" : "status-offline";

    return (
        <div className="participants-tab">
            {participants.map((participant) => (
                <div key={participant.Username} className="participant">
                    <span className={`status-indicator ${getStatusClass(participant.Status)}`}></span>
                    <span>{participant.Username}</span>
                </div>
            ))}
        </div>
    );
};

export default ParticipantsTab;
