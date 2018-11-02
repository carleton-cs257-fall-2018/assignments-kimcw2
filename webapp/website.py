#!/usr/bin/env python3
'''
Chae Kim
Dawson d'Almeida
Justin Washington

Web application phase 6
'''

import sys
import flask

app = flask.Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def get_main_page():
    global api_port
    return flask.render_template('index.html', api_port=api_port)

@app.route('/about')
def get_about_page():
    global port
    return flask.render_template('about.html', api_port=api_port)

@app.route('/display')
def get_submit_search_page():
    global port
    return flask.render_template('index2.html', api_port=api_port)

@app.route('/advanced_search')
def get_advanced_search_page():
    global port
    return flask.render_template('advanced_search.html', api_port=api_port)

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print('Usage: {0} host port api-port'.format(sys.argv[0]), file=sys.stderr)
        exit()

    host = sys.argv[1]
    port = sys.argv[2]
    api_port = sys.argv[3]
    app.run(host=host, port=int(port), debug=True)
