export type PortionSize = 'palm' | 'fist' | 'handful' | 'thumb';
export type ActiveMode = 'balanced' | 'dieting' | 'digestion';
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type ActivityType = 'Walking' | 'Cardio' | 'Strength' | 'Yoga' | 'Sports' | 'Other';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: number;
  activeMode: ActiveMode;
}

// Belly Balance antioxidant log entry (persisted to Firestore)
export interface AntioxidantLog {
  id: string;
  foodId: string;
  portion: PortionSize;
  timestamp: number;
  score: number;
  userId: string;
}

// FitStart local meal entry
export interface MealEntry {
  id: number;
  name: string;
  cal: number;
  meal: MealType;
  notes: string;
}

// FitStart local activity entry
export interface ActivityEntry {
  id: number;
  name: string;
  type: ActivityType;
  dur: number;  // minutes
  cal: number;  // kcal burned
}

export interface AntioxidantFood {
  id: string;
  name: string;
  emoji: string;
  category: string;
  baseScore: number; // score per palm-size portion
  description: string;
  modeMultiplier: Record<ActiveMode, number>;
}
