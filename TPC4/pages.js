exports.index = function(){
    return `
    <html>
        <head>
            <title>Compositores</title>
        </head>
        <body style="margin:0; font-family:sans-serif">
            <header style="display:flex; justify-content:center; padding:1rem; background-color:#ffbf60">
                <a href="/" style="color:black; text-decoration:none"><h1 style="margin:0">Compositores</h1></a>
            </header>
            <main>
                <ul>
                    <li style="margin-bottom:10px"><a href="/compositores">Compositores</a></li>
                    <li style="margin-bottom:10px"><a href="/periodos">Periodos</a></li>
                </ul>
            </main>
        </body>
    </html>
    `
}

exports.compositores = function(list){
    var page = `
    <html>
        <head>
            <title>Compositores</title>
        </head>
        <body style="margin:0; font-family:sans-serif">
            <header style="display:flex; justify-content:center; padding:1rem; background-color:#ffbf60">
                <a href="/" style="color:black; text-decoration:none"><h1 style="margin:0">Compositores</h1></a>
            </header>
            <nav style="padding:1rem; background-color:#e9e9e9">
                <a href="/compositores/create">Criar novo compositor</a>
            </nav>
            <main>
                <ul>
    `

    for(index in list){
        page += '<li><a href="/compositores/'+ list[index].id +'" style="text-decoration:none">'+ list[index].nome +'</a></li>'
    }

    page += `
                </ul>
            </main>
        </body>
    </html>
    `
    return page;
}

exports.compositor = function(data){
    var page = `
    <html>
        <head>
            <title>${data.nome}</title>
        </head>
        <body style="margin:0; font-family:sans-serif; text-align:center">
            <header style="display:flex; justify-content:center; padding:1rem; background-color:#ffbf60">
                <a href="/" style="color:black; text-decoration:none"><h1 style="margin:0">Compositores</h1></a>
            </header>
            <main>
                <h1>${data.nome}</h1>
                <p><b>Data de nascimento:</b> ${data.dataNasc}</p>
                <p><b>Data de óbvio:</b> ${data.dataObito}</p>
                <p><b>Período:</b> ${data.periodo}</p>
                <p><b>Biografia:</b></p>
    `

    let p = data.bio.split('\n')
    for(index in p){
        page += '<p>'+ p[index] +'</p>'
    }

    page += `
                <br>
                <a href="/compositores"> < voltar aos compositores</a>
                ou
                <a href="/compositores/edit/${data.id}">editar compositor</a>
                ou
                <a href="/compositores/delete/${data.id}">eliminar compositor</a>
                <br>
            </main>
        </body>
    </html>
    `
    return page;
}

exports.compositor_create = function(data){
    var page = `
    <html>
        <head>
            <title>Criar novo compositor</title>
        </head>
        <body style="margin:0; font-family:sans-serif; text-align:center">
            <header style="display:flex; justify-content:center; padding:1rem; background-color:#ffbf60">
                <a href="/" style="color:black; text-decoration:none"><h1 style="margin:0">Compositores</h1></a>
            </header>
            <main>
                <h2>Criar novo compositor</h2>
                <form action="/compositores/create" method="post" style="display:flex; flex-direction:column; margin:auto; width:800px; text-align:left; margin-top:10px">
                    <label>ID</label>
                    <input type="text" placeholder="ID" style="padding:10px; margin-bottom:10px" name="id">
                    <label>Nome</label>
                    <input type="text" placeholder="Nome" style="padding:10px; margin-bottom:10px" name="nome">
                    <label>Data de nascimento</label>
                    <input type="date" placeholder="Data de nascimento" style="padding:10px; margin-bottom:10px" name="dataNasc">
                    <label>Data de óbito</label>
                    <input type="date" placeholder="Data de óbito" style="padding:10px; margin-bottom:10px" name="dataObito">
                    <label>Período</label>
                    <select placeholder="Período" style="padding:10px; margin-bottom:10px" name="id_periodo">
    `

    for(index in data){
        page += `<option value="${data[index].id}">${data[index].periodo}</option>`
    }

    page += `
                    </select>
                    <label>Biografia</label>
                    <input type="text" placeholder="Biografia" style="padding:10px; margin-bottom:10px" name="bio">
                    <input type="submit" style="padding:10px; cursor:pointer">
                </form>
                <br>
                <a href="/compositores"> < voltar aos compositores</a>
                <br>
            <main>
        </body>
    </html>
    `
    return page;
}

exports.compositor_edit = function(compositor, periodos){
    var page = `
    <html>
        <head>
            <title>Editar compositor</title>
        </head>
        <body style="margin:0; font-family:sans-serif; text-align:center">
            <header style="display:flex; justify-content:center; padding:1rem; background-color:#ffbf60">
                <a href="/" style="color:black; text-decoration:none"><h1 style="margin:0">Compositores</h1></a>
            </header>
            <main>
                <h2>Editar compositor</h2>
                <form action="/compositores/edit" method="post" style="display:flex; flex-direction:column; margin:auto; width:800px; text-align:left; margin-top:10px">
                    <label>ID</label>
                    <input type="text" placeholder="ID" style="padding:10px; margin-bottom:10px" name="id" value="${compositor.id}">
                    <label>Nome</label>
                    <input type="text" placeholder="Nome" style="padding:10px; margin-bottom:10px" name="nome" value="${compositor.nome}">
                    <label>Data de nascimento</label>
                    <input type="date" placeholder="Data de nascimento" style="padding:10px; margin-bottom:10px" name="dataNasc" value="${compositor.dataNasc}">
                    <label>Data de óbito</label>
                    <input type="date" placeholder="Data de óbito" style="padding:10px; margin-bottom:10px" name="dataObito" value="${compositor.dataObito}">
                    <label>Período</label>
                    <select placeholder="Período" style="padding:10px; margin-bottom:10px" name="id_periodo">
    `

    for(index in periodos){
        page += `<option value="${periodos[index].id}">${periodos[index].periodo}</option>`
    }

    page += `
                    </select>
                    <label>Biografia</label>
                    <label>Biografia</label>
                    <input type="text" placeholder="Biografia" style="padding:10px; margin-bottom:10px" name="bio" value="${compositor.bio}">
                    <input type="submit" style="padding:10px; cursor:pointer">
                </form>
                <br>
                <a href="/compositores"> < voltar aos compositores</a>
                <br>
            <main>
        </body>
    </html>
    `
    return page;
}

exports.periodos = function(list){
    var page = `
    <html>
        <head>
            <title>Períodos</title>
        </head>
        <body style="margin:0; font-family:sans-serif">
            <header style="display:flex; justify-content:center; padding:1rem; background-color:#ffbf60">
                <a href="/" style="color:black; text-decoration:none"><h1 style="margin:0">Compositores</h1></a>
            </header>
            <nav style="padding:1rem; background-color:#e9e9e9">
                <a href="/periodos/create">Criar novo período</a>
            </nav>
            <main>
                <ul>
    `

    for(index in list){
        page += '<li><a href="/periodos/'+ list[index].id +'" style="text-decoration:none">'+ list[index].periodo +'</a></li>'
    }

    page += `
                </ul>
            </main>
        </body>
    </html>
    `
    return page;
}

exports.periodo = function(data){
    var page = `
    <html>
        <head>
            <title>${data.periodo}</title>
        </head>
        <body style="margin:0; font-family:sans-serif; text-align:center">
            <header style="display:flex; justify-content:center; padding:1rem; background-color:#ffbf60">
                <a href="/" style="color:black; text-decoration:none"><h1 style="margin:0">Compositores</h1></a>
            </header>
            <main>
                <h1>Período: ${data.periodo}</h1>
                <a href="/compositores?periodo=${data.periodo}" style="display:block; margin-bottom:15px"> << Ver todos os compositores deste período >> </a>
                <br>
                <a href="/periodos"> < voltar aos períodos</a>
                ou
                <a href="/periodos/edit/${data.id}">editar período</a>
                ou
                <a href="/periodos/delete/${data.id}">eliminar período</a>
                <br>
            </main>
        </body>
    </html>
    `
    return page;
}

exports.periodo_create = function(){
    var page = `
    <html>
        <head>
            <title>Criar novo período</title>
        </head>
        <body style="margin:0; font-family:sans-serif; text-align:center">
            <header style="display:flex; justify-content:center; padding:1rem; background-color:#ffbf60">
                <a href="/" style="color:black; text-decoration:none"><h1 style="margin:0">Compositores</h1></a>
            </header>
            <main>
                <h2>Criar novo período</h2>
                <form action="/periodos/create" method="post" style="display:flex; flex-direction:column; margin:auto; width:800px; text-align:left; margin-top:10px">
                    <label>ID</label>
                    <input type="text" placeholder="ID" style="padding:10px; margin-bottom:10px" name="id">
                    <label>Período</label>
                    <input type="text" placeholder="Período" style="padding:10px; margin-bottom:10px" name="periodo">
                    <input type="submit" style="padding:10px; cursor:pointer">
                </form>
                <br>
                <a href="/periodos"> < voltar aos períodos</a>
            </main>
        </body>
    </html>
    `
    return page;
}

exports.periodo_edit = function(data){
    var page = `
    <html>
        <head>
            <title>Editar período</title>
        </head>
        <body style="margin:0; font-family:sans-serif; text-align:center">
            <header style="display:flex; justify-content:center; padding:1rem; background-color:#ffbf60">
                <a href="/" style="color:black; text-decoration:none"><h1 style="margin:0">Compositores</h1></a>
            </header>
            <main>
                <h2>Editar período</h2>
                <form action="/periodos/edit" method="post" style="display:flex; flex-direction:column; margin:auto; width:800px; text-align:left; margin-top:10px">
                    <label>ID</label>
                    <input type="text" placeholder="ID" style="padding:10px; margin-bottom:10px" name="id" value="${data.id}">
                    <label>Período</label>
                    <input type="text" placeholder="Período" style="padding:10px; margin-bottom:10px" name="periodo" value="${data.periodo}">
                    <input type="submit" style="padding:10px; cursor:pointer">
                </form>
                <br>
                <a href="/periodos"> < voltar aos períodos</a>
            </main>
        </body>
    </html>
    `
    return page;
}