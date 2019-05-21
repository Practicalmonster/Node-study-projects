const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mTypes = {
	'html':'text/html',
	'jpeg' : 'image/jpeg',
	'jpg' : 'image/jpg',
	'png' :'image/png',
	'js':'text/javascript',
	'css':'text/css'
}

http.createServer(function(req,res){
	let uri = url.parse(req.url).pathname;
	let fileName = path.join(process.cwd(),unescape(uri)); //unescape is deprecated better use is decodedURL 
	console.log('loading ',uri);
	let stats;
	try{
		stats = fs.lstatSync(fileName);
	}catch(e){
		res.writeHead(404,{'Content-type':'text/plain'});
		res.write('404 Not found\n')
		res.end();
		return;
	}

	if(stats.isFile()){
		var mimeType = mTypes[path.extname(fileName).split(".").reverse()[0]]
		res.writeHead(200,{'Content-type':mimeType});

		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	}else if(stats.isDirectory()){
		res.writeHead(302,{
			'location':'index.html'
		});
		res.end();
	}else{
		res.writeHead(500,{'Content-type':'text/plain'});
		res.write('500 Internal Error \n')
		res.end();
	}
}).listen(1338,'127.0.0.1',()=>{
	console.log('listening')
})