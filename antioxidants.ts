import { AntioxidantFood } from './types';

export const PORTION_MULTIPLIERS = {
  palm: 1.0,
  fist: 1.4,
  handful: 0.6,
  thumb: 0.3,
};

export const PORTION_LABELS = {
  palm: '✋ Palm',
  fist: '✊ Fist',
  handful: '🤲 Handful',
  thumb: '👍 Thumb',
};

export const ANTIOXIDANT_FOODS: AntioxidantFood[] = [
  // Berries
  { id: 'blueberries', name: 'Blueberries', emoji: '🫐', category: 'Berries', baseScore: 90, description: 'High in anthocyanins', modeMultiplier: { balanced: 1, dieting: 1.2, digestion: 1 } },
  { id: 'strawberries', name: 'Strawberries', emoji: '🍓', category: 'Berries', baseScore: 75, description: 'Rich in vitamin C', modeMultiplier: { balanced: 1, dieting: 1.1, digestion: 1 } },
  { id: 'raspberries', name: 'Raspberries', emoji: '🍓', category: 'Berries', baseScore: 80, description: 'Ellagic acid powerhouse', modeMultiplier: { balanced: 1, dieting: 1.2, digestion: 1.1 } },
  { id: 'blackberries', name: 'Blackberries', emoji: '🫐', category: 'Berries', baseScore: 85, description: 'Anthocyanins & vitamin K', modeMultiplier: { balanced: 1, dieting: 1.2, digestion: 1 } },
  { id: 'goji', name: 'Goji Berries', emoji: '🔴', category: 'Berries', baseScore: 95, description: 'Zeaxanthin & lycium', modeMultiplier: { balanced: 1, dieting: 1, digestion: 0.9 } },
  { id: 'acai', name: 'Acai', emoji: '🟣', category: 'Berries', baseScore: 100, description: 'Highest ORAC score berry', modeMultiplier: { balanced: 1, dieting: 1.3, digestion: 1 } },
  // Vegetables
  { id: 'spinach', name: 'Spinach', emoji: '🥬', category: 'Greens', baseScore: 70, description: 'Lutein & beta-carotene', modeMultiplier: { balanced: 1, dieting: 1.3, digestion: 1.1 } },
  { id: 'kale', name: 'Kale', emoji: '🥦', category: 'Greens', baseScore: 85, description: 'Glucosinolates & vitamin C', modeMultiplier: { balanced: 1, dieting: 1.4, digestion: 0.8 } },
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', category: 'Greens', baseScore: 72, description: 'Sulforaphane champion', modeMultiplier: { balanced: 1, dieting: 1.2, digestion: 0.9 } },
  { id: 'beetroot', name: 'Beetroot', emoji: '🟣', category: 'Vegetables', baseScore: 78, description: 'Betalains & nitrates', modeMultiplier: { balanced: 1, dieting: 0.9, digestion: 1.2 } },
  { id: 'redcabbage', name: 'Red Cabbage', emoji: '🫛', category: 'Vegetables', baseScore: 68, description: 'Anthocyanins & fiber', modeMultiplier: { balanced: 1, dieting: 1.1, digestion: 0.8 } },
  { id: 'artichoke', name: 'Artichoke', emoji: '🫛', category: 'Vegetables', baseScore: 82, description: 'Cynarin & silymarin', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1.4 } },
  { id: 'garlic', name: 'Garlic', emoji: '🧄', category: 'Vegetables', baseScore: 88, description: 'Allicin compound', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1.3 } },
  { id: 'onion', name: 'Onion', emoji: '🧅', category: 'Vegetables', baseScore: 65, description: 'Quercetin rich', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1.1 } },
  { id: 'sweetpotato', name: 'Sweet Potato', emoji: '🍠', category: 'Vegetables', baseScore: 62, description: 'Beta-carotene & fiber', modeMultiplier: { balanced: 1, dieting: 0.8, digestion: 1.2 } },
  // Fruits
  { id: 'pomegranate', name: 'Pomegranate', emoji: '🍎', category: 'Fruits', baseScore: 92, description: 'Punicalagins & ellagitannins', modeMultiplier: { balanced: 1, dieting: 1.1, digestion: 1.1 } },
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'Fruits', baseScore: 60, description: 'Quercetin & catechins', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1 } },
  { id: 'grapes', name: 'Red Grapes', emoji: '🍇', category: 'Fruits', baseScore: 74, description: 'Resveratrol & OPCs', modeMultiplier: { balanced: 1, dieting: 0.9, digestion: 1 } },
  { id: 'cherry', name: 'Cherries', emoji: '🍒', category: 'Fruits', baseScore: 80, description: 'Anthocyanins & melatonin', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1.2 } },
  { id: 'mango', name: 'Mango', emoji: '🥭', category: 'Fruits', baseScore: 58, description: 'Mangiferin & beta-carotene', modeMultiplier: { balanced: 1, dieting: 0.8, digestion: 1.1 } },
  { id: 'kiwi', name: 'Kiwi', emoji: '🥝', category: 'Fruits', baseScore: 70, description: 'Vitamin C & actinidin', modeMultiplier: { balanced: 1, dieting: 1.1, digestion: 1.3 } },
  { id: 'orange', name: 'Orange', emoji: '🍊', category: 'Fruits', baseScore: 63, description: 'Hesperidin & vitamin C', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1.1 } },
  // Nuts & Seeds
  { id: 'walnuts', name: 'Walnuts', emoji: '🌰', category: 'Nuts', baseScore: 76, description: 'Ellagitannins & omega-3', modeMultiplier: { balanced: 1, dieting: 0.9, digestion: 1 } },
  { id: 'pecans', name: 'Pecans', emoji: '🌰', category: 'Nuts', baseScore: 80, description: 'Highest antioxidant nut', modeMultiplier: { balanced: 1, dieting: 0.8, digestion: 1 } },
  { id: 'flaxseeds', name: 'Flaxseeds', emoji: '🌾', category: 'Seeds', baseScore: 72, description: 'Lignans & omega-3', modeMultiplier: { balanced: 1, dieting: 1.1, digestion: 1.2 } },
  { id: 'chiaseeds', name: 'Chia Seeds', emoji: '⚫', category: 'Seeds', baseScore: 68, description: 'Caffeic acid & quercetin', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1.3 } },
  // Spices & Herbs
  { id: 'turmeric', name: 'Turmeric', emoji: '🟡', category: 'Spices', baseScore: 98, description: 'Curcumin powerhouse', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1.4 } },
  { id: 'ginger', name: 'Ginger', emoji: '🫚', category: 'Spices', baseScore: 86, description: 'Gingerols & shogaols', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1.5 } },
  { id: 'cinnamon', name: 'Cinnamon', emoji: '🟤', category: 'Spices', baseScore: 90, description: 'Cinnamaldehyde', modeMultiplier: { balanced: 1, dieting: 1.1, digestion: 1.2 } },
  { id: 'cloves', name: 'Cloves', emoji: '🌿', category: 'Spices', baseScore: 99, description: 'Eugenol — highest ORAC spice', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1 } },
  // Beans & Legumes
  { id: 'blackbeans', name: 'Black Beans', emoji: '⚫', category: 'Legumes', baseScore: 66, description: 'Anthocyanins & fiber', modeMultiplier: { balanced: 1, dieting: 1.1, digestion: 0.9 } },
  { id: 'lentils', name: 'Lentils', emoji: '🫘', category: 'Legumes', baseScore: 60, description: 'Polyphenols & fiber', modeMultiplier: { balanced: 1, dieting: 1.2, digestion: 0.9 } },
  // Drinks / Other
  { id: 'greentea', name: 'Green Tea', emoji: '🍵', category: 'Drinks', baseScore: 88, description: 'EGCG catechins', modeMultiplier: { balanced: 1, dieting: 1.2, digestion: 1.2 } },
  { id: 'darkcoffee', name: 'Black Coffee', emoji: '☕', category: 'Drinks', baseScore: 72, description: 'Chlorogenic acids', modeMultiplier: { balanced: 1, dieting: 1.1, digestion: 0.8 } },
  { id: 'darkchocolate', name: 'Dark Chocolate', emoji: '🍫', category: 'Other', baseScore: 82, description: 'Flavanols & theobromine', modeMultiplier: { balanced: 1, dieting: 0.7, digestion: 0.9 } },
  { id: 'oliveoil', name: 'Olive Oil', emoji: '🫒', category: 'Other', baseScore: 70, description: 'Oleocanthal & hydroxytyrosol', modeMultiplier: { balanced: 1, dieting: 0.9, digestion: 1.1 } },
  { id: 'tomato', name: 'Tomato', emoji: '🍅', category: 'Vegetables', baseScore: 62, description: 'Lycopene & vitamin C', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1.1 } },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', category: 'Fruits', baseScore: 65, description: 'Glutathione & tocopherols', modeMultiplier: { balanced: 1, dieting: 0.8, digestion: 1.2 } },
  { id: 'moringa', name: 'Moringa', emoji: '🌿', category: 'Greens', baseScore: 96, description: 'Isothiocyanates & quercetin', modeMultiplier: { balanced: 1, dieting: 1.3, digestion: 1.2 } },
  { id: 'amla', name: 'Amla (Indian Gooseberry)', emoji: '🟢', category: 'Fruits', baseScore: 97, description: 'Highest vitamin C fruit', modeMultiplier: { balanced: 1, dieting: 1.2, digestion: 1.3 } },
  { id: 'ashwagandha', name: 'Ashwagandha', emoji: '🌱', category: 'Herbs', baseScore: 88, description: 'Withanolides & adaptogens', modeMultiplier: { balanced: 1.1, dieting: 1, digestion: 1 } },
  { id: 'wheatgrass', name: 'Wheatgrass', emoji: '🌾', category: 'Greens', baseScore: 82, description: 'Chlorophyll & SOD enzymes', modeMultiplier: { balanced: 1, dieting: 1.2, digestion: 1.1 } },
  { id: 'almonds', name: 'Almonds', emoji: '🌰', category: 'Nuts', baseScore: 68, description: 'Vitamin E & flavonoids', modeMultiplier: { balanced: 1, dieting: 0.9, digestion: 1 } },
  { id: 'sunflower', name: 'Sunflower Seeds', emoji: '🌻', category: 'Seeds', baseScore: 65, description: 'Vitamin E & selenium', modeMultiplier: { balanced: 1, dieting: 1, digestion: 1 } },
  { id: 'broccolithe', name: 'Broccoli Sprouts', emoji: '🌱', category: 'Greens', baseScore: 94, description: 'Sulforaphane — 50x broccoli', modeMultiplier: { balanced: 1, dieting: 1.3, digestion: 1 } },
];

export function calcScore(food: AntioxidantFood, portion: string, mode: string): number {
  const pm = PORTION_MULTIPLIERS[portion as keyof typeof PORTION_MULTIPLIERS] ?? 1;
  const mm = food.modeMultiplier[mode as keyof typeof food.modeMultiplier] ?? 1;
  return Math.round(food.baseScore * pm * mm);
}

export const FOOD_CATEGORIES = [...new Set(ANTIOXIDANT_FOODS.map(f => f.category))];
