#!/usr/bin/env python3
'''
wine_data_converter.py
Chae Kim, Justin Washington, Dawson D'Almeida, 21 October 2018

Code deconstructs the contents of 'winemag-data-130k-v2.csv'
into four different csv files that will later be converted to 4 tables:
    wine
    winery
    country
    variety
'''
import sys
import re
import csv

def load_from_books_csv_file(csv_file_name):
    '''
     Collect all the data from 'winemag-data-130k-v2.csv' file,
    assembling it into a list of wine information dictionaries, a list
    of winery information dictionaries, a dictionary of the country and its id,
    and a dictionary of the variety of wine and its id.
    '''
    csv_file = open(csv_file_name, encoding='utf-8')
    reader = csv.reader(csv_file)

    single_winery_info = {}
    single_wine_info = {}

    wine_info = []
    winery_info = []

    winery_dict = {}
    country_dict = {}
    variety_dict = {}

    for row in reader:
        pass_winery = True
        assert len(row) == 14
        country = row[1].strip()
        if country == "":
            country = "no_country_specified"
        winery = row[13].strip()
        if winery == "":
            winery = "no_winery_specified"
        variety = row[12].strip()
        if variety == "":
            variety = "no_winery_specified"
        id = row[0]

        if winery not in winery_dict:
            winery_dict[winery] = id
            pass_winery = False
        if country not in country_dict:
            country_dict[country] = id
        if variety not in variety_dict:
            variety_dict[variety] = id

        single_winery_info = {'id': winery_dict[winery], 'country_id': country_dict[country], 'province': row[6], 'region': row[7], 'name': winery}
        if not pass_winery:
            winery_info.append(single_winery_info)
        single_wine_info = {'winery_id': winery_dict[winery], 'description':row[2], 'designation': row[3], 'points':row[4], 'price':row[5], 'taster_name':row[9],
                            'taster_twitter_handle':row[10], 'title':row[11], 'variety_id':variety_dict[variety]}
        wine_info.append(single_wine_info)

    csv_file.close()
    return (wine_info, winery_info, country_dict, variety_dict)

def save_wine_table(wine_info, csv_file_name):
    '''
    Save the wine table in CSV form, with each row containing
    the description, designation, review points, wine price,
    name of the wine taster, the taster's twitter handle,
    the title of the wine, and its variety id, and winery id.
    '''
    output_file = open(csv_file_name, 'w', encoding='utf-8')
    writer = csv.writer(output_file)
    for wine in wine_info:
        wine_row = [wine['description'], wine['designation'], wine['points'], wine['price'], wine['taster_name'], wine['taster_twitter_handle'], wine['title'], wine['variety_id'], wine['winery_id']]
        writer.writerow(wine_row)
    output_file.close()

def save_winery_table(winery_info, csv_file_name):
    '''
    Save the winery table in CSV form, with each row containing
    the id assigned the the winery, the id of the country the winery is in,
    the province, region, and name of the winery

    '''
    output_file = open(csv_file_name, 'w', encoding='utf-8')
    writer = csv.writer(output_file)
    for winery in winery_info:
        winery_row = [winery['id'], winery['country_id'], winery['province'], winery['region'], winery['name']]
        writer.writerow(winery_row)
    output_file.close()

def save_varieties_table(variety_dict, csv_file_name):
    '''
    Save the variety table in CSV form, with each row containing
    the variety's name and the id number assigned to it.
    '''
    output_file = open(csv_file_name, 'w', encoding='utf-8')
    writer = csv.writer(output_file)
    for variety in variety_dict:
        variety_row = [variety, variety_dict[variety]]
        writer.writerow(variety_row)
    output_file.close()

def save_countries_table(country_dict, csv_file_name):
    '''
    Save the country table in CSV form, with each row containing
    the country's name and the id number assigned to it.
    '''
    output_file = open(csv_file_name, 'w', encoding='utf-8')
    writer = csv.writer(output_file)
    for country in country_dict:
        country_row = [country, country_dict[country]]
        writer.writerow(country_row)
    output_file.close()

if __name__ == '__main__':
    print("Loading and parsing file information...")
    wine_info, winery_info, country_dict, variety_dict  = load_from_books_csv_file('winemag-data-130k-v2.csv')
    print("Starting to save wine table")
    save_wine_table(wine_info, 'wines.csv')
    print("Starting to save winery table")
    save_winery_table(winery_info, 'wineries.csv')
    print("Starting to save country table")
    save_countries_table(country_dict, 'countries.csv')
    print("Starting to save variety table")
    save_varieties_table(variety_dict, 'varieties.csv')
