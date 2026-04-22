export interface Vibe {
  id: string
  name: string
  icon: string
  category: "style" | "activity" | "accommodation"
  color: string
  imageUrl: string
}

export const vibes: Vibe[] = [
  // Travel Styles
  { id: "adventure", name: "Adventure", icon: "Compass", category: "style", color: "bg-orange-100 text-orange-600 border-orange-200", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
  { id: "relaxation", name: "Relaxation", icon: "Sunset", category: "style", color: "bg-sky-100 text-sky-600 border-sky-200", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
  { id: "romantic", name: "Romantic", icon: "Heart", category: "style", color: "bg-pink-100 text-pink-600 border-pink-200", imageUrl: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&q=80" },
  { id: "cultural", name: "Cultural", icon: "Landmark", category: "style", color: "bg-amber-100 text-amber-600 border-amber-200", imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" },
  { id: "foodie", name: "Foodie", icon: "UtensilsCrossed", category: "style", color: "bg-red-100 text-red-600 border-red-200", imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" },
  { id: "family", name: "Family Fun", icon: "Users", category: "style", color: "bg-green-100 text-green-600 border-green-200", imageUrl: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=400&q=80" },
  { id: "solo", name: "Solo Explorer", icon: "User", category: "style", color: "bg-violet-100 text-violet-600 border-violet-200", imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80" },
  { id: "wellness", name: "Wellness & Spa", icon: "Flower2", category: "style", color: "bg-teal-100 text-teal-600 border-teal-200", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80" },

  // Activities
  { id: "beach", name: "Beach Days", icon: "Palmtree", category: "activity", color: "bg-cyan-100 text-cyan-600 border-cyan-200", imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80" },
  { id: "hiking", name: "Hiking", icon: "Mountain", category: "activity", color: "bg-emerald-100 text-emerald-600 border-emerald-200", imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80" },
  { id: "city", name: "City Exploring", icon: "Building2", category: "activity", color: "bg-slate-100 text-slate-600 border-slate-200", imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80" },
  { id: "festivals", name: "Festivals & Events", icon: "Music", category: "activity", color: "bg-purple-100 text-purple-600 border-purple-200", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80" },
  { id: "nightlife", name: "Nightlife", icon: "Music", category: "activity", color: "bg-purple-100 text-purple-600 border-purple-200", imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=400&q=80" },
  { id: "shopping", name: "Shopping", icon: "ShoppingBag", category: "activity", color: "bg-rose-100 text-rose-600 border-rose-200", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
  { id: "water-sports", name: "Sports", icon: "Dumbbell", category: "activity", color: "bg-blue-100 text-blue-600 border-blue-200", imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&q=80" },
  { id: "wildlife", name: "Wildlife", icon: "Bird", category: "activity", color: "bg-lime-100 text-lime-600 border-lime-200", imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80" },

  // Accommodations
  { id: "five-star", name: "Five-Star Hotel", icon: "Crown", category: "accommodation", color: "bg-amber-100 text-amber-600 border-amber-200", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" },
  { id: "all-inclusive", name: "All-Inclusive Resort", icon: "Hotel", category: "accommodation", color: "bg-sky-100 text-sky-600 border-sky-200", imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80" },
  { id: "boutique", name: "Boutique Hotel", icon: "Hotel", category: "accommodation", color: "bg-indigo-100 text-indigo-600 border-indigo-200", imageUrl: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&q=80" },
  { id: "airbnb", name: "Vacation Rental", icon: "Home", category: "accommodation", color: "bg-orange-100 text-orange-600 border-orange-200", imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80" },
  { id: "glamping", name: "Glamping", icon: "Tent", category: "accommodation", color: "bg-emerald-100 text-emerald-600 border-emerald-200", imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80" },
  { id: "rv", name: "RV / Campervan", icon: "Home", category: "accommodation", color: "bg-amber-100 text-amber-600 border-amber-200", imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80" },
  { id: "cruise", name: "Cruise", icon: "Ship", category: "accommodation", color: "bg-sky-100 text-sky-600 border-sky-200", imageUrl: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=400&q=80" },
  { id: "budget", name: "Budget-Friendly", icon: "Wallet", category: "accommodation", color: "bg-green-100 text-green-600 border-green-200", imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80" },
]

export const vibeCategories = {
  style: {
    title: "TRAVEL STYLE",
    subtitle: "How do you want to travel?",
    label: "Your Vibe"
  },
  activity: {
    title: "ACTIVITIES",
    subtitle: "What do you want to do?",
    label: "Must-Dos"
  },
  accommodation: {
    title: "ACCOMMODATION",
    subtitle: "Where do you want to stay?",
    label: "Your Stay"
  }
} as const
