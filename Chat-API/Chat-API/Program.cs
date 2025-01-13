using ChatWebSocketServer;

var builder = WebApplication.CreateBuilder(args);

// Using the GetValue<type>(string key) method
var url = builder.Configuration.GetValue<string>("HostURL");

builder.WebHost.UseUrls(url);



// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

// Enable WebSocket support

app.UseWebSockets(new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
});



// WebSocket route to handle client connections

app.Map("/ws", async context =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        // Accept the WebSocket connection
        var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        await WebSocketHandler.HandleWebSocketAsync(webSocket);
    }
    else
    {
        // Return 400 Bad Request if the request is not a WebSocket
        context.Response.StatusCode = 400;
    }
});

app.Run();