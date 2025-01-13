using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using Chat_API.Models;
using ChatWebSocketServer.Models;

namespace ChatWebSocketServer
{
    public static class WebSocketHandler
    {
        private static readonly List<WebSocket> _clients = new();
        private static readonly List<Participant> _participants = new();

        public static async Task HandleWebSocketAsync(WebSocket webSocket, string? username = null)
        {
            _clients.Add(webSocket);
            var receivedData = new StringBuilder();
            var buffer = new byte[4096];

            while (webSocket.State == WebSocketState.Open)
            {
                var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Text)
                {
                    receivedData.Append(Encoding.UTF8.GetString(buffer, 0, result.Count));

                    if (result.EndOfMessage)
                    {
                        var completeMessage = receivedData.ToString();
                        receivedData.Clear();
                        await ProcessMessageAsync(completeMessage, webSocket);
                    }
                }
                else if (result.MessageType == WebSocketMessageType.Close)
                {
                    await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection closed by client", CancellationToken.None);
                }
            }
        }

        private static async Task ProcessMessageAsync(string message, WebSocket webSocket)
        {
            try
            {
                var data = JsonSerializer.Deserialize<BaseMessage>(message);

                if (data == null) return;

                switch (data.Action)
                {
                    case ActionType.Register:
                        await HandleRegisterActionAsync(data, webSocket);
                        break;

                    case ActionType.SetStatus:
                        await HandleSetStatusActionAsync(data);
                        break;

                    case ActionType.Message:
                        await BroadcastMessageAsync(data, webSocket);
                        break;

                    default:
                        Console.WriteLine("Unknown action received.");
                        break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing message: {ex.Message}");
            }
        }

        private static async Task HandleRegisterActionAsync(BaseMessage data, WebSocket webSocket)
        {
            if (data.Data == null) return;

            var userId = Guid.NewGuid();
            var user = new Participant
            {
                UserId = userId,
                Username = data.Data.ToString(),
                Status = StatusType.Online
            };

            _participants.Add(user);

            var response = JsonSerializer.Serialize(new BaseMessage
            {
                Action = ActionType.Register,
                Data = userId
            });

            var buffer = Encoding.UTF8.GetBytes(response);
            await webSocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
            await BroadcastParticipantsAsync();
        }

        private static async Task HandleSetStatusActionAsync(BaseMessage data)
        {
            if (data.Data == null) return;

            var obj = JsonSerializer.Deserialize<Participant>(data.Data.ToString()!);
            if (obj == null) return;

            var currentUser = _participants.FirstOrDefault(x => x.UserId == obj.UserId);
            if (currentUser != null)
            {
                currentUser.Status = obj.Status;
            }

            await BroadcastParticipantsAsync();
        }

        private static async Task BroadcastMessageAsync(BaseMessage baseMsg, WebSocket sender)
        {
            var message = JsonSerializer.Deserialize<Message>(baseMsg.Data.ToString());
            if (message != null && message.Type == MessageType.Add)
            {
                message.MessageId = Guid.NewGuid().ToString();
                message.Timestamp = DateTime.Now.ToString("HH:mm");
                baseMsg.Data = message;
            }

            var response = JsonSerializer.Serialize(baseMsg);
            var buffer = Encoding.UTF8.GetBytes(response);

            foreach (var client in _clients.Where(c => c.State == WebSocketState.Open))
            {
                try
                {
                    await client.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
                }
                catch
                {
                    Console.WriteLine("Error sending message.");
                }
            }
        }

        private static async Task BroadcastParticipantsAsync()
        {
            var response = JsonSerializer.Serialize(new BaseMessage
            {
                Action = ActionType.SetStatus,
                Data = _participants
            });

            var buffer = Encoding.UTF8.GetBytes(response);

            foreach (var client in _clients.Where(c => c.State == WebSocketState.Open))
            {
                try
                {
                    await client.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
                }
                catch
                {
                    Console.WriteLine("Error sending participants update.");
                }
            }
        }
    }
}
