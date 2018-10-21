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
	def test_winery(self):
		self.assertEqual(self.wine_data_source.basicSearch(winery="100 Percent Wine"),
			[{'country': 'US',
			'description': 'Sweet and light bodied, this wine has plenty of jasmine aromas, peach and pistachio flavors, and a rich, soft texture.',
			'designation': None,
			'points': 86,
			'price': 18,
			'province': 'California',
			'region_1': 'California',
			'region_2': 'California Other',
			'taster_name': 'Jim Gordon',
			'taster_twitter_handle': '@gordone_cellars',
			'title': '100 Percent Wine 2015 Moscato (California)',
			'variety': 'Moscato', 'winery': '100 Percent Wine'},
			{'country': 'US',
			'description': 'Herbaceous in aroma, dry and lean on the palate, this wine offers refreshment more than flavor. Light bodied, it has a tangy texture.',
			'designation': 'All Profits to Charity',
			'points': 84,
			'price': 18,
			'province': 'California',
			'region_1': 'California',
			'region_2': 'California Other',
			'taster_name': 'Jim Gordon',
			'taster_twitter_handle': '@gordone_cellars',
			'title': '100 Percent Wine 2014 All Profits to Charity Sauvignon Blanc (California)',
			'variety': 'Sauvignon Blanc',
			'winery': '100 Percent Wine'},
			{'country': 'US',
			'description': "Juicy and fresh, this deeply colored wine offers lots of grapey, berry-like aromas and equally fruity and vivid flavors. It has a touch of sweetness and a soothing, smooth texture. The name refers to the winery's pledge to give 100% \of profits to charity.",
			'designation': 'All Profits to Charity',
			'points': 89,
			'price': 18,
			'province': 'California',
			'region_1': 'California',
			'region_2': 'California Other',
			'taster_name': 'Jim Gordon',
			'taster_twitter_handle': '@gordone_cellars',
			'title': '100 Percent Wine 2012 All Profits to Charity Red (California)',
			'variety': 'Red Blend',
			'winery': '100 Percent Wine'}])
		self.assertEqual(len(self.wine_data_source.basicSearch(winery="Midnight")),
			64)
		self.assertTrue({'country': 'Germany',
						'description': "Perfumed florals mingle curiously with deep, dusty mineral notes on this bracing TBA. Sunny nectarine and tangerine flavors are mouthwatering and juicy, struck with acidity, then plunged into pools of sweet honey and nectar. It's a delightful sensory roller coaster that feels endless on the finish.",
						'designation': 'Kiedrich GrÃ¤fenberg Trockenbeerenauslese',
						'points': 95,
						'price': 775,
						'province': 'Rheingau',
						'region_1': None,
						'region_2': None,
						'taster_name': 'Anna Lee C. Iijima',
						'taster_twitter_handle': 'Iijima',
						'title': 'Robert Weil 2012 Kiedrich GrÃ¤fenberg Trockenbeerenauslese Riesling (Rheingau)',
						'variety': 'Riesling',
						'winery': 'Robert Weil'}
			is in self.wine_data_source.basicSearch(winery="Robert Weil"))
	# Variety (Chae)
	def test_variety(self):
		self.assertEqual(self.wine_data_source.basicSearch(variety="Abouriou"),
			[{'country': 'US',
			'description': "Comprised 100% \of this rare variety, this wine was given time to ferment and age in French oak, half of it new. Ashy red fruit meets a mild structure and considerable tannic grip; only a tiny amount was made.",
			'designation': 'Moonlight Sonata',
			'points': 85,
			'price': 75,
			'province': 'California',
			'region_1': 'Russian River Valley',
			'region_2': 'Sonoma',
			'taster_name': 'Virginie Boone',
			'taster_twitter_handle': '@vboone',
			'title': 'Cerridwen 2012 Moonlight Sonata Abouriou (Russian River Valley)',
			'variety': 'Abouriou',
			'winery': 'Cerridwen'},
			{'country': 'France',
			'description': "Abouriou is a grape found almost exclusively in southwest France. As here, it produces a wine that balances acidity and juicy red fruits with a herbal edge. A light layer of tannin gives a structured aftertaste. Drink now.",
			'designation': 'Just',
			'points': 87,
			'price': 15,
			'province': 'Southwest',
			'region_1': 'CÃ´tes du Marmandais',
			'region_2': None,
			'taster_name': 'Roger Voss',
			'taster_twitter_handle': '@vossroger',
			'title': 'Cave du Marmandais 2012 Just Abouriou (CÃ´tes du Marmandais)',
			'variety': 'Abouriou',
			'winery': 'Cave du Marmandais'},
			{'country': 'France',
			'description': "Despite its proximity to Bordeaux, the Marmandais has managed to retain Abouriou as its own grape variety. As part of its conservatory of some of the more obscure grape varieties, this producer has made this fine and fruity wine. It is smoky with attractive tannins and swathes of juicy black fruits. It's a fine wine to drink now.",
			'designation': None,
			'points': 91,
			'price': 15,
			'province': 'Southwest',
			'region_1': 'CÃ´tes du Marmandais',
			'region_2': None,
			'taster_name': 'Roger Voss',
			'taster_twitter_handle': '@vossroger',
			'title': 'Lionel Osmin & Cie 2014 Abouriou (CÃ´tes du Marmandais)',
			'variety': 'Abouriou',
			'winery': 'Lionel Osmin & Cie'}])
		self.assertEqual(len(self.wine_data_source.basicSearch(variety="Malbec")),
			2652)
		self.assertTrue({'country': 'Germany',
						'description': 'Perfumed florals mingle curiously with deep, dusty mineral notes on this bracing TBA. Sunny nectarine and tangerine flavors are mouthwatering and juicy, struck with acidity, then plunged into pools of sweet honey and nectar. It's a delightful sensory roller coaster that feels endless on the finish.',
						'designation': 'Kiedrich GrÃ¤fenberg Trockenbeerenauslese',
						'points': 95,
						'price': 775,
						'province': 'Rheingau',
						'region_1': None,
						'region_2': None,
						'taster_name': 'Anna Lee C. Iijima',
						'taster_twitter_handle': 'Iijima',
						'title': 'Robert Weil 2012 Kiedrich GrÃ¤fenberg Trockenbeerenauslese Riesling (Rheingau)',
						'variety': 'Riesling',
						'winery': 'Robert Weil'}
			is in self.wine_data_source.basicSearch(variety="Riesling"))

		#  Taster Name (Chae)
		def test_taster_name(self):
			self.assertEqual(len(self.wine_data_source.basicSearch(taster_name="Fiona Adams")),
				27)
			self.assertEqual(len(self.wine_data_source.basicSearch(taster_name="Sean P. Sullivan")),
				4966)
			self.assertTrue({'country': 'Germany',
							'description': 'Perfumed florals mingle curiously with deep, dusty mineral notes on this bracing TBA. Sunny nectarine and tangerine flavors are mouthwatering and juicy, struck with acidity, then plunged into pools of sweet honey and nectar. It's a delightful sensory roller coaster that feels endless on the finish.',
							'designation': 'Kiedrich GrÃ¤fenberg Trockenbeerenauslese',
							'points': 95,
							'price': 775,
							'province': 'Rheingau',
							'region_1': None,
							'region_2': None,
							'taster_name': 'Anna Lee C. Iijima',
							'taster_twitter_handle': 'Iijima',
							'title': 'Robert Weil 2012 Kiedrich GrÃ¤fenberg Trockenbeerenauslese Riesling (Rheingau)',
							'variety': 'Riesling',
							'winery': 'Robert Weil'}
				is in self.wine_data_source.basicSearch(taster_name="Anna Lee C. Iijima"))
			self.assertTrue({'country': 'France',
							'description': "Despite its proximity to Bordeaux, the Marmandais has managed to retain Abouriou as its own grape variety. As part of its conservatory of some of the more obscure grape varieties, this producer has made this fine and fruity wine. It is smoky with attractive tannins and swathes of juicy black fruits. It's a fine wine to drink now.",
							'designation': None,
							'points': 91,
							'price': 15,
							'province': 'Southwest',
							'region_1': 'CÃ´tes du Marmandais',
							'region_2': None,
							'taster_name': 'Roger Voss',
							'taster_twitter_handle': '@vossroger',
							'title': 'Lionel Osmin & Cie 2014 Abouriou (CÃ´tes du Marmandais)',
							'variety': 'Abouriou',
							'winery': 'Lionel Osmin & Cie'}
				is in self.wine_data_source.basicSearch(taster_name="Roger Voss"))


if __name__ == "__main__":
	unittest.main()
