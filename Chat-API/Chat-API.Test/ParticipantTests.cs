
using Chat_API.Models;

public class ParticipantTests
{

    [Fact]
    public void Participant_ShouldSetPropertiesCorrectly()
    {
        // Arrange
        var participant = new Participant
        {
            UserId = Guid.NewGuid(),
            Username = "TestUser",
            Status = StatusType.Online
        };

        // Assert
        Assert.NotNull(participant);
        Assert.Equal("TestUser", participant.Username);
        Assert.Equal(StatusType.Online, participant.Status);
    }

}
