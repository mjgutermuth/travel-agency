export interface Vibe {
  id: string
  name: string
  icon: string
  category: "style" | "activity" | "accommodation"
  color: string
}

export const vibes: Vibe[] = [
  // Travel Styles
  { id: "adventure", name: "Adventure", icon: "Compass", category: "style", color: "bg-orange-100 text-orange-600 border-orange-200" },
  { id: "relaxation", name: "Relaxation", icon: "Sunset", category: "style", color: "bg-sky-100 text-sky-600 border-sky-200" },
  { id: "romantic", name: "Romantic", icon: "Heart", category: "style", color: "bg-pink-100 text-pink-600 border-pink-200" },
  { id: "cultural", name: "Cultural", icon: "Landmark", category: "style", color: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: "foodie", name: "Foodie", icon: "UtensilsCrossed", category: "style", color: "bg-red-100 text-red-600 border-red-200" },
  { id: "family", name: "Family Fun", icon: "Users", category: "style", color: "bg-green-100 text-green-600 border-green-200" },
  { id: "solo", name: "Solo Explorer", icon: "User", category: "style", color: "bg-violet-100 text-violet-600 border-violet-200" },
  { id: "wellness", name: "Wellness", icon: "Sparkles", category: "style", color: "bg-teal-100 text-teal-600 border-teal-200" },

  // Activities
  { id: "beach", name: "Beach Days", icon: "Palmtree", category: "activity", color: "bg-cyan-100 text-cyan-600 border-cyan-200" },
  { id: "hiking", name: "Hiking", icon: "Mountain", category: "activity", color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  { id: "city", name: "City Exploring", icon: "Building2", category: "activity", color: "bg-slate-100 text-slate-600 border-slate-200" },
  { id: "spa", name: "Spa & Wellness", icon: "Flower2", category: "activity", color: "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200" },
  { id: "nightlife", name: "Nightlife", icon: "Music", category: "activity", color: "bg-purple-100 text-purple-600 border-purple-200" },
  { id: "shopping", name: "Shopping", icon: "ShoppingBag", category: "activity", color: "bg-rose-100 text-rose-600 border-rose-200" },
  { id: "water-sports", name: "Water Sports", icon: "Waves", category: "activity", color: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: "wildlife", name: "Wildlife", icon: "Bird", category: "activity", color: "bg-lime-100 text-lime-600 border-lime-200" },

  // Accommodations
  { id: "boutique", name: "Boutique Hotel", icon: "Hotel", category: "accommodation", color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
  { id: "all-inclusive", name: "All-Inclusive", icon: "Castle", category: "accommodation", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
  { id: "airbnb", name: "Vacation Rental", icon: "Home", category: "accommodation", color: "bg-orange-100 text-orange-600 border-orange-200" },
  { id: "glamping", name: "Glamping", icon: "Tent", category: "accommodation", color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  { id: "luxury", name: "Luxury Resort", icon: "Crown", category: "accommodation", color: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: "budget", name: "Budget-Friendly", icon: "Wallet", category: "accommodation", color: "bg-green-100 text-green-600 border-green-200" },
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
