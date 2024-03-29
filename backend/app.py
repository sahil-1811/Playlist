import json
import pandas as pd
from flask import Flask,jsonify,request
from flask_cors import CORS


app = Flask(__name__)
cors=CORS(app)
app.config['CORS_HEADERS'] ='Content-Type'
#1.1 Preprocessing Data

def normalize_json(json_data):
    normalized_data = {}
    for key,values in json_data.items():
        for index,value in values.items():
            if index not in normalized_data:
                normalized_data[index] = {}
            normalized_data[index][key] = value
            normalized_data[index]['star_rating'] = 0
    return normalized_data

def generate_table(json_file):
    with open(json_file,'r') as f:
        json_data = json.load(f)
        normalized_data = normalize_json(json_data)
        df = pd.DataFrame.from_dict(normalized_data)
        df.index.name = 'index'
        # df['star_rating'] = ""
        return df.transpose()
    
json_file = 'playlist.json'
table = generate_table(json_file)
print(table)


# 1.2.1 Front end should be able to request ALL the items in a normalized data set.

@app.route('/songs',methods=['GET'])
def get_songs():
    page = int(request.args.get('page',default = 1))
    per_page = int(request.args.get('per_page',default = 10))

    start_index = (page - 1) * per_page
    end_index = start_index + per_page
    paginated_table = table.iloc[start_index:end_index]
    songs = paginated_table.to_dict('index')    
    return list(songs.values())
        # return jsonify(songs)
       
@app.route('/allSongs',methods=['GET'])
def get_allSongs():
    songs = table.to_dict('index')  
    # print(songs)  
    return list(songs.values())

#1.2.2 Given a title as input, return all the attributes of that song

@app.route('/songs/<title>',methods = ['GET'])

def get_song_by_title(title):
    song = table[table['title'] == title].to_dict('index')
    if len(song) > 0:
        return list(song.values())
        # return jsonify(song)
    else:
        return jsonify({'message' : 'Song not found'}), 200
    # return jsonify({'message' : 'Song not found'}), 400
    
@app.route('/songs/<title>/rate' , methods = ['POST'])

def rate_song(title):
    song = table[table['title'] == title].index

    if len(song) > 0:
        star_rating = int(request.json.get('star_rating', 0))
        if not star_rating:
            return jsonify({'message' : 'Rating not found'}),400
        elif 0 < star_rating < 6:
            table.loc[song,'star_rating'] = star_rating
            temp = table.to_dict('index')    
            return list(temp.values())
            # return jsonify({'message': 'Song rated successfully'}),200
        else:
            return jsonify({'message': 'Invalid star rating. Must be between 1 and 5.'}), 400
    else:
        return jsonify({'message': 'Song not found'}), 400

if __name__ == '__main__':
    app.run(debug = True)