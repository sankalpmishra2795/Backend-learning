const http = require('http');

const todos = [
    {id:1, text :"Todo One"},
    {id:1, text :"Todo Two"},
    {id:1, text :"Todo Three"}

]

const server = http.createServer((req,res) => {

    const{method,url} = req

   
    let body =[];
    req.on('data', chunk =>{
        body.push(chunk)
    }).on('end' ,()=>{
        body = Buffer.concat(body).toString()

        let stauts =404
        let response = {
            success :false,
            data : null
        }

        if (method==="GET" && url === "/todo"){
            stauts = 200
            response.success = true
            response.data = todos
        } else if ( method === "POST" && url === "/todos") {
            const {id ,text} = JSON.parse(body)
            todos.push({id ,text})
            stauts = 201
            response.success = true
            response.data = todos
        }

        res.writeHead(stauts,{
            'content-type':'application/jsons',
            'X-Powered-By':'Node.js'
        })
        res.end(JSON.stringify(response)) 
    })
    
})

const PORT = 5000

server.listen(PORT, () => console.log(`Server runing 0n port ${PORT}`)) 