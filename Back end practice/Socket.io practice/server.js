const express = require("express")
const { compileFunction } = require("vm")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

app.set("views", "views")
app.use(express.static("views"))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});


io.on("connection", socket => {

    
    socket.on("message", data => {
        let sum = 0;
        for (let i = 0; i < 5; i++) {
            sum = sum + parseInt(data[i]);
        }

        let result = sum / 5
        console.log(result)
    
        socket.emit("result", {
            result: result
        })
    })

   
});

server.listen(3000, function () {
    console.log("Server running ..")
});