import json
import pandas as pd


#1.1 Preprocessing Data

def normalize_json(json_data):
    normalized_data = {}
    for key,values in json_data.items():
        for index,value in values.items():
            if index not in normalized_data:
                normalized_data[index] = {}
            normalized_data[index][key] = value
    return normalized_data

def generate_table(json_file):
    with open(json_file,'r') as f:
        json_data = json.load(f)
        normalized_data = normalize_json(json_data)
        df = pd.DataFrame.from_dict(normalized_data)
        return df.transpose()
    
json_file = 'playlist.json'
table = generate_table(json_file)
print(table)