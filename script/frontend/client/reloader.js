const ws = new WebSocket('ws://127.0.0.1/clientws')
ws.onopen = (event) => {
    setInterval(
        ()=>{
            ws.send("111")
        },1000
    )
};
ws.onmessage = (event) => {
    console.log(event)
};
ws.onclose = (event) => {
    console.log(event)
};
ws.onerror = (err) => {
    console.log(err)
};
