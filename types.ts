
export enum ItemType {
  Transport = 'transport',
  Spot = 'spot',
  Food = 'food',
  Hotel = 'hotel',
  Flight = 'flight',
}

export interface DiningPlace {
  name: string;
  note?: string;
  type: 'lunch' | 'dinner' | 'dessert' | 'cafe';
  category?: string; // e.g. "Ramen", "Yakiniku"
}

export interface WeatherInfo {
  temp: string;
  condition: string;
  icon: string;
  location: string; // Added location field
}

export interface ItineraryItem {
  time: string;
  title: string;
  type: ItemType;
  note?: string;
  price?: string;
  duration?: string; // New field for travel time
  isImportant?: boolean; // For key transport/meetups
  location?: string; // For map search
  plan?: 'A' | 'B'; // For Day 10 split plans
}

export interface DayPlan {
  date: string;
  dayLabel: string; // e.g., "Day 1"
  city: string;
  weather?: WeatherInfo; // New weather field
  items: ItineraryItem[];
  backupDining: DiningPlace[]; // Stores the non-primary food options
}

export interface FlightInfo {
  date: string;
  number: string;
  route: string;
  time: string;
  terminal: string;
  airline: string;
  baggage: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  checked: boolean;
}
