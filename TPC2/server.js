var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = q.pathname === '/' ? './solution/index.html' : './solution/cidades/' + q.pathname;

    if (path.extname(filename) === '') {
        filename += '.html';
    }

    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(3000)