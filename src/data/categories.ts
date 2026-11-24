export const CATEGORIES = [
  { id: 'hello', emoji: '👋', en: 'Greetings', es: 'Saludos', de: 'Begrüßungen' },
  { id: 'numbers', emoji: '🔢', en: 'Numbers', es: 'Números', de: 'Zahlen' },
  { id: 'colors', emoji: '🎨', en: 'Colors', es: 'Colores', de: 'Farben' },
  { id: 'family', emoji: '💛', en: 'Family', es: 'Familia', de: 'Familie' },
  { id: 'body', emoji: '🫀', en: 'Body', es: 'Cuerpo', de: 'Körper' },
  { id: 'clothes', emoji: '👕', en: 'Clothes', es: 'Ropa', de: 'Kleidung' },
  { id: 'food', emoji: '🍞', en: 'Food', es: 'Comida', de: 'Essen' },
  { id: 'fruit', emoji: '🍎', en: 'Fruit', es: 'Frutas', de: 'Obst' },
  { id: 'veg', emoji: '🥕', en: 'Vegetables', es: 'Verduras', de: 'Gemüse' },
  { id: 'drinks', emoji: '🥤', en: 'Drinks', es: 'Bebidas', de: 'Getränke' },
  { id: 'animals', emoji: '🐾', en: 'Animals', es: 'Animales', de: 'Tiere' },
  { id: 'house', emoji: '🏠', en: 'House', es: 'Casa', de: 'Haus' },
  { id: 'furniture', emoji: '🛋️', en: 'Furniture', es: 'Muebles', de: 'Möbel' },
  { id: 'kitchen', emoji: '🍴', en: 'Kitchen', es: 'Cocina', de: 'Küche' },
  { id: 'city', emoji: '🏙️', en: 'City', es: 'Ciudad', de: 'Stadt' },
  { id: 'transport', emoji: '🚌', en: 'Transport', es: 'Transporte', de: 'Verkehr' },
  { id: 'school', emoji: '🎓', en: 'School', es: 'Escuela', de: 'Schule' },
  { id: 'jobs', emoji: '💼', en: 'Jobs', es: 'Oficios', de: 'Berufe' },
  { id: 'nature', emoji: '🌿', en: 'Nature', es: 'Naturaleza', de: 'Natur' },
  { id: 'weather', emoji: '⛅', en: 'Weather', es: 'Clima', de: 'Wetter' },
  { id: 'time', emoji: '⏰', en: 'Time', es: 'Tiempo', de: 'Zeit' },
  { id: 'feelings', emoji: '😊', en: 'Feelings', es: 'Sentimientos', de: 'Gefühle' },
  { id: 'verbs', emoji: '🏃', en: 'Verbs', es: 'Verbos', de: 'Verben' },
  { id: 'adjectives', emoji: '✨', en: 'Describing', es: 'Describir', de: 'Eigenschaften' },
  { id: 'travel', emoji: '✈️', en: 'Travel', es: 'Viaje', de: 'Reise' },
  { id: 'shop', emoji: '🛒', en: 'Shopping', es: 'Compras', de: 'Einkauf' },
  { id: 'hobbies', emoji: '🎯', en: 'Free time', es: 'Tiempo libre', de: 'Freizeit' },
  { id: 'tech', emoji: '💻', en: 'Technology', es: 'Tecnología', de: 'Technik' },
  { id: 'lands', emoji: '🗺️', en: 'Places', es: 'Lugares', de: 'Orte' },
  { id: 'bath', emoji: '🛁', en: 'Bathroom', es: 'Baño', de: 'Bad' },
  { id: 'office', emoji: '📎', en: 'Office', es: 'Oficina', de: 'Büro' },
  { id: 'music', emoji: '🎵', en: 'Music', es: 'Música', de: 'Musik' },
  { id: 'sport', emoji: '⚽', en: 'Sports', es: 'Deportes', de: 'Sport' },
  { id: 'health', emoji: '🩺', en: 'Health', es: 'Salud', de: 'Gesundheit' },
  { id: 'tools', emoji: '🔧', en: 'Tools', es: 'Herramientas', de: 'Werkzeug' },
  { id: 'garden', emoji: '🌻', en: 'Garden', es: 'Jardín', de: 'Garten' },
  { id: 'money', emoji: '💶', en: 'Money', es: 'Dinero', de: 'Geld' },
  { id: 'materials', emoji: '🪵', en: 'Materials', es: 'Materiales', de: 'Materialien' },
  { id: 'shapes', emoji: '🔺', en: 'Shapes', es: 'Formas', de: 'Formen' },
] as const

export type CatId = (typeof CATEGORIES)[number]['id']

export function getCategory(id: string) {
  return CATEGORIES.find((cat) => cat.id === id)
}

export function catLabel(locale: 'en' | 'es' | 'de', id: string) {
  const cat = getCategory(id)
  if (!cat) return id
  if (locale === 'es') return cat.es
  if (locale === 'de') return cat.de
  return cat.en
}
