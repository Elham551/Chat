namespace ChatWebSocketServer.Models
{
    public class Message
    {
        public string MessageId { get; set; }
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Content { get; set; }
        public string Timestamp { get; set; }
        public MessageType Type { get; set; }


    }
    public class BaseMessage
    {
        public ActionType Action { get; set; }
        public object Data { get; set; }
    }

    public enum ActionType
    {
        Register = 1,
        Message = 2,
        SetStatus = 3
    }
}
