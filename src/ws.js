
console.log(process.env.REACT_APP_WS_HOST || "http://localhost:8080");
const ws = new WebSocket(process.env.REACT_APP_WS_HOST);
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