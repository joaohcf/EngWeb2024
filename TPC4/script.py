import json

# Read json file
json_file = open("compositores.json", "r", encoding="utf-8")
data = json.load(json_file)

# Parse and separate data
new_data = {"compositores":[]}
periodos = []
for compositor in data["compositores"]:
    # Add compositor to new_data
    new_data["compositores"].append(compositor)

    # Add 'periodo' to periodos list
    if compositor["periodo"] not in periodos:
        periodos.append(compositor["periodo"])    

# Periodos dict
periodos_counter = 1
new_periodos = []
for item in periodos:
    periodo = {}
    periodo["id"] = str(periodos_counter)
    periodo["periodo"] = item
    new_periodos.append(periodo)
    periodos_counter += 1

# Add new_periodos to new_data
new_data["periodos"] = new_periodos

# Add periodo id to compositores data
for compositor in new_data["compositores"]:
    for periodo in new_periodos:
        if periodo["periodo"] == compositor["periodo"]:
            compositor["id_periodo"] = periodo["id"]
            del compositor["periodo"]
            break

# Write json file
new_json_file = open("new_compositores.json", "w", encoding="utf-8")
json.dump(new_data, new_json_file, indent=4)