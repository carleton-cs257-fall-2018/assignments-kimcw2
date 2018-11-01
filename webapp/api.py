'''
    api.py

    Dawson d'Almeida
    Justin Washington
    Chae Kim
'''
import sys
import flask
import json
import psycopg2

from config import password
from config import database
from config import user


app = flask.Flask(__name__, static_folder='static', template_folder='templates')

def get_connection():
    '''
    Returns a connection to the database described
    in the config module. Returns None if the
    connection attempt fails.
    '''
    connection = None
    try:
        connection = psycopg2.connect(database=database,
                                      user=user,
                                      password=password)
    except Exception as e:
        print(e, file=sys.stderr)
    return connection

def get_select_query_results(connection, query, parameters=None):
    '''
    Executes the specified query with the specified tuple of
    parameters. Returns a cursor for the query results.
    Raises an exception if the query fails for any reason.
    '''
    cursor = connection.cursor()
    if parameters is not None:
        cursor.execute(query, parameters)
    else:
        cursor.execute(query)
    return cursor

#~~~~~~~~APP ROUTES~~~~~~~~~#

@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/')
def hello():
    return 'Franzia is the best wine'

@app.route('/test')
def test():
    query = '''SELECT * FROM countries'''
    to_dump_countries=[]
    connection = get_connection()
    if connection is not None:
        try:
            for row in get_select_query_results(connection, query):
                country = {'id':row[0],
                          'name':row[1]}
                to_dump_countries.append(country)
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    return json.dumps(to_dump_countries)


    return 'Franzia is the best wine'



@app.route('/countries')
def get_countries():
    ''' Returns all countries '''
    query = '''SELECT id, name FROM countries ORDER BY id'''
    to_dump_countries=[]
    connection = get_connection()
    if connection is not None:
        try:
            for row in get_select_query_results(connection, query):
                country = {'id':row[0],
                          'name':row[1]}
                to_dump_countries.append(country)
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    return json.dumps(to_dump_countries)

@app.route('/regions')
def get_regions():
    ''' Returns all regions '''
    query = '''SELECT DISTINCT region FROM wineries ORDER BY region'''
    to_dump_regions=[]
    connection = get_connection()
    if connection is not None:
        try:
            for row in get_select_query_results(connection, query):
                to_dump_regions.append(row[0])
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    return json.dumps(to_dump_regions)

@app.route('/varieties')
def get_varieties():
    ''' Returns all varieties '''
    query = '''SELECT id, name FROM varieties ORDER BY id'''
    to_dump_varieties=[]
    connection = get_connection()
    if connection is not None:
        try:
            for row in get_select_query_results(connection, query):
                variety = {'id':row[0],
                          'name':row[1]}
                to_dump_varieties.append(variety)
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    return json.dumps(to_dump_varieties)


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

    winery_name = flask.request.args.get('winery', default='%').lower()
    variety_name = flask.request.args.get('variety', default='%').lower()
    taster_name = flask.request.args.get('taster', default='%').lower()
    region = flask.request.args.get('region', default='%').lower()
    description = flask.request.args.get('description', default='%').lower()
    vineyard = flask.request.args.get('vineyard', default='%').lower()
    country_name = flask.request.args.get('country', default='%').lower()
    order_by = flask.request.args.get('orderby', default='points').lower()
    title = flask.request.args.get('title', default='%').lower()
    #points = flask.request.args.get('points', type=int)
    #price = flask.request.args.get('price', type=int)

    query = """SELECT countries.name,
                      wines.description,
                      wines.designation,
                      wines.points,
                      wines.price,
                      wineries.province,
                      wineries.region,
                      wines.taster_name,
                      wines.taster_twitter_handle,
                      wines.title,
                      varieties.name,
                      wineries.name
                FROM wines
                    JOIN wineries ON wineries.id = wines.winery_id
                    JOIN varieties ON varieties.id = wines.variety_id
                    JOIN countries ON countries.id = wineries.country_id
                WHERE wineries.name LIKE '%{0}%'
                    AND lower(varieties.name) LIKE '%{1}%'
                    AND lower(wines.taster_name) LIKE '%{2}%'
                    AND lower(wineries.region) LIKE '%{3}%'
                    AND lower(wines.description) LIKE '%{4}%'
                    AND lower(wines.designation) LIKE '%{5}%'
                    AND lower(countries.name) LIKE '%{6}%'
                    AND lower(wines.title) LIKE '%{8}%'
                ORDER BY wines.{7}""".format(winery_name, variety_name, taster_name, region, description, vineyard, country_name, order_by, title)


    wines_list = []
    connection = get_connection()
    if connection is not None:
        try:
            for row in get_select_query_results(connection, query):
                wine = {'country':row[0],
                        'description':row[1],
                        'designation':row[2],
                        'points':row[3],
                        'price':row[4],
                        'province':row[5],
                        'region':row[6],
                        'taster_name':row[7],
                        'taster_twitter_handle':row[8],
                        'title':row[9],
                        'variety':row[10],
                        'winery':row[11]}
                wines_list.append(wine)
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    return json.dumps(wines_list)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: {0} host port'.format(sys.argv[0]))
        print('  Example: {0} perlman.mathcs.carleton.edu 5101'.format(sys.argv[0]))
        exit()

    host = sys.argv[1]
    port = int(sys.argv[2])
    app.run(host=host, port=port, debug=True)
