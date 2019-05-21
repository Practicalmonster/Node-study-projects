const http = require('http');

const hostname = '127.0.0.1';

const port = 1337;

http.createServer((req,res)=>{
	res.writeHead(200,{'Content-Type':'text/html'}); //the content type tells constrain the server to only parse the res as it was told so if it were to be text/plain it will not parse it as html
	res.end('<html><h1>this is our first header</h1></html>\n');
}).listen(port,hostname,()=>{
	console.log(`server running at http://${hostname}:${port}/`);
})