"""
	booksdatasourcetest.py
	Dawson d"Almeida, Justin T. Washington, Chae Kim
	16 Oct 2018
"""

import unittest

class winedatasourcetest(unittest.TestCase):
	def setUp(self):
		#self.wine_data_source = winedatasource.WineDataSource("winemag-data-130k-v2.csv")
                pass
	def tearDown(self):
		pass

	#~~~~~~~~~~~Testing the basic search methods~~~~~~~~~~~~~#
	# Winery (Chae)
	def test_book(self):
		self.assertEqual(self.books_data_source.book(41),
			{"id":41,"title":"Middlemarch","publication-year":1871})
		self.assertEqual(self.books_data_source.book(5),
			{"id":5, "title": "Emma", "publication-year": 1815})

	# Variety (Chae)
	def test_book_no_id(self):
		self.assertRaises(ValueError, self.books_data_source.book, -1)

	# Taster (Chae)
	def test_books_author_id(self):
		self.assertEqual(self.books_data_source.books(author_id=22),
			[{"id":41, "title":"Middlemarch","publication-year":1871},
			{"id":42, "title":"Silas Marner", "publication-year":1861 }])
		self.assertEqual(self.books_data_source.books(author_id=4),
			[{"id":5, "title": "Emma", "publication-year": 1815},
			{"id":18, "title": "Pride and Prejudice", "publication-year": 1813},
			{"id":20, "title": "Sense and Sensibility", "publication-year": 1813}])
		self.assertEqual(self.books_data_source.books(author_id=16),
			[{"id":30, "title":"1Q84", "publication-year":2009},
			{"id":31, "title":"A Wild Sheep Chase", "publication-year":1982},
			{"id":32, "title":"Hard-Boiled Wonderland and the End of the World", "publication-year":1985}])


	# Province or Region (Justin) FINISHED
	def test_province_or_region(self):
		self.assertEqual(self.wine_data_source.basicSearch(province_or_region="Amindeo"),
			[{"country": "Greece",
			  "description": "The difficult Xinomavro grape is wrangled well by talented winemaker Hatzis, though the wine feels slightly discordant. Aromas and flavors of olive, pepper, spice and tart berry offer intriguing layers, and the finish has  sweet spice.",
			  "designation": None,
			  "points": 84,
			  "price": 20.0,
			  "province": "Amindeo",
			  "region_1": None,
			  "region_2": None,
			  "taster_name": "Susan Kostrzewa",
			  "taster_twitter_handle": "@suskostrzewa",
			  "title": "Ioannis Hatzis 2004 Xinomavro (Amindeo)",
			  "variety": "Xinomavro",
			  "winery": "Ioannis Hatzis"},
			 {"country": "Greece",
			  "description": "This Xinomavro, with its compelling nose of coffee, cinnamon spice and olive, has a rough character that both distinguishes it (showing its Greek blood) and makes it tough to embrace. Tannic and slightly tart, with an underlay of spice, the wine wants more balance and less barb.",
			  "designation": "Kelinos",
			  "points": 83,
			  "price": 35.0,
			  "province": "Amindeo",
			  "region_1": None,
			  "region_2": None,
			  "taster_name": "Susan Kostrzewa",
			  "taster_twitter_handle": "@suskostrzewa",
			  "title": "Ioannis Hatzis 2001 Kelinos Xinomavro (Amindeo)",
			  "variety": "Xinomavro",
			  "winery": "Ioannis Hatzis"}])
		self.assertEqual(lenth(self.wine_data_source.basicSearch(province_or_region="Prosecco di Valdobbiadene")),
			188)
		self.assertTrue({"country": "Italy",
						 "description": "This opens with earthy aromas of tilled wet soil and black fruit. The juicy palate offers ripe blackberry and cherry, along with hints of white pepper and spice. There's no complexity here but this hearty food-friendly red is perfect for everyday fare—thanks to its delicious fruit and freshness.",
						 "designation": "Riparosso",
						 "points": 87,
						 "price": 15.0,
						 "province": "Central Italy",
						 "region_1": "Montepulciano d'Abruzzo",
						 "region_2": None,
						 "taster_name": "Kerin O'Keefe",
						 "taster_twitter_handle": "@kerinokeefe",
						 "title": "Illuminati Dino 2012 Riparosso  (Montepulciano d'Abruzzo)",
						 "variety": "Montepulciano",
						 "winery": "Illuminati Dino"}
			is in self.wine_data_source.basicSearch(province_or_region="Montepulciano d'Abruzzo"))

	# Taste Description Text (Justin) FINISHED
	def test_description(self):
		self.assertEqual(self.wine_data_source.basicSearch(description="oak barriques"),
			[{"country": "Australia",
			"description": "Aged partly in new American Oak hogsheads and partly in used French Oak barriques, the barrel regime shows in this wine's obvious vanilla and caramel accents to its boysenberry fruit. Supple and creamy in texture before turning crisp on the finish. Drink now.",
			"designation": "Single Vineyard",
			"points": 87,
			"price": 30.0,
			"province": "South Australia",
			"region_1": "McLaren Vale",
			"region_2": None,
			"taster_name":"Joe Czerwinski",
			"taster_twitter_handle": "@JoeCz",
			"title": "Longwood 2008 Single Vineyard Shiraz (McLaren Vale)",
			"variety": "Shiraz",
			"winery": "Longwood"}])
		self.assertEqual(lenth(self.wine_data_source.basicSearch(description="oak barrique")),
			6)
		self.assertEqual(lenth(self.wine_data_source.basicSearch(description="peaches")),
			862)
		self.assertTrue({"country": "Chile",
						 "description": "Punchy citrus aromas have a tropical accent. This is soft on acidity, with flavors of grass, green fruits and bitterness that end in a swirl of green herbs and pepper. Overall, there isn't much fruit.",
						 "designation": None,
						 "points": 84,
						 "price": 12.0,
						 "province": "Curicó Valley",
						 "region_1": None,
						 "region_2": None,
						 "taster_name": "Michael Schachner",
						 "taster_twitter_handle": "@wineschach",
						 "title": "Kon Tiki 2013 Sauvignon Blanc (Curicó Valley)",
						 "variety": "Sauvignon Blanc",
						 "winery": "Kon Tiki"}
			is in self.wine_data_source.basicSearch(description="grass"))


	# Vineyard (Dawson) FINISHED
	def test_vineyard(self):
		self.assertEqual(self.wine_data_source.basicSearch(vineyard="Abras"),
			[{"country": "Argentina",
			  "description": "Brambly and wild on the nose, this Cafayate Malbec features a narrow palate with edgy, briary plum and berry flavors. This seems riper with time in the glass, but all the way through it's pinchy in feel and ultimately ends with candied sweetness.",
			  "designation": "Abras",
			  "points": 85,
			  "price": 20,
			  "province": "Other",
			  "region_1": "Cafayate",
			   "region_2": None,
			   "taster_name": "Michael Schachner",
			   "taster_twitter_handle": "@wineschach",
			   "title": "Altocedro 2013 Abras Malbec (Cafayate)",
			   "variety": "Malbec",
			   "winery": "Altocedro"}]
		self.assertEqual(lenth(self.wine_data_source.basicSearch(vineyard="Le Coq")),
			2)
		self.assertTrue({"country": "US",
		  				 "description": "Made in the Peachy Canyon style, this Zin, which contains some Petite Sirah, is very high in alcohol. It's sweet, hot and soft. The blueberry, blackberry and chocolate flavors are almost in dessert wine territory, but it's a very good example of its genre.",
		  		 		 "designation": "Vortex",
		  		 		 "points": 88,
		  		 		 "price": 36,
		  		 		 "province": "California",
		  		 		 "region_1": "Paso Robles",
		   	 			 "region_2": "Central Coast",
		   	 			 "taster_name": "Matt Kettmann",
		   	 			 "taster_twitter_handle": "@mattkettmann",
		   	 			 "title": "Peachy Canyon 2010 Vortex Zinfandel (Paso Robles)",
		   	 			 "variety": "Zinfandel",
		   	 			 "winery": "Peachy Canyon"}
			is in self.wine_data_source.basicSearch(vineyard="Vortex"))

	# Country (Dawson) FINISHED
	def test_country(self):
		self.assertEqual(self.wine_data_source.basicSearch(country="Abras"),
			[{"country": "Bosnia and Herzegovina",
			  "description": "Toasted oak and cedar notes meld into lush, ripe black plums on the nose and palate of this fruit-forward, richly concentrated wine from Bosnia and Herzegovina. It's a straightforward, accessible wine, but well balanced with smooth tannins and a bright acidity",
			  "designation": "Vranac",
			  "points": 85,
			  "price": 13,
			  "province": "Mostar",
			  "region_1": None,
			   "region_2": None,
			   "taster_name": "Anna Lee C. Iijima",
			   "taster_twitter_handle": None,
			   "title": "Winery ÄŒitluk 2007 Vranac Vranec (Mostar)",
			   "variety": "Vranec",
			   "winery": "Winery ÄŒitluk"},
			  {"country": "Bosnia and Herzegovina",
  			   "description": "A mix of red and black fruits pervade on the nose, with hints of roasted coffee beans bringing nuance. Flavors of black plum and freshly ground espresso dominate the palate.",
  			   "designation": None,
  			   "points": 88,
  			   "price": 12,
  			   "province": "Mostar",
  			   "region_1": None,
  			   "region_2": None,
  			   "taster_name": "Jeff Jenssen",
  			   "taster_twitter_handle": "@worldwineguys",
  			   "title": "Winery ÄŒitluk 2011 Blatina (Mostar)",
  			   "variety": "Blatina",
  			   "winery": "Winery ÄŒitluk"}]
		self.assertEqual(lenth(self.wine_data_source.basicSearch(country="Argentina")),
			3800)
		self.assertTrue({"country": "Italy",
		  				 "description": "Floral scents of white and yellow field flowers meld together with aromas of ripe orchard fruit. The juicy palate doles out ripe yellow apple, creamy pear, candied lemon drop and a savory hint of saline. A light mineral note lifts the finish.",
		  		 		 "designation": None,
		  		 		 "points": 89,
		  		 		 "price": 17,
		  		 		 "province": "Tuscany",
		  		 		 "region_1": "Vernaccia di San Gimignano",
		   	 			 "region_2": None,
		   	 			 "taster_name": "Kerin Oâ€™Keefe",
		   	 			 "taster_twitter_handle": "@kerinokeefe",
		   	 			 "title": "Poggio Alloro 2015  Vernaccia di San Gimignano",
		   	 			 "variety": "Vernaccia",
		   	 			 "winery": "Poggio Alloro"}
			is in self.wine_data_source.basicSearch(country="Italy"))


if __name__ == "__main__":
	unittest.main()
