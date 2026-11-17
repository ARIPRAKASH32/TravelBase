const travelPackages = [
  {
    "id": "bali-escape",
    "name": "Bali Island Escape",
    "destination": "Bali, Indonesia",
    "location": "Indonesia",
    "days": 7,
    "nights": 6,
    "price": 129000,
    "category": "Beach",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    "description": "A considered island itinerary pairing Ubud's green hills with the clear-water beaches of southern Bali.",
    "includes": [
      "6 nights in boutique 4-star hotels",
      "Daily gourmet breakfast",
      "Private airport transfers",
      "Guided Ubud & temple tour",
      "Air-conditioned private transport"
    ],
    "excludes": [
      "International airfare",
      "Travel insurance",
      "Personal expenses"
    ],
    "hotel": "Komaneka at Bisma or comparable boutique retreat",
    "transport": "Private air-conditioned vehicle with dedicated driver",
    "itinerary": [
      "Arrive Denpasar and transfer to Ubud",
      "Explore Ubud market, rice terraces and craft villages",
      "Tirta Empul temple and organic Balinese lunch",
      "Transfer to coastal Seminyak with waterfall stop",
      "Leisure day by the Indian Ocean",
      "Uluwatu cliffside sunset and fire dance",
      "Breakfast and departure"
    ],
    "policy": "Cancel 30 days prior to departure for full refund."
  },
  {
    "id": "swiss-alpine",
    "name": "Swiss Alpine Discovery",
    "destination": "Lucerne & Interlaken, Switzerland",
    "location": "Switzerland",
    "days": 8,
    "nights": 7,
    "price": 248000,
    "category": "Nature",
    "image": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80",
    "description": "A scenic rail journey through lakeside Lucerne and dramatic peaks of the Bernese Oberland.",
    "includes": [
      "7 nights in centrally located alpine hotels",
      "Daily breakfast buffet",
      "Swiss Travel Pass 1st class",
      "Jungfraujoch Top of Europe excursion",
      "24/7 concierge support"
    ],
    "excludes": [
      "International flights",
      "Lunches and dinners",
      "Travel insurance"
    ],
    "hotel": "Hotel Waldst\u00e4tterhof Lucerne & Romantik Hotel Schweizerhof",
    "transport": "Swiss Travel Pass by panorama rail and mountain cogwheel",
    "itinerary": [
      "Arrive Zurich and scenic rail to Lucerne",
      "Old Town promenade and Lake Lucerne cruise",
      "Mount Pilatus dragon ride",
      "GoldenPass Express to Interlaken",
      "Lauterbrunnen valley of 72 waterfalls",
      "Jungfraujoch ice palace",
      "Leisure alpine exploration",
      "Return rail to Zurich for departure"
    ],
    "policy": "Cancel 45 days prior for full refund."
  },
  {
    "id": "kyoto-culture",
    "name": "Kyoto Culture Trail",
    "destination": "Kyoto & Osaka, Japan",
    "location": "Japan",
    "days": 6,
    "nights": 5,
    "price": 174000,
    "category": "Culture",
    "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    "description": "Ancient shrines, serene zen gardens and world-renowned gastronomy across Kansai.",
    "includes": [
      "5 nights in handpicked luxury ryokan & hotels",
      "Traditional Kaiseki dinner experience",
      "Private tea ceremony masterclass",
      "JR regional rail pass",
      "Bilingual heritage guide"
    ],
    "excludes": [
      "International airfare",
      "Personal shopping",
      "Travel insurance"
    ],
    "hotel": "The Gate Hotel Kyoto & Boutique Ryokan Gion",
    "transport": "Shinkansen bullet train and private executive transfers",
    "itinerary": [
      "Arrive Kansai International and scenic transfer to Kyoto",
      "Fushimi Inari torii gates at sunrise",
      "Arashiyama bamboo grove & Tenryu-ji temple",
      "Uji tea tasting and Nishiki market food walk",
      "Bullet train excursion to Osaka Castle and Dotonbori",
      "Farewell matcha and departure"
    ],
    "policy": "Cancel 21 days prior for full refund."
  },
  {
    "id": "amalfi-coast",
    "name": "Amalfi Coast Slow Escape",
    "destination": "Amalfi Coast, Italy",
    "location": "Italy",
    "days": 7,
    "nights": 6,
    "price": 219000,
    "category": "Coastal",
    "image": "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1000&q=80",
    "description": "Pastel cliffside villages, azure Tyrrhenian waters, and authentic Mediterranean flavours.",
    "includes": [
      "6 nights in cliff-view boutique hotel",
      "Daily artisan breakfast",
      "Private Capri yacht day charter",
      "Limoncello grove tasting & cooking class",
      "Naples airport private transfers"
    ],
    "excludes": [
      "International flights",
      "Tourist city taxes",
      "Personal expenses"
    ],
    "hotel": "Hotel Poseidon Positano or Villa Cimbrone Ravello",
    "transport": "Private Mercedes transfer and private motor yacht",
    "itinerary": [
      "Private transfer from Naples to Positano",
      "Cliff walk along Path of the Gods",
      "Capri island cruise and Blue Grotto",
      "Ravello gardens and music villa",
      "Amalfi cathedral and pastry sampling",
      "Sunset dinner overlooking Positano bay",
      "Transfer to Naples for flight home"
    ],
    "policy": "Cancel 30 days prior for full refund."
  },
  {
    "id": "serengeti-safari",
    "name": "Serengeti Great Migration",
    "destination": "Serengeti National Park, Tanzania",
    "location": "Tanzania",
    "days": 8,
    "nights": 7,
    "price": 310000,
    "category": "Wildlife",
    "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
    "description": "Witness the spectacle of the wild with expert guides in Tanzania's premier game reserves.",
    "includes": [
      "7 nights in luxury tented camps and safari lodges",
      "All park conservation fees",
      "Full-board gourmet bush dining",
      "Custom 4x4 open-roof safari vehicle",
      "Professional wildlife tracker"
    ],
    "excludes": [
      "International flights",
      "Hot air balloon upgrade",
      "Staff gratuities"
    ],
    "hotel": "Four Seasons Safari Lodge Serengeti & Ngorongoro Serena Lodge",
    "transport": "Customized 4x4 Land Cruiser with pop-up roof and bush flights",
    "itinerary": [
      "Bush flight into Serengeti airstrip",
      "Full day big five game drive",
      "Tracking the Great Migration herds",
      "Grumeti river crossing viewing",
      "Descent into Ngorongoro Crater floor",
      "Maasai cultural village visit",
      "Sunrise balloon safari and champagne breakfast",
      "Return flight to Kilimanjaro"
    ],
    "policy": "Cancel 60 days prior for full refund."
  },
  {
    "id": "golden-triangle",
    "name": "Golden Triangle Heritage",
    "destination": "Delhi, Agra & Jaipur, India",
    "location": "India",
    "days": 6,
    "nights": 5,
    "price": 38900,
    "category": "Heritage",
    "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
    "description": "The quintessential royal circuit covering Mughal monuments, pink sandstone forts and vibrant bazaars.",
    "includes": [
      "5 nights in 5-star heritage hotels",
      "Daily breakfast",
      "Sunrise Taj Mahal private tour",
      "Chauffeur-driven luxury car",
      "Monument entrance tickets & historians"
    ],
    "excludes": [
      "Domestic/International flights",
      "Meals not specified",
      "Personal shopping"
    ],
    "hotel": "The Imperial New Delhi, ITC Mughal Agra & Rambagh Palace Jaipur",
    "transport": "Chauffeur-driven private luxury sedan with Wi-Fi",
    "itinerary": [
      "Arrive New Delhi, Old Delhi heritage tour",
      "Drive to Agra, sunset view of Taj Mahal from Mehtab Bagh",
      "Sunrise at Taj Mahal and Agra Fort",
      "Fatehpur Sikri en route to Jaipur",
      "Amber Fort ascent, City Palace, Hawa Mahal",
      "Jaipur handicraft exploration and return to Delhi"
    ],
    "policy": "Cancel 14 days prior for full refund."
  },
  {
    "id": "kerala-backwaters",
    "name": "Kerala Backwaters & Hills",
    "destination": "Kochi, Munnar & Alleppey, India",
    "location": "India",
    "days": 6,
    "nights": 5,
    "price": 34900,
    "category": "Nature",
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
    "description": "Tea hills, misty valleys and a relaxing night cruise through palm-fringed backwaters.",
    "includes": [
      "4 nights in plantation resorts + 1 night private AC houseboat",
      "All meals on houseboat",
      "Ayurvedic rejuvenation session",
      "Spice garden tour",
      "Private chauffeur throughout"
    ],
    "excludes": [
      "Airfare",
      "Personal expenses",
      "Camera fees"
    ],
    "hotel": "Brunton Boatyard Kochi, Windermere Munnar & Luxury Houseboat",
    "transport": "Private AC vehicle and private deluxe kettuvallam houseboat",
    "itinerary": [
      "Kochi historic Fort Cochin and Chinese nets",
      "Scenic drive through Western Ghats to Munnar",
      "Tea plantation walk and tea museum",
      "Alleppey backwaters check-in on private houseboat",
      "Sunset cruise through tranquil canals and paddy fields",
      "Return to Kochi for departure"
    ],
    "policy": "Cancel 14 days prior for full refund."
  },
  {
    "id": "jaipur-heritage",
    "name": "Jaipur Heritage Weekend",
    "destination": "Jaipur, Rajasthan, India",
    "location": "India",
    "days": 4,
    "nights": 3,
    "price": 26900,
    "category": "Culture",
    "image": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=80",
    "description": "A refined, locally guided exploration of Jaipur's hilltop fortresses, rose-coloured lanes and royal cuisine.",
    "includes": [
      "3 nights in restored heritage Haveli",
      "Daily breakfast",
      "Private airport transfers",
      "Curated old city street food trail",
      "Heritage monument access with licensed historian"
    ],
    "excludes": [
      "Flights",
      "Lunches and dinners",
      "Shopping"
    ],
    "hotel": "Samode Haveli or Alsisar Haveli Jaipur",
    "transport": "Private executive sedan with English-speaking chauffeur",
    "itinerary": [
      "Arrive Jaipur, check in to historic haveli",
      "Amber Fort, Panna Meena Kund and Jal Mahal",
      "City Palace, Jantar Mantar and evening bazaar tour",
      "Royal Rajasthani breakfast and transfer to airport"
    ],
    "policy": "Cancel 7 days prior for full refund."
  },
  {
    "id": "ladakh-high-passes",
    "name": "Ladakh High Passes",
    "destination": "Leh & Nubra Valley, India",
    "location": "India",
    "days": 8,
    "nights": 7,
    "price": 68900,
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1000&q=80",
    "description": "Cross high mountain passes to ancient cliffside gompas, Nubra sand dunes, and turquoise Pangong Lake.",
    "includes": [
      "7 nights in premier hotels and luxury glamping camps",
      "Daily breakfast and dinner",
      "Private 4x4 vehicle with experienced mountain driver",
      "Inner Line permits and wildlife fees",
      "Oxygen cylinder and high-altitude support"
    ],
    "excludes": [
      "Flights to/from Leh",
      "Personal medical expenses",
      "Travel insurance"
    ],
    "hotel": "The Grand Dragon Leh & Organic Luxury Camp Nubra",
    "transport": "Private Toyota Fortuner / Innova 4x4",
    "itinerary": [
      "Arrive Leh and complete acclimatisation day",
      "Shanti Stupa, Leh Palace and Hall of Fame",
      "Khardung La pass (17,582 ft) to Nubra Valley",
      "Diskit Monastery and Hunder double-humped camel safari",
      "Shyok river route to dramatic Pangong Tso Lake",
      "Chang La pass return to Leh",
      "Thiksey and Hemis monasteries",
      "Departure flight over the Himalayas"
    ],
    "policy": "Cancel 20 days prior for full refund."
  },
  {
    "id": "marrakech-sahara",
    "name": "Marrakech & Sahara Journey",
    "destination": "Marrakech, Morocco",
    "location": "Morocco",
    "days": 9,
    "nights": 8,
    "price": 186000,
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80",
    "description": "A guided route from Marrakech's vibrant medina through the High Atlas Mountains to a tranquil Sahara desert luxury camp.",
    "includes": [
      "8 nights in charming riads & luxury desert camp",
      "Daily breakfast and authentic Moroccan dinners",
      "Atlas Mountain 4x4 transport with local Berber guide",
      "Sunset camel trek across golden dunes",
      "Marrakech souk & Bahia Palace tour"
    ],
    "excludes": [
      "International airfare",
      "Lunches and drinks",
      "Gratuities"
    ],
    "hotel": "Riad Kheirredine Marrakech & Desert Luxury Camp Merzouga",
    "transport": "Chauffeured 4x4 climate-controlled SUV",
    "itinerary": [
      "Arrive Marrakech and welcome mint tea at riad",
      "Explore historic medina, Koutoubia and souks",
      "Cross Tizi n'Tichka pass to UNESCO Ait Benhaddou",
      "Dades Gorge rose valley canyon walk",
      "Erg Chebbi dunes and sunset camel ride into deep camp",
      "Stargazing and Berber drum music under Sahara skies",
      "Ouarzazate film studios on scenic return",
      "Jardin Majorelle and Yves Saint Laurent museum",
      "Farewell breakfast and airport departure"
    ],
    "policy": "Cancel 30 days prior for full refund."
  },
  {
    "id": "queenstown-outdoors",
    "name": "Queenstown Outdoor Break",
    "destination": "Queenstown, New Zealand",
    "location": "New Zealand",
    "days": 5,
    "nights": 4,
    "price": 156000,
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1000&q=80",
    "description": "A compact South Island stay with a Milford Sound day cruise and freedom to choose your own alpine adventure.",
    "includes": [
      "4 nights in boutique lakeside hotel",
      "Daily breakfast",
      "Milford Sound premium nature cruise",
      "Lake Wakatipu vintage steamship cruise",
      "Airport executive transfers"
    ],
    "excludes": [
      "International airfare",
      "Extreme adventure add-ons",
      "Travel insurance"
    ],
    "hotel": "The Rees Hotel Queenstown or Eichardt's Private Hotel",
    "transport": "Glass-roofed luxury coach & catamaran cruise",
    "itinerary": [
      "Arrive Queenstown and scenic transfer to Lake Wakatipu",
      "Bob's Peak Skyline Gondola and luge rides",
      "Milford Sound wilderness cruise beneath Mitre Peak",
      "Gibbston Valley wine trail tasting and Arrowtown gold rush village",
      "Departure from Queenstown Airport"
    ],
    "policy": "Cancel 25 days prior for full refund."
  },
  {
    "id": "paris-romance",
    "name": "Parisian Arts & Romance",
    "destination": "Paris, France",
    "location": "France",
    "days": 6,
    "nights": 5,
    "price": 195000,
    "category": "Culture",
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    "description": "Haute cuisine, world-class Louvre art collections, romantic Seine river evenings, and Montmartre cobblestone walks.",
    "includes": [
      "5 nights in boutique hotel in Saint-Germain-des-Pr\u00e9s",
      "Daily continental breakfast & afternoon tea",
      "Skip-the-line Louvre & Mus\u00e9e d'Orsay passes",
      "Private Seine River sunset dinner cruise",
      "Palace of Versailles guided excursion"
    ],
    "excludes": [
      "Airfare",
      "Personal shopping",
      "City tourist tax"
    ],
    "hotel": "H\u00f4tel Dame des Arts or Le Pavillon de la Reine",
    "transport": "Private Mercedes airport chauffeur & metro day passes",
    "itinerary": [
      "Arrive Charles de Gaulle, private transfer to Saint-Germain",
      "Louvre Museum masterpiece tour and Tuileries Gardens",
      "Montmartre artists' square and Sacr\u00e9-C\u0153ur panorama",
      "Ch\u00e2teau de Versailles Hall of Mirrors private tour",
      "Latin Quarter bakery trail & Seine champagne cruise",
      "Breakfast, Marais shopping and departure"
    ],
    "policy": "Cancel 21 days prior for full refund."
  },
  {
    "id": "santorini-aegean",
    "name": "Santorini Sunset & Aegean Isles",
    "destination": "Santorini, Greece",
    "location": "Greece",
    "days": 6,
    "nights": 5,
    "price": 182000,
    "category": "Coastal",
    "image": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
    "description": "Whitewashed cliffside villas, volcanic caldera vistas, world-famous Oia sunsets, and serene Aegean waters.",
    "includes": [
      "5 nights in caldera-view cave suite with plunge pool",
      "Daily gourmet Greek breakfast on terrace",
      "Semi-private luxury catamaran caldera cruise with BBQ",
      "Santorini volcanic wine tasting tour",
      "Private airport/port transfers"
    ],
    "excludes": [
      "International flights",
      "Gratuities",
      "Personal expenses"
    ],
    "hotel": "Canaves Oia Suites or Grace Hotel Santorini",
    "transport": "Private executive Mercedes van and sailing catamaran",
    "itinerary": [
      "Arrive Thira Airport and check into cliffside suite",
      "Oia village walk, blue domes, and castle sunset",
      "Volcanic island sailing, hot springs dip and fresh seafood BBQ",
      "Akrotiri prehistoric ruins & Red Beach photo stop",
      "Estate Argyros volcanic vineyard tasting",
      "Leisure breakfast and farewell transfer"
    ],
    "policy": "Cancel 30 days prior for full refund."
  },
  {
    "id": "tokyo-modern-tradition",
    "name": "Tokyo Neon & Ancient Shrines",
    "destination": "Tokyo, Japan",
    "location": "Japan",
    "days": 7,
    "nights": 6,
    "price": 189000,
    "category": "Culture",
    "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
    "description": "Futuristic skyline wonders of Shinjuku and Shibuya paired with centuries-old Senso-ji temple serenity.",
    "includes": [
      "6 nights in upscale central Ginza hotel",
      "Daily breakfast buffet",
      "Private Tokyo highlights walking tour with local guide",
      "teamLab Planets digital art immersive ticket",
      "Sumo stable morning practice access or Tsukiji food tour"
    ],
    "excludes": [
      "International airfare",
      "Meals not mentioned",
      "Travel insurance"
    ],
    "hotel": "The Capitol Hotel Tokyu or Cerulean Tower Tokyu",
    "transport": "Suica rail card loaded with \u00a510,000 & airport limousine bus",
    "itinerary": [
      "Arrive Haneda/Narita and settle into Ginza hotel",
      "Senso-ji Temple Asakusa and Tokyo Skytree panorama",
      "Meiji Shrine sacred forest and Shibuya Crossing",
      "Tsukiji outer market sushi breakfast and teamLab immersive art",
      "Akihabara electronics and Roppongi Hills night view",
      "Day trip excursion to Mount Fuji & Lake Kawaguchiko",
      "Ginza shopping and departure"
    ],
    "policy": "Cancel 21 days prior for full refund."
  },
  {
    "id": "rome-eternal-city",
    "name": "Rome Eternal City & Vatican",
    "destination": "Rome, Italy",
    "location": "Italy",
    "days": 6,
    "nights": 5,
    "price": 175000,
    "category": "Heritage",
    "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80",
    "description": "Walk in the footsteps of emperors and gladiators through the Colosseum, Roman Forum, Trevi Fountain, and Sistine Chapel.",
    "includes": [
      "5 nights in boutique hotel near Piazza Navona",
      "Daily Italian breakfast",
      "VIP Colosseum underground & gladiators arena tour",
      "Skip-the-line Vatican Museums & Sistine Chapel early access",
      "Handmade pasta and tiramisu cooking masterclass"
    ],
    "excludes": [
      "International flights",
      "Rome city lodging tax",
      "Personal expenses"
    ],
    "hotel": "Hotel Raphael Relais & Ch\u00e2teaux or Bio Hotel Rapha\u00ebl",
    "transport": "Private airport transfers & chauffeur service",
    "itinerary": [
      "Arrive Rome Fiumicino, private transfer to historic centre",
      "Colosseum, Roman Forum & Palatine Hill imperial walk",
      "Pantheon, Trevi Fountain toss and Piazza Navona gelato trail",
      "Vatican City: St. Peter's Basilica & Sistine Chapel frescoes",
      "Trastevere evening culinary walking tour",
      "Espresso at Piazza del Popolo and airport departure"
    ],
    "policy": "Cancel 21 days prior for full refund."
  },
  {
    "id": "maldives-overwater",
    "name": "Maldives Overwater Luxury",
    "destination": "Male Atoll, Maldives",
    "location": "Maldives",
    "days": 5,
    "nights": 4,
    "price": 265000,
    "category": "Beach",
    "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
    "description": "Floating over crystal turquoise lagoons in an iconic overwater villa with direct coral reef access.",
    "includes": [
      "4 nights in private overwater pool villa",
      "All-inclusive premium dine-around plan",
      "Round-trip scenic seaplane or speed-boat transfer",
      "Guided coral reef snorkeling with marine biologist",
      "Sunset dolphin yacht cruise with champagne"
    ],
    "excludes": [
      "International airfare",
      "Scuba dive certification courses",
      "Spa treatments"
    ],
    "hotel": "Anantara Dhigu Maldives Resort or Baros Maldives",
    "transport": "Scenic twin-otter seaplane transfers across atolls",
    "itinerary": [
      "Arrive Velana International and seaplane transfer to resort",
      "Unpack in overwater villa, private sun deck relaxation",
      "Snorkeling safari spotting sea turtles and reef sharks",
      "Sunset dolphin cruise and romantic beach dining",
      "Paddle boarding and coral nursery planting project",
      "Seaplane flight back to Male for departure"
    ],
    "policy": "Cancel 35 days prior for full refund."
  },
  {
    "id": "dubai-desert-glamour",
    "name": "Dubai Desert Dunes & Skyline",
    "destination": "Dubai, United Arab Emirates",
    "location": "United Arab Emirates",
    "days": 5,
    "nights": 4,
    "price": 88000,
    "category": "Luxury",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    "description": "Ultra-modern architecture, soaring Burj Khalifa vistas, luxury yacht cruises, and exhilarating desert red dune bashing.",
    "includes": [
      "4 nights in 5-star Dubai Marina or Downtown hotel",
      "Daily breakfast buffet",
      "Burj Khalifa At The Top Level 124 & 125 ticket",
      "Red dune desert safari with BBQ dinner & show",
      "Dubai Marina shared luxury yacht cruise with skyline views"
    ],
    "excludes": [
      "Flights",
      "UAE tourist dirham fee",
      "Shopping"
    ],
    "hotel": "Address Downtown Dubai or Grosvenor House Dubai",
    "transport": "Private AC sedan for city tours & 4x4 Land Cruiser in desert",
    "itinerary": [
      "Arrive Dubai International, private transfer to hotel",
      "Museum of the Future, Dubai Mall and Burj Khalifa sunset",
      "Old Dubai abra boat ride, Gold and Spice Souks",
      "4x4 Desert Safari: dune bashing, camel ride & fire show BBQ",
      "Marina yacht cruise, Palm Jumeirah and departure transfer"
    ],
    "policy": "Cancel 14 days prior for full refund."
  },
  {
    "id": "iceland-northern-lights",
    "name": "Iceland Aurora & Glacial Wonders",
    "destination": "Reykjavik & South Coast, Iceland",
    "location": "Iceland",
    "days": 7,
    "nights": 6,
    "price": 235000,
    "category": "Adventure",
    "image": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1000&q=80",
    "description": "Hunt for the ethereal Aurora Borealis across black sand beaches, frozen waterfalls, and geothermal lagoons.",
    "includes": [
      "6 nights in quality Nordic boutique hotels",
      "Daily Scandinavian breakfast",
      "Golden Circle private tour (Thingvellir, Geysir, Gullfoss)",
      "Blue Lagoon retreat spa admission with silica mask",
      "Super Jeep Northern Lights guided expedition"
    ],
    "excludes": [
      "International flights",
      "Winter extreme gear rental",
      "Lunches & dinners"
    ],
    "hotel": "ION Adventure Hotel & The Reykjavik EDITION",
    "transport": "Customized 4x4 Super Jeep with glacier capabilities",
    "itinerary": [
      "Arrive Keflavik, unwind in geothermal Blue Lagoon waters",
      "Golden Circle: Gullfoss waterfall and erupting Strokkur geyser",
      "South Coast: Seljalandsfoss waterfall & Reynisfjara black beach",
      "Skaftafell glacier hike and Jokulsarlon iceberg lagoon",
      "Night hunt for Aurora Borealis under dark Nordic skies",
      "Reykjavik cultural exploration & Harpa concert hall",
      "Departure transfer to Keflavik"
    ],
    "policy": "Cancel 30 days prior for full refund."
  },
  {
    "id": "machu-picchu-sacred",
    "name": "Machu Picchu & Sacred Valley",
    "destination": "Cusco & Machu Picchu, Peru",
    "location": "Peru",
    "days": 7,
    "nights": 6,
    "price": 215000,
    "category": "Heritage",
    "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=80",
    "description": "Incan citadel shrouded in Andean mist, Sacred Valley weaving villages, and historic cobblestone Cusco.",
    "includes": [
      "6 nights in historic Incan-colonial boutique hotels",
      "Daily breakfast & 3 Andean gourmet lunches",
      "Hiram Bingham luxury train to Aguas Calientes",
      "Machu Picchu private guided sanctuary tour with permit",
      "Sacred Valley Ollantaytambo fortress excursion"
    ],
    "excludes": [
      "International flights to Lima",
      "Gratuities",
      "Travel insurance"
    ],
    "hotel": "Belmond Hotel Monasterio Cusco & Inkaterra Machu Picchu",
    "transport": "Panoramic Vistadome / Hiram Bingham train and private van",
    "itinerary": [
      "Arrive Cusco, coca tea welcome and altitude acclimatisation",
      "Cusco historic walking tour: Plaza de Armas and Qorikancha",
      "Sacred Valley: Pisac artisan market and Ollantaytambo ruins",
      "Scenic train ride along Urubamba river to Machu Picchu",
      "Dawn entry to Machu Picchu citadel with expert archaeologist",
      "Sun Gate hike and return rail to Cusco",
      "Breakfast and departure transfer"
    ],
    "policy": "Non-refundable Machu Picchu sanctuary permit; balance refundable 30 days prior."
  },
  {
    "id": "norwegian-fjords",
    "name": "Norwegian Fjords Explorer",
    "destination": "Bergen & Geirangerfjord, Norway",
    "location": "Norway",
    "days": 8,
    "nights": 7,
    "price": 255000,
    "category": "Nature",
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    "description": "Cruising mirror-like fjords beneath cascading waterfalls and boarding the scenic Fl\u00e5m mountain railway.",
    "includes": [
      "7 nights in premier fjord-side heritage hotels",
      "Daily Nordic breakfast buffet",
      "UNESCO Geirangerfjord electric catamaran cruise",
      "Fl\u00e5m Railway panorama mountain ride",
      "Bergen Bryggen UNESCO wharf walking tour"
    ],
    "excludes": [
      "International airfare",
      "Lunches and dinners",
      "Personal expenses"
    ],
    "hotel": "Hotel Union Geiranger & Radisson Blu Royal Bergen",
    "transport": "Eco-electric fjord cruisers and panorama mountain trains",
    "itinerary": [
      "Arrive Bergen, check in to historic Bryggen wharf",
      "Fl\u00f8ibanen funicular for city views, fish market seafood lunch",
      "Scenic drive and ferry towards Sognefjord",
      "Fl\u00e5m Railway journey scaling steep alpine valleys",
      "Geirangerfjord cruise past Seven Sisters waterfall",
      "Eagle Road viewpoint over the blue waters",
      "Return journey to Bergen through glacier country",
      "Breakfast and departure flight"
    ],
    "policy": "Cancel 35 days prior for full refund."
  },
  {
    "id": "kashmir-paradise",
    "name": "Kashmir Valley & Mountain Lakes",
    "destination": "Srinagar & Gulmarg, India",
    "location": "India",
    "days": 6,
    "nights": 5,
    "price": 36500,
    "category": "Nature",
    "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80",
    "description": "Mughal gardens, serene Dal Lake shikara rides, luxury carved cedarwood houseboats, and snowfields of Gulmarg.",
    "includes": [
      "2 nights in luxury Dal Lake houseboat + 3 nights boutique resort",
      "Daily breakfast and traditional Kashmiri Wazwan dinner",
      "Shikara ride on Dal Lake at sunset",
      "Gulmarg Gondola Phase 1 & 2 tickets included",
      "Private heated vehicle with local guide"
    ],
    "excludes": [
      "Airfare to Srinagar",
      "Pony rides",
      "Personal expenses"
    ],
    "hotel": "Mascot Houseboats Dal Lake & The Khyber Himalayan Resort",
    "transport": "Dedicated private SUV with experienced valley chauffeur",
    "itinerary": [
      "Arrive Srinagar Airport, houseboat check-in and Dal Lake shikara",
      "Mughal Gardens: Shalimar Bagh, Nishat Bagh & Pari Mahal",
      "Scenic drive to Gulmarg meadow of flowers",
      "Gulmarg Gondola ascent to Apharwat Peak snow line",
      "Pahalgam day excursion: Betaab Valley & Aru Valley",
      "Old Srinagar artisan craft shopping and departure"
    ],
    "policy": "Cancel 14 days prior for full refund."
  },
  {
    "id": "goa-sun-heritage",
    "name": "Goa Coastal Serenity & Heritage",
    "destination": "North & South Goa, India",
    "location": "India",
    "days": 5,
    "nights": 4,
    "price": 22500,
    "category": "Beach",
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
    "description": "Golden sand beaches, Portuguese colonial cathedrals, fragrant spice plantations, and fresh seafood shacks.",
    "includes": [
      "4 nights in 5-star beachfront resort in South Goa",
      "Daily breakfast buffet",
      "Private South Goa heritage tour (Old Goa churches & Mangueshi)",
      "Organic spice plantation lunch & guided tour",
      "Mandovi River sunset cruise"
    ],
    "excludes": [
      "Flights",
      "Water sports",
      "Personal expenses"
    ],
    "hotel": "Taj Exotica Resort & Spa Goa or Alila Diwa Goa",
    "transport": "Chauffeured air-conditioned private vehicle",
    "itinerary": [
      "Arrive Goa Dabolim/MOPA, private transfer to beach resort",
      "Leisure day on white sands of Colva and Benaulim",
      "Basilica of Bom Jesus, Se Cathedral and Latin Quarter Fontainhas",
      "Sahakari spice plantation walk with traditional Goan lunch",
      "Mandovi sunset cruise and beachside candlelight dinner",
      "Breakfast, morning swim and airport transfer"
    ],
    "policy": "Cancel 7 days prior for full refund."
  },
  {
    "id": "varanasi-spiritual",
    "name": "Varanasi Spiritual Ganges Trail",
    "destination": "Varanasi, Uttar Pradesh, India",
    "location": "India",
    "days": 4,
    "nights": 3,
    "price": 18900,
    "category": "Culture",
    "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
    "description": "Dawn wooden boat rides on the sacred Ganges, evening Ganga Aarti ceremonies at Dashashwamedh Ghat, and Sarnath ruins.",
    "includes": [
      "3 nights in river-facing heritage Haveli on the ghats",
      "Daily breakfast",
      "Private sunrise rowing boat cruise on the Ganges",
      "VIP seats for evening Dashashwamedh Ghat Aarti",
      "Guided walking tour through ancient narrow lanes and Sarnath"
    ],
    "excludes": [
      "Airfare/train fare",
      "Monument entry tickets",
      "Shopping"
    ],
    "hotel": "BrijRama Palace Varanasi or Suryauday Haveli",
    "transport": "Private AC sedan and private hand-rowed wooden boat",
    "itinerary": [
      "Arrive Varanasi, ghat check-in and orientation walk",
      "Sunrise Ganges boat ride observing morning rituals and Manikarnika",
      "Kashi Vishwanath Temple and banarasi silk weaving studio",
      "Evening Ganga Aarti ceremony from private boat",
      "Excursion to Sarnath where Buddha gave his first sermon",
      "Morning yoga by the river, breakfast and departure"
    ],
    "policy": "Cancel 7 days prior for full refund."
  },
  {
    "id": "phuket-krabi-odyssey",
    "name": "Phuket & Phi Phi Island Odyssey",
    "destination": "Phuket & Krabi, Thailand",
    "location": "Thailand",
    "days": 6,
    "nights": 5,
    "price": 58000,
    "category": "Beach",
    "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=80",
    "description": "Limestone karst cliffs, emerald Andaman waters, speedboat island hopping to Phi Phi and Maya Bay, and vibrant Thai night markets.",
    "includes": [
      "5 nights in 4-star beachfront resort in Phuket & Krabi",
      "Daily buffet breakfast",
      "Full-day Phi Phi & Maya Bay speedboat tour with buffet lunch",
      "National park entry fees included",
      "Phuket airport round-trip private transfers"
    ],
    "excludes": [
      "International airfare",
      "Scuba diving",
      "Personal shopping"
    ],
    "hotel": "The Shore at Katathani or Centara Grand Beach Resort Krabi",
    "transport": "Speedboat transfers and private air-conditioned van",
    "itinerary": [
      "Arrive Phuket International, private transfer to beach resort",
      "Patong & Old Phuket Town Sino-Portuguese architecture trail",
      "Speedboat to Phi Phi Don, Phi Phi Leh and Maya Bay snorkeling",
      "Transfer to Krabi: Railay beach rock-climbing and emerald lagoon",
      "Sunset dinner at Ao Nang beachside bistro",
      "Breakfast, tropical smoothie and departure transfer"
    ],
    "policy": "Cancel 14 days prior for full refund."
  },
  {
    "id": "new-york-skyline",
    "name": "New York Metropolitan Highlights",
    "destination": "New York City, USA",
    "location": "United States",
    "days": 6,
    "nights": 5,
    "price": 220000,
    "category": "City",
    "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80",
    "description": "Broadway shows, Central Park horse-drawn carriages, Summit One Vanderbilt vistas, and Fifth Avenue luxury shopping.",
    "includes": [
      "5 nights in Manhattan Midtown 4-star boutique hotel",
      "Daily breakfast",
      "Summit One Vanderbilt observation deck ticket",
      "Statue of Liberty & Ellis Island ferry reserve ticket",
      "Top-tier Broadway musical evening ticket"
    ],
    "excludes": [
      "International flights",
      "US ESTA/visa fees",
      "Dinners"
    ],
    "hotel": "The Knickerbocker Times Square or Arlo Midtown",
    "transport": "Private JFK/Newark airport transfers & 7-day Unlimited MetroCard",
    "itinerary": [
      "Arrive New York, private transfer to Manhattan hotel",
      "Central Park stroll, Fifth Avenue and Rockefeller Center",
      "Statue of Liberty ferry and 9/11 Memorial & Museum",
      "High Line park walk, Chelsea Market food hall and Summit One",
      "SoHo boutique shopping, Brooklyn Bridge walk and Broadway show",
      "Breakfast, Times Square photos and departure to airport"
    ],
    "policy": "Cancel 21 days prior for full refund."
  }
];

const root = document.body.dataset.root || ".";

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return replacements[character];
  });
}

function route(path) {
  return `${root}/${path}`;
}

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function renderSiteChrome() {
  const header = document.querySelector("#site-header");

  if (header) {
    const currentPath = window.location.pathname;
    const isHome = currentPath.endsWith("index.html") || currentPath.endsWith("/") || currentPath === "" || currentPath.endsWith("TravelBase/") || currentPath.endsWith("TravelBase-main/");
    const isAbout = currentPath.includes("about.html");
    const isPackages = currentPath.includes("packages.html") || currentPath.includes("package-details.html");
    const isContact = currentPath.includes("contact.html");

    header.className = "site-header";
    header.innerHTML = `
      <div class="container nav-wrap">
        <a class="brand" href="${route("index.html")}" aria-label="TravelBase Home" style="display:inline-flex; align-items:center; gap:12px; text-decoration:none;">
          <svg viewBox="0 0 48 48" width="40" height="40" fill="none" style="flex-shrink:0;">
            <defs>
              <linearGradient id="goldGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#E5D18A"/>
                <stop offset="50%" stop-color="#C0A84A"/>
                <stop offset="100%" stop-color="#9A822E"/>
              </linearGradient>
              <linearGradient id="greenGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#244834"/>
                <stop offset="100%" stop-color="#12251A"/>
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" stroke="url(#goldGradNav)" stroke-width="1.4" opacity="0.9"/>
            <circle cx="24" cy="24" r="19" stroke="url(#goldGradNav)" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.7"/>
            <polygon points="24,2 25.5,5 24,8 22.5,5" fill="url(#goldGradNav)"/>
            <polygon points="24,46 25.5,43 24,40 22.5,43" fill="url(#goldGradNav)"/>
            <polygon points="2,24 5,25.5 8,24 5,22.5" fill="url(#goldGradNav)"/>
            <polygon points="46,24 43,25.5 40,24 43,22.5" fill="url(#goldGradNav)"/>
            <path d="M24 7 L27.5 20.5 L41 24 L27.5 27.5 L24 41 L20.5 27.5 L7 24 L20.5 20.5 Z" fill="url(#greenGradNav)" stroke="url(#goldGradNav)" stroke-width="0.8"/>
            <path d="M24 12 L26.5 21.5 L36 24 L26.5 26.5 L24 36 L21.5 26.5 L12 24 L21.5 21.5 Z" fill="url(#goldGradNav)"/>
            <circle cx="24" cy="24" r="3.5" fill="url(#greenGradNav)"/>
            <circle cx="24" cy="24" r="1.5" fill="#FFFFFF"/>
          </svg>
          <div style="display:flex; flex-direction:column; line-height:1;">
            <span style="font-family:var(--font-serif); font-size:1.6rem; font-weight:700; letter-spacing:0.04em; color:#12251A;">
              Travel<span style="color:#C0A84A; font-weight:700;">Base</span>
            </span>
            <span style="font-family:var(--font-sans); font-size:0.6rem; font-weight:700; letter-spacing:0.22em; color:#6B7A6E; text-transform:uppercase; margin-top:2px;">
              Bespoke Journeys
            </span>
          </div>
        </a>
        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="main-nav-links">
          <i class="bi bi-list"></i>
        </button>
        <nav id="main-nav-links" class="nav-links" aria-label="Main navigation">
          <a class="${isHome ? "active" : ""}" ${isHome ? 'aria-current="page"' : ""} href="${route("index.html")}">Home</a>
          <a class="${isAbout ? "active" : ""}" ${isAbout ? 'aria-current="page"' : ""} href="${route("pages/about.html")}">About</a>
          <a class="${isPackages ? "active" : ""}" ${isPackages ? 'aria-current="page"' : ""} href="${route("pages/packages.html")}">Packages</a>
          <a class="${isContact ? "active" : ""}" ${isContact ? 'aria-current="page"' : ""} href="${route("pages/contact.html")}">Contact</a>
        </nav>
        <div class="nav-actions">
          <a class="btn btn-outline btn-sm" href="${route("pages/login.html")}">Sign In</a>
          <a class="btn btn-primary btn-sm" href="${route("pages/packages.html")}">Explore Journeys</a>
        </div>
      </div>`;

    const handleHeaderScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  const footer = document.querySelector("#site-footer");

  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand" href="${route("index.html")}" style="display:inline-block;margin-bottom:18px;">
              <img src="${route("assets/img/logo-light.svg")}" alt="TravelBase" height="40" style="display:block;">
            </a>
            <p>Thoughtful trips, local expertise and the freedom to travel at your own pace. Let's make your next journey count.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <div class="footer-links">
              <a href="${route("pages/packages.html")}">Tour packages</a>
              <a href="${route("pages/about.html")}">About TravelBase</a>
              <a href="${route("pages/contact.html")}">Contact our team</a>
            </div>
          </div>
          <div>
            <h3>Get in touch</h3>
            <div class="footer-links">
              <a href="tel:+912255550184">+91 22 5555 0184</a>
              <a href="mailto:hello@travelbase.example">hello@travelbase.example</a>
              <span>Koregaon Park, Pune, Maharashtra 411001</span>
            </div>
            <p>
              <a aria-label="Instagram" href="#"><i class="bi bi-instagram"></i></a>
              &nbsp;
              <a aria-label="Facebook" href="#"><i class="bi bi-facebook"></i></a>
              &nbsp;
              <a aria-label="LinkedIn" href="#"><i class="bi bi-linkedin"></i></a>
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          © ${new Date().getFullYear()} TravelBase. Travel well, wherever you go.
        </div>
      </div>`;
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
}

function packageCard(item) {
  const detailsUrl = `${route("pages/package-details.html")}?id=${encodeURIComponent(item.id)}`;
  const nights = item.nights || Math.max(1, item.days - 1);
  const category = item.category || "Curated";
  const snippet = item.description ? (item.description.length > 90 ? item.description.slice(0, 90) + "..." : item.description) : "";

  return `
    <article class="package-card" data-category="${escapeHTML(category.toLowerCase())}">
      <div class="package-thumb-container">
        <a href="${detailsUrl}" class="package-thumb-link" aria-label="View details for ${escapeHTML(item.name)}">
          <img src="${item.image}" alt="${escapeHTML(item.destination)}" loading="lazy">
        </a>
        <span class="package-card-badge">${escapeHTML(category)}</span>
      </div>
      <div class="package-body">
        <div class="package-meta">
          <span><i class="bi bi-geo-alt"></i> ${escapeHTML(item.destination)}</span>
          <span class="package-duration-pill"><i class="bi bi-clock-history"></i> ${item.days}D / ${nights}N</span>
        </div>
        <h3><a href="${detailsUrl}">${escapeHTML(item.name)}</a></h3>
        ${snippet ? `<p class="package-snippet">${escapeHTML(snippet)}</p>` : ""}
        <div class="package-footer">
          <div class="package-price">${formatINR(item.price)} <small>/ person</small></div>
          <a class="btn btn-outline btn-sm" href="${detailsUrl}">View Details <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </article>`;
}

function showToast(message, type = "info", duration = 3500) {
  let container = document.querySelector("#tb-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "tb-toast-container";
    container.className = "tb-toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);
  }

  const icons = {
    success: "bi-check-circle-fill",
    error: "bi-exclamation-octagon-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill"
  };

  const toast = document.createElement("div");
  toast.className = `tb-toast tb-toast-${type}`;
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <div class="tb-toast-icon"><i class="bi ${icons[type] || icons.info}"></i></div>
    <div class="tb-toast-content">${escapeHTML(message)}</div>
    <button type="button" class="tb-toast-close" aria-label="Close notification">
      <i class="bi bi-x"></i>
    </button>
  `;

  const closeBtn = toast.querySelector(".tb-toast-close");
  const removeToast = () => {
    toast.classList.add("tb-toast-fadeout");
    setTimeout(() => {
      toast.remove();
      if (!container.children.length) {
        container.remove();
      }
    }, 280);
  };

  closeBtn.addEventListener("click", removeToast);
  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add("tb-toast-visible");
  });

  if (duration > 0) {
    setTimeout(removeToast, duration);
  }
}

window.showToast = showToast;

function showMessage(element, text, type) {
  if (!element) {
    return;
  }

  element.className = `alert alert-${type === "error" ? "error" : "success"}`;
  element.textContent = text;
  element.hidden = false;
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.querySelector("#contact-message");

    if (!form.reportValidity()) {
      showMessage(
        message,
        "Please check the required fields and try again.",
        "error",
      );
      showToast("Please check the required fields and try again.", "error");
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      // Fetch CSRF token for secure backend submission
      let csrfToken = "";
      try {
        const tokenRes = await fetch("/csrf-token", { credentials: "same-origin" });
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          csrfToken = tokenData.token;
        }
      } catch (_) {}

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showMessage(
          message,
          "Thank you for contacting TravelBase. Your enquiry has been received and saved.",
          "success",
        );
        showToast("Enquiry saved! Our private concierge will connect with you.", "success", 4500);
        form.reset();
        return;
      }
    } catch (_) {
      // Fallback for static demo mode
    }

    showMessage(
      message,
      "Thanks for getting in touch. Your message has been noted.",
      "success",
    );
    showToast("Thank you for your enquiry. Our luxury travel concierge will reach out promptly.", "success", 4000);
    form.reset();
  });
}

function setupBackToTop() {
  const existingBtn = document.querySelector("#back-to-top");
  if (existingBtn) return;

  const btn = document.createElement("button");
  btn.id = "back-to-top";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Scroll to top of page");
  btn.setAttribute("type", "button");
  btn.innerHTML = `<i class="bi bi-arrow-up" aria-hidden="true"></i>`;

  document.body.appendChild(btn);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSiteChrome();
  setupContactForm();
  setupBackToTop();

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});




