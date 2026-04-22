export interface Destination {
  id: string
  name: string
  country: string
  description: string
  imageUrl: string
  region: string
}

export const destinations: Destination[] = [
  // Row 1 — high visual impact openers
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    description: "Electric energy meets ancient tradition in one of the world's most extraordinary cities",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    region: "Asia"
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    description: "Iconic white-washed buildings perched on dramatic cliffs overlooking the Aegean Sea",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    region: "Europe"
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    description: "Lush rice terraces, ancient temples, and pristine beaches in a tropical paradise",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    region: "Asia"
  },
  // Row 2 — bucket-list adventures
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    description: "The mystical lost city of the Incas high in the Andes mountains",
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    region: "South America"
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    country: "New Zealand",
    description: "Stunning fjords, mountains, and adventure in Middle-earth",
    imageUrl: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=80",
    region: "Oceania"
  },
  {
    id: "morocco",
    name: "Marrakech",
    country: "Morocco",
    description: "Vibrant souks, stunning riads, and the magic of North Africa",
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80",
    region: "Africa"
  },
  // Row 3 — stunning scenery
  {
    id: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    description: "Colorful cliffside villages, crystal-clear waters, and world-renowned cuisine",
    imageUrl: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
    region: "Europe"
  },
  {
    id: "iceland",
    name: "Iceland",
    country: "Iceland",
    description: "Northern lights, glaciers, hot springs, and otherworldly landscapes",
    imageUrl: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
    region: "Europe"
  },
  {
    id: "safari",
    name: "Serengeti Safari",
    country: "Tanzania",
    description: "Witness the great migration and Africa's most incredible wildlife",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    region: "Africa"
  },
  // Row 4 — her expertise + classics
  {
    id: "ireland",
    name: "Ireland",
    country: "Ireland",
    description: "Emerald coastlines, ancient castles, and the warmest welcome in Europe",
    imageUrl: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=800&q=80",
    region: "Europe"
  },
  {
    id: "vienna",
    name: "Vienna",
    country: "Austria",
    description: "Imperial palaces, grand coffee houses, and the city that gave the world classical music",
    imageUrl: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    region: "Europe"
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    description: "The City of Light awaits with art, cuisine, and timeless romance",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    region: "Europe"
  },
  // Row 5 — nature & beach
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    description: "Overwater villas, turquoise lagoons, and some of the world's best diving",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    region: "Asia"
  },
  {
    id: "banff",
    name: "Banff",
    country: "Canada",
    description: "Turquoise glacier lakes, dramatic mountain peaks, and wildlife around every bend",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    region: "North America"
  },
  {
    id: "hawaii",
    name: "Hawaii",
    country: "USA",
    description: "Volcanic landscapes, pristine beaches, and the spirit of aloha",
    imageUrl: "https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&q=80",
    region: "North America"
  },
  // Row 6 — Caribbean & domestic
  {
    id: "turks-and-caicos",
    name: "Turks & Caicos",
    country: "Turks & Caicos Islands",
    description: "Powder-white beaches, impossibly turquoise water, and some of the Caribbean's best snorkeling",
    imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
    region: "Caribbean"
  },
  {
    id: "east-coast-usa",
    name: "East Coast, USA",
    country: "USA",
    description: "From the rocky shores of New England to the streets of New York and the charm of the South",
    imageUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80",
    region: "North America"
  },
  {
    id: "west-coast-usa",
    name: "West Coast, USA",
    country: "USA",
    description: "Pacific coastlines, California sunshine, towering redwoods, and the spirit of the open road",
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    region: "North America"
  }
]
