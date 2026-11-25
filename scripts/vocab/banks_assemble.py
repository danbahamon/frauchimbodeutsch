# -*- coding: utf-8 -*-
"""Assemble A2 (360) and B1 (450) vocabulary from category banks."""
import json
import os
import random

random.seed(42)
HERE = os.path.dirname(os.path.abspath(__file__))

A2_EXTRA10 = {
    "hello", "family", "verbs", "adjectives", "travel", "office", "health", "food", "city",
}
B1_EXTRA12 = {
    "hello", "family", "verbs", "adjectives", "travel", "office", "health", "food", "city",
    "jobs", "nature", "time", "feelings", "school", "transport", "shop", "tech",
    "money", "sport", "house", "weather",
}

CATS = [
    "hello", "numbers", "colors", "family", "body", "clothes", "food", "fruit", "veg",
    "drinks", "animals", "house", "furniture", "kitchen", "city", "transport", "school",
    "jobs", "nature", "weather", "time", "feelings", "verbs", "adjectives", "travel",
    "shop", "hobbies", "tech", "lands", "bath", "office", "music", "sport", "health",
    "tools", "garden", "money", "materials", "shapes",
]


def row(cefr, cat, kind, de, en, es, art="", pl=""):
    r = [cefr, cat, kind, de, en, es]
    if kind == "noun":
        r.extend([art, pl])
    return r


# fmt: off — curated banks (de, en, es, art, pl) or (de, en, es) for non-nouns

BANK = {}

def nn(cat, *items):
    BANK.setdefault(cat, []).extend([("noun", *it) for it in items])

def vv(cat, *items):
    BANK.setdefault(cat, []).extend([("verb", *it) for it in items])

def aa(cat, *items):
    BANK.setdefault(cat, []).extend([("adj", *it) for it in items])

def pp(cat, *items):
    BANK.setdefault(cat, []).extend([("phrase", *it) for it in items])

def oo(cat, *items):
    BANK.setdefault(cat, []).extend([("other", *it) for it in items])

def num(cat, *items):
    BANK.setdefault(cat, []).extend([("num", *it) for it in items])

# --- hello ---
pp("hello",
   ("Schönen Tag noch", "have a nice day", "que tenga un buen día"),
   ("Gute Besserung", "get well soon", "que te mejores"),
   ("Viel Spaß", "have fun", "que te diviertas"),
   ("Guten Appetit", "enjoy your meal", "buen provecho"),
   ("Das stimmt", "that's right", "eso es cierto"),
   ("Keine Sorge", "don't worry", "no te preocupes"),
   ("Macht nichts", "never mind", "no importa"),
   ("Herzlich bedankt", "heartfelt thanks", "muchas gracias de corazón"),
   ("Ich freue mich", "I'm glad", "me alegro"),
   ("Das wäre toll", "that would be great", "sería genial"),
   ("Mit freundlichen Grüßen", "kind regards", "un cordial saludo"),
   ("Bis bald", "see you soon", "hasta pronto"),
   ("Es tut mir leid", "I'm sorry", "lo siento"),
   ("Gern geschehen", "you're welcome", "de nada"),
   ("Stimmt so", "keep the change", "quédese con el cambio"),
)
nn("hello",
   ("Einladung", "invitation", "invitación", "die", "Einladungen"),
   ("Grußkarte", "greeting card", "tarjeta de felicitación", "die", "Grußkarten"),
   ("Begrüßung", "welcome", "bienvenida", "die", "Begrüßungen"),
   ("Verabschiedung", "farewell", "despedida", "die", "Verabschiedungen"),
   ("Kompliment", "compliment", "cumplido", "das", "Komplimente"),
   ("Smalltalk", "small talk", "charla informal", "der", ""),
)

# --- numbers ---
num("numbers",
    ("Dutzend", "dozen", "docena"),
    ("Viertel", "quarter fraction", "cuarto"),
    ("Drittel", "third fraction", "tercio"),
)
oo("numbers",
   ("ungefähr", "approximately", "aproximadamente"),
   ("höchstens", "at most", "como máximo"),
   ("mindestens", "at least", "como mínimo"),
   ("doppelt", "twice", "dos veces"),
   ("dreimal", "three times", "tres veces"),
   ("ein Drittel", "one third", "un tercio"),
   ("ein Viertel", "one quarter", "un cuarto"),
   ("rund", "roughly", "más o menos"),
   ("insgesamt", "in total", "en total"),
   ("prozentual", "in percent terms", "en porcentaje"),
   ("paarweise", "in pairs", "en pares"),
   ("vielfach", "multiple times", "muchas veces"),
)

# --- colors ---
aa("colors",
   ("lila", "purple", "morado"),
   ("golden", "golden", "dorado"),
   ("silbern", "silvery", "plateado"),
   ("glänzend", "glossy", "brillante"),
   ("matt", "matte", "mate"),
   ("pastellfarben", "pastel-colored", "de color pastel"),
   ("kräftig", "vivid", "intenso"),
   ("blass", "pale", "pálido"),
   ("neongrün", "neon green", "verde neón"),
   ("dunkelblau", "dark blue", "azul oscuro"),
   ("hellrosa", "light pink", "rosa claro"),
   ("mehrfarbig", "multicolored", "multicolor"),
)
nn("colors",
   ("Farbton", "hue", "tono", "der", "Farbtöne"),
   ("Schattierung", "shade", "sombra", "die", "Schattierungen"),
   ("Kontrast", "contrast", "contraste", "der", "Kontraste"),
   ("Muster", "pattern", "patrón", "das", "Muster"),
   ("Streifen", "stripe", "raya", "der", "Streifen"),
   ("Farbpalette", "color palette", "paleta de colores", "die", "Farbpaletten"),
   ("Lackierung", "paint coat", "capa de pintura", "die", "Lackierungen"),
)

# --- family ---
nn("family",
   ("Schwager", "brother-in-law", "cuñado", "der", "Schwäger"),
   ("Schwägerin", "sister-in-law", "cuñada", "die", "Schwägerinnen"),
   ("Patenkind", "godchild", "ahijado", "das", "Patenkinder"),
   ("Patenonkel", "godfather", "padrino", "der", "Patenonkel"),
   ("Pflegekind", "foster child", "niño de acogida", "das", "Pflegekinder"),
   ("Familienrat", "family council", "consejo familiar", "der", "Familienräte"),
   ("Haushalt", "household", "hogar", "der", "Haushalte"),
   ("Elternschaft", "parenthood", "paternidad", "die", ""),
   ("Verlobter", "fiancé", "prometido", "der", "Verlobten"),
   ("Verlobte", "fiancée", "prometida", "die", "Verlobten"),
   ("Pflegevater", "foster father", "padre de acogida", "der", "Pflegeväter"),
   ("Patchworkfamilie", "blended family", "familia ensamblada", "die", "Patchworkfamilien"),
   ("Erziehungsberechtigte", "legal guardian", "tutor legal", "die", "Erziehungsberechtigten"),
)
pp("family",
   ("Wir verstehen uns gut", "we get along well", "nos llevamos bien"),
   ("Die Familie wächst", "the family is growing", "la familia crece"),
)

# --- body ---
nn("body",
   ("Knöchel", "ankle joint", "tobillo", "der", "Knöchel"),
   ("Wade", "calf", "pantorrilla", "die", "Waden"),
   ("Oberschenkel", "thigh", "muslo", "der", "Oberschenkel"),
   ("Brustkorb", "rib cage", "caja torácica", "der", "Brustkörbe"),
   ("Wirbelsäule", "spine", "columna vertebral", "die", "Wirbelsäulen"),
   ("Kehle", "throat", "garganta", "die", "Kehlen"),
   ("Augenbraue", "eyebrow", "ceja", "die", "Augenbrauen"),
   ("Wimper", "eyelash", "pestaña", "die", "Wimpern"),
   ("Nasenflügel", "nostril", "fosa nasal", "der", "Nasenflügel"),
   ("Schläfe", "temple", "sien", "die", "Schläfen"),
   ("Hautfalte", "skin fold", "pliegue de la piel", "die", "Hautfalten"),
   ("Daumen", "thumb", "pulgar", "der", "Daumen"),
   ("Zehennagel", "toenail", "uña del pie", "der", "Zehennägel"),
)

# --- clothes ---
nn("clothes",
   ("Kapuze", "hood", "capucha", "die", "Kapuzen"),
   ("Reißverschluss", "zipper", "cremallera", "der", "Reißverschlüsse"),
   ("Knopfloch", "buttonhole", "ojal", "das", "Knopflöcher"),
   ("Stiefel", "boot", "bota", "der", "Stiefel"),
   ("Sandal", "sandal", "sandalia", "die", "Sandalen"),
   ("Bluse", "blouse", "blusa", "die", "Blusen"),
   ("Weste", "vest", "chaleco", "die", "Westen"),
   ("Strickjacke", "cardigan", "cárdigan", "die", "Strickjacken"),
   ("Anorak", "anorak", "anorak", "der", "Anoraks"),
   ("Leggings", "leggings", "leggings", "die", ""),
   ("Sportanzug", "tracksuit", "chándal", "der", "Sportanzüge"),
   ("Abendkleid", "evening dress", "vestido de noche", "das", "Abendkleider"),
)
aa("clothes", ("kariert", "checkered", "a cuadros"), ("gestreift", "striped", "a rayas"))

# --- food ---
nn("food",
   ("Spiegelei", "fried egg", "huevo frito", "das", "Spiegeleier"),
   ("Rührei", "scrambled eggs", "huevos revueltos", "das", ""),
   ("Pfannkuchen", "pancake", "panqueque", "der", "Pfannkuchen"),
   ("Brezel", "pretzel", "pretzel", "die", "Brezeln"),
   ("Leberwurst", "liverwurst", "paté de hígado", "die", "Leberwürste"),
   ("Matjes", "pickled herring", "arenque en escabeche", "der", ""),
   ("Sauerkraut", "sauerkraut", "chucrut", "das", ""),
   ("Kartoffelpüree", "mashed potatoes", "puré de patatas", "das", ""),
   ("Frikadelle", "meatball patty", "albóndiga", "die", "Frikadellen"),
   ("Kohlroulade", "stuffed cabbage roll", "rollo de col", "die", "Kohlrouladen"),
   ("Käsespätzle", "cheese spaetzle", "spaetzle con queso", "die", ""),
   ("Semmelknödel", "bread dumpling", "bollo de pan", "der", "Semmelknödel"),
   ("Flammkuchen", "flammkuchen tart", "tarta flamenca", "der", "Flammkuchen"),
   ("Lebkuchen", "gingerbread", "pan de jengibre", "der", "Lebkuchen"),
   ("Butterbrot", "bread with butter", "pan con mantequilla", "das", "Butterbrote"),
)

# --- fruit ---
nn("fruit",
   ("Johannisbeere", "currant", "grosella", "die", "Johannisbeeren"),
   ("Holunderbeere", "elderberry", "baya de saúco", "die", "Holunderbeeren"),
   ("Mirabelle", "mirabelle plum", "ciruela amarilla", "die", "Mirabellen"),
   ("Quitte", "quince", "membrillo", "die", "Quitten"),
   ("Kumquat", "kumquat", "kumquat", "die", "Kumquats"),
   ("Granatapfel", "pomegranate", "granada", "der", "Granatäpfel"),
   ("Maracuja", "passion fruit", "maracuyá", "die", "Maracujas"),
   ("Litschi", "lychee", "litchi", "die", "Litschis"),
   ("Physalis", "physalis", "physalis", "die", ""),
   ("Birne", "pear", "pera", "die", "Birnen"),
   ("Mandarine", "mandarin", "mandarina", "die", "Mandarinens"),
)

# --- veg ---
nn("veg",
   ("Rosenkohl", "brussels sprout", "col de Bruselas", "der", ""),
   ("Lauch", "leek", "puerro", "der", "Lauch"),
   ("Sellerie", "celery", "apio", "der", ""),
   ("Radieschen", "radish", "rábano", "das", "Radieschen"),
   ("Pastinake", "parsnip", "chirivía", "die", "Pastinaken"),
   ("Kohlrabi", "kohlrabi", "colinabo", "der", ""),
   ("Spargel", "asparagus", "espárrago", "der", ""),
   ("Rote Bete", "beetroot", "remolacha", "die", ""),
   ("Champignon", "button mushroom", "champiñón", "der", "Champignons"),
   ("Zwiebel", "onion", "cebolla", "die", "Zwiebeln"),
   ("Knoblauch", "garlic", "ajo", "der", ""),
)

# --- drinks ---
nn("drinks",
   ("Radler", "shandy beer", "cerveza con limonada", "der", "Radler"),
   ("Holunderlimonade", "elderflower soda", "limonada de saúco", "die", "Holunderlimonaden"),
   ("Kräutertee", "herbal tea", "té de hierbas", "der", "Kräutertees"),
   ("Eistee", "iced tea", "té helado", "der", "Eistees"),
   ("Smoothie", "smoothie", "batido", "der", "Smoothies"),
   ("Milchshake", "milkshake", "malteada", "der", "Milchshakes"),
   ("Rotwein", "red wine", "vino tinto", "der", "Rotweine"),
   ("Weißwein", "white wine", "vino blanco", "der", "Weißweine"),
   ("Sekt", "sparkling wine", "vino espumoso", "der", "Sekte"),
   ("Kakao", "cocoa", "cacao", "der", "Kakaos"),
   ("Filterkaffee", "filter coffee", "café filtrado", "der", "Filterkaffees"),
)

# --- animals ---
nn("animals",
   ("Dachs", "badger", "tejón", "der", "Dachse"),
   ("Eichhörnchen", "squirrel", "ardilla", "das", "Eichhörnchen"),
   ("Reh", "roe deer", "corzo", "das", "Rehe"),
   ("Wildschwein", "wild boar", "jabalí", "das", "Wildschweine"),
   ("Schwan", "swan", "cisne", "der", "Schwäne"),
   ("Pfau", "peacock", "pavo real", "der", "Pfauen"),
   ("Eule", "owl", "búho", "die", "Eulen"),
   ("Maulwurf", "mole", "topo", "der", "Maulwürfe"),
   ("Iltis", "weasel", "comadreja", "der", "Iltisse"),
   ("Hamster", "hamster", "hámster", "der", "Hamster"),
   ("Wellensittich", "budgie", "periquito", "der", "Wellensittiche"),
)

# --- house ---
nn("house",
   ("Dachrinne", "gutter", "canaleta", "die", "Dachrinnen"),
   ("Regenrinne", "rain gutter", "bajante", "die", "Regenrinnen"),
   ("Hausnummer", "house number", "número de casa", "die", "Hausnummern"),
   ("Klingel", "doorbell", "timbre", "die", "Klingeln"),
   ("Türklinke", "door handle", "manija", "die", "Türklinken"),
   ("Fußmatte", "doormat", "felpudo", "die", "Fußmatten"),
   ("Heizkörper", "radiator", "radiador", "der", "Heizkörper"),
   ("Thermostat", "thermostat", "termostato", "das", "Thermostate"),
   ("Rollladen", "roller shutter", "persiana", "der", "Rollläden"),
   ("Fensterbank", "windowsill", "alféizar", "die", "Fensterbänke"),
   ("Stromkasten", "fuse box", "caja de fusibles", "der", "Stromkästen"),
   ("Rauchmelder", "smoke detector", "detector de humo", "der", "Rauchmelder"),
   ("Putzmittel", "cleaning supplies", "productos de limpieza", "das", "Putzmittel"),
)

# --- furniture ---
nn("furniture",
   ("Sessel", "armchair", "sillón", "der", "Sessel"),
   ("Couchtisch", "coffee table", "mesa de centro", "der", "Couchtische"),
   ("Kleiderschrank", "wardrobe", "armario", "der", "Kleiderschränke"),
   ("Bettgestell", "bed frame", "marco de cama", "das", "Bettgestelle"),
   ("Lattenrost", "slatted frame", "somier", "der", "Lattenroste"),
   ("Bücherregal", "bookshelf", "estantería", "das", "Bücherregale"),
   ("Vitrine", "display cabinet", "vitrina", "die", "Vitrinen"),
   ("Sitzbank", "bench", "banco", "die", "Sitzbänke"),
   ("Fernsehschrank", "TV cabinet", "mueble de TV", "der", "Fernsehschränke"),
   ("Nachttischlampe", "bedside lamp", "lámpara de mesita", "die", "Nachttischlampen"),
)

# --- kitchen ---
nn("kitchen",
   ("Küchenwaage", "kitchen scale", "báscula de cocina", "die", "Küchenwaagen"),
   ("Schöpfkelle", "ladle", "cucharón", "die", "Schöpfkellen"),
   ("Reibe", "grater", "rallador", "die", "Reiben"),
   ("Nudelholz", "rolling pin", "rodillo", "das", "Nudelhölzer"),
   ("Sieb", "sieve", "colador", "das", "Siebe"),
   ("Dosenöffner", "can opener", "abrelatas", "der", "Dosenöffner"),
   ("Korkenzieher", "corkscrew", "sacacorchos", "der", "Korkenzieher"),
   ("Schneidebrett", "cutting board", "tabla de cortar", "das", "Schneidebretter"),
   ("Backblech", "baking tray", "bandeja de horno", "das", "Backbleche"),
   ("Auflaufform", "casserole dish", "fuente para horno", "die", "Auflaufformen"),
)

# --- city ---
nn("city",
   ("Fußgängerzone", "pedestrian zone", "zona peatonal", "die", "Fußgängerzonen"),
   ("Sehenswürdigkeit", "sight", "lugar de interés", "die", "Sehenswürdigkeiten"),
   ("Stadtmauer", "city wall", "muralla", "die", "Stadtmauern"),
   ("Springbrunnen", "fountain", "fuente", "der", "Springbrunnen"),
   ("Markthalle", "market hall", "mercado cubierto", "die", "Markthallen"),
   ("Polizeiwache", "police station", "comisaría", "die", "Polizeiwachen"),
   ("Feuerwache", "fire station", "parque de bomberos", "die", "Feuerwachen"),
   ("Bushaltestelle", "bus stop", "parada de autobús", "die", "Bushaltestellen"),
   ("Fahrradweg", "bike lane", "carril bici", "der", "Fahrradwege"),
   ("Baustelle", "construction site", "obra", "die", "Baustellen"),
   ("Einkaufszentrum", "shopping mall", "centro comercial", "das", "Einkaufszentren"),
   ("Altstadt", "old town", "casco antiguo", "die", "Altstädte"),
   ("Stadtplan", "city map", "plano de la ciudad", "der", "Stadtpläne"),
)

# --- transport ---
nn("transport",
   ("Umsteigen", "transfer", "transbordo", "das", ""),
   ("Fahrplan", "timetable", "horario", "der", "Fahrpläne"),
   ("Anschluss", "connection", "conexión", "der", "Anschlüsse"),
   ("Fahrkartenautomat", "ticket machine", "máquina de billetes", "der", "Fahrkartenautomaten"),
   ("Straßenbahn", "tram", "tranvía", "die", "Straßenbahnen"),
   ("S-Bahn", "commuter train", "tren suburbano", "die", "S-Bahnen"),
   ("U-Bahn", "subway", "metro", "die", "U-Bahnen"),
   ("Fahrradständer", "bike rack", "aparcamiento de bicis", "der", "Fahrradständer"),
   ("Mautstelle", "toll booth", "peaje", "die", "Mautstellen"),
   ("Wegweiser", "signpost", "señal", "der", "Wegweiser"),
   ("Reisebus", "coach bus", "autobús de larga distancia", "der", "Reisebusse"),
)

# --- school ---
nn("school",
   ("Klausur", "written exam", "examen escrito", "die", "Klausuren"),
   ("Referat", "presentation talk", "exposición", "das", "Referate"),
   ("Studiengebühr", "tuition fee", "matrícula", "die", "Studiengebühren"),
   ("Gruppenarbeit", "group work", "trabajo en grupo", "die", "Gruppenarbeiten"),
   ("Stundenplan", "class schedule", "horario escolar", "der", "Stundenpläne"),
   ("Schulhof", "schoolyard", "patio escolar", "der", "Schulhöfe"),
   ("Klassenzimmer", "classroom", "aula", "das", "Klassenzimmer"),
   ("Schulbuch", "textbook", "libro de texto", "das", "Schulbücher"),
   ("Schulranzen", "school backpack", "mochila escolar", "der", "Schulranzen"),
   ("Nachhilfe", "tutoring", "clases de apoyo", "die", ""),
   ("Zeugnis", "report card", "boletín de notas", "das", "Zeugnisse"),
)

# --- jobs ---
nn("jobs",
   ("Krankenpfleger", "nurse", "enfermero", "der", "Krankenpfleger"),
   ("Krankenschwester", "nurse", "enfermera", "die", "Krankenschwestern"),
   ("Elektriker", "electrician", "electricista", "der", "Elektriker"),
   ("Klempner", "plumber", "fontanero", "der", "Klempner"),
   ("Friseur", "hairdresser", "peluquero", "der", "Friseure"),
   ("Bäcker", "baker", "panadero", "der", "Bäcker"),
   ("Verkäufer", "sales clerk", "vendedor", "der", "Verkäufer"),
   ("Lagerarbeiter", "warehouse worker", "almacenista", "der", "Lagerarbeiter"),
   ("Gärtner", "gardener", "jardinero", "der", "Gärtner"),
   ("Rezeptionist", "receptionist", "recepcionista", "der", "Rezeptionisten"),
   ("Steuerberater", "tax consultant", "asesor fiscal", "der", "Steuerberater"),
)

# --- nature ---
nn("nature",
   ("Wasserfall", "waterfall", "cascada", "der", "Wasserfälle"),
   ("Schlucht", "gorge", "cañón", "die", "Schluchten"),
   ("Felsen", "rock formation", "roca", "der", "Felsen"),
   ("Sumpf", "swamp", "pantano", "der", "Sümpfe"),
   ("Heide", "heath", "brezal", "die", "Heiden"),
   ("Steppe", "steppe", "estepa", "die", "Steppen"),
   ("Gletscher", "glacier", "glaciar", "der", "Gletscher"),
   ("Lichtung", "clearing", "claro", "die", "Lichtungen"),
   ("Ufer", "shore", "orilla", "das", "Ufer"),
   ("Quelle", "spring", "manantial", "die", "Quellen"),
   ("Delta", "river delta", "delta", "das", "Deltas"),
)

# --- weather ---
nn("weather",
   ("Gewitter", "thunderstorm", "tormenta", "das", "Gewitter"),
   ("Hagel", "hail", "granizo", "der", ""),
   ("Nebel", "fog", "niebla", "der", ""),
   ("Glatteis", "black ice", "hielo invisible", "das", ""),
   ("Frühling", "spring season", "primavera", "der", "Frühlinge"),
   ("Herbst", "autumn", "otoño", "der", "Herbste"),
   ("Luftdruck", "air pressure", "presión atmosférica", "der", "Luftdrücke"),
   ("Wetterbericht", "weather report", "informe del tiempo", "der", "Wetterberichte"),
)
pp("weather",
   ("Es ist bewölkt", "it is cloudy", "está nublado"),
   ("Es gibt Sturm", "there is a storm", "hay tormenta"),
   ("Die Temperatur steigt", "the temperature is rising", "sube la temperatura"),
)

# --- time ---
nn("time",
   ("Zeitzone", "time zone", "huso horario", "die", "Zeitzonen"),
   ("Frist", "deadline", "plazo", "die", "Fristen"),
   ("Terminkalender", "appointment calendar", "agenda", "der", "Terminkalender"),
   ("Mittagspause", "lunch break", "pausa del almuerzo", "die", "Mittagspausen"),
   ("Werktag", "workday", "día laborable", "der", "Werktage"),
   ("Feiertag", "public holiday", "día festivo", "der", "Feiertage"),
   ("Zeitpunkt", "point in time", "momento", "der", "Zeitpunkte"),
   ("Zeitraum", "period", "periodo", "der", "Zeiträume"),
)
oo("time",
   ("kürzlich", "recently", "recientemente"),
   ("bald", "soon", "pronto"),
   ("danach", "afterward", "después"),
   ("vorher", "beforehand", "antes"),
)

# --- feelings ---
aa("feelings",
   ("enttäuscht", "disappointed", "decepcionado"),
   ("aufgeregt", "excited", "emocionado"),
   ("erschöpft", "exhausted", "agotado"),
   ("erleichtert", "relieved", "aliviado"),
   ("verlegen", "embarrassed", "avergonzado"),
   ("dankbar", "grateful", "agradecido"),
   ("neugierig", "curious", "curioso"),
   ("eifersüchtig", "jealous", "celoso"),
   ("stolz", "proud", "orgulloso"),
   ("unsicher", "insecure", "inseguro"),
   ("überfordert", "overwhelmed", "abrumado"),
   ("zufrieden", "content", "satisfecho"),
   ("verzweifelt", "desperate", "desesperado"),
)
nn("feelings", ("Stimmung", "mood", "ánimo", "die", "Stimmungen"))

# --- verbs ---
vv("verbs",
   ("reservieren", "to reserve", "reservar"),
   ("umziehen", "to move house", "mudarse"),
   ("reparieren", "to repair", "reparar"),
   ("ausprobieren", "to try out", "probar"),
   ("vorbereiten", "to prepare", "preparar"),
   ("verschieben", "to postpone", "posponer"),
   ("unterbrechen", "to interrupt", "interrumpir"),
   ("wiederholen", "to repeat", "repetir"),
   ("überprüfen", "to check", "comprobar"),
   ("organisieren", "to organize", "organizar"),
   ("mitnehmen", "to take along", "llevar consigo"),
   ("vergessen", "to forget", "olvidar"),
   ("einpacken", "to pack", "empaquetar"),
   ("ausfüllen", "to fill out", "rellenar"),
   ("anrufen", "to phone", "llamar por teléfono"),
   ("spazieren gehen", "to go for a walk", "pasear"),
)

# --- adjectives ---
aa("adjectives",
   ("praktisch", "practical", "práctico"),
   ("zuverlässig", "reliable", "fiable"),
   ("bequem", "comfortable", "cómodo"),
   ("modern", "modern", "moderno"),
   ("traditionell", "traditional", "tradicional"),
   ("nützlich", "useful", "útil"),
   ("unnötig", "unnecessary", "innecesario"),
   ("ordentlich", "tidy", "ordenado"),
   ("flexibel", "flexible", "flexible"),
   ("pünktlich", "punctual", "puntual"),
   ("höflich", "polite", "educado"),
   ("ehrlich", "honest", "honesto"),
   ("mutig", "brave", "valiente"),
   ("geduldig", "patient", "paciente"),
   ("hilfsbereit", "helpful", "servicial"),
   ("verantwortungsvoll", "responsible", "responsable"),
)

# --- travel ---
nn("travel",
   ("Reiseführer", "travel guidebook", "guía de viaje", "der", "Reiseführer"),
   ("Reiseversicherung", "travel insurance", "seguro de viaje", "die", "Reiseversicherungen"),
   ("Bordkarte", "boarding pass", "tarjeta de embarque", "die", "Bordkarten"),
   ("Gepäckausgabe", "baggage claim", "recogida de equipaje", "die", "Gepäckausgaben"),
   ("Sicherheitskontrolle", "security check", "control de seguridad", "die", "Sicherheitskontrollen"),
   ("Zwischenstopp", "layover", "escala", "der", "Zwischenstopps"),
   ("Pension", "guesthouse", "pensión", "die", "Pensionen"),
   ("Jugendherberge", "youth hostel", "albergue juvenil", "die", "Jugendherbergen"),
   ("Mietwagen", "rental car", "coche de alquiler", "der", "Mietwagen"),
   ("Fährticket", "ferry ticket", "billete de ferry", "das", "Fährtickets"),
   ("Grenzübergang", "border crossing", "paso fronterizo", "der", "Grenzübergänge"),
   ("Rückreise", "return journey", "viaje de regreso", "die", "Rückreisen"),
)
pp("travel", ("Wir fahren los", "we are setting off", "nos vamos"))

# --- shop ---
nn("shop",
   ("Kaufhaus", "department store", "grandes almacenes", "das", "Kaufhäuser"),
   ("Feinkostladen", "delicatessen", "tienda gourmet", "der", "Feinkostläden"),
   ("Schuhgeschäft", "shoe store", "zapatería", "das", "Schuhgeschäfte"),
   ("Öffnungszeit", "opening hours", "horario de apertura", "die", "Öffnungszeiten"),
   ("Umtausch", "exchange", "cambio", "der", "Umtausche"),
   ("Quittung", "receipt", "recibo", "die", "Quittungen"),
   ("Sonderangebot", "special offer", "oferta especial", "das", "Sonderangebote"),
   ("Probierkabine", "fitting room", "probador", "die", "Probierkabinen"),
   ("Kundenkarte", "loyalty card", "tarjeta de cliente", "die", "Kundenkarten"),
   ("Lieferung", "delivery", "entrega", "die", "Lieferungen"),
)

# --- hobbies ---
nn("hobbies",
   ("Freizeitpark", "amusement park", "parque de atracciones", "der", "Freizeitparks"),
   ("Brettspiel", "board game", "juego de mesa", "das", "Brettspiele"),
   ("Kreuzworträtsel", "crossword", "crucigrama", "das", "Kreuzworträtsel"),
   ("Fernglas", "binoculars", "prismáticos", "das", "Ferngläser"),
   ("Angelrute", "fishing rod", "caña de pescar", "die", "Angelruten"),
   ("Stricknadel", "knitting needle", "aguja de tejer", "die", "Stricknadeln"),
   ("Modellbau", "model building", "modelismo", "der", ""),
   ("Wanderkarte", "hiking map", "mapa de senderos", "die", "Wanderkarten"),
   ("Konzertkarte", "concert ticket", "entrada de concierto", "die", "Konzertkarten"),
)

# --- tech ---
nn("tech",
   ("Ladekabel", "charging cable", "cable de carga", "das", "Ladekabel"),
   ("Steckdose", "power outlet", "enchufe", "die", "Steckdosen"),
   ("Akku", "battery pack", "batería", "der", "Akkus"),
   ("WLAN", "Wi-Fi", "wifi", "das", ""),
   ("Passwort", "password", "contraseña", "das", "Passwörter"),
   ("App", "app", "aplicación", "die", "Apps"),
   ("Speicherkarte", "memory card", "tarjeta de memoria", "die", "Speicherkarten"),
   ("Bluetooth", "Bluetooth", "bluetooth", "das", ""),
   ("Drucker", "printer", "impresora", "der", "Drucker"),
   ("Router", "router", "router", "der", "Router"),
)

# --- lands ---
oo("lands",
   ("Tschechien", "Czechia", "Chequia"),
   ("Ungarn", "Hungary", "Hungría"),
   ("Griechenland", "Greece", "Grecia"),
   ("Niederlande", "Netherlands", "Países Bajos"),
   ("Belgien", "Belgium", "Bélgica"),
   ("Dänemark", "Denmark", "Dinamarca"),
   ("Schweden", "Sweden", "Suecia"),
   ("Norwegen", "Norway", "Noruega"),
   ("Türkei", "Turkey", "Turquía"),
   ("Kroatien", "Croatia", "Croacia"),
   ("Rumänien", "Romania", "Rumanía"),
   ("Irland", "Ireland", "Irlanda"),
)

# --- bath ---
nn("bath",
   ("Duschgel", "shower gel", "gel de ducha", "das", "Duschgele"),
   ("Haarbürste", "hairbrush", "cepillo de pelo", "die", "Haarbürsten"),
   ("Rasierer", "razor", "maquinilla de afeitar", "der", "Rasierer"),
   ("Nagelschere", "nail scissors", "tijeras de uñas", "die", "Nagelscheren"),
   ("Wattestäbchen", "cotton swab", "bastoncillo", "das", "Wattestäbchen"),
   ("Feuchtigkeitscreme", "moisturizer", "crema hidratante", "die", "Feuchtigkeitscremes"),
   ("Badematte", "bath mat", "alfombra de baño", "die", "Badematten"),
   ("Waschlappen", "washcloth", "paño de lavar", "der", "Waschlappen"),
)

# --- office ---
nn("office",
   ("Dienstreise", "business trip", "viaje de negocios", "die", "Dienstreisen"),
   ("Arbeitsvertrag", "employment contract", "contrato laboral", "der", "Arbeitsverträge"),
   ("Gehaltsabrechnung", "pay slip", "nómina", "die", "Gehaltsabrechnungen"),
   ("Unterschrift", "signature", "firma", "die", "Unterschriften"),
   ("Kopierer", "copier", "fotocopiadora", "der", "Kopierer"),
   ("Schreibtischlampe", "desk lamp", "lámpara de escritorio", "die", "Schreibtischlampen"),
   ("Stempel", "stamp", "sello", "der", "Stempel"),
   ("Protokoll", "minutes", "acta", "das", "Protokolle"),
   ("Projektplan", "project plan", "plan de proyecto", "der", "Projektpläne"),
   ("Dringlichkeit", "urgency", "urgencia", "die", ""),
   ("Bewerbungsgespräch", "job interview", "entrevista de trabajo", "das", "Bewerbungsgespräche"),
)
pp("office", ("Ich bin im Termin", "I'm in a meeting", "estoy en una reunión"))

# --- music ---
nn("music",
   ("Chor", "choir", "coro", "der", "Chöre"),
   ("Text", "lyrics", "letra", "der", "Texte"),
   ("Playlist", "playlist", "lista de reproducción", "die", "Playlists"),
   ("Verstärker", "amplifier", "amplificador", "der", "Verstärker"),
   ("Bass", "bass guitar", "bajo", "der", "Bässe"),
   ("Schlagzeug", "drum kit", "batería", "das", "Schlagzeuge"),
   ("Konzertsaal", "concert hall", "sala de conciertos", "der", "Konzertsäle"),
   ("Einstieg", "intro", "introducción", "der", "Einstiege"),
)

# --- sport ---
nn("sport",
   ("Trainingsplan", "training plan", "plan de entrenamiento", "der", "Trainingspläne"),
   ("Sporthalle", "gymnasium", "polideportivo", "die", "Sporthallen"),
   ("Halbfinale", "semifinal", "semifinal", "das", "Halbfinale"),
   ("Elfmeter", "penalty kick", "penalti", "der", "Elfmeter"),
   ("Jogginghose", "sweatpants", "pantalón de chándal", "die", "Jogginghosen"),
   ("Turnschuh", "sneaker", "zapatilla deportiva", "der", "Turnschuhe"),
   ("Trainingslager", "training camp", "concentración", "das", "Trainingslager"),
   ("Mannschaftskapitän", "team captain", "capitán de equipo", "der", "Mannschaftskapitäne"),
)

# --- health ---
nn("health",
   ("Apotheker", "pharmacist", "farmacéutico", "der", "Apotheker"),
   ("Termin beim Arzt", "doctor's appointment", "cita médica", "der", "Termine beim Arzt"),
   ("Blutdruck", "blood pressure", "presión arterial", "der", ""),
   ("Impfung", "vaccination", "vacuna", "die", "Impfungen"),
   ("Allergie", "allergy", "alergia", "die", "Allergien"),
   ("Verband", "bandage", "vendaje", "der", "Verbände"),
   ("Erste Hilfe", "first aid", "primeros auxilios", "die", ""),
   ("Physiotherapie", "physiotherapy", "fisioterapia", "die", ""),
   ("Vorsorge", "preventive care", "prevención", "die", ""),
   ("Untersuchung", "examination", "examen médico", "die", "Untersuchungen"),
   ("Rezept", "prescription", "receta médica", "das", "Rezepte"),
)
pp("health", ("Mir geht es besser", "I'm feeling better", "me siento mejor"))

# --- tools ---
nn("tools",
   ("Akkuschrauber", "cordless drill", "atornillador", "der", "Akkuschrauber"),
   ("Wasserwaage", "spirit level", "nivel de burbuja", "die", "Wasserwaagen"),
   ("Zollstock", "folding ruler", "metro plegable", "der", "Zollstöcke"),
   ("Pinsel", "paintbrush", "pincel", "der", "Pinsel"),
   ("Farbeimer", "paint bucket", "cubo de pintura", "der", "Farbeimer"),
   ("Klebeband", "adhesive tape", "cinta adhesiva", "das", "Klebebänder"),
   ("Werkzeugkasten", "toolbox", "caja de herramientas", "der", "Werkzeugkästen"),
)

# --- garden ---
nn("garden",
   ("Gießkanne", "watering can", "regadera", "die", "Gießkannen"),
   ("Schubkarre", "wheelbarrow", "carretilla", "die", "Schubkarren"),
   ("Kompost", "compost", "compost", "der", ""),
   ("Unkraut", "weed", "hierba mala", "das", "Unkräuter"),
   ("Rasenmäher", "lawn mower", "cortacésped", "der", "Rasenmäher"),
   ("Heckenschere", "hedge trimmer", "cortasetos", "die", "Heckenscheren"),
   ("Pflanztopf", "flowerpot", "maceta", "der", "Pflanztöpfe"),
   ("Gartenschere", "garden shears", "tijeras de jardín", "die", "Gartenscheren"),
)

# --- money ---
nn("money",
   ("Kontoauszug", "account statement", "extracto bancario", "der", "Kontoauszüge"),
   ("Überweisung", "bank transfer", "transferencia", "die", "Überweisungen"),
   ("Spesen", "expenses", "gastos", "die", ""),
   ("Bargeld", "cash", "efectivo", "das", ""),
   ("Kreditkarte", "credit card", "tarjeta de crédito", "die", "Kreditkarten"),
   ("Ratenzahlung", "installment payment", "pago a plazos", "die", "Ratenzahlungen"),
   ("Girokonto", "checking account", "cuenta corriente", "das", "Girokonten"),
   ("Sparkonto", "savings account", "cuenta de ahorros", "das", "Sparkonten"),
)

# --- materials ---
nn("materials",
   ("Beton", "concrete", "hormigón", "der", ""),
   ("Gips", "plaster", "yeso", "der", ""),
   ("Ton", "clay", "arcilla", "der", ""),
   ("Leder", "leather", "cuero", "das", ""),
   ("Baumwolle", "cotton", "algodón", "die", ""),
   ("Wolle", "wool", "lana", "die", ""),
   ("Gummi", "rubber", "goma", "der", ""),
   ("Keramik", "ceramic", "cerámica", "die", ""),
)

# --- shapes ---
nn("shapes",
   ("Oval", "oval", "óvalo", "das", "Ovale"),
   ("Trapez", "trapezoid", "trapecio", "das", "Trapeze"),
   ("Raute", "diamond shape", "rombo", "die", "Rauten"),
   ("Zylinder", "cylinder", "cilindro", "der", "Zylinder"),
   ("Kegel", "cone", "cono", "der", "Kegel"),
   ("Pyramide", "pyramid", "pirámide", "die", "Pyramiden"),
   ("Halbkreis", "semicircle", "semicírculo", "der", "Halbkreise"),
   ("Sternform", "star shape", "forma de estrella", "die", "Sternformen"),
   ("Spirale", "spiral", "espiral", "die", "Spiralen"),
   ("Winkel", "angle", "ángulo", "der", "Winkel"),
)

nn("bath",
   ("Zahnseide", "dental floss", "hilo dental", "die", ""),
   ("Kamm", "comb", "peine", "der", "Kämme"),
)

nn("music",
   ("Notenblatt", "sheet music", "partitura", "das", "Notenblätter"),
   ("Probe", "rehearsal", "ensayo", "die", "Proben"),
   ("Blasinstrument", "wind instrument", "instrumento de viento", "das", "Blasinstrumente"),
   ("Streichquartett", "string quartet", "cuarteto de cuerdas", "das", "Streichquartette"),
)

nn("sport",
   ("Ausdauertraining", "endurance training", "entrenamiento de resistencia", "das", ""),
   ("Aufwärmen", "warm-up", "calentamiento", "das", ""),
   ("Wettkampfrichter", "competition judge", "juez de competición", "der", "Wettkampfrichter"),
   ("Freistoß", "free kick", "tiro libre", "der", "Freistöße"),
)

nn("tools",
   ("Inbusschlüssel", "Allen key", "llave Allen", "der", "Inbusschlüssel"),
   ("Metallsäge", "hacksaw", "sierra de metal", "die", "Metallsägen"),
   ("Maßband", "tape measure", "cinta métrica", "das", "Maßbänder"),
   ("Schraubenzieher", "screwdriver", "destornillador", "der", "Schraubenzieher"),
   ("Bohrmaschine", "drill", "taladro", "die", "Bohrmaschinen"),
)

nn("garden",
   ("Laub", "foliage", "follaje", "das", ""),
   ("Gartenhaus", "garden shed", "caseta de jardín", "das", "Gartenhäuser"),
   ("Grabgabel", "garden fork", "horquilla de jardín", "die", "Grabgabeln"),
   ("Regentonne", "rain barrel", "barril de lluvia", "die", "Regentonnen"),
)

nn("money",
   ("Inflation", "inflation", "inflación", "die", "Inflationen"),
   ("Budget", "budget", "presupuesto", "das", "Budgets"),
   ("Gebühr", "fee", "tasa", "die", "Gebühren"),
   ("Rückzahlung", "repayment", "reembolso", "die", "Rückzahlungen"),
)

nn("materials",
   ("Nylon", "nylon", "nailon", "der", ""),
   ("Edelstahl", "stainless steel", "acero inoxidable", "der", ""),
   ("Sandstein", "sandstone", "arenisca", "der", "Sandsteine"),
   ("Bronze", "bronze", "bronce", "die", ""),
)

nn("furniture",
   ("Schaukelstuhl", "rocking chair", "mecedora", "der", "Schaukelstühle"),
   ("Esstisch", "dining table", "mesa de comedor", "der", "Esstische"),
)

nn("kitchen",
   ("Salzstreuer", "salt shaker", "salero", "der", "Salzstreuer"),
   ("Messbecher", "measuring cup", "taza medidora", "der", "Messbecher"),
)

nn("shop",
   ("Verkaufsberater", "sales advisor", "asesor de ventas", "der", "Verkaufsberater"),
   ("Inventur", "stocktaking", "inventario", "die", "Inventuren"),
)

nn("hobbies",
   ("Briefmarke", "stamp", "sello de correos", "die", "Briefmarken"),
   ("Vinylplatte", "vinyl record", "disco de vinilo", "die", "Vinylplatten"),
   ("Pinselset", "brush set", "set de pinceles", "das", "Pinselsets"),
)

nn("tech",
   ("Festplatte", "hard drive", "disco duro", "die", "Festplatten"),
   ("Cloudspeicher", "cloud storage", "almacenamiento en la nube", "der", ""),
)

nn("fruit",
   ("Stachelbeere", "gooseberry", "grosella espinosa", "die", "Stachelbeeren"),
)

nn("veg",
   ("Rucola", "arugula", "rúcula", "die", ""),
)

nn("drinks",
   ("Malzbier", "malt beer", "cerveza de malta", "das", "Malzbier"),
)

nn("animals",
   ("Streifenhörnchen", "chipmunk", "ardilla listada", "das", "Streifenhörnchen"),
)

nn("house",
   ("Zimmertür", "interior door", "puerta interior", "die", "Zimmertüren"),
)

nn("transport",
   ("Fahrgast", "passenger", "pasajero", "der", "Fahrgäste"),
)

nn("school",
   ("Hausarbeit", "term paper", "trabajo escrito", "die", "Hausarbeiten"),
)

nn("jobs",
   ("Projektleiter", "project manager", "jefe de proyecto", "der", "Projektleiter"),
)

nn("nature",
   ("Tierwelt", "wildlife", "fauna", "die", ""),
)

nn("weather",
   ("Luftfeuchtigkeit", "humidity", "humedad", "die", ""),
)

vv("verbs",
   ("beantragen", "to apply for", "solicitar"),
   ("bestellen", "to order", "pedir"),
)

# === B1 extensions (more abstract / work / study) ===

B1_EXTRA = {}

def b1_add(cat, kind, de, en, es, art="", pl=""):
    B1_EXTRA.setdefault(cat, []).append((kind, de, en, es, art, pl))

# B1 hello
b1_add("hello", "phrase", "Ich möchte vorschlagen", "I would like to suggest", "me gustaría sugerir")
b1_add("hello", "phrase", "Darf ich unterbrechen?", "May I interrupt?", "¿puedo interrumpir?")
b1_add("hello", "phrase", "Das kommt mir gelegen", "that suits me", "me viene bien")
b1_add("hello", "phrase", "Gute Zusammenarbeit", "good cooperation", "buena colaboración")
b1_add("hello", "noun", "Rückmeldung", "feedback", "respuesta", "die", "Rückmeldungen")
b1_add("hello", "noun", "Absprache", "agreement", "acuerdo", "die", "Absprachen")
b1_add("hello", "noun", "Meinungsaustausch", "exchange of views", "intercambio de opiniones", "der", "Meinungsaustausche")

# B1 numbers
b1_add("numbers", "other", "im Durchschnitt", "on average", "en promedio")
b1_add("numbers", "other", "im Verhältnis", "in proportion", "en proporción")
b1_add("numbers", "num", "Prozentpunkt", "percentage point", "punto porcentual", "der", "Prozentpunkte")
b1_add("numbers", "other", "genau genommen", "strictly speaking", "estrictamente hablando")

# B1 colors - reuse bank + extras
b1_add("colors", "noun", "Farbverlauf", "color gradient", "degradado de color", "der", "Farbverläufe")
b1_add("colors", "adj", "farbenblind", "color-blind", "daltónico")

# B1 family
b1_add("family", "noun", "Generationenkonflikt", "generational conflict", "conflicto generacional", "der", "Generationenkonflikte")
b1_add("family", "noun", "Betreuung", "care", "cuidado", "die", "Betreuungen")
b1_add("family", "phrase", "Wir einigen uns", "we reach an agreement", "llegamos a un acuerdo")

# B1 body
b1_add("body", "noun", "Bewegungsapparat", "musculoskeletal system", "aparato locomotor", "der", "Bewegungsapparate")
b1_add("body", "noun", "Durchblutung", "blood circulation", "circulación sanguínea", "die", "")

# B1 clothes
b1_add("clothes", "noun", "Businesskleidung", "business attire", "ropa de negocios", "die", "")
b1_add("clothes", "adj", "atmungsaktiv", "breathable", "transpirable")

# B1 food
b1_add("food", "noun", "Vorkochen", "meal prep", "preparación de comidas", "das", "")
b1_add("food", "noun", "Nahrungsmittelunverträglichkeit", "food intolerance", "intolerancia alimentaria", "die", "Nahrungsmittelunverträglichkeiten")
b1_add("food", "noun", "Eigenmarke", "store brand", "marca propia", "die", "Eigenmarken")

b1_add("fruit", "noun", "Beerenhügel", "berry hill crop", "cultivo de bayas", "der", "Beerenhügel")
b1_add("veg", "noun", "Hydroponik", "hydroponics", "hidroponía", "die", "")
b1_add("drinks", "noun", "Mischgetränk", "mixed drink", "bebida mixta", "das", "Mischgetränke")
b1_add("animals", "noun", "Lebensraum", "habitat", "hábitat", "der", "Lebensräume")
b1_add("house", "noun", "Energieaudit", "energy audit", "auditoría energética", "das", "Energieaudits")
b1_add("furniture", "noun", "Arbeitsplatz", "workspace", "puesto de trabajo", "der", "Arbeitsplätze")
b1_add("kitchen", "noun", "Dampfgarer", "steam cooker", "vaporera", "der", "Dampfgarer")
b1_add("city", "noun", "Innenstadtbereich", "city center area", "zona céntrica", "der", "Innenstadtbereiche")
b1_add("transport", "noun", "Netzplan", "network map", "mapa de red", "der", "Netzpläne")
b1_add("school", "noun", "Seminararbeit", "seminar paper", "trabajo de seminario", "die", "Seminararbeiten")
b1_add("jobs", "noun", "Beförderung", "promotion", "ascenso", "die", "Beförderungen")
b1_add("nature", "noun", "Artenschutz", "species protection", "protección de especies", "der", "")
b1_add("weather", "noun", "Klimawandel", "climate change", "cambio climático", "der", "")
b1_add("time", "noun", "Minutengenauigkeit", "minute precision", "precisión al minuto", "die", "")
b1_add("feelings", "adj", "verunsichert", "unsettled", "desconcertado")
b1_add("verbs", "verb", "verhandeln", "to negotiate", "negociar")
b1_add("verbs", "verb", "recherchieren", "to research", "investigar")
b1_add("adjectives", "adj", "nachhaltig", "sustainable", "sostenible")
b1_add("travel", "noun", "Visumantrag", "visa application", "solicitud de visa", "der", "Visumanträge")
b1_add("shop", "noun", "Großhandel", "wholesale", "mayorista", "der", "")
b1_add("hobbies", "noun", "Ehrenamt", "volunteer work", "trabajo voluntario", "das", "Ehrenämter")
b1_add("tech", "noun", "Cyberangriff", "cyberattack", "ciberataque", "der", "Cyberangriffe")
b1_add("lands", "other", "Luxemburg", "Luxembourg", "Luxemburgo")
b1_add("bath", "noun", "Hygieneartikel", "hygiene product", "artículo de higiene", "der", "Hygieneartikel")
b1_add("office", "noun", "Quartalsbericht", "quarterly report", "informe trimestral", "der", "Quartalsberichte")
b1_add("music", "noun", "Improvisation", "improvisation", "improvisación", "die", "Improvisationen")
b1_add("sport", "noun", "Wettkampfnerv", "competitive tension", "tensión competitiva", "der", "")
b1_add("health", "noun", "Symptomatik", "symptomatic pattern", "sintomatología", "die", "")
b1_add("tools", "noun", "Werkstatteinrichtung", "workshop equipment", "equipo de taller", "die", "Werkstatteinrichtungen")
b1_add("garden", "noun", "Hochbeet", "raised bed", "huerto elevado", "das", "Hochbeete")
b1_add("money", "noun", "Nettogehalt", "net salary", "salario neto", "das", "Nettogehälter")
b1_add("materials", "noun", "Verbundwerkstoff", "composite material", "material compuesto", "der", "Verbundwerkstoffe")
b1_add("shapes", "noun", "Symmetrieachse", "axis of symmetry", "eje de simetría", "die", "Symmetrieachsen")
b1_add("numbers", "other", "prozentualer Anteil", "percentage share", "porcentaje")
b1_add("colors", "adj", "schillernd", "iridescent", "irisado")
b1_add("body", "noun", "Haltung", "posture", "postura", "die", "Haltungen")
b1_add("clothes", "noun", "Tracht", "traditional dress", "traje tradicional", "die", "Trachten")
b1_add("hello", "phrase", "Ich halte das für sinnvoll", "I consider that sensible", "lo considero sensato")

def expand_item(cat, item):
    kind = item[0]
    if kind == "noun":
        _, de, en, es, art, pl = item
        return ("noun", de, en, es, art, pl)
    _, de, en, es = item[:4]
    return (kind, de, en, es, "", "")


def pick_bank(cat, n, used_de, used_en, used_es, rng):
    pool = [expand_item(cat, x) for x in BANK.get(cat, [])]
    rng.shuffle(pool)
    out = []
    for it in pool:
        if len(out) >= n:
            break
        kind, de, en, es, art, pl = it
        dk, ek, esk = de.lower(), en.lower(), es.lower()
        if dk in used_de or ek in used_en or esk in used_es:
            continue
        used_de.add(dk)
        used_en.add(ek)
        used_es.add(esk)
        out.append((kind, de, en, es, art, pl))
    if len(out) < n:
        raise ValueError(f"not enough bank for {cat}: need {n} got {len(out)}")
    return out


def pick_b1(cat, n, used_de, used_en, used_es, rng):
    pool = []
    for item in BANK.get(cat, []):
        pool.append(expand_item(cat, item))
    for item in B1_EXTRA.get(cat, []):
        kind, de, en, es, art, pl = item
        pool.append((kind, de, en, es, art, pl))
    rng.shuffle(pool)
    out = []
    for kind, de, en, es, art, pl in pool:
        if len(out) >= n:
            break
        dk, ek, esk = de.lower(), en.lower(), es.lower()
        if dk in used_de or ek in used_en or esk in used_es:
            continue
        used_de.add(dk)
        used_en.add(ek)
        used_es.add(esk)
        out.append((kind, de, en, es, art, pl))
    if len(out) < n:
        raise ValueError(f"B1 not enough for {cat}: need {n} got {len(out)}")
    return out


def assemble(cefr, extra12, target_total):
    rows = []
    used_de, used_en, used_es = set(), set(), set()
    rng = random.Random(42)
    for cat in CATS:
        need = 12 if cat in extra12 else 11
        if cefr == "a2":
            need = 10 if cat in extra12 else 9
        picked = pick_bank(cat, need, used_de, used_en, used_es, rng) if cefr == "a2" else pick_b1(cat, need, used_de, used_en, used_es, rng)
        for kind, de, en, es, art, pl in picked:
            rows.append(row(cefr, cat, kind, de, en, es, art, pl))
    if len(rows) != target_total:
        raise ValueError(f"{cefr} count {len(rows)} != {target_total}")
    return rows


if __name__ == "__main__":
    a2 = assemble("a2", A2_EXTRA10, 360)
    b1 = assemble("b1", B1_EXTRA12, 450)
    with open(os.path.join(HERE, "data-a2.json"), "w", encoding="utf-8") as f:
        json.dump(a2, f, ensure_ascii=False, indent=2)
    with open(os.path.join(HERE, "data-b1.json"), "w", encoding="utf-8") as f:
        json.dump(b1, f, ensure_ascii=False, indent=2)
    print("wrote json", len(a2), len(b1))