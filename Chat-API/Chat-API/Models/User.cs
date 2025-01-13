namespace Chat_API.Models
{
    public class Participant
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public StatusType Status { get; set; }
    }

    public enum StatusType
    {
        Offline = 0,
        Online = 1
    }
}
