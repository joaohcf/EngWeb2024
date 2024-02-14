import xml.etree.ElementTree as ET
import os

if not os.path.exists("script_solution"):
    os.mkdir("script_solution")

if not os.path.exists("script_solution/ruas"):
    os.mkdir("script_solution/ruas")

ruas = []
for rua_file in os.listdir("./MapaRuas/texto"):
    rua = ET.parse("./MapaRuas/texto/" + rua_file).getroot()

    ruas.append(rua)

    rua_html = f"""
    <!DOCTYPE html>
    <html lang="pt-PT">
    <head>
        <title>{rua[0][0].text} - {rua[0][1].text}</title>
        <meta charset="utf-8">
    </head>
    <body>
    <a href="../index.html">Voltar à listagem de ruas</a>
    <h1>{rua[0][0].text} - {rua[0][1].text}</h1>
    """

    # Descrição da rua
    for p in rua[1].findall('para'):
        rua_html += "<p>"
        for word in p.iter():
            if(word.tag == 'data'):
                rua_html += f"<i>{word.text}</i> {word.tail}"
            elif(word.tag == 'lugar'):
                rua_html += f"<b>{word.text}</b> {word.tail}"
            elif(word.tag == 'entidade'):
                rua_html += f"<strong><i>{word.text}</i></strong> {word.tail}"
            elif(word.tag == 'para'):
                rua_html += f"{word.text} "
        rua_html += "</p>"

    # Listagem de casas
    rua_html += """
    <h2>Lista de casas:</h2>
    <table border="1">
        <tr>
            <th>Número</th>
            <th>Enfiteuta</th>
            <th>Foro</th>
            <th>Descrição</th>
        </tr>
    """
    for casas in rua[1].findall('lista-casas'):
        for casa in casas:

            casa_nmr = casa.find('número')
            if casa_nmr == None or casa_nmr.text == None: casa_nmr = "..." 
            else: casa_nmr = casa_nmr.text

            casa_enfiteuta = casa.find('enfiteuta')
            if casa_enfiteuta == None or casa_enfiteuta.text == None: casa_enfiteuta = "..."
            else: casa_enfiteuta = casa_enfiteuta.text

            casa_foro = casa.find('foro')
            if casa_foro == None or casa_foro.text == None: casa_foro = "..."
            else: casa_foro = casa_foro.text

            desc = casa.find('desc')
            casa_desc = "<p>"
            if desc == None: casa_desc += "..."
            else:
                for word in desc.iter():
                    if(word.tag == 'data'):
                        casa_desc += f"<i>{word.text}</i> {word.tail}"
                    elif(word.tag == 'lugar'):
                        casa_desc += f"<b>{word.text}</b> {word.tail}"
                    elif(word.tag == 'entidade'):
                        casa_desc += f"<strong><i>{word.text}</i></strong> {word.tail}"
                    elif(word.tag == 'para'):
                        casa_desc += f"{word.text} "
            casa_desc += "</p>"

            rua_html += f"""
            <tr>
                <td>{casa_nmr}</td>
                <td>{casa_enfiteuta}</td>
                <td>{casa_foro}</td>
                <td>{casa_desc}</td>
            </tr>
            """
    rua_html += """
        </table>
    """

    # Listagem de imagens
    rua_html += """
    <h2>Imagens</h2>
    <table>
    """
    for figura in rua[1].findall('figura'):
        rua_html += f"""
            <tr>
                <td><img width="100%" src="../../MapaRuas/{figura.find('imagem').get('path').split("/",1)[1]}" alt="{figura.find('legenda').text}"></td>
                <td><p>{figura.find('legenda').text}</p></td>
            </tr>
        """
    rua_html += """
    </table>
    </body>
    """

    rua_page = open(f"./script_solution/ruas/{rua[0][1].text}.html", "w", encoding="utf-8")
    rua_page.write(rua_html)
    rua_page.close()

index_html = """
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <title>Lista de ruas</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Lista de ruas</h1>
    <ul>
"""
ruas.sort(key = lambda rua: int(rua[0][0].text))
for rua in ruas:
    index_html += f"""
    <li>
        <a href="./ruas/{rua[0][1].text}.html">{rua[0][0].text} - {rua[0][1].text}</a>
    </li>
    """
index_html += """
    </ul>
    </body>
"""

index_page = open("./script_solution/index.html", "w", encoding="utf-8")
index_page.write(index_html)
index_page.close()