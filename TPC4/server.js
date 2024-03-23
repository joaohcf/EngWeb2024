var http = require('http');
var axios = require('axios');
var pages = require('./pages');
var querystring = require('querystring'); 

http.createServer((req, res) => {
    switch(req.method){
        case 'GET':
            if(req.url == '/'){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(pages.index());
                res.end();
            }

            if(req.url == '/compositores'){ 
                axios.get("http://localhost:8000/compositores")
                .then(resp =>{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(pages.compositores(resp.data));
                    res.end();
                })
                .catch(erro =>{
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível obter a lista de compositores</p>");
                    console.log(erro);
                    res.end();
                })
            }

            if(/\/compositores\?periodo\=[A-Za-z]+$/i.test(req.url)){
                var periodo = req.url.split('=')[1];
                axios.get("http://localhost:8000/compositores?periodo=" + periodo)
                .then(resp =>{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(pages.compositores(resp.data));
                    res.end();
                })
                .catch(erro =>{
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível obter a lista de compositores</p>");
                    console.log(erro);
                    res.end();
                })
            }

            if(req.url == '/compositores/create'){
                axios.get("http://localhost:8000/periodos")
                .then(resp =>{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(pages.compositor_create(resp.data));
                    res.end();
                })
                .catch(erro =>{
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível obter a lista de periodos</p>");
                    console.log(erro);
                    res.end();
                })
            }

            if(/\/compositores\/edit\/[A-Z0-9].+/.test(req.url)){
                var id = req.url.split('/')[3];
                axios.get("http://localhost:8000/compositores/" + id)
                .then(compositor => {
                    axios.get("http://localhost:8000/periodos")
                    .then(periodos =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write(pages.compositor_edit(compositor.data, periodos.data));
                        res.end();
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter a lista de periodos</p>");
                        console.log(erro);
                        res.end();
                    })
                })
                .catch(erro => {
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível obter os dados do compositor para editar.</p>");
                    console.log(erro);
                    res.end();
                })
            }

            if(/\/compositores\/delete\/[A-Z0-9].+/.test(req.url)){
                var id = req.url.split('/')[3];
                axios.delete("http://localhost:8000/compositores/" + id)
                .then(resp => {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<script>");
                    res.write("alert('Compositor eliminado com sucesso.');");
                    res.write("window.location.replace('http://localhost:3000/compositores');");
                    res.write("</script>");
                    res.end();
                })
                .catch(erro => {
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível eliminar o compositor.</p>");
                    console.log(erro);
                    res.end();
                })
            }

            if(/\/compositores\/[A-Z0-9].+/.test(req.url)){
                var id = req.url.split('/')[2];
                axios.get("http://localhost:8000/compositores/" + id)
                .then(resp =>{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(pages.compositor(resp.data));
                    res.end();
                })
                .catch(erro =>{
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível obter os dados do compositor.</p>");
                    console.log(erro);
                    res.end();
                })
            }

            if(req.url == '/periodos'){
                axios.get("http://localhost:8000/periodos")
                .then(resp =>{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(pages.periodos(resp.data));
                    res.end();
                })
                .catch(erro =>{
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível obter a lista de períodos.</p>");
                    console.log(erro);
                    res.end();
                })
            }

            if(req.url == '/periodos/create'){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(pages.periodo_create());
                res.end();
            }

            if(/\/periodos\/edit\/\d+/.test(req.url)){
                var id = req.url.split('/')[3];
                axios.get("http://localhost:8000/periodos/" + id)
                .then(resp => {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(pages.periodo_edit(resp.data));
                    res.end();
                })
                .catch(erro => {
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível obter os dados do período para editar.</p>");
                    console.log(erro);
                    res.end();
                })
            }

            if(/\/periodos\/delete\/\d+/.test(req.url)){
                var id = req.url.split('/')[3];
                axios.delete("http://localhost:8000/periodos/" + id)
                .then(resp => {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<script>");
                    res.write("alert('Período eliminado com sucesso.');");
                    res.write("window.location.replace('http://localhost:3000/periodos');");
                    res.write("</script>");
                    res.end();
                })
                .catch(erro => {
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível eliminar o período.</p>");
                    console.log(erro);
                    res.end();
                })
            }

            if(/\/periodos\/\d+/.test(req.url)){
                var id = req.url.split('/')[2];
                axios.get("http://localhost:8000/periodos/" + id)
                .then(resp =>{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(pages.periodo(resp.data));
                    res.end();
                })
                .catch(erro =>{
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write("<p>Não foi possível obter o período.</p>");
                    console.log(erro);
                    res.end();
                })
            }

            break;
        case 'POST':
            var str = '';

            req.on('data', function (chunk) {
                str += chunk;
            });

            if(req.url == '/compositores/create'){
                req.on('end', function () {
                    data = querystring.parse(str);
                    axios.get("http://localhost:8000/periodos/" + data['id_periodo'])
                    .then(periodo =>{
                        data['periodo'] = periodo.data['periodo'];
                        console.log(data);
                        axios.post("http://localhost:8000/compositores", data)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write("<script>");
                            res.write("alert('Compositor criado com sucesso.');");
                            res.write("window.location.replace('http://localhost:3000/compositores');");
                            res.write("</script>");
                            res.end();
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write("<p>Não foi possível criar um novo compositor.</p>");
                            console.log(erro);
                            res.end();
                        })
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível criar um novo compositor devido a erro no periodo.</p>");
                        console.log(erro);
                        res.end();
                    })
                });
            }

            if(req.url == '/compositores/edit'){
                req.on('end', function () {
                    data = querystring.parse(str);
                    axios.get("http://localhost:8000/periodos/" + data['id_periodo'])
                    .then(periodo =>{
                        data['periodo'] = periodo.data['periodo'];
                        console.log(data);
                        axios.put("http://localhost:8000/compositores", data)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write("<script>");
                            res.write("alert('Compositor criado com sucesso.');");
                            res.write("window.location.replace('http://localhost:3000/compositores');");
                            res.write("</script>");
                            res.end();
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write("<p>Não foi possível criar um novo compositor.</p>");
                            console.log(erro);
                            res.end();
                        })
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível criar um novo compositor devido a erro no periodo.</p>");
                        console.log(erro);
                        res.end();
                    })
                });
            }

            if(req.url == '/periodos/create'){
                req.on('end', function () {
                    data = querystring.parse(str);
                    axios.post("http://localhost:8000/periodos", data)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write("<script>");
                        res.write("alert('Período criado com sucesso.');");
                        res.write("window.location.replace('http://localhost:3000/periodos');");
                        res.write("</script>");
                        res.end();
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível criar um novo período.</p>");
                        console.log(erro);
                        res.end();
                    })
                })
            }

            if(req.url == '/periodos/edit'){
                req.on('end', function () {
                    data = querystring.parse(str);
                    axios.put("http://localhost:8000/periodos", data)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write("<script>");
                        res.write("alert('Período editado com sucesso.');");
                        res.write("window.location.replace('http://localhost:3000/periodos');");
                        res.write("</script>");
                        res.end();
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível atualizar os dados do período.</p>");
                        console.log(erro);
                        res.end();
                    })
                })
            }
            break;
        default:
            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
            res.write("<p>ROTA INVÁLIDA</p>");
            res.end();
            break;
    }
}).listen(3000);