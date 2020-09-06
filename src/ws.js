const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
    console.log("WS Connexion Sucess");
};

export const send = (type, data) => {
    ws.send(JSON.stringify({
        type,
        id: ws.id,
        data:{
            ...data
        }
    }));
}

export default ws;