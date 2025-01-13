export type Participant = {
    Username: string; // The username of the participant
    Status: StatusType; // The current status of the participant (Online or Offline)
};

export enum StatusType {
    Offline = 0, // Participant is offline
    Online = 1, // Participant is online
}
