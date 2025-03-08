import { createClient } from "@supabase/supabase-js"

// Get environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Validate environment variables
const isValidConfig = supabaseUrl && supabaseAnonKey

// Create client only if we have valid config
export const supabase = isValidConfig ? createClient(supabaseUrl, supabaseAnonKey) : null

export type RSVP = {
  id: number
  name: string
  email: string
  attending: boolean
  guests: number
  dietary_restrictions: string
  song_request: string
  message: string
  created_at: string
}

// Mock data for development or when API key is invalid
export function generateMockRSVPs(count = 15): RSVP[] {
  const names = [
    "John & Sarah Smith",
    "Michael Johnson",
    "Emily & David Williams",
    "Robert Brown",
    "Jessica & Thomas Davis",
    "Daniel Wilson",
    "Jennifer & Matthew Miller",
    "Christopher Moore",
    "Amanda & Joseph Taylor",
    "Andrew Anderson",
    "Olivia & William Thomas",
    "James Jackson",
    "Sophia & Alexander White",
    "Ryan Harris",
    "Emma & Nicholas Martin",
  ]

  const dietaryRestrictions = [
    "Vegetarian",
    "Vegan",
    "Gluten-free",
    "Nut allergy",
    "Lactose intolerant",
    "No seafood",
    "",
    "Halal",
    "Kosher",
  ]

  const songRequests = [
    "Perfect - Ed Sheeran",
    "All of Me - John Legend",
    "Thinking Out Loud - Ed Sheeran",
    "Can't Help Falling in Love - Elvis Presley",
    "A Thousand Years - Christina Perri",
    "",
    "Marry You - Bruno Mars",
    "Love On Top - Beyoncé",
    "",
    "Don't Stop Believin' - Journey",
  ]

  const messages = [
    "Congratulations! We can't wait to celebrate with you!",
    "So happy for you both! Looking forward to the big day.",
    "Thank you for inviting us to share in your special day.",
    "Wishing you a lifetime of love and happiness!",
    "",
    "Looking forward to dancing the night away!",
    "So excited to witness your love story continue.",
    "",
    "Thank you for including us in your wedding day.",
    "Congratulations on your upcoming marriage!",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: names[i % names.length].split(" ")[0].toLowerCase() + "@example.com",
    attending: Math.random() > 0.2,
    guests: Math.floor(Math.random() * 3),
    dietary_restrictions: dietaryRestrictions[Math.floor(Math.random() * dietaryRestrictions.length)],
    song_request: songRequests[Math.floor(Math.random() * songRequests.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  }))
}

export async function getRSVPs(): Promise<RSVP[]> {
  // If Supabase client is not initialized, return mock data
  if (!supabase) {
    console.warn("Supabase client not initialized. Using mock data.")
    return generateMockRSVPs()
  }

  try {
    const { data, error } = await supabase.from("rsvps").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching RSVPs:", error)
      return generateMockRSVPs()
    }

    return data as RSVP[]
  } catch (error) {
    console.error("Error fetching RSVPs:", error)
    return generateMockRSVPs()
  }
}

