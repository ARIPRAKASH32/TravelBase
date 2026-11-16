"""Seed destinations and packages into MySQL travelbase_db."""
from backend.app import create_app, db
from backend.app.models import Destination, Package

SAMPLE_PACKAGES = [
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
        "includes": ["6 nights in boutique 4-star hotels", "Daily gourmet breakfast", "Private airport transfers", "Guided Ubud & temple tour", "Air-conditioned private transport"],
        "excludes": ["International airfare", "Travel insurance", "Personal expenses"],
        "hotel": "Komaneka at Bisma or comparable boutique retreat",
        "transport": "Private air-conditioned vehicle with dedicated driver",
        "itinerary": ["Arrive Denpasar and transfer to Ubud", "Explore Ubud market, rice terraces and craft villages", "Tirta Empul temple and organic Balinese lunch", "Transfer to coastal Seminyak with waterfall stop", "Leisure day by the Indian Ocean", "Uluwatu cliffside sunset and fire dance", "Breakfast and departure"],
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
        "includes": ["7 nights in centrally located alpine hotels", "Daily breakfast buffet", "Swiss Travel Pass 1st class", "Jungfraujoch Top of Europe excursion", "24/7 concierge support"],
        "excludes": ["International flights", "Lunches and dinners", "Travel insurance"],
        "hotel": "Hotel Waldstätterhof Lucerne & Romantik Hotel Schweizerhof",
        "transport": "Swiss Travel Pass by panorama rail and mountain cogwheel",
        "itinerary": ["Arrive Zurich and scenic rail to Lucerne", "Old Town promenade and Lake Lucerne cruise", "Mount Pilatus dragon ride", "GoldenPass Express to Interlaken", "Lauterbrunnen valley of 72 waterfalls", "Jungfraujoch ice palace", "Leisure alpine exploration", "Return rail to Zurich for departure"],
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
        "includes": ["5 nights in handpicked luxury ryokan & hotels", "Traditional Kaiseki dinner experience", "Private tea ceremony masterclass", "JR regional rail pass", "Bilingual heritage guide"],
        "excludes": ["International airfare", "Personal shopping", "Travel insurance"],
        "hotel": "The Gate Hotel Kyoto & Boutique Ryokan Gion",
        "transport": "Shinkansen bullet train and private executive transfers",
        "itinerary": ["Arrive Kansai International and scenic transfer to Kyoto", "Fushimi Inari torii gates at sunrise", "Arashiyama bamboo grove & Tenryu-ji temple", "Uji tea tasting and Nishiki market food walk", "Bullet train excursion to Osaka Castle and Dotonbori", "Farewell matcha and departure"],
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
        "includes": ["6 nights in cliff-view boutique hotel", "Daily artisan breakfast", "Private Capri yacht day charter", "Limoncello grove tasting & cooking class", "Naples airport private transfers"],
        "excludes": ["International flights", "Tourist city taxes", "Personal expenses"],
        "hotel": "Hotel Poseidon Positano or Villa Cimbrone Ravello",
        "transport": "Private Mercedes transfer and private motor yacht",
        "itinerary": ["Private transfer from Naples to Positano", "Cliff walk along Path of the Gods", "Capri island cruise and Blue Grotto", "Ravello gardens and music villa", "Amalfi cathedral and pastry sampling", "Sunset dinner overlooking Positano bay", "Transfer to Naples for flight home"],
        "policy": "Cancel 30 days prior for full refund."
    },
    {
        "id": "serengeti-safari",
        "name": "Serengeti Great Migration",
        "destination": "Serengeti & Ngorongoro, Tanzania",
        "location": "Tanzania",
        "days": 8,
        "nights": 7,
        "price": 310000,
        "category": "Wildlife",
        "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
        "description": "Witness the spectacle of the wild with expert guides in Tanzania's premier game reserves.",
        "includes": ["7 nights in luxury tented camps and safari lodges", "All park conservation fees", "Full-board gourmet bush dining", "Custom 4x4 open-roof safari vehicle", "Professional wildlife tracker"],
        "excludes": ["International flights", "Hot air balloon upgrade", "Staff gratuities"],
        "hotel": "Four Seasons Safari Lodge Serengeti & Ngorongoro Serena Lodge",
        "transport": "Customized 4x4 Land Cruiser with pop-up roof and bush flights",
        "itinerary": ["Bush flight into Serengeti airstrip", "Full day big five game drive", "Tracking the Great Migration herds", "Grumeti river crossing viewing", "Descent into Ngorongoro Crater floor", "Maasai cultural village visit", "Sunrise balloon safari and champagne breakfast", "Return flight to Kilimanjaro"],
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
        "includes": ["5 nights in 5-star heritage hotels", "Daily breakfast", "Sunrise Taj Mahal private tour", "Chauffeur-driven luxury car", "Monument entrance tickets & monument historians"],
        "excludes": ["Domestic/International flights", "Meals not specified", "Personal shopping"],
        "hotel": "The Imperial New Delhi, ITC Mughal Agra & Rambagh Palace Jaipur",
        "transport": "Chauffeur-driven private luxury sedan with Wi-Fi",
        "itinerary": ["Arrive New Delhi, Old Delhi heritage tour", "Drive to Agra, sunset view of Taj Mahal from Mehtab Bagh", "Sunrise at Taj Mahal and Agra Fort", "Fatehpur Sikri en route to Jaipur", "Amber Fort elephant or jeep ascent, City Palace, Hawa Mahal", "Jaipur handicraft exploration and return to Delhi"],
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
        "includes": ["4 nights in plantation resorts + 1 night private AC houseboat", "All meals on houseboat", "Ayurvedic rejuvenation session", "Spice garden tour", "Private chauffeur throughout"],
        "excludes": ["Airfare", "Personal expenses", "Camera fees"],
        "hotel": "Brunton Boatyard Kochi, Windermere Munnar & Luxury Houseboat",
        "transport": "Private AC vehicle and private deluxe kettuvallam houseboat",
        "itinerary": ["Kochi historic Fort Cochin and Chinese nets", "Scenic drive through Western Ghats to Munnar", "Tea plantation walk and tea museum", "Alleppey backwaters check-in on private houseboat", "Sunset cruise through tranquil canals and paddy fields", "Return to Kochi for departure"],
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
        "includes": ["3 nights in restored heritage Haveli", "Daily breakfast", "Private airport transfers", "Curated old city street food trail", "Heritage monument access with licensed historian"],
        "excludes": ["Flights", "Lunches and dinners", "Shopping"],
        "hotel": "Samode Haveli or Alsisar Haveli Jaipur",
        "transport": "Private executive sedan with English-speaking chauffeur",
        "itinerary": ["Arrive Jaipur, check in to historic haveli", "Amber Fort, Panna Meena Kund and Jal Mahal", "City Palace, Jantar Mantar and evening bazaar tour", "Royal Rajasthani breakfast and transfer to airport"],
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
        "includes": ["7 nights in premier hotels and luxury glamping camps", "Daily breakfast and dinner", "Private 4x4 vehicle with experienced mountain driver", "Inner Line permits and wildlife fees", "Oxygen cylinder and high-altitude support"],
        "excludes": ["Flights to/from Leh", "Personal medical expenses", "Travel insurance"],
        "hotel": "The Grand Dragon Leh & Organic Luxury Camp Nubra",
        "transport": "Private Toyota Fortuner / Innova 4x4",
        "itinerary": ["Arrive Leh and complete acclimatisation day", "Shanti Stupa, Leh Palace and Hall of Fame", "Khardung La pass (17,582 ft) to Nubra Valley", "Diskit Monastery and Hunder double-humped camel safari", "Shyok river route to dramatic Pangong Tso Lake", "Chang La pass return to Leh", "Thiksey and Hemis monasteries", "Departure flight over the Himalayas"],
        "policy": "Cancel 20 days prior for full refund."
    }
]


def seed_database():
    app = create_app()
    with app.app_context():
        print("Connected to MySQL:", db.engine.url)
        for item in SAMPLE_PACKAGES:
            # Check or create destination
            dest = Destination.query.filter_by(name=item["destination"]).first()
            if not dest:
                dest = Destination(
                    name=item["destination"],
                    location=item["location"],
                    description=item["description"],
                    image=item["image"],
                )
                db.session.add(dest)
                db.session.flush()

            # Check or create package
            pkg = Package.query.filter_by(slug=item["id"]).first()
            if not pkg:
                pkg = Package(
                    slug=item["id"],
                    destination_id=dest.id,
                    package_name=item["name"],
                    description=item["description"],
                    duration=item["days"],
                    nights=item["nights"],
                    category=item["category"],
                    price=item["price"],
                    image=item["image"],
                    status="active",
                    includes=item["includes"],
                    excludes=item["excludes"],
                    hotel=item["hotel"],
                    transport=item["transport"],
                    itinerary=item["itinerary"],
                    policy=item["policy"],
                )
                db.session.add(pkg)
                print(f"Added package: {item['name']}")

        db.session.commit()
        print("Database seeding completed successfully!")


if __name__ == "__main__":
    seed_database()
