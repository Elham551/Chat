using ChatWebSocketServer.Models;
public class MessageTests
{

    [Fact]
    public void Message_ShouldSetPropertiesCorrectly()
    {
        // Arrange
        var message = new Message
        {
            MessageId = Guid.NewGuid().ToString(),
            UserId = Guid.NewGuid(),
            Username = "TestUser",
            Content = "Hello, World!",
            Timestamp = DateTime.Now.ToString("HH:mm"),
            Type = MessageType.Add
        };

        // Assert
        Assert.NotNull(message);
        Assert.Equal("TestUser", message.Username);
        Assert.Equal("Hello, World!", message.Content);
        Assert.Equal(MessageType.Add, message.Type);
    }
}
