var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var baseDirectory = "src"   // or whatever base directory you want

var port = 9615

http.createServer(function (request, response) {
    try {
        var requestUrl = url.parse(request.url);
        // need to use path.normalize so people can't access directories underneath baseDirectory
        var fsPath = baseDirectory+path.normalize(requestUrl.pathname)
        var fileStream = fs.createReadStream(fsPath)
        fileStream.pipe(response)
        fileStream.on('open', function() {
          if (requestUrl.pathname === "/main.js"){
               console.log(request.headers);
               return response.writeHead(200, { 'Content-Type': 'application/javascript' });
             }

             if (requestUrl.pathname === "/mapper.js"){
               console.log(request.headers);
               return response.writeHead(200, { 'Content-Type': 'application/javascript' });
             }
             
             if (requestUrl.pathname === "/snake.js"){
               console.log(request.headers);
               return response.writeHead(200, { 'Content-Type': 'application/javascript' });
             }
             if (requestUrl.pathname === "/game.js"){
               console.log(request.headers);
               return response.writeHead(200, { 'Content-Type': 'application/javascript' });
             }

             return response.writeHead(200);
        })
        fileStream.on('error',function(e) {
             response.writeHead(404)     // assume the file doesn't exist
             response.end()
        })
   } catch(e) {
        response.writeHead(500)
        response.end()     // end the response so browsers don't hang
        console.log(e.stack)
   }
}).listen(port)

console.log("listening on port "+port)