import csv
import json

csv_file = open('PT-UM-ADB-DIO-MAB-006.csv', mode='r', encoding='utf-8')

csv_reader = csv.DictReader(csv_file, delimiter=';')

rows = []
for row in csv_reader:
    row['_id'] = row.pop('\ufeffID')
    rows.append(row)

database_json = {}
database_json['inqueritos'] = rows

json_file = open('database.json', 'w', encoding='utf-8')
json.dump(database_json, json_file, indent=4)