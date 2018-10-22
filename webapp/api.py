'''
    api.py

'''
import sys
import flask
import json

app = flask.Flask(__name__)

# Who needs a database when you can just hard-code some actors and movies?
actors = [
    {'last_name': 'Pickford', 'first_name': 'Mary'},
    {'last_name': 'Rains', 'first_name': 'Claude'},
    {'last_name': 'Lorre', 'first_name': 'Peter'},
    {'last_name': 'Greenstreet', 'first_name': 'Sydney'},
    {'last_name': 'Bergman', 'first_name': 'Ingrid'},
    {'last_name': 'Grant', 'first_name': 'Cary'},
    {'last_name': 'Colbert', 'first_name': 'Claudette'},
    {'last_name': 'McDormand', 'first_name': 'Frances'},
    {'last_name': 'Wiig', 'first_name': 'Kristen'},
    {'last_name': 'Adams', 'first_name': 'Amy'}
]

movies = [
    {'title': 'Casablanca', 'year': 1942, 'genre': 'drama'},
    {'title': 'North By Northwest', 'year': 1959, 'genre': 'thriller'},
    {'title': 'Alien', 'year': 1979, 'genre': 'scifi'},
    {'title': 'Bridesmaids', 'year': 2011, 'genre': 'comedy'},
    {'title': 'Arrival', 'year': 2016, 'genre': 'scifi'},
    {'title': 'It Happened One Night', 'year': 1934, 'genre': 'comedy'},
    {'title': 'Fargo', 'year': 1996, 'genre': 'thriller'},
    {'title': 'Clueless', 'year': 1995, 'genre': 'comedy'}
]

def get_winery_id(winery_name):
    for winery in wineries:
        if winery_name == winery['name']:
            return(winery['winery_id'])
    return -1

def get_variety_id(variety_name):
    for variety in varieties:
        if variety_name == variety['name']:
            return(variety['variety_id'])
    return -1

def get_country_id(country_name):
    for country in countries:
        if country_name == country['name']:
            return(country['country_id'])
    return -1

@app.route('/')
def hello():
    return 'Franzia is the best wine'
"""
@app.route('/countries')
def get_countries():
    ''' Returns the first matching actor, or an empty dictionary if there's no match. '''
    actor_dictionary = {}
    lower_last_name = last_name.lower()
    for actor in actors:
        if actor['last_name'].lower().startswith(lower_last_name):
            actor_dictionary = actor
            break
    return json.dumps(actor_dictionary)

@app.route('/regions')
def get_regions():
    return json.dumps(actor_dictionary)
@app.route('/varieties')
def get_varieties():
    return json.dumps(actor_dictionary)
"""

@app.route('/wines')
def get_wines():
    ''' Returns the list of wines that match GET parameters:
          winery_name: reject any wine not from this winery
          variety_name: reject any wine not of this variety
          taster_name: reject any wine not tasted by this taster
          region: reject any wine not from this region
          description: reject any wine that does not have specified 
                       words in its description
          vineyard: reject any wine not from this vineyard
          country_name: reject any wine not from this country
        If a GET parameter is absent, then any wine is treated as though
        it meets the corresponding constraint. (That is, accept a movie unless
        it is explicitly rejected by a GET parameter.)
    '''
    bad_wines_list = []
    winery_name = flask.request.args.get('winery')
    variety_name = flask.request.args.get('variety')
    taster_name = flask.request.args.get('taster')
    region = flask.request.args.get('region')
    description = flask.request.args.get('description')
    vineyard = flask.request.args.get('vineyard')
    country_name = flask.request.args.get('country')
    #points = flask.request.args.get('points', type=int)
    #price = flask.request.args.get('price', type=int)

    for wine in wines:
        if winery_name is not None and get_winery_id(winery_name) != wines['winery_id']:
            continue
        if variety_name is not None and get_variety_id(variety_name) != wines['variety_id']:
            continue
        if taster_name is not None and taster_name != wines['taster_name']:
            continue
        if region is not None and region != wines['region']:
            continue
        if description is not None and description not in wines['vineyard']:
            continue
        if vineyard is not None and vineyard != wines['vineyard']:
            continue
        if country_name is not None and get_country_id(country_name) != wines['country_id']:
            continue
        wines_list.append(wine)

    return json.dumps(bad_wines_list)

            

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: {0} host port'.format(sys.argv[0]))
        print('  Example: {0} perlman.mathcs.carleton.edu 5101'.format(sys.argv[0]))
        exit()
    
    host = sys.argv[1]
    port = int(sys.argv[2])
    app.run(host=host, port=port, debug=True)