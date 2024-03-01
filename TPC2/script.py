import json

file = open("mapa.json", 'r')
data = json.load(file)

index_page = """
    <!DOCTYPE html>
    <html lang="pt-pt">
    <head>
        <title>Mapa de cidades</title>
        <meta charset="UTF-8">
    </head>
    <body>
    """

index = open("solution/index.html", "w")
index_page += '<h1>Cidades</h1>'
index_page += "<ul>"

sorted_cities = sorted(data['cidades'], key=lambda x: x['nome'])

for city in sorted_cities:
    index_page += f"<li><a href=\"http://localhost:3000/{city['id']}.html\"><u>{city['nome']}</u></a></li><br>"

index_page += "</ul>"
index_page += "</body></html>"
index.write(index_page)

for city in data['cidades']:
    city_page = f"""
    <!DOCTYPE html>
    <html lang="pt-pt">
    <head>
        <title>{city['nome']}</title>
        <meta charset="UTF-8">
    </head>
    <body>
    """
    city_page += f"<h1>{city['nome']}</h1>"

    city_page += f"<span>População:</span> {city['população']} habitantes<br>"
    city_page += f"<span>Descrição:</span> {city['descrição']}<br>"
    city_page += f"<span>Distrito:</span> {city['distrito']}<br>"
    city_page += "<h2>Ligações</h2>"
    city_page += "<ul>"
    cityName = ""

    for ligacao in data['ligacoes']:
        if ligacao['origem'] == city['id']:
            for cities in data['cidades']:
                if cities['id'] == ligacao['destino']:
                    cityName = cities['nome']
            city_page += f"<span>Ligação com: </span>"
            city_page += f"<span><a href=\"http://localhost:3000/{ligacao['destino']}.html\"><span>{cityName}</span></a></span><br><br>"
            city_page += f"<span>Distância:</span> {ligacao['distância']} km<br><br>"

    city_page += "</ul>"
    city_page += "<div>"
    city_page += "<h6><a href='../'>Voltar</a></h6>"
    city_page += "</div>"
    city_page += "<div></div>"
    city_page += "</body></html>"
    with open(f'solution/cidades/{city["id"]}.html', 'w', encoding='utf-8') as file:
        file.write(city_page)