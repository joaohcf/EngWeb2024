var http = require('http');
var url = require('url');
var axios = require('axios');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    var id;

    var q = url.parse(req.url, true);
    if (q.pathname == '/') {
        res.write("<h2>Filmes</h2>");
        res.write("<ul>");
        res.write("<li><a href='/filmes'>Filmes</a></li>");
        res.write("<li><a href='/genero'>Género</a></li>");
        res.write("<li><a href='/atores'>Atores</a></li>");
        res.write("</ul>");
        res.end();
    } else if (q.pathname == '/filmes') {
        axios.get('http://localhost:8000/filmes')
            .then(dados => {
                res.write("<ul>");
                for (i in dados.data) {
                    res.write("<li><a href='" + "/filmes/" + dados.data[i]._id + "'>" + dados.data[i].title + "</a></li>");
                }
                res.end();
            })
            .catch(err => {
                console.log('Erro: ' + err);
                res.end();
            });
    } else if (q.pathname == '/genero') {
        axios.get('http://localhost:8000/generos')
            .then(dados => {
                res.write("<ul>");
                for (i in dados.data) {
                    res.write("<li><a href='" + "/genero/" + dados.data[i].id + "'>" + dados.data[i].id + "</a></li>");
                }
                res.end();
            })
            .catch(err => {
                console.log('Erro: ' + err);
                res.end();
            });
    } else if (q.pathname == '/atores') {
        axios.get('http://localhost:8000/atores')
            .then(dados => {
                res.write("<ul>");
                for (i in dados.data) {
                    res.write("<li><a href='" + "/atores/" + dados.data[i].id + "'>" + dados.data[i].id + "</a></li>");
                }
                res.end();
            })
            .catch(err => {
                console.log('Erro: ' + err);
                res.end();
            });
    } else if (q.pathname.includes('/atores/')) {
        actor = q.pathname.split('/')[2];
        axios.get('http://localhost:8000/filmes')
            .then(dados => {
                actor = actor.replace(/%20/g, " ");
                const filmes = dados.data.filter(filme => filme.cast.includes(actor));
                res.write("<h2>" + actor + "</h2>");
                res.write("<ul>");
                for (const filme of filmes) {
                    res.write("<a href='" + "/filmes/" + filme._id + "'>" + filme.title + "</a></li><br>");
                }
                res.write("</ul>");
                res.end();
            })
            .catch(err => {
                console.log('Erro: ' + err);
                res.end();
            });
    } else if (q.pathname.includes('/filmes/')) {
        id = q.pathname.split('/')[2]
        axios.get('http://localhost:8000/filmes?_id=' + id)
            .then(dados => {
                filme = dados.data[0];
                console.log('http://localhost:8000/filmes?_id=' + id);
                res.write("<h2>" + filme.title + "</h2>");
                res.write("<p>Ano: " + filme.year + "</p>");
                res.write("<p>Genero: " + filme.genres + "</p>");
                res.write("<p>Elenco: " + filme.cast + "</p>");
                res.end();
            })
            .catch(err => {
                console.log('Erro: ' + err);
                res.end();
            });
    } else if (q.pathname.includes('/genero/')) {
    genre = q.pathname.split('/')[2];
    axios.get('http://localhost:8000/filmes')
        .then(dados => {
            genre = genre.replace(/%20/g, " ");
            const filmes = dados.data.filter(filme => filme.genres.includes(genre));
            res.write("<h2>" + genre + "</h2>");
            res.write("<ul>");
            for (const filme of filmes) {
                res.write("<a href='" + "/filmes/" + filme._id + "'>" + filme.title + "</a></li><br>");
            }
            res.write("</ul>");
            res.end();
        })
        .catch(err => {
            console.log('Erro: ' + err);
            res.end();
        });
    } else {
        res.write("<p>Pedido não suportado: " + q.pathname + "</p>");
        res.end();
    }
}).listen(3000);