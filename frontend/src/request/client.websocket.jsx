const client = new WebSocket("ws://127.0.0.1:7001");

client.onopen = () => {
    console.log('WebSocket Client Connected');
    client.send('Hello,ws')
}

client.onmessage = (message) => {
    console.log(message.data);
}