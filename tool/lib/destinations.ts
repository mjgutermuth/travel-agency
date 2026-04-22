export interface Destination {
  id: string
  name: string
  country: string
  description: string
  imageUrl: string
  region: string
}

export const destinations: Destination[] = [
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
  {
    id: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    description: "Colorful cliffside villages, crystal-clear waters, and world-renowned cuisine",
    imageUrl: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
    region: "Europe"
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    description: "Overwater villas, turquoise lagoons, and some of the world's best diving",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    region: "Asia"
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    description: "The City of Light awaits with art, cuisine, and timeless romance",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    region: "Europe"
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    description: "Ancient temples, serene gardens, and the heart of traditional Japanese culture",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    region: "Asia"
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    description: "The mystical lost city of the Incas high in the Andes mountains",
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    region: "South America"
  },
  {
    id: "safari",
    name: "Serengeti Safari",
    country: "Tanzania",
    description: "Witness the great migration and Africa's most incredible wildlife",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    region: "Africa"
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
  {
    id: "hawaii",
    name: "Hawaii",
    country: "USA",
    description: "Volcanic landscapes, pristine beaches, and the spirit of aloha",
    imageUrl: "https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&q=80",
    region: "North America"
  }
]
