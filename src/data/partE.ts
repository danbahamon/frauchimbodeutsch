import { line, noun, type Draft } from './draft'

const g0 = noun('hello', [
  ['Kompliment', 'compliment', 'cumplido', 'das', 'Komplimente'],
  ['Einladung', 'invitation', 'invitación', 'die', 'Einladungen'],
  ['Verabschiedung', 'farewell', 'despedida', 'die', 'Verabschiedungen'],
  ['Bekanntschaft', 'casual acquaintance', 'conocido eventual', 'die', 'Bekanntschaften'],
  ['Gastgeber', 'host', 'anfitrión', 'der', 'Gastgeber'],
  ['Gastgeberin', 'female host', 'anfitriona', 'die', 'Gastgeberinnen'],
], 'a2')

const g1 = line('hello', 'phrase', [
  ['Keine Sorge', 'don\'t worry', 'no te preocupes'],
  ['Stimmt so', 'keep the change', 'quédese con el cambio'],
  ['Das stimmt', 'that\'s right', 'eso es cierto'],
  ['Das wäre toll', 'that would be great', 'sería genial'],
  ['Macht nichts', 'never mind', 'no importa'],
  ['Bis gleich', 'see you in a bit', 'hasta ahora'],
  ['Lass gut sein', 'let it go', 'déjalo estar'],
  ['Schon gut', 'it is alright', 'está bien ya'],
  ['Passt schon', 'that is fine', 'está bien así'],
  ['Na dann', 'well then', 'pues entonces'],
  ['Na gut', 'oh well', 'bueno pues'],
  ['Lass es dir schmecken', 'enjoy your meal', 'que te aproveche'],
  ['Recht schönen Dank', 'many thanks indeed', 'muchísimas gracias'],
  ['Darf ich bitten', 'may I ask politely', '¿puedo pedir?'],
], 'a2')

const g2 = line('numbers', 'other', [
  ['ein Viertel', 'one quarter', 'un cuarto'],
  ['prozentual', 'in percent terms', 'en porcentaje'],
  ['mindestens', 'at least', 'como mínimo'],
  ['höchstens', 'at most', 'como máximo'],
  ['dreimal', 'three times', 'tres veces'],
  ['paarweise', 'in pairs', 'en pares'],
  ['ungefähr zehn', 'roughly ten items', 'cerca de diez'],
  ['doppelt so viel', 'twice as much', 'el doble'],
  ['anderthalb', 'one and a half', 'uno y medio'],
], 'a2')

const g3 = line('numbers', 'num', [
  ['Viertel', 'quarter fraction', 'cuarto'],
  ['Dutzend', 'dozen', 'docena'],
  ['Drittel', 'third fraction', 'tercio'],
  ['Kommazahl', 'decimal number', 'número decimal'],
  ['Nullpunkt', 'zero point', 'punto cero'],
], 'a2')

const g4 = line('colors', 'adj', [
  ['dunkelblau', 'dark blue', 'azul oscuro'],
  ['farbenfroh', 'colorful vivid', 'lleno de color'],
  ['ocker', 'ochre', 'ocre'],
  ['fliederfarben', 'lilac-colored', 'color lila'],
  ['kastanienbraun', 'chestnut brown', 'castaño'],
], 'a2')

const g5 = noun('colors', [
  ['Lackierung', 'paint coat', 'capa de pintura', 'die', 'Lackierungen'],
  ['Streifen', 'stripe', 'raya', 'der', 'Streifen'],
  ['Farbpalette', 'color palette', 'paleta de colores', 'die', 'Farbpaletten'],
  ['Farbton', 'color hue shade', 'matiz de color', 'der', 'Farbtöne'],
  ['Kontrastfarbe', 'contrast color', 'color de contraste', 'die', 'Kontrastfarben'],
  ['Pastellton', 'pastel tone', 'tono pastel', 'der', 'Pastelltöne'],
  ['Neonfarbe', 'neon color', 'color neón', 'die', 'Neonfarben'],
  ['Erdton', 'earth tone', 'tono tierra', 'der', 'Erdtöne'],
], 'a2')

const g6 = noun('family', [
  ['Patenkind', 'godchild', 'ahijado', 'das', 'Patenkinder'],
  ['Pflegevater', 'foster father', 'padre de acogida', 'der', 'Pflegeväter'],
  ['Elternschaft', 'parenthood', 'paternidad', 'die', ''],
  ['Erziehungsberechtigte', 'legal guardian', 'tutor legal', 'die', 'Erziehungsberechtigten'],
  ['Patchworkfamilie', 'blended family', 'familia ensamblada', 'die', 'Patchworkfamilien'],
  ['Patenonkel', 'godfather', 'padrino', 'der', 'Patenonkel'],
  ['Familienrat', 'family council', 'consejo familiar', 'der', 'Familienräte'],
  ['Verlobte', 'fiancée', 'prometida', 'die', 'Verlobten'],
  ['Familienfeier', 'family celebration', 'celebración familiar', 'die', 'Familienfeiern'],
  ['Urgroßvater', 'great-grandfather', 'bisabuelo', 'der', 'Urgroßväter'],
  ['Urgroßmutter', 'great-grandmother', 'bisabuela', 'die', 'Urgroßmütter'],
  ['Halbbruder', 'half-brother', 'hermanastro', 'der', 'Halbbrüder'],
  ['Halbschwester', 'half-sister', 'hermanastra', 'die', 'Halbschwestern'],
  ['Patin', 'godmother', 'madrina', 'die', 'Patinnen'],
], 'a2')

const g7 = line('family', 'phrase', [
  ['Wir verstehen uns gut', 'we get along well', 'nos llevamos bien'],
], 'a2')

const g8 = noun('body', [
  ['Zehennagel', 'toenail', 'uña del pie', 'der', 'Zehennägel'],
  ['Schläfe', 'temple', 'sien', 'die', 'Schläfen'],
  ['Hautfalte', 'skin fold', 'pliegue de la piel', 'die', 'Hautfalten'],
  ['Nasenflügel', 'nostril', 'fosa nasal', 'der', 'Nasenflügel'],
  ['Oberschenkel', 'thigh', 'muslo', 'der', 'Oberschenkel'],
  ['Kehle', 'throat', 'garganta', 'die', 'Kehlen'],
  ['Wadenmuskel', 'calf muscle', 'músculo de la pantorrilla', 'der', 'Wadenmuskeln'],
  ['Schulterblatt', 'shoulder blade', 'omóplato', 'das', 'Schulterblätter'],
  ['Augenlid', 'eyelid', 'párpado', 'das', 'Augenlider'],
  ['Pupille', 'pupil of eye', 'pupila', 'die', 'Pupillen'],
  ['Kehlkopf', 'larynx', 'laringe', 'der', 'Kehlköpfe'],
  ['Speiseröhre', 'esophagus', 'esófago', 'die', 'Speiseröhren'],
], 'a2')

const g9 = noun('clothes', [
  ['Anorak', 'anorak', 'anorak', 'der', 'Anoraks'],
  ['Strickjacke', 'cardigan', 'cárdigan', 'die', 'Strickjacken'],
  ['Knopfloch', 'buttonhole', 'ojal', 'das', 'Knopflöcher'],
  ['Kapuzenpulli', 'hooded sweatshirt', 'sudadera con capucha', 'der', 'Kapuzenpullis'],
  ['Wollmütze', 'wool beanie', 'gorro de lana', 'die', 'Wollmützen'],
  ['Regenmantel', 'raincoat', 'impermeable', 'der', 'Regenmäntel'],
  ['Windjacke', 'windbreaker', 'cortavientos', 'die', 'Windjacken'],
  ['Fleecejacke', 'fleece jacket', 'chaqueta polar', 'die', 'Fleecejacken'],
  ['Steppjacke', 'quilted jacket', 'chaqueta acolchada', 'die', 'Steppjacken'],
  ['Daunenjacke', 'down jacket', 'chaqueta de plumas', 'die', 'Daunenjacken'],
  ['Overall', 'overalls', 'mono de trabajo', 'der', 'Overalls'],
  ['Hosenträger', 'suspenders', 'tirantes', 'die', 'Hosenträger'],
  ['Manschette', 'cuff', 'puño de camisa', 'die', 'Manschetten'],
], 'a2')

const g10 = line('clothes', 'adj', [
  ['gestreift', 'striped', 'a rayas'],
  ['ausgeleiert', 'stretched out fabric', 'destensado'],
], 'a2')

const g11 = noun('food', [
  ['Leberwurst', 'liverwurst', 'paté de hígado', 'die', 'Leberwürste'],
  ['Rührei', 'scrambled eggs', 'huevos revueltos', 'das', ''],
  ['Kohlroulade', 'stuffed cabbage roll', 'rollo de col', 'die', 'Kohlrouladen'],
  ['Semmelknödel', 'bread dumpling', 'bollo de pan', 'der', 'Semmelknödel'],
  ['Belegte Brotzeit', 'open sandwich snack', 'bocadillo abierto', 'die', 'Belegte Brotzeiten'],
  ['Haferflocken', 'oat flakes', 'copos de avena', 'die', 'Haferflocken'],
  ['Sauerteig', 'sourdough', 'masa madre', 'der', 'Sauerteige'],
  ['Knödel', 'dumpling', 'albóndiga de masa', 'der', 'Knödel'],
  ['Aufschnitt', 'cold cuts', 'fiambres', 'der', 'Aufschnitte'],
  ['Beilage', 'side dish', 'guarnición', 'die', 'Beilagen'],
], 'a2')

const g12 = noun('fruit', [
  ['Quitte', 'quince', 'membrillo', 'die', 'Quitten'],
  ['Physalis', 'physalis', 'physalis', 'die', ''],
  ['Holunderbeere', 'elderberry', 'baya de saúco', 'die', 'Holunderbeeren'],
  ['Kumquat', 'kumquat', 'kumquat', 'die', 'Kumquats'],
  ['Mirabelle', 'mirabelle plum', 'ciruela amarilla', 'die', 'Mirabellen'],
  ['Steinobst', 'stone fruit type', 'fruta de hueso', 'das', 'Steinobst'],
  ['Beerenaushub', 'berry harvest', 'recolección de bayas', 'der', 'Beerenaushub'],
  ['Preiselbeere', 'lingonberry', 'arándano rojo', 'die', 'Preiselbeeren'],
], 'a2')

const g13 = noun('veg', [
  ['Rucola', 'arugula', 'rúcula', 'die', ''],
  ['Rosenkohl', 'brussels sprout', 'col de Bruselas', 'der', ''],
  ['Champignon', 'button mushroom', 'champiñón', 'der', 'Champignons'],
  ['Pastinake', 'parsnip', 'chirivía', 'die', 'Pastinaken'],
  ['Knollensellerie', 'celeriac root', 'apio nabo', 'der', 'Knollensellerie'],
  ['Frühlingszwiebel', 'spring onion', 'cebolleta tierna', 'die', 'Frühlingszwiebeln'],
  ['Fenchel', 'fennel', 'hinojo', 'der', 'Fenchel'],
], 'a2')

const g14 = noun('drinks', [
  ['Radler', 'shandy beer', 'cerveza con limonada', 'der', 'Radler'],
  ['Malzbier', 'malt beer', 'cerveza de malta', 'das', 'Malzbier'],
  ['Holunderlimonade', 'elderflower soda', 'limonada de saúco', 'die', 'Holunderlimonaden'],
  ['Sprudelwasser', 'sparkling mineral water', 'agua con gas', 'das', 'Sprudelwasser'],
  ['Most', 'cider must', 'mosto', 'der', 'Moste'],
  ['Schorle', 'spritzer drink', 'spritz', 'die', 'Schorlen'],
  ['Molke', 'whey', 'lactosuero', 'die', 'Molken'],
], 'a2')

const g15 = noun('animals', [
  ['Streifenhörnchen', 'chipmunk', 'ardilla listada', 'das', 'Streifenhörnchen'],
  ['Wildschwein', 'wild boar', 'jabalí', 'das', 'Wildschweine'],
  ['Hausschlange', 'house snake species', 'serpiente doméstica', 'die', 'Hausschlangen'],
  ['Faultier', 'sloth', 'perezoso animal', 'das', 'Faultiere'],
  ['Gürteltier', 'armadillo', 'armadillo', 'das', 'Gürteltiere'],
  ['Schnabeltier', 'platypus', 'ornitorrinco', 'das', 'Schnabeltiere'],
  ['Ameisenbär', 'anteater', 'oso hormiguero', 'der', 'Ameisenbären'],
  ['Okapi', 'okapi', 'okapi', 'das', 'Okapis'],
  ['Tapir', 'tapir', 'tapir', 'der', 'Tapire'],
  ['Hermelin', 'stoat', 'armiño', 'das', 'Hermeline'],
  ['Marder', 'marten', 'marta', 'der', 'Marder'],
  ['Bison', 'bison', 'bisonte', 'der', 'Bisons'],
], 'a2')

const g16 = noun('house', [
  ['Putzmittel', 'cleaning supplies', 'productos de limpieza', 'das', 'Putzmittel'],
  ['Dachrinne', 'gutter', 'canaleta', 'die', 'Dachrinnen'],
  ['Thermostat', 'thermostat', 'termostato', 'das', 'Thermostate'],
  ['Heizkörper', 'radiator', 'radiador', 'der', 'Heizkörper'],
  ['Regenrinne', 'rain gutter', 'bajante', 'die', 'Regenrinnen'],
  ['Stromkasten', 'fuse box', 'caja de fusibles', 'der', 'Stromkästen'],
  ['Klingelschild', 'doorbell nameplate', 'placa del timbre', 'das', 'Klingelschilder'],
  ['Briefkastenanlage', 'mailbox cluster', 'conjunto de buzones', 'die', 'Briefkastenanlagen'],
  ['Zählerstand', 'meter reading', 'lectura del contador', 'der', 'Zählerstände'],
  ['Treppenhaus', 'stairwell area', 'rellano de escalera', 'das', 'Treppenhäuser'],
  ['Klingelknopf', 'doorbell button', 'botón del timbre', 'der', 'Klingelknöpfe'],
], 'a2')

const g17 = noun('furniture', [
  ['Vitrine', 'display cabinet', 'vitrina', 'die', 'Vitrinen'],
  ['Lattenrost', 'slatted frame', 'somier', 'der', 'Lattenroste'],
  ['Nachttischlampe', 'bedside lamp', 'lámpara de mesita', 'die', 'Nachttischlampen'],
  ['Bettgestell', 'bed frame', 'marco de cama', 'das', 'Bettgestelle'],
  ['Sitzkissen', 'seat cushion', 'cojín de asiento', 'das', 'Sitzkissen'],
  ['Kleiderständer', 'clothes rack', 'perchero de pie', 'der', 'Kleiderständer'],
  ['Schuhregal', 'shoe rack', 'zapatero', 'das', 'Schuhregale'],
  ['Hutablage', 'hat shelf', 'estante para sombreros', 'die', 'Hutablagen'],
  ['Wandregal', 'wall shelf', 'estante de pared', 'das', 'Wandregale'],
  ['Liege', 'daybed', 'diván', 'die', 'Liegen'],
  ['Beistelltisch', 'side table', 'mesa auxiliar', 'der', 'Beistelltische'],
  ['Gardinenstange', 'curtain rod', 'barra de cortina', 'die', 'Gardinenstangen'],
], 'a2')

const g18 = noun('kitchen', [
  ['Messbecher', 'measuring cup', 'taza medidora', 'der', 'Messbecher'],
  ['Backofentür', 'oven door', 'puerta del horno', 'die', 'Backofentüren'],
  ['Siebträger', 'portafilter basket', 'portafiltro', 'der', 'Siebträger'],
  ['Küchenschürze', 'kitchen apron', 'delantal de cocina', 'die', 'Küchenschürzen'],
  ['Gemüseschäler', 'vegetable peeler', 'pelador de verduras', 'der', 'Gemüseschäler'],
  ['Kartoffelstampfer', 'potato masher', 'machacapatatas', 'der', 'Kartoffelstampfer'],
  ['Teigschaber', 'dough scraper', 'espátula de masa', 'der', 'Teigschaber'],
], 'a2')

const g19 = noun('city', [
  ['Bushaltestelle', 'bus stop', 'parada de autobús', 'die', 'Bushaltestellen'],
  ['Baustelle', 'construction site', 'obra', 'die', 'Baustellen'],
  ['Altstadt', 'old town', 'casco antiguo', 'die', 'Altstädte'],
  ['Einkaufszentrum', 'shopping mall', 'centro comercial', 'das', 'Einkaufszentren'],
  ['Radweg', 'bike lane', 'carril bici', 'der', 'Radwege'],
  ['Baustellenlärm', 'construction noise', 'ruido de obras', 'der', 'Baustellenlärm'],
  ['Einkaufsstraße', 'shopping street', 'calle comercial', 'die', 'Einkaufsstraßen'],
  ['Hochhaus', 'skyscraper', 'rascacielos', 'das', 'Hochhäuser'],
  ['Straßenlaterne', 'streetlamp', 'farola', 'die', 'Straßenlaternen'],
], 'a2')

const g20 = noun('transport', [
  ['Wegweiser', 'signpost', 'señal', 'der', 'Wegweiser'],
  ['S-Bahn', 'commuter train', 'tren suburbano', 'die', 'S-Bahnen'],
  ['Anschluss', 'connection', 'conexión', 'der', 'Anschlüsse'],
  ['Umsteigen', 'transfer', 'transbordo', 'das', ''],
  ['Reisebus', 'coach bus', 'autobús de larga distancia', 'der', 'Reisebusse'],
  ['Fahrkartenautomat', 'ticket machine', 'máquina de billetes', 'der', 'Fahrkartenautomaten'],
  ['Fahrplanwechsel', 'schedule change', 'cambio de horario', 'der', 'Fahrplanwechsel'],
  ['Verspätungsgrund', 'delay reason', 'motivo de retraso', 'der', 'Verspätungsgründe'],
  ['Oberleitung', 'overhead wire', 'catenaria', 'die', 'Oberleitungen'],
], 'a2')

const g21 = noun('school', [
  ['Zeugnis', 'report card', 'boletín de notas', 'das', 'Zeugnisse'],
  ['Schulranzen', 'school backpack', 'mochila escolar', 'der', 'Schulranzen'],
  ['Hausarbeit', 'term paper', 'trabajo escrito', 'die', 'Hausarbeiten'],
  ['Klassenarbeit', 'class test', 'examen de clase', 'die', 'Klassenarbeiten'],
  ['Hausaufgabenheft', 'homework notebook', 'cuaderno de tareas', 'das', 'Hausaufgabenhefte'],
  ['Schultag', 'school day', 'día escolar', 'der', 'Schultage'],
], 'a2')

const g22 = noun('jobs', [
  ['Rezeptionist', 'receptionist', 'recepcionista', 'der', 'Rezeptionisten'],
  ['Projektleiter', 'project manager', 'jefe de proyecto', 'der', 'Projektleiter'],
  ['Lagerarbeiter', 'warehouse worker', 'almacenista', 'der', 'Lagerarbeiter'],
  ['Nebenjob', 'side job', 'trabajo extra', 'der', 'Nebenjobs'],
  ['Praktikumsplatz', 'internship slot', 'plaza de prácticas', 'der', 'Praktikumsplätze'],
], 'a2')

const g23 = noun('nature', [
  ['Heide', 'heath', 'brezal', 'die', 'Heiden'],
  ['Steppe', 'steppe', 'estepa', 'die', 'Steppen'],
  ['Delta', 'river delta', 'delta', 'das', 'Deltas'],
  ['Tierwelt', 'wildlife', 'fauna', 'die', ''],
  ['Waldrand', 'forest edge', 'borde del bosque', 'der', 'Waldränder'],
  ['Steinbrocken', 'boulder chunk', 'peñazo', 'der', 'Steinbrocken'],
  ['Morgentau', 'morning dew', 'rocío matutino', 'der', ''],
  ['Geysir', 'geyser', 'géiser', 'der', 'Geysire'],
], 'a2')

const g24 = noun('weather', [
  ['Glatteis', 'black ice', 'hielo invisible', 'das', ''],
  ['Wetterbericht', 'weather report', 'informe del tiempo', 'der', 'Wetterberichte'],
  ['Luftdruck', 'air pressure', 'presión atmosférica', 'der', 'Luftdrücke'],
  ['Gewitterzelle', 'storm cell', 'célula de tormenta', 'die', 'Gewitterzellen'],
  ['Hitzewelle', 'heat wave', 'ola de calor', 'die', 'Hitzewellen'],
  ['Wetterkarte', 'weather map', 'mapa del tiempo', 'die', 'Wetterkarten'],
  ['Wetterapp', 'weather app', 'app del tiempo', 'die', 'Wetterapps'],
  ['Wetterwarnung', 'weather warning', 'alerta meteorológica', 'die', 'Wetterwarnungen'],
  ['Orkan', 'hurricane wind', 'huracán viento', 'der', 'Orkane'],
], 'a2')

const g25 = line('weather', 'phrase', [
  ['Es gibt Sturm', 'there is a storm', 'hay tormenta'],
], 'a2')

const g26 = line('time', 'other', [
  ['vorher', 'beforehand', 'antes'],
  ['danach', 'afterward', 'después'],
  ['pünktlich um', 'exactly at time', 'justo a las'],
  ['in Kürze', 'shortly soon enough', 'en breve'],
  ['vorgestern', 'day before yesterday', 'anteayer'],
  ['übermorgen', 'day after tomorrow', 'pasado mañana'],
], 'a2')

const g27 = noun('time', [
  ['Zeitzone', 'time zone', 'huso horario', 'die', 'Zeitzonen'],
  ['Mittagspause', 'lunch break', 'pausa del almuerzo', 'die', 'Mittagspausen'],
  ['Zeitpunkt', 'point in time', 'momento', 'der', 'Zeitpunkte'],
  ['Zeitverschiebung', 'time difference', 'diferencia horaria', 'die', 'Zeitverschiebungen'],
  ['Halbstunde', 'half hour', 'media hora', 'die', 'Halbstunden'],
  ['Wochentag', 'weekday', 'día de la semana', 'der', 'Wochentage'],
  ['Viertelstunde', 'quarter hour', 'cuarto de hora', 'die', 'Viertelstunden'],
  ['Jahrtausend', 'millennium', 'milenio', 'das', 'Jahrtausende'],
], 'a2')

const g28 = line('feelings', 'adj', [
  ['verzweifelt', 'desperate', 'desesperado'],
  ['verlegen', 'embarrassed', 'avergonzado'],
  ['unsicher', 'insecure', 'inseguro'],
  ['neugierig', 'curious', 'curioso'],
  ['erschöpft', 'exhausted', 'agotado'],
], 'a2')

const g29 = line('verbs', 'verb', [
  ['ausprobieren', 'to try out', 'probar'],
  ['mitnehmen', 'to take along', 'llevar consigo'],
  ['spazieren gehen', 'to go for a walk', 'pasear'],
  ['organisieren', 'to organize', 'organizar'],
  ['umziehen', 'to move house', 'mudarse'],
  ['überprüfen', 'to check', 'comprobar'],
  ['nachdenken', 'to think it over', 'pensarlo bien'],
  ['nachgeben', 'to give in eventually', 'ceder al final'],
  ['einpacken', 'to pack up', 'empaquetar'],
  ['auspacken', 'to unpack', 'desempaquetar'],
  ['einziehen', 'to move in', 'mudarse a'],
  ['anprobieren', 'to try on', 'probarse'],
], 'a2')

const g30 = line('adjectives', 'adj', [
  ['unnötig', 'unnecessary', 'innecesario'],
  ['zuverlässig', 'reliable', 'fiable'],
  ['traditionell', 'traditional', 'tradicional'],
  ['verantwortungsvoll', 'responsible', 'responsable'],
  ['zielstrebig', 'goal-oriented manner', 'orientado a metas'],
  ['zerstreut', 'scatterbrained person', 'despistado'],
  ['nachgiebig', 'compliant temperament', 'complaciente'],
  ['eigensinnig', 'stubborn character', 'terco'],
  ['gemütlich', 'cozy', 'acogedor'],
  ['praktisch sinnvoll', 'sensibly practical', 'práctico útil'],
  ['unbequem', 'uncomfortable', 'incómodo'],
  ['unzuverlässig', 'unreliable', 'poco fiable'],
], 'a2')

const g31 = line('travel', 'phrase', [
  ['Wir fahren los', 'we are setting off', 'nos vamos'],
  ['Guten Flug', 'have a safe flight', 'buen vuelo'],
], 'a2')

const g32 = noun('travel', [
  ['Zwischenstopp', 'layover', 'escala', 'der', 'Zwischenstopps'],
  ['Fährticket', 'ferry ticket', 'billete de ferry', 'das', 'Fährtickets'],
  ['Mietwagen', 'rental car', 'coche de alquiler', 'der', 'Mietwagen'],
  ['Sicherheitskontrolle', 'security check', 'control de seguridad', 'die', 'Sicherheitskontrollen'],
  ['Rückreise', 'return journey', 'viaje de regreso', 'die', 'Rückreisen'],
  ['Reiseversicherung', 'travel insurance', 'seguro de viaje', 'die', 'Reiseversicherungen'],
  ['Gepäckaufbewahrung', 'luggage storage', 'consigna de equipaje', 'die', 'Gepäckaufbewahrungen'],
  ['Wartehalle', 'waiting hall', 'sala de espera', 'die', 'Wartehallen'],
  ['Anschlusszug', 'connecting train', 'tren de conexión', 'der', 'Anschlusszüge'],
  ['Reiseroute', 'itinerary', 'itinerario', 'die', 'Reiserouten'],
  ['Reiseziel', 'travel destination', 'destino de viaje', 'das', 'Reiseziele'],
  ['Reisezeit', 'travel season', 'temporada de viaje', 'die', 'Reisezeiten'],
  ['Reisegruppe', 'tour group', 'grupo de viaje', 'die', 'Reisegruppen'],
  ['Reiseleitung', 'tour guide service', 'guía de grupo', 'die', 'Reiseleitungen'],
  ['Rundreise', 'tour', 'gira', 'die', 'Rundreisen'],
], 'a2')

const g33 = noun('shop', [
  ['Kundenkarte', 'loyalty card', 'tarjeta de cliente', 'die', 'Kundenkarten'],
  ['Schuhgeschäft', 'shoe store', 'zapatería', 'das', 'Schuhgeschäfte'],
  ['Inventur', 'stocktaking', 'inventario', 'die', 'Inventuren'],
  ['Feinkostladen', 'delicatessen', 'tienda gourmet', 'der', 'Feinkostläden'],
  ['Umtausch', 'exchange', 'cambio', 'der', 'Umtausche'],
  ['Kassenbon', 'receipt slip', 'tique de caja', 'der', 'Kassenbons'],
  ['Rabattmarke', 'discount coupon', 'cupón de descuento', 'die', 'Rabattmarken'],
  ['Schnäppchen', 'bargain', 'ganga', 'das', 'Schnäppchen'],
  ['Sonderpreis', 'special price', 'precio especial', 'der', 'Sonderpreise'],
  ['Aktionsware', 'promotional goods', 'artículo en promoción', 'die', 'Aktionswaren'],
  ['Ladenhüter', 'shelf warmer', 'artículo que no se vende', 'der', 'Ladenhüter'],
  ['Kassenzettel', 'till receipt', 'ticket de caja', 'der', 'Kassenzettel'],
  ['Ausverkauf', 'clearance sale', 'liquidación', 'der', 'Ausverkäufe'],
], 'a2')

const g34 = noun('hobbies', [
  ['Stricknadel', 'knitting needle', 'aguja de tejer', 'die', 'Stricknadeln'],
  ['Pinselset', 'brush set', 'set de pinceles', 'das', 'Pinselsets'],
  ['Kreuzworträtsel', 'crossword', 'crucigrama', 'das', 'Kreuzworträtsel'],
  ['Modellbau', 'model building', 'modelismo', 'der', ''],
  ['Vinylplatte', 'vinyl record', 'disco de vinilo', 'die', 'Vinylplatten'],
  ['Angelrute', 'fishing rod', 'caña de pescar', 'die', 'Angelruten'],
  ['Konzertkarte', 'concert ticket', 'entrada de concierto', 'die', 'Konzertkarten'],
  ['Briefmarkensammlung', 'stamp collecting hobby', 'colección de sellos', 'die', 'Briefmarkensammlungen'],
  ['Fotoworkshop', 'photo workshop class', 'taller de fotografía', 'der', 'Fotoworkshops'],
  ['Kreativkurs', 'creativity course', 'curso creativo', 'der', 'Kreativkurse'],
  ['Kartenspiel', 'card game', 'juego de cartas', 'das', 'Kartenspiele'],
  ['Gesellschaftsspiel', 'party game', 'juego de sociedad', 'das', 'Gesellschaftsspiele'],
  ['Basteln', 'crafting', 'manualidades', 'das', ''],
  ['Sammeln', 'collecting', 'coleccionismo', 'das', ''],
  ['Münzsammlung', 'coin collection', 'colección de monedas', 'die', 'Münzsammlungen'],
], 'a2')

const g35 = noun('tech', [
  ['Speicherkarte', 'memory card', 'tarjeta de memoria', 'die', 'Speicherkarten'],
  ['Cloudspeicher', 'cloud storage', 'almacenamiento en la nube', 'der', ''],
  ['Bluetooth', 'Bluetooth', 'bluetooth', 'das', ''],
  ['WLAN-Passwort', 'Wi-Fi password', 'contraseña wifi', 'das', 'WLAN-Passwörter'],
  ['Handyladegerät', 'phone charger unit', 'cargador del móvil', 'das', 'Handyladegeräte'],
  ['Bildschirmschoner', 'screen saver mode', 'salvapantallas', 'der', 'Bildschirmschoner'],
], 'a2')

const g36 = line('lands', 'other', [
  ['Schweden', 'Sweden', 'Suecia'],
  ['Kroatien', 'Croatia', 'Croacia'],
  ['Norwegen', 'Norway', 'Noruega'],
  ['Dänemark', 'Denmark', 'Dinamarca'],
  ['Tschechien', 'Czechia', 'Chequia'],
  ['Irland', 'Ireland', 'Irlanda'],
  ['Belgien', 'Belgium', 'Bélgica'],
], 'a2')

const g37 = noun('bath', [
  ['Badematte', 'bath mat', 'alfombra de baño', 'die', 'Badematten'],
  ['Feuchtigkeitscreme', 'moisturizer', 'crema hidratante', 'die', 'Feuchtigkeitscremes'],
  ['Nagelschere', 'nail scissors', 'tijeras de uñas', 'die', 'Nagelscheren'],
  ['Handtuchhalter', 'towel rack bar', 'toallero', 'der', 'Handtuchhalter'],
  ['Rasiercreme', 'shaving cream', 'crema de afeitar', 'die', 'Rasiercremes'],
  ['Bürste', 'brush', 'cepillo', 'die', 'Bürsten'],
], 'a2')

const g38 = noun('office', [
  ['Projektplan', 'project plan', 'plan de proyecto', 'der', 'Projektpläne'],
  ['Dringlichkeit', 'urgency', 'urgencia', 'die', ''],
  ['Schreibtischlampe', 'desk lamp', 'lámpara de escritorio', 'die', 'Schreibtischlampen'],
  ['Gehaltsabrechnung', 'pay slip', 'nómina', 'die', 'Gehaltsabrechnungen'],
  ['Protokoll', 'minutes', 'acta', 'das', 'Protokolle'],
  ['Dienstreise', 'business trip', 'viaje de negocios', 'die', 'Dienstreisen'],
  ['Stempel', 'stamp', 'sello', 'der', 'Stempel'],
  ['Aktenordner', 'ring binder folder', 'carpeta de anillas', 'der', 'Aktenordner'],
  ['Whiteboard', 'whiteboard', 'pizarra blanca', 'das', 'Whiteboards'],
  ['Flipchart', 'flip chart', 'rotafolios', 'das', 'Flipcharts'],
  ['Laserpointer', 'laser pointer', 'puntero láser', 'der', 'Laserpointer'],
  ['Moderationskarten', 'facilitation cards', 'tarjetas de moderación', 'die', 'Moderationskarten'],
  ['Locher', 'hole punch', 'perforadora', 'der', 'Locher'],
  ['Notizblock', 'notepad', 'bloc de notas', 'der', 'Notizblöcke'],
], 'a2')

const g39 = line('office', 'phrase', [
  ['Ich bin im Termin', 'I\'m in a meeting', 'estoy en una reunión'],
], 'a2')

const g40 = noun('music', [
  ['Playlist', 'playlist', 'lista de reproducción', 'die', 'Playlists'],
  ['Verstärker', 'amplifier', 'amplificador', 'der', 'Verstärker'],
  ['Blasinstrument', 'wind instrument', 'instrumento de viento', 'das', 'Blasinstrumente'],
  ['Einstieg', 'intro', 'introducción', 'der', 'Einstiege'],
  ['Streichquartett', 'string quartet', 'cuarteto de cuerdas', 'das', 'Streichquartette'],
  ['Probeabend', 'rehearsal evening', 'ensayo musical', 'der', 'Probeabende'],
  ['Notenständer', 'music stand rack', 'atril de música', 'der', 'Notenständer'],
  ['Refrain', 'chorus of song', 'estribillo', 'der', 'Refrains'],
], 'a2')

const g41 = noun('sport', [
  ['Mannschaftskapitän', 'team captain', 'capitán de equipo', 'der', 'Mannschaftskapitäne'],
  ['Ausdauertraining', 'endurance training', 'entrenamiento de resistencia', 'das', ''],
  ['Wettkampfrichter', 'competition judge', 'juez de competición', 'der', 'Wettkampfrichter'],
  ['Aufwärmen', 'warm-up', 'calentamiento', 'das', ''],
  ['Freistoß', 'free kick', 'tiro libre', 'der', 'Freistöße'],
  ['Jogginghose', 'sweatpants', 'pantalón de chándal', 'die', 'Jogginghosen'],
  ['Mannschaftsport', 'team sport type', 'deporte de equipo', 'der', 'Mannschaftsport'],
  ['Saunaaufguss', 'sauna infusion', 'infusión de sauna', 'der', 'Saunaaufgüsse'],
  ['Torwart', 'goalkeeper', 'portero', 'der', 'Torwarte'],
  ['Training', 'training session', 'entrenamiento', 'das', 'Trainings'],
  ['Wettkampf', 'competition', 'competición', 'der', 'Wettkämpfe'],
], 'a2')

const g42 = noun('health', [
  ['Physiotherapie', 'physiotherapy', 'fisioterapia', 'die', ''],
  ['Untersuchung', 'examination', 'examen médico', 'die', 'Untersuchungen'],
  ['Erste Hilfe', 'first aid', 'primeros auxilios', 'die', ''],
  ['Vorsorge', 'preventive care', 'prevención', 'die', ''],
  ['Krankmeldung', 'sick note', 'parte de baja', 'die', 'Krankmeldungen'],
  ['Nachtapotheke', 'night pharmacy', 'farmacia nocturna', 'die', 'Nachtapotheken'],
  ['Erkältungssymptom', 'cold symptom sign', 'síntoma de resfriado', 'das', 'Erkältungssymptome'],
], 'a2')

const g43 = line('health', 'phrase', [
  ['Mir geht es besser', 'I\'m feeling better', 'me siento mejor'],
], 'a2')

const g44 = noun('tools', [
  ['Farbeimer', 'paint bucket', 'cubo de pintura', 'der', 'Farbeimer'],
  ['Metallsäge', 'hacksaw', 'sierra de metal', 'die', 'Metallsägen'],
  ['Inbusschlüssel', 'Allen key', 'llave Allen', 'der', 'Inbusschlüssel'],
  ['Schraubenschlüssel', 'wrench spanner', 'llave inglesa', 'der', 'Schraubenschlüssel'],
  ['Klebebandrolle', 'tape roll dispenser', 'rollo de cinta adhesiva', 'die', 'Klebebandrollen'],
  ['Bohrer', 'drill bit', 'broca', 'der', 'Bohrer'],
], 'a2')

const g45 = noun('garden', [
  ['Schubkarre', 'wheelbarrow', 'carretilla', 'die', 'Schubkarren'],
  ['Heckenschere', 'hedge trimmer', 'cortasetos', 'die', 'Heckenscheren'],
  ['Grabgabel', 'garden fork', 'horquilla de jardín', 'die', 'Grabgabeln'],
  ['Gartenhaus', 'garden shed', 'caseta de jardín', 'das', 'Gartenhäuser'],
  ['Regentonne', 'rain barrel', 'barril de lluvia', 'die', 'Regentonnen'],
  ['Komposthaufen', 'compost heap', 'montón de compost', 'der', 'Komposthaufen'],
  ['Narzisse', 'daffodil', 'narciso', 'die', 'Narzissen'],
  ['Hyazinthe', 'hyacinth', 'jacinto', 'die', 'Hyazinthen'],
  ['Krokus', 'crocus', 'azafrán silvestre', 'der', 'Krokusse'],
  ['Schneeglöckchen', 'snowdrop', 'campanilla de invierno', 'das', 'Schneeglöckchen'],
], 'a2')

const g46 = noun('money', [
  ['Sparkonto', 'savings account', 'cuenta de ahorros', 'das', 'Sparkonten'],
  ['Budget', 'budget', 'presupuesto', 'das', 'Budgets'],
  ['Inflation', 'inflation', 'inflación', 'die', 'Inflationen'],
  ['Rückzahlung', 'repayment', 'reembolso', 'die', 'Rückzahlungen'],
  ['Spesen', 'expenses', 'gastos', 'die', ''],
  ['Ratenzahlung', 'installment payment', 'pago a plazos', 'die', 'Ratenzahlungen'],
  ['Girokonto', 'checking account', 'cuenta corriente', 'das', 'Girokonten'],
  ['Kleingeld', 'loose change coins', 'monedas sueltas', 'das', 'Kleingeld'],
  ['Bargeldautomat', 'cash machine ATM', 'cajero de efectivo', 'der', 'Bargeldautomaten'],
], 'a2')

const g47 = noun('materials', [
  ['Edelstahl', 'stainless steel', 'acero inoxidable', 'der', ''],
  ['Bronze', 'bronze', 'bronce', 'die', ''],
  ['Gips', 'plaster', 'yeso', 'der', ''],
  ['Drahtseil', 'wire rope cable', 'cable de acero', 'das', 'Drahtseile'],
  ['Asphalt', 'asphalt', 'asfalto', 'der', ''],
], 'a2')

const g48 = noun('shapes', [
  ['Kegel', 'cone', 'cono', 'der', 'Kegel'],
  ['Trapez', 'trapezoid', 'trapecio', 'das', 'Trapeze'],
  ['Sternform', 'star shape', 'forma de estrella', 'die', 'Sternformen'],
  ['Kreisform', 'circular shape', 'forma circular', 'die', 'Kreisformen'],
  ['Spitzwinkel', 'acute angle', 'ángulo agudo', 'der', 'Spitzwinkel'],
], 'a2')

const g49 = noun('feelings', [
  ['Nervosität', 'nervous tension', 'tensión nerviosa', 'die', 'Nervositäten'],
], 'a2')

const g50 = line('travel', 'other', [
  ['einfache Fahrt', 'one-way trip', 'viaje de ida'],
], 'a2')

const g51 = line('shop', 'verb', [
  ['umtauschen', 'to exchange goods', 'cambiar mercancía'],
], 'a2')

const g52 = line('shop', 'other', [
  ['geöffnet bis', 'open until hour', 'abierto hasta'],
], 'a2')

const g53 = line('health', 'verb', [
  ['sich erkälten', 'to catch a cold', 'resfriarse'],
], 'a2')

const g54 = line('health', 'adj', [
  ['verschwitzt', 'sweaty after effort', 'sudado tras esfuerzo'],
], 'a2')

const g55 = line('body', 'adj', [
  ['linkshändig', 'left-handed person', 'zurdo'],
], 'a2')

const g56 = line('body', 'other', [
  ['sich verletzen', 'to hurt oneself', 'lastimarse'],
], 'a2')

const g57 = line('kitchen', 'verb', [
  ['abspülen', 'to rinse dishes', 'enjuagar platos'],
  ['abschrecken', 'to blanch vegetables', 'blanquear verduras'],
], 'a2')

const g58 = line('house', 'verb', [
  ['lüften', 'to air out a room', 'ventilar una habitación'],
], 'a2')

const g59 = line('house', 'adj', [
  ['zugig', 'draughty indoors', 'corriente de aire'],
], 'a2')

const g60 = line('city', 'verb', [
  ['einparken', 'to parallel park', 'estacionar en paralelo'],
], 'a2')

const g61 = line('transport', 'other', [
  ['Anschluss verpasst', 'missed connection', 'conexión perdida'],
], 'a2')

const g62 = line('school', 'verb', [
  ['abschreiben', 'to copy homework', 'copiar deberes'],
], 'a2')

const g63 = line('jobs', 'adj', [
  ['überlastet', 'overloaded at work', 'sobrecargado'],
], 'a2')

const g64 = line('nature', 'adj', [
  ['feucht', 'damp outdoors', 'húmedo al aire'],
], 'a2')

const g65 = line('weather', 'adj', [
  ['wolkenverhangen', 'overcast sky', 'cielo cubierto'],
], 'a2')

const g66 = line('weather', 'other', [
  ['es hagelt', 'it is hailing', 'está granizando'],
], 'a2')

const g67 = line('clothes', 'verb', [
  ['umkleiden', 'to change clothes', 'cambiarse de ropa'],
], 'a2')

const g68 = line('garden', 'verb', [
  ['jäten', 'to weed plants', 'desherbar'],
], 'a2')

const g69 = line('garden', 'adj', [
  ['überwuchert', 'overgrown garden', 'invadido de maleza'],
], 'a2')

const g70 = line('drinks', 'adj', [
  ['alkoholfrei', 'non-alcoholic drink', 'sin alcohol'],
], 'a2')

const g71 = line('money', 'verb', [
  ['abheben', 'to withdraw cash', 'retirar efectivo'],
], 'a2')

const g72 = line('money', 'adj', [
  ['preiswert', 'reasonably priced', 'a buen precio'],
], 'a2')

const g73 = line('hobbies', 'verb', [
  ['basteln', 'to do crafts', 'hacer manualidades'],
], 'a2')

const g74 = line('hobbies', 'adj', [
  ['kreativ', 'creatively minded', 'creativo'],
], 'a2')

const g75 = line('sport', 'verb', [
  ['dehnen', 'to stretch muscles', 'estirar músculos'],
], 'a2')

const g76 = line('sport', 'adj', [
  ['sportlich', 'athletic build', 'atlético'],
], 'a2')

const g77 = line('music', 'verb', [
  ['einstudieren', 'to rehearse a piece', 'ensayar una pieza'],
], 'a2')

const g78 = line('music', 'adj', [
  ['melodiös', 'tuneful melody', 'melodioso'],
], 'a2')

const g79 = line('tech', 'verb', [
  ['aufladen', 'to charge device', 'cargar dispositivo'],
], 'a2')

const g80 = line('tech', 'phrase', [
  ['Akku leer', 'battery empty status', 'batería vacía'],
], 'a2')

const g81 = line('office', 'verb', [
  ['sortieren', 'to sort papers', 'ordenar papeles'],
], 'a2')

const g82 = line('bath', 'verb', [
  ['abfrieren', 'to run out of hot water', 'quedarse sin agua caliente'],
], 'a2')

const g83 = line('bath', 'adj', [
  ['rutschig', 'slippery bathroom floor', 'resbaladizo'],
], 'a2')

const g84 = line('tools', 'verb', [
  ['festziehen', 'to tighten a screw', 'apretar un tornillo'],
], 'a2')

const g85 = line('tools', 'adj', [
  ['rostig', 'rusty metal tool', 'oxidado'],
], 'a2')

const g86 = line('shapes', 'adj', [
  ['kantig', 'angular shape', 'anguloso'],
], 'a2')

const g87 = noun('lands', [
  ['Heimatregion', 'home region area', 'región natal', 'die', 'Heimatregionen'],
  ['Küstenstreifen', 'coastal strip', 'franja costera', 'der', 'Küstenstreifen'],
], 'a2')

const g88 = line('lands', 'adj', [
  ['gebirgig', 'mountainous terrain', 'montañoso'],
], 'a2')

const g89 = line('family', 'adj', [
  ['verwandt', 'related by blood', 'emparentado'],
], 'a2')

const g90 = line('transport', 'adj', [
  ['verspätet', 'delayed transport', 'retrasado'],
], 'a2')

const g91 = line('animals', 'verb', [
  ['schnurren', 'to purr softly', 'ronronear suavemente'],
], 'a2')

const g92 = line('veg', 'adj', [
  ['frisch geerntet', 'freshly harvested veg', 'recién cosechado'],
], 'a2')

const g93 = line('drinks', 'verb', [
  ['schlürfen', 'to sip noisily', 'sorber ruidosamente'],
], 'a2')

const g94 = line('weather', 'verb', [
  ['aufklaren', 'to clear up weather', 'despejarse'],
], 'a2')

const g95 = line('time', 'adj', [
  ['zeitlich begrenzt', 'time-limited offer', 'limitado en tiempo'],
], 'a2')

const g96 = noun('numbers', [
  ['Bruchzahl', 'fraction number', 'número fraccionario', 'die', 'Bruchzahlen'],
  ['Primzahl', 'prime number', 'número primo', 'die', 'Primzahlen'],
  ['Quadratwurzel', 'square root', 'raíz cuadrada', 'die', 'Quadratwurzeln'],
  ['Potenz', 'power math', 'potencia matemática', 'die', 'Potenzen'],
], 'a2')

export const PART_E: Draft[] = [
  ...g0,
  ...g1,
  ...g2,
  ...g3,
  ...g4,
  ...g5,
  ...g6,
  ...g7,
  ...g8,
  ...g9,
  ...g10,
  ...g11,
  ...g12,
  ...g13,
  ...g14,
  ...g15,
  ...g16,
  ...g17,
  ...g18,
  ...g19,
  ...g20,
  ...g21,
  ...g22,
  ...g23,
  ...g24,
  ...g25,
  ...g26,
  ...g27,
  ...g28,
  ...g29,
  ...g30,
  ...g31,
  ...g32,
  ...g33,
  ...g34,
  ...g35,
  ...g36,
  ...g37,
  ...g38,
  ...g39,
  ...g40,
  ...g41,
  ...g42,
  ...g43,
  ...g44,
  ...g45,
  ...g46,
  ...g47,
  ...g48,
  ...g49,
  ...g50,
  ...g51,
  ...g52,
  ...g53,
  ...g54,
  ...g55,
  ...g56,
  ...g57,
  ...g58,
  ...g59,
  ...g60,
  ...g61,
  ...g62,
  ...g63,
  ...g64,
  ...g65,
  ...g66,
  ...g67,
  ...g68,
  ...g69,
  ...g70,
  ...g71,
  ...g72,
  ...g73,
  ...g74,
  ...g75,
  ...g76,
  ...g77,
  ...g78,
  ...g79,
  ...g80,
  ...g81,
  ...g82,
  ...g83,
  ...g84,
  ...g85,
  ...g86,
  ...g87,
  ...g88,
  ...g89,
  ...g90,
  ...g91,
  ...g92,
  ...g93,
  ...g94,
  ...g95,
  ...g96,
]
