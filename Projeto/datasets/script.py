import csv
import json

csv_file = open('PT-UM-ADB-DIO-MAB-006.csv', mode='r', encoding='utf-8')

csv_reader = csv.DictReader(csv_file, delimiter=';')

inqueritos = []
for row in csv_reader:
    inquerito = {}
    inquerito['_id'] = row.pop('\ufeffID')
    for key in row:
        if row[key] != '':
            inquerito[key] = row[key]
    inqueritos.append(inquerito)

database_json = {}
database_json['inqueritos'] = inqueritos

json_file = open('database.json', 'w', encoding='utf-8')
json.dump(database_json, json_file, indent=4)