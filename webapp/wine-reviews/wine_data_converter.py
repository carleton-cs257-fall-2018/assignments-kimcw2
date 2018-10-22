#!/usr/bin/env python3
'''
    wine_data_converter.py
    Chae Kim, Justin Washington, Dawson D'Almeida, 21 October 2018

    Sample code illustrating a simple conversion of the
    books & authors dataset represented as in books_and_authors.csv,
    into the books, authors, and books_authors tables (in
    CSV form).

    This is trickier than my json_to_tables.py example,
    because in the books.csv file, the authors are implicit
    in the list of books rather than being separated out
    into their own data structure as they are in the
    books_and_authors.json file.
'''
import sys
import re
import csv

def load_from_books_csv_file(csv_file_name):
    ''' Collect all the data from my sample books_and_authors.csv file,
        assembling it into a list of books, a dictionary of authors,
        and a list of book/author ID links. Rather than fully
        documenting the data structures built in this function and
        used in the later functions, I'm going to let you play around
        with it. I recommend just sticking some print statements
        in various places (or set some breakpoints if you use an IDE
        for Python, like PyCharm). You might find it interesting to
        figure out why I needed to use a dictionary for authors, but not
        for books.
    '''
    csv_file = open(csv_file_name, encoding='utf-8')
    reader = csv.reader(csv_file)

    single_winery_info = {}
    single_wine_info = {}
    wine_info = []
    winery_info = []
    winery_list = []
    for row in reader:
        assert len(row) == 14
        winery = row[13]
        id = row[0]
        if winery not in winery_list:
            winery_list.append(winery)
            single_winery_info = {'id': id, 'country': row[1], 'province': row[6], 'region_1': row[7], 'region_2': row[8], 'winery': winery}
            winery_info.append(single_winery_info)
        single_wine_info = {'id': id, 'description':row[2], 'designation': row[3], 'points':row[4], 'price':row[5], 'taster_name':row[9],
                            'taster_twitter_handle':row[10], 'title':row[11], 'variety':row[12], 'winery':winery}
        wine_info.append(single_wine_info)

    csv_file.close()
    return (wine_info, winery_info, winery_list)

"""
def authors_from_authors_string(authors_string):
    ''' Returns a list of authors based on an "authors string". Each author in
        the returned list is represented as a 4-tuple:

            (last_name, first_name, birth_year, death_year)

        The "authors string" will have the form

            FirstName LastName (BirthYear-DeathYear)

        where DeathYear can be the empty string and FirstName can be multiple
        names. The authors string can also have more than one author separated
        by " and ":

            FirstName LastName (BirthYear-DeathYear) and FirstName2 LastName2 (BirthYear2-DeathYear2)

        Obviously, this is a hack job, and will break pathetically in all sorts
        of situations (e.g. three authors using commas and only one " and ").
        But it works for my toy example (which contains exactly one co-written book).
    '''
    authors = []
    single_author_strings = authors_string.split(' and ')
    for single_author_string in single_author_strings:
        match = re.search(r'(.*) ([^ ]+) \(([0-9]+)-([0-9]*)\)', single_author_string)
        if match:
            first_name = match.group(1)
            last_name = match.group(2)
            birth_year = match.group(3)
            death_year = match.group(4)
            author = (last_name, first_name, birth_year, death_year)
            authors.append(author)
        else:
            print('Badly formatted authors string: {0}'.format(authors_string), file=sys.stderr)

    return authors
"""

def save_wine_table(wine_info, csv_file_name):
    ''' Save the wine_info table in CSV form, with each row containing
        (//TODO FILL IN). '''
    output_file = open(csv_file_name, 'w', encoding='utf-8')
    writer = csv.writer(output_file)
    for wine in wine_info:
        wine_row = [wine['id'], wine['description'], wine['designation'], wine['points'], wine['price'], wine['taster_name'], wine['taster_twitter_handle'], wine['title'], wine['variety'], wine['winery']]
        writer.writerow(wine_row)
    output_file.close()

def save_winery_table(winery_info, csv_file_name):
    ''' Save the winery_info table in CSV form, with each row containing
        (//TODO FILL IN) '''
    output_file = open(csv_file_name, 'w', encoding='utf-8')
    writer = csv.writer(output_file)
    for winery in winery_info:
        winery_row = [winery['id'], winery['country'], winery['province'], winery['region_1'], winery['region_2'], winery['winery']]
        writer.writerow(winery_row)
    output_file.close()

"""
def save_linking_table(books_authors, csv_file_name):
    ''' Save the books in CSV form, with each row containing
        (book id, author id). '''
    output_file = open(csv_file_name, 'w', encoding='utf-8')
    writer = csv.writer(output_file)
    for book_author in books_authors:
        books_authors_row = [book_author['book_id'], book_author['author_id']]
        writer.writerow(books_authors_row)
    output_file.close()
"""

if __name__ == '__main__':
    print("Loading and parsing file information...")
    wine_info, winery_info, winery_list = load_from_books_csv_file('winemag-data-130k-v2.csv')
    print("Starting to save wine table")
    save_wine_table(wine_info, 'wine.csv')
    print("Starting to save winery table")
    save_winery_table(winery_info, 'winery.csv')
