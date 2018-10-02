"""
CS 257 Assignment Using APIs - Chae Kim
"""

import requests
import sys

if len(sys.argv) > 0:
    print("\nUsage: This program allows user to search artists and take the corresponding ID number to gain more information")
    print("No need to put in any arguments.", file = sys.stderr)

print("Please answer the following questions")

print("***************************************************************************************************")
search_artist = input("Which artist would you like to search? ")
print("***************************************************************************************************")
r = requests.get("http://api.musixmatch.com/ws/1.1/artist.search",
    params = {"apikey": "06bc14094277cad45208f53970a03311", "q_artist": str(search_artist)})
    # make q_artist another inputted value
artist_id_list = []
empty = None

print(r.url)

if len(r.json()["message"]["body"]["artist_list"]) == 0:
    print("\nNo artist found.  Please try again next time!\n")
    exit()

print("***************************************************************************************************")

for j in r.json()["message"]["body"]["artist_list"]:
    print(j['artist']['artist_id'], j['artist']['artist_name'])
    artist_id_list.append(j['artist']['artist_id'])

print("***************************************************************************************************")
artist_id = input("Which artist_id would you like to search? ")
print("***************************************************************************************************")

worked = False
while not worked:
    try:
        int(artist_id)
        worked = True
    except:
        artist_id = input("artist_id must be an integer.  Please re-enter: ")


for j in r.json()["message"]["body"]["artist_list"]:
    if j['artist']['artist_id'] == int(artist_id):
        empty = j

print("Result for artist_id ", artist_id, ":",empty['artist']['artist_name'])
for info in empty['artist'].keys():
    print(info, ":  ", empty['artist'][info])
