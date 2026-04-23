export interface Category {
  id?: string;      // Firestore document ID
  name: string;     // Category name (e.g., "Gym")
  icon?: string;    // optional, for later
  color?: string;   // optional, for later
}
