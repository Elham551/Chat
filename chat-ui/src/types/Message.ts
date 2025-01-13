export type BaseMessage = {
  Action: ActionType; // Action to perform (Register, Message, SetStatus)
  Data: object; // Payload data for the action
};

export enum ActionType {
  Register = 1, // Register a new user
  Message = 2, // Send or receive a message
  SetStatus = 3, // Update the status of a participant
}

export type Message = {
  MessageId: string; // Unique ID of the message
  UserId: string; // Unique ID of the sender
  Username: string | null; // Username of the sender
  Content: string; // Content of the message
  Type: MessageType; // Type of the message (Add, Edit, Delete)
  Timestamp?: string; // Optional timestamp for the message
};

export enum MessageType {
  Add = 1, // Add a new message
  Edit = 2, // Edit an existing message
  Delete = 3, // Delete a message
}