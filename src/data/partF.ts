import { line, noun, type Draft } from './draft'

const g0 = line('hello', 'phrase', [
  ['Mit freundlichen Grüßen', 'kind regards', 'un cordial saludo'],
  ['Darf ich unterbrechen?', 'May I interrupt?', '¿puedo interrumpir?'],
  ['Ich möchte vorschlagen', 'I would like to suggest', 'me gustaría sugerir'],
  ['Gute Zusammenarbeit', 'good cooperation', 'buena colaboración'],
  ['Schönen Feierabend', 'enjoy your evening off', 'feliz tarde libre'],
  ['Meiner Meinung nach', 'in my opinion', 'en mi opinión'],
  ['Soweit ich weiß', 'as far as I know', 'por lo que sé'],
  ['Soweit ich sehe', 'as far as I can see', 'por lo que veo'],
  ['Wenn ich mich nicht irre', 'if I am not mistaken', 'si no me equivoco'],
], 'b1')

const g1 = line('numbers', 'other', [
  ['insgesamt', 'in total', 'en total'],
  ['prozentualer Anteil', 'percentage share', 'porcentaje'],
  ['im Durchschnitt', 'on average', 'en promedio'],
  ['doppelt', 'twice', 'dos veces'],
  ['vielfach', 'multiple times', 'muchas veces'],
  ['jeden zweiten Tag', 'every other day', 'cada dos días'],
], 'b1')

const g2 = line('numbers', 'num', [
  ['Prozentpunkt', 'percentage point', 'punto porcentual'],
], 'b1')

const g3 = line('colors', 'adj', [
  ['neongrün', 'neon green', 'verde neón'],
  ['pastellfarben', 'pastel-colored', 'de color pastel'],
  ['hellrosa', 'light pink', 'rosa claro'],
  ['kräftig', 'vivid', 'intenso'],
  ['matt', 'matte', 'mate'],
  ['neonfarben', 'neon-colored vivid', 'de colores neón'],
], 'b1')

const g4 = noun('colors', [
  ['Kontrast', 'contrast', 'contraste', 'der', 'Kontraste'],
  ['Farbverlauf', 'color gradient', 'degradado de color', 'der', 'Farbverläufe'],
], 'b1')

const g5 = noun('family', [
  ['Haushalt', 'household', 'hogar', 'der', 'Haushalte'],
  ['Generationenkonflikt', 'generational conflict', 'conflicto generacional', 'der', 'Generationenkonflikte'],
  ['Verlobter', 'fiancé', 'prometido', 'der', 'Verlobten'],
  ['Pflegekind', 'foster child', 'niño de acogida', 'das', 'Pflegekinder'],
  ['Schwiegertochter', 'daughter-in-law', 'nuera', 'die', 'Schwiegertöchter'],
  ['Schwiegersohn', 'son-in-law', 'yerno', 'der', 'Schwiegersöhne'],
  ['Stiefkind', 'stepchild', 'hijastro', 'das', 'Stiefkinder'],
], 'b1')

const g6 = line('family', 'phrase', [
  ['Die Familie wächst', 'the family is growing', 'la familia crece'],
], 'b1')

const g7 = noun('body', [
  ['Haltung', 'posture', 'postura', 'die', 'Haltungen'],
  ['Wirbelsäule', 'spine', 'columna vertebral', 'die', 'Wirbelsäulen'],
  ['Brustkorb', 'rib cage', 'caja torácica', 'der', 'Brustkörbe'],
  ['Bizepsmuskel', 'biceps muscle', 'músculo bíceps', 'der', 'Bizepsmuskeln'],
], 'b1')

const g8 = noun('clothes', [
  ['Tracht', 'traditional dress', 'traje tradicional', 'die', 'Trachten'],
  ['Abendkleid', 'evening dress', 'vestido de noche', 'das', 'Abendkleider'],
  ['Leggings', 'leggings', 'leggings', 'die', ''],
  ['Sportanzug', 'tracksuit', 'chándal', 'der', 'Sportanzüge'],
  ['Secondhandladen', 'secondhand store', 'tienda de segunda mano', 'der', 'Secondhandläden'],
  ['Wintermantel', 'winter coat garment', 'abrigo de invierno', 'der', 'Wintermäntel'],
], 'b1')

const g9 = noun('food', [
  ['Spiegelei', 'fried egg', 'huevo frito', 'das', 'Spiegeleier'],
  ['Matjes', 'pickled herring', 'arenque en escabeche', 'der', ''],
  ['Flammkuchen', 'flammkuchen tart', 'tarta flamenca', 'der', 'Flammkuchen'],
  ['Vorkochen', 'meal prep', 'preparación de comidas', 'das', ''],
  ['Nahrungsmittelunverträglichkeit', 'food intolerance', 'intolerancia alimentaria', 'die', 'Nahrungsmittelunverträglichkeiten'],
  ['Vitaminkick', 'vitamin boost meal', 'refuerzo vitamínico', 'der', 'Vitaminkicks'],
  ['Mahlzeitenplan', 'meal plan schedule', 'plan de comidas', 'der', 'Mahlzeitenpläne'],
], 'b1')

const g10 = noun('fruit', [
  ['Beerenhügel', 'berry hill crop', 'cultivo de bayas', 'der', 'Beerenhügel'],
  ['Obstkorb', 'fruit basket bowl', 'cesta de frutas', 'der', 'Obstkörbe'],
], 'b1')

const g11 = noun('veg', [
  ['Kohlrabi', 'kohlrabi', 'colinabo', 'der', ''],
  ['Gemüsebeet', 'vegetable patch bed', 'parcela de verduras', 'das', 'Gemüsebeete'],
], 'b1')

const g12 = noun('drinks', [
  ['Filterkaffee', 'filter coffee', 'café filtrado', 'der', 'Filterkaffees'],
  ['Früchtetee', 'fruit tea', 'té de frutas', 'der', 'Früchtetees'],
  ['Matcha', 'matcha', 'matcha', 'der', ''],
  ['Energiegetränk', 'energy drink', 'bebida energética', 'das', 'Energiegetränke'],
], 'b1')

const g13 = noun('animals', [
  ['Iltis', 'weasel', 'comadreja', 'der', 'Iltisse'],
  ['Lebensraum', 'habitat', 'hábitat', 'der', 'Lebensräume'],
  ['Wellensittich', 'budgie', 'periquito', 'der', 'Wellensittiche'],
  ['Tierheimhund', 'shelter rescue dog', 'perro de refugio', 'der', 'Tierheimhunde'],
], 'b1')

const g14 = noun('house', [
  ['Zimmertür', 'interior door', 'puerta interior', 'die', 'Zimmertüren'],
  ['Energieaudit', 'energy audit', 'auditoría energética', 'das', 'Energieaudits'],
  ['Fensterladen', 'window shutter', 'contraventana', 'der', 'Fensterläden'],
  ['Hausflur', 'entrance hallway', 'vestíbulo del edificio', 'der', 'Hausflure'],
], 'b1')

const g15 = noun('furniture', [
  ['Schaukelstuhl', 'rocking chair', 'mecedora', 'der', 'Schaukelstühle'],
  ['Fernsehschrank', 'TV cabinet', 'mueble de TV', 'der', 'Fernsehschränke'],
  ['Arbeitsplatz', 'workspace', 'puesto de trabajo', 'der', 'Arbeitsplätze'],
  ['Sesselgarnitur', 'armchair set suite', 'juego de sillones', 'die', 'Sesselgarnituren'],
  ['Ecksofa', 'corner sofa', 'sofá esquinero', 'das', 'Ecksofas'],
  ['Schlafsofa', 'sofa bed', 'sofá cama', 'das', 'Schlafsofas'],
  ['Sideboard', 'sideboard', 'aparador', 'das', 'Sideboards'],
], 'b1')

const g16 = noun('kitchen', [
  ['Auflaufform', 'casserole dish', 'fuente para horno', 'die', 'Auflaufformen'],
  ['Dampfgarer', 'steam cooker', 'vaporera', 'der', 'Dampfgarer'],
  ['Nudelholz', 'rolling pin', 'rodillo', 'das', 'Nudelhölzer'],
  ['Küchenwaage', 'kitchen scale', 'báscula de cocina', 'die', 'Küchenwaagen'],
  ['Vorratsglas', 'storage jar container', 'tarro de conservación', 'das', 'Vorratsgläser'],
  ['Kühlschrankfach', 'fridge compartment', 'compartimento del frigorífico', 'das', 'Kühlschrankfächer'],
  ['Entsafter', 'juicer', 'extractor de jugo', 'der', 'Entsafter'],
  ['Kaffeemühle', 'coffee grinder', 'molinillo de café', 'die', 'Kaffeemühlen'],
  ['Brotbackautomat', 'bread machine', 'panificadora', 'der', 'Brotbackautomaten'],
], 'b1')

const g17 = noun('city', [
  ['Markthalle', 'market hall', 'mercado cubierto', 'die', 'Markthallen'],
  ['Innenstadtbereich', 'city center area', 'zona céntrica', 'der', 'Innenstadtbereiche'],
  ['Stadtmauer', 'city wall', 'muralla', 'die', 'Stadtmauern'],
  ['Fußgängerampel', 'pedestrian traffic light', 'semáforo peatonal', 'die', 'Fußgängerampeln'],
  ['Wohngegend', 'residential area', 'zona residencial', 'die', 'Wohngegenden'],
  ['Industriegebiet', 'industrial area', 'zona industrial', 'das', 'Industriegebiete'],
  ['Stadtviertel', 'city district', 'barrio', 'das', 'Stadtviertel'],
  ['Hauptbahnhof', 'main station', 'estación central', 'der', 'Hauptbahnhöfe'],
], 'b1')

const g18 = noun('transport', [
  ['Netzplan', 'network map', 'mapa de red', 'der', 'Netzpläne'],
  ['Mautstelle', 'toll booth', 'peaje', 'die', 'Mautstellen'],
  ['Fahrradständer', 'bike rack', 'aparcamiento de bicis', 'der', 'Fahrradständer'],
  ['Schnellbus', 'express bus line', 'autobús exprés', 'der', 'Schnellbusse'],
  ['Fahrgemeinschaft', 'ride-sharing group', 'compartir coche', 'die', 'Fahrgemeinschaften'],
  ['Stoßstange', 'bumper', 'parachoques', 'die', 'Stoßstangen'],
  ['Tankdeckel', 'fuel cap', 'tapa del tanque', 'der', 'Tankdeckel'],
], 'b1')

const g19 = noun('school', [
  ['Klausur', 'written exam', 'examen escrito', 'die', 'Klausuren'],
  ['Seminararbeit', 'seminar paper', 'trabajo de seminario', 'die', 'Seminararbeiten'],
  ['Nachhilfe', 'tutoring', 'clases de apoyo', 'die', ''],
  ['Gruppenarbeit', 'group work', 'trabajo en grupo', 'die', 'Gruppenarbeiten'],
  ['Elternsprechtag', 'parent-teacher day', 'jornada con padres', 'der', 'Elternsprechtage'],
  ['Nachhilfeunterricht', 'tutoring session', 'clase de refuerzo', 'der', 'Nachhilfeunterricht'],
  ['Wiederholung', 'review lesson', 'repaso', 'die', 'Wiederholungen'],
  ['Vertiefung', 'deepening study', 'profundización', 'die', 'Vertiefungen'],
  ['Grundlagenkurs', 'foundations course', 'curso básico', 'der', 'Grundlagenkurse'],
  ['Aufbaukurs', 'advanced course', 'curso avanzado', 'der', 'Aufbaukurse'],
  ['Abschluss', 'degree completion', 'titulación', 'der', 'Abschlüsse'],
  ['Stipendium', 'scholarship', 'beca', 'das', 'Stipendien'],
], 'b1')

const g20 = noun('jobs', [
  ['Steuerberater', 'tax consultant', 'asesor fiscal', 'der', 'Steuerberater'],
  ['Beförderung', 'promotion', 'ascenso', 'die', 'Beförderungen'],
  ['Arbeitslosenquote', 'unemployment rate figure', 'tasa de desempleo', 'die', 'Arbeitslosenquoten'],
  ['Abteilungsleiter', 'department head', 'jefe de departamento', 'der', 'Abteilungsleiter'],
  ['Sachbearbeiter', 'case worker', 'gestor administrativo', 'der', 'Sachbearbeiter'],
  ['Chemiker', 'chemist', 'químico', 'der', 'Chemiker'],
  ['Physiker', 'physicist', 'físico', 'der', 'Physiker'],
  ['Biologe', 'biologist', 'biólogo', 'der', 'Biologen'],
  ['Psychologe', 'psychologist', 'psicólogo', 'der', 'Psychologen'],
  ['Soziologe', 'sociologist', 'sociólogo', 'der', 'Soziologen'],
  ['Historiker', 'historian', 'historiador', 'der', 'Historiker'],
  ['Philosoph', 'philosopher', 'filósofo', 'der', 'Philosophen'],
  ['Theologe', 'theologian', 'teólogo', 'der', 'Theologen'],
  ['Jurist', 'legal scholar', 'jurista', 'der', 'Juristen'],
  ['Notar', 'notary', 'notario', 'der', 'Notare'],
  ['Staatsanwalt', 'prosecutor', 'fiscal', 'der', 'Staatsanwälte'],
  ['Diplomat', 'diplomat', 'diplomático', 'der', 'Diplomaten'],
  ['Botschafter', 'ambassador', 'embajador', 'der', 'Botschafter'],
], 'b1')

const g21 = noun('nature', [
  ['Artenschutz', 'species protection', 'protección de especies', 'der', ''],
  ['Schlucht', 'gorge', 'cañón', 'die', 'Schluchten'],
  ['Sumpf', 'swamp', 'pantano', 'der', 'Sümpfe'],
  ['Umweltbewusstsein', 'environmental awareness', 'conciencia medioambiental', 'das', ''],
  ['Wanderwegeschild', 'trail marker sign', 'señal de sendero', 'das', 'Wanderwegeschilder'],
  ['Naturschutz', 'nature conservation', 'protección de la naturaleza', 'der', ''],
  ['Mülltrennung', 'waste sorting', 'separación de residuos', 'die', 'Mülltrennungen'],
], 'b1')

const g22 = line('weather', 'phrase', [
  ['Die Temperatur steigt', 'the temperature is rising', 'sube la temperatura'],
], 'b1')

const g23 = noun('weather', [
  ['Luftfeuchtigkeit', 'humidity', 'humedad', 'die', ''],
  ['Niederschlagsmenge', 'precipitation amount', 'cantidad de precipitación', 'die', 'Niederschlagsmengen'],
], 'b1')

const g24 = line('time', 'other', [
  ['kürzlich', 'recently', 'recientemente'],
], 'b1')

const g25 = noun('time', [
  ['Minutengenauigkeit', 'minute precision', 'precisión al minuto', 'die', ''],
  ['Terminkalender', 'appointment calendar', 'agenda', 'der', 'Terminkalender'],
  ['Zeitraum', 'period', 'periodo', 'der', 'Zeiträume'],
  ['Zeitfresser', 'time-consuming task', 'ladrona de tiempo', 'der', 'Zeitfresser'],
  ['Dauer', 'duration', 'duración', 'die', 'Dauern'],
  ['Verzögerung', 'delay period', 'demora', 'die', 'Verzögerungen'],
], 'b1')

const g26 = line('feelings', 'adj', [
  ['verunsichert', 'unsettled', 'desconcertado'],
  ['mitfühlend', 'compassionate manner', 'compasivo'],
  ['ermutigt', 'encouraged', 'animado'],
  ['bestärkt', 'reinforced emotionally', 'reforzado emocionalmente'],
], 'b1')

const g27 = line('verbs', 'verb', [
  ['ausfüllen', 'to fill out', 'rellenar'],
  ['unterbrechen', 'to interrupt', 'interrumpir'],
  ['beantragen', 'to apply for', 'solicitar'],
  ['reservieren', 'to reserve', 'reservar'],
  ['verschieben', 'to postpone', 'posponer'],
  ['verhandeln', 'to negotiate', 'negociar'],
  ['sich anfreunden', 'to befriend someone', 'hacerse amigo de alguien'],
  ['vorbeikommen', 'to drop by informally', 'pasar por casualidad'],
  ['weiterleiten', 'to forward a message', 'reenviar un mensaje'],
  ['überreichen', 'to hand over formally', 'entregar formalmente'],
  ['einreichen', 'to submit documents', 'presentar documentos'],
  ['beanstanden', 'to complain about quality', 'reclamar la calidad'],
  ['überlisten', 'to outsmart someone', 'burlar a alguien'],
  ['verreisen', 'to go traveling', 'salir de viaje'],
  ['zurückfahren', 'to drive back', 'volver conduciendo'],
  ['abkürzen', 'to shorten a route', 'acortar una ruta'],
  ['sich vertragen', 'to get along well', 'llevarse bien'],
  ['ausreden lassen', 'to let someone finish', 'dejar terminar de hablar'],
  ['nachsitzen', 'to stay after school', 'quedarse después de clase'],
  ['übernachten', 'to stay overnight', 'pasar la noche'],
  ['anfeuern', 'to cheer someone on', 'animar a alguien'],
  ['ausruhen', 'to rest up properly', 'descansar bien'],
  ['vorlesen', 'to read aloud', 'leer en voz alta'],
  ['zusammenleben', 'to live together', 'coadunar en vivienda'],
  ['anbahnen', 'to initiate contact', 'iniciar contacto'],
  ['aufarbeiten', 'to work through', 'elaborar un tema'],
  ['nacharbeiten', 'to catch up work', 'poner al día el trabajo'],
  ['vorarbeiten', 'to do preliminary work', 'hacer trabajo previo'],
  ['zuarbeiten', 'to support with prep', 'apoyar con preparación'],
  ['mitarbeiten', 'to collaborate', 'colaborar'],
  ['zusammenarbeiten', 'to work together', 'trabajar juntos'],
  ['weiterarbeiten', 'to keep working', 'seguir trabajando'],
  ['einwägen', 'to weigh in', 'pesar una dosis'],
  ['nachweisen lassen', 'to have proven', 'hacer acreditar'],
  ['durchsetzen', 'to enforce', 'imponer'],
  ['umsetzen', 'to put into practice', 'poner en práctica'],
  ['fortsetzen', 'to continue', 'proseguir'],
  ['aussetzten', 'to expose', 'exponer a'],
  ['einsetzen', 'to deploy', 'emplear'],
  ['versetzen', 'to transfer someone', 'trasladar a alguien'],
  ['übersetzen', 'to translate', 'traducir'],
  ['darlegen', 'to set forth', 'exponer argumentos'],
  ['beilegen', 'to enclose or settle', 'adjuntar o zanjar'],
  ['nachholen', 'to make up for', 'recuperar lo perdido'],
  ['vorholen', 'to bring forward', 'adelantar una tarea'],
  ['abholen lassen', 'to have picked up', 'hacer recoger'],
  ['einholen', 'to catch up with', 'alcanzar a alguien'],
  ['überholen', 'to overtake', 'adelantar en tráfico'],
  ['erreichen', 'to achieve', 'lograr'],
  ['enthalten', 'to contain', 'contener'],
  ['bestehen', 'to consist', 'consistir'],
  ['handeln', 'to act', 'actuar'],
  ['entscheiden', 'to decide', 'decidir'],
  ['wählen', 'to choose', 'elegir'],
  ['abschließen', 'to conclude', 'concluir'],
  ['aufschließen', 'to unlock insight', 'abrir con llave'],
  ['einschließen', 'to include enclosed', 'incluir encerrado'],
  ['ausschließen', 'to exclude', 'excluir'],
  ['anschließen', 'to connect up', 'conectar'],
  ['anschließen lassen', 'to have connected', 'hacer conectar'],
  ['umschließen', 'to enclose', 'cercar'],
  ['verschließen', 'to seal shut', 'cerrar herméticamente'],
  ['aufbrechen', 'to break open', 'forzar apertura'],
  ['einbrechen', 'to break in', 'entrar a robar'],
  ['ausbrechen', 'to break out', 'escapar'],
  ['durchbrechen', 'to break through', 'atravesar'],
  ['zusammenbrechen', 'to collapse', 'derrumbarse'],
  ['zerbrechen', 'to shatter', 'hacer pedazos'],
  ['aufbauen', 'to build up', 'construir algo'],
  ['abbauen', 'to dismantle', 'desmantelar'],
  ['umbauen', 'to remodel', 'remodelar'],
  ['ausbauen', 'to expand structure', 'ampliar'],
  ['einbauen', 'to install in', 'instalar dentro'],
  ['zusammenbauen', 'to assemble', 'ensamblar'],
  ['aufstellen', 'to set up', 'colocar de pie'],
  ['umstellen', 'to rearrange', 'reordenar'],
  ['vorstellen', 'to introduce', 'presentar a alguien'],
  ['darstellen', 'to depict', 'representar'],
  ['herstellen', 'to manufacture', 'fabricar'],
  ['bereitstellen', 'to provide', 'poner a disposición'],
], 'b1')

const g28 = line('adjectives', 'adj', [
  ['praktisch', 'practical', 'práctico'],
  ['ordentlich', 'tidy', 'ordenado'],
  ['hilfsbereit', 'helpful', 'servicial'],
  ['aufmerksamkeitsstark', 'attention-grabbing', 'que llama la atención'],
  ['wetterfest', 'weather-resistant', 'resistente al clima'],
  ['kostengünstig', 'cost-effective option', 'rentable'],
  ['mehrsprachig', 'multilingual person', 'multilingüe'],
  ['selbstständig', 'self-employed status', 'autónomo'],
  ['verantwortungsbewusst', 'conscientiously responsible', 'conscientemente responsable'],
  ['tragfähig', 'viable lasting', 'sostenible viable'],
  ['nachvollziehbar', 'comprehensible logic', 'comprensible lógicamente'],
  ['unverständlich', 'incomprehensible', 'incomprensible'],
  ['überzeugend', 'convincing', 'convincente'],
  ['unüberzeugend', 'unconvincing', 'poco convincente'],
  ['aussagekräftig', 'meaningful data', 'significativo en datos'],
  ['aussageschwach', 'weakly informative', 'poco informativo'],
  ['unpünktlich', 'unpunctual', 'impuntual'],
  ['nachlässig', 'careless', 'descuidado'],
  ['nachhaltig gedacht', 'sustainably conceived', 'pensado de forma sostenible'],
  ['zukunftsfähig', 'future-proof', 'apto para el futuro'],
  ['alltagstauglich', 'everyday-ready', 'apto para el día a día'],
  ['schulgerecht', 'school-appropriate', 'adecuado para la escuela'],
  ['umfangreich', 'extensive', 'extenso'],
  ['reichlich', 'abundant', 'abundante'],
  ['ungeeignet', 'unsuitable', 'inadecuado'],
  ['geeignet', 'suitable', 'adecuado para'],
  ['erfolgreich', 'successful', 'exitoso'],
  ['erfolglos', 'unsuccessful', 'fracasado'],
  ['möglich', 'possible', 'posible'],
  ['unmöglich', 'impossible', 'imposible'],
], 'b1')

const g29 = noun('travel', [
  ['Gepäckausgabe', 'baggage claim', 'recogida de equipaje', 'die', 'Gepäckausgaben'],
  ['Visumantrag', 'visa application', 'solicitud de visa', 'der', 'Visumanträge'],
  ['Pension', 'guesthouse', 'pensión', 'die', 'Pensionen'],
  ['Reiseapotheke', 'travel first-aid kit', 'botiquín de viaje', 'die', 'Reiseapotheken'],
  ['Stadtrundgang', 'city walking tour', 'recorrido urbano', 'der', 'Stadtrundgänge'],
  ['Stornierung', 'cancellation', 'cancelación', 'die', 'Stornierungen'],
], 'b1')

const g30 = noun('shop', [
  ['Großhandel', 'wholesale', 'mayorista', 'der', ''],
  ['Verkaufsberater', 'sales advisor', 'asesor de ventas', 'der', 'Verkaufsberater'],
  ['Kundenberatung', 'customer advisory desk', 'asesoría al cliente', 'die', 'Kundenberatungen'],
], 'b1')

const g31 = noun('hobbies', [
  ['Ehrenamt', 'volunteer work', 'trabajo voluntario', 'das', 'Ehrenämter'],
  ['Wanderkarte', 'hiking map', 'mapa de senderos', 'die', 'Wanderkarten'],
  ['Vereinsleben', 'club community life', 'vida asociativa', 'das', ''],
], 'b1')

const g32 = noun('tech', [
  ['Cyberangriff', 'cyberattack', 'ciberataque', 'der', 'Cyberangriffe'],
  ['Backup', 'backup copy', 'copia de seguridad', 'das', 'Backups'],
], 'b1')

const g33 = line('lands', 'other', [
  ['Luxemburg', 'Luxembourg', 'Luxemburgo'],
  ['Ungarn', 'Hungary', 'Hungría'],
  ['Rumänien', 'Romania', 'Rumanía'],
  ['Brandenburg', 'Brandenburg region', 'Brandeburgo'],
  ['Slowakei', 'Slovakia', 'Eslovaquia'],
  ['Slowenien', 'Slovenia', 'Eslovenia'],
  ['Serbien', 'Serbia', 'Serbia'],
  ['Bulgarien', 'Bulgaria', 'Bulgaria'],
], 'b1')

const g34 = noun('bath', [
  ['Hygieneartikel', 'hygiene product', 'artículo de higiene', 'der', 'Hygieneartikel'],
  ['Körperlotion', 'body lotion', 'loción corporal', 'die', 'Körperlotionen'],
  ['Lippenbalsam', 'lip balm', 'bálsamo labial', 'der', 'Lippenbalsame'],
], 'b1')

const g35 = noun('office', [
  ['Bewerbungsgespräch', 'job interview', 'entrevista de trabajo', 'das', 'Bewerbungsgespräche'],
  ['Arbeitsvertrag', 'employment contract', 'contrato laboral', 'der', 'Arbeitsverträge'],
  ['Quartalsbericht', 'quarterly report', 'informe trimestral', 'der', 'Quartalsberichte'],
  ['Besprechungszimmer', 'meeting room space', 'sala de reuniones', 'das', 'Besprechungszimmer'],
  ['Kaffeepause', 'coffee break chat', 'pausa del café', 'die', 'Kaffeepausen'],
  ['Dienstweg', 'official channels', 'vía oficial', 'der', 'Dienstwege'],
  ['Sachlage', 'situation facts', 'situación de hechos', 'die', 'Sachlagen'],
  ['Sachkunde', 'subject expertise', 'pericia temática', 'die', ''],
  ['Fachwissen', 'specialist knowledge', 'saber especializado', 'das', ''],
  ['Formular', 'form sheet', 'formulario', 'das', 'Formulare'],
  ['Geschäftsführung', 'management board', 'dirección general', 'die', 'Geschäftsführungen'],
  ['Personalabteilung', 'HR department', 'departamento de personal', 'die', 'Personalabteilungen'],
  ['Buchhaltung', 'bookkeeping', 'contabilidad', 'die', 'Buchhaltungen'],
  ['Controlling', 'controlling', 'control de gestión', 'das', ''],
  ['Qualitätsmanagement', 'quality management', 'gestión de calidad', 'das', ''],
  ['Kundenbetreuung', 'customer care', 'atención al cliente', 'die', ''],
  ['Öffentlichkeitsarbeit', 'public relations', 'relaciones públicas', 'die', ''],
], 'b1')

const g36 = noun('music', [
  ['Notenblatt', 'sheet music', 'partitura', 'das', 'Notenblätter'],
  ['Konzertsaal', 'concert hall', 'sala de conciertos', 'der', 'Konzertsäle'],
  ['Improvisation', 'improvisation', 'improvisación', 'die', 'Improvisationen'],
  ['Open-Air-Konzert', 'outdoor concert event', 'concierto al aire libre', 'das', 'Open-Air-Konzerte'],
  ['Sinfonie', 'symphony', 'sinfonía', 'die', 'Sinfonien'],
  ['Sonate', 'sonata', 'sonata', 'die', 'Sonaten'],
  ['Ouvertüre', 'overture', 'obertura', 'die', 'Ouvertüren'],
  ['Arie', 'aria', 'aria', 'die', 'Arien'],
  ['Posaune', 'trombone', 'trombón', 'die', 'Posaunen'],
  ['Klarinette', 'clarinet', 'clarinete', 'die', 'Klarinetten'],
], 'b1')

const g37 = noun('sport', [
  ['Wettkampfnerv', 'competitive tension', 'tensión competitiva', 'der', ''],
  ['Trainingslager', 'training camp', 'concentración', 'das', 'Trainingslager'],
  ['Halbfinale', 'semifinal', 'semifinal', 'das', 'Halbfinale'],
  ['Trainingsplan', 'training plan', 'plan de entrenamiento', 'der', 'Trainingspläne'],
  ['Marathontraining', 'marathon training plan', 'entrenamiento de maratón', 'das', ''],
  ['Triathlon', 'triathlon', 'triatlón', 'der', 'Triathlons'],
  ['Halbmarathon', 'half marathon', 'media maratón', 'der', 'Halbmarathons'],
  ['Staffellauf', 'relay race', 'carrera de relevos', 'der', 'Staffelläufe'],
  ['Hindernislauf', 'hurdle race', 'carrera de vallas', 'der', 'Hindernisläufe'],
  ['Weitsprung', 'long jump', 'salto de longitud', 'der', ''],
  ['Hochsprung', 'high jump', 'salto de altura', 'der', ''],
  ['Kugelstoßen', 'shot put', 'lanzamiento de peso', 'das', ''],
  ['Speerwurf', 'javelin throw', 'lanzamiento de jabalina', 'der', 'Speerwürfe'],
  ['Diskuswurf', 'discus throw', 'lanzamiento de disco', 'der', 'Diskuswürfe'],
], 'b1')

const g38 = noun('health', [
  ['Termin beim Arzt', 'doctor\'s appointment', 'cita médica', 'der', 'Termine beim Arzt'],
  ['Symptomatik', 'symptomatic pattern', 'sintomatología', 'die', ''],
  ['Erste-Hilfe-Kurs', 'first aid course', 'curso de primeros auxilios', 'der', 'Erste-Hilfe-Kurse'],
  ['Befund', 'medical finding', 'hallazgo clínico', 'der', 'Befunde'],
  ['Überweisungsschein', 'referral slip', 'volante de remisión', 'der', 'Überweisungsscheine'],
  ['Arbeitsunfähigkeit', 'inability to work', 'incapacidad laboral', 'die', 'Arbeitsunfähigkeiten'],
  ['Genesung', 'recovery from illness', 'recuperación', 'die', 'Genesungen'],
  ['Blutbild', 'blood count', 'hemograma', 'das', 'Blutbilder'],
  ['Röntgenbild', 'x-ray image', 'radiografía', 'das', 'Röntgenbilder'],
  ['Ultraschall', 'ultrasound', 'ecografía', 'der', 'Ultraschalle'],
  ['Kernspin', 'MRI scan', 'resonancia magnética', 'das', 'Kernspin'],
  ['Computertomografie', 'CT scan', 'tomografía computarizada', 'die', 'Computertomografien'],
  ['Impfpass', 'vaccination record', 'cartilla de vacunación', 'der', 'Impfpässe'],
  ['Hausarzt', 'family doctor', 'médico de cabecera', 'der', 'Hausärzte'],
  ['Facharzt', 'specialist doctor', 'médico especialista', 'der', 'Fachärzte'],
  ['Chirurgen', 'surgeons group', 'cirujanos', 'die', 'Chirurgen'],
  ['Chirurg', 'surgeon', 'cirujano', 'der', 'Chirurgen'],
  ['Hebamme', 'midwife', 'matrona', 'die', 'Hebammen'],
  ['Physiotherapeut', 'physiotherapist', 'fisioterapeuta', 'der', 'Physiotherapeuten'],
], 'b1')

const g39 = noun('tools', [
  ['Werkstatteinrichtung', 'workshop equipment', 'equipo de taller', 'die', 'Werkstatteinrichtungen'],
  ['Stichsäge', 'jigsaw tool', 'sierra de calar', 'die', 'Stichsägen'],
  ['Kreissäge', 'circular saw', 'sierra circular', 'die', 'Kreissägen'],
  ['Winkelschleifer', 'angle grinder', 'amoladora', 'der', 'Winkelschleifer'],
  ['Schweißgerät', 'welder', 'soldadora', 'das', 'Schweißgeräte'],
  ['Maurerkelle', 'trowel', 'llana', 'die', 'Maurerkellen'],
  ['Maurerschnur', 'mason line', 'cuerda de albañil', 'die', 'Maurerschnüre'],
  ['Feile', 'file tool', 'lima herramienta', 'die', 'Feilen'],
], 'b1')

const g40 = noun('garden', [
  ['Gartenschere', 'garden shears', 'tijeras de jardín', 'die', 'Gartenscheren'],
  ['Hochbeet', 'raised bed', 'huerto elevado', 'das', 'Hochbeete'],
  ['Pflanzenschutz', 'plant protection care', 'protección vegetal', 'der', ''],
  ['Komposter', 'composter', 'compostera', 'der', 'Komposter'],
  ['Gartenschlauch', 'garden hose', 'manguera de jardín', 'der', 'Gartenschläuche'],
  ['Rasensprenger', 'lawn sprinkler', 'aspersor', 'der', 'Rasensprenger'],
], 'b1')

const g41 = noun('money', [
  ['Kontoauszug', 'account statement', 'extracto bancario', 'der', 'Kontoauszüge'],
  ['Nettogehalt', 'net salary', 'salario neto', 'das', 'Nettogehälter'],
  ['Haushaltsbudget', 'household budget plan', 'presupuesto doméstico', 'das', 'Haushaltsbudgets'],
  ['Sparrate', 'savings rate', 'tasa de ahorro', 'die', 'Sparraten'],
  ['Einnahmen', 'revenue income', 'ingresos', 'die', 'Einnahmen'],
  ['Kostenstelle', 'cost center', 'centro de costos', 'die', 'Kostenstellen'],
  ['Zinsen', 'interest rates', 'intereses', 'die', 'Zinsen'],
  ['Gebühr', 'fee', 'tarifa', 'die', 'Gebühren'],
  ['Bonus', 'bonus pay', 'bono salarial', 'der', 'Boni'],
  ['Schuld', 'debt', 'deuda', 'die', 'Schulden'],
], 'b1')

const g42 = noun('materials', [
  ['Sandstein', 'sandstone', 'arenisca', 'der', 'Sandsteine'],
  ['Nylon', 'nylon', 'nailon', 'der', ''],
  ['Recyclingpapier', 'recycled paper stock', 'papel reciclado', 'das', 'Recyclingpapiere'],
  ['Kohlenstoff', 'carbon', 'carbono', 'der', ''],
  ['Stickstoff', 'nitrogen', 'nitrógeno', 'der', ''],
  ['Sauerstoff', 'oxygen', 'oxígeno', 'der', ''],
  ['Wasserstoff', 'hydrogen', 'hidrógeno', 'der', ''],
  ['Helium', 'helium', 'helio', 'das', ''],
  ['Zinn', 'tin metal', 'estaño', 'das', ''],
  ['Blei', 'lead metal', 'plomo', 'das', ''],
  ['Quecksilber', 'mercury metal', 'mercurio', 'das', ''],
  ['Nickel', 'nickel', 'níquel', 'das', ''],
], 'b1')

const g43 = noun('shapes', [
  ['Symmetrieachse', 'axis of symmetry', 'eje de simetría', 'die', 'Symmetrieachsen'],
  ['Halbkreisform', 'semicircle shape', 'forma semicircular', 'die', 'Halbkreisformen'],
  ['Parallelogramm', 'parallelogram', 'paralelogramo', 'das', 'Parallelogramme'],
  ['Fünfeck', 'pentagon', 'pentágono', 'das', 'Fünfecke'],
  ['Sechseck', 'hexagon', 'hexágono', 'das', 'Sechsecke'],
  ['Achteck', 'octagon', 'octágono', 'das', 'Achtecke'],
  ['Ellipse', 'ellipse', 'elipse', 'die', 'Ellipsen'],
  ['Ikosaeder', 'icosahedron', 'icosaedro', 'das', 'Ikosaeder'],
  ['Dodekaeder', 'dodecahedron', 'dodecaedro', 'das', 'Dodekaeder'],
], 'b1')

const g44 = line('verbs', 'verb', [
  ['genehmigen', 'to approve', 'aprobar'],
  ['ablehnen', 'to reject', 'rechazar'],
  ['überzeugen', 'to convince', 'convencer'],
  ['beweisen', 'to prove', 'demostrar'],
  ['behaupten', 'to claim', 'afirmar'],
  ['zustimmen', 'to agree', 'estar de acuerdo'],
  ['widersprechen', 'to contradict', 'contradecir'],
  ['erläutern', 'to explain in detail', 'explicar en detalle'],
  ['zusammenfassen', 'to summarize', 'resumir'],
  ['analysieren', 'to analyze', 'analizar'],
  ['bewerten', 'to evaluate', 'evaluar'],
  ['vergleichen', 'to compare', 'comparar'],
  ['unterscheiden', 'to distinguish', 'distinguir'],
  ['beeinflussen', 'to influence', 'influir'],
  ['verursachen', 'to cause', 'causar'],
  ['vermeiden', 'to avoid', 'evitar'],
  ['ersetzen', 'to replace', 'reemplazar'],
  ['verbessern', 'to improve', 'mejorar'],
  ['verschlechtern', 'to worsen', 'empeorar'],
  ['reduzieren', 'to reduce', 'reducir'],
  ['erhöhen', 'to increase', 'aumentar'],
  ['koordinieren', 'to coordinate', 'coordinar'],
  ['delegieren', 'to delegate', 'delegar'],
  ['priorisieren', 'to prioritize', 'priorizar'],
  ['einhalten', 'to comply with', 'cumplir'],
  ['schützen', 'to protect', 'proteger'],
  ['sichern', 'to secure', 'asegurar'],
  ['investieren', 'to invest', 'invertir'],
  ['sparen', 'to save money', 'ahorrar'],
  ['ausgeben', 'to spend', 'gastar'],
  ['kündigen', 'to quit a job', 'renunciar'],
  ['einstellen', 'to hire', 'contratar'],
  ['entlassen', 'to lay off', 'despedir'],
  ['befördern', 'to promote at work', 'ascender'],
  ['borgen', 'to borrow', 'pedir prestado'],
  ['berechnen', 'to calculate', 'calcular'],
  ['kalkulieren', 'to estimate costs', 'calcular costes'],
  ['budgetieren', 'to budget', 'presupuestar'],
  ['finanzieren', 'to finance', 'financiar'],
  ['subventionieren', 'to subsidize', 'subvencionar'],
  ['steuern', 'to tax', 'gravar'],
  ['besteuern', 'to levy taxes on', 'imponer impuestos a'],
  ['registrieren', 'to register', 'registrar'],
  ['dokumentieren', 'to document', 'documentar'],
  ['archivieren', 'to archive', 'archivar'],
  ['digitalisieren', 'to digitize', 'digitalizar'],
  ['aktualisieren', 'to update', 'actualizar'],
  ['installieren', 'to install', 'instalar'],
  ['konfigurieren', 'to configure', 'configurar'],
  ['synchronisieren', 'to sync', 'sincronizar'],
  ['wiederherstellen', 'to restore', 'restaurar'],
  ['löschen', 'to delete', 'borrar'],
  ['speichern', 'to save data', 'guardar'],
  ['herunterladen', 'to download', 'descargar'],
  ['programmieren', 'to program', 'programar'],
  ['mitteilen', 'to inform', 'informar'],
  ['bestätigen', 'to confirm', 'confirmar'],
  ['protestieren', 'to object', 'protestar'],
  ['empfehlen', 'to recommend', 'recomendar'],
  ['kritisieren', 'to criticize', 'criticar'],
  ['unterstützen', 'to support', 'apoyar'],
  ['fordern', 'to demand', 'exigir'],
  ['erlauben', 'to allow', 'permitir'],
  ['verbieten', 'to forbid', 'prohibir'],
  ['begründen', 'to justify', 'justificar'],
  ['klären', 'to clarify', 'aclarar'],
  ['vereinbaren', 'to agree on', 'acordar'],
  ['streiten', 'to argue', 'discutir'],
  ['kompromissbereit sein', 'to be willing to compromise', 'estar dispuesto a ceder'],
  ['nachverhandeln', 'to renegotiate', 'renegociar'],
  ['risikobewusst handeln', 'to act risk-aware', 'actuar con conciencia de riesgo'],
  ['vorausdenken', 'to think ahead', 'pensar con antelación'],
  ['querdenken', 'to think laterally', 'pensar en lateral'],
  ['mitdenken', 'to think along', 'pensar a la par'],
  ['weiterdenken', 'to think further', 'seguir pensando'],
  ['zuendedenken', 'to think through fully', 'pensar hasta el final'],
  ['hinterlegen', 'to deposit', 'depositar en custodia'],
  ['vorlegen', 'to present formally', 'presentar formalmente'],
  ['nachlegen', 'to add more', 'añadir más'],
  ['beilegen lassen', 'to have enclosed', 'hacer adjuntar'],
  ['auflegen', 'to publish or hang up', 'publicar o colgar'],
  ['auslegen', 'to interpret text', 'interpretar un texto'],
  ['umlegen', 'to apportion costs', 'repartir costos'],
  ['zerlegen', 'to disassemble', 'desmontar'],
  ['vorausschauen', 'to look ahead', 'mirar hacia delante'],
  ['zurückblicken', 'to look back', 'mirar hacia atrás'],
  ['hineinblicken', 'to look into', 'mirar hacia dentro'],
  ['hinausblicken', 'to look outward', 'mirar hacia fuera'],
  ['herumblicken', 'to look around', 'mirar alrededor'],
  ['hinterfragen', 'to question critically', 'cuestionar críticamente'],
  ['differenzieren', 'to differentiate', 'diferenciar con matices'],
  ['konstruieren', 'to construct', 'construir conceptualmente'],
  ['implementieren', 'to implement', 'implementar'],
  ['optimieren', 'to optimize', 'optimizar'],
  ['moderieren', 'to moderate', 'moderar'],
  ['vermitteln', 'to mediate', 'mediar'],
  ['schlichten', 'to settle a dispute', 'conciliar'],
  ['einklagen', 'to sue for', 'demandar judicialmente'],
], 'b2')

const g45 = line('adjectives', 'adj', [
  ['effizient', 'efficient', 'eficiente'],
  ['produktiv', 'productive', 'productivo'],
  ['flexibel', 'flexible', 'flexible'],
  ['kompetent', 'competent', 'competente'],
  ['qualifiziert', 'qualified', 'cualificado'],
  ['erfahren', 'experienced', 'experimentado'],
  ['unabhängig', 'independent', 'independiente'],
  ['abhängig', 'dependent', 'dependiente'],
  ['relevant', 'relevant', 'relevante'],
  ['irrelevant', 'irrelevant', 'irrelevante'],
  ['angemessen', 'appropriate', 'apropiado'],
  ['unangemessen', 'inappropriate', 'inapropiado'],
  ['nachhaltig', 'sustainable', 'sostenible'],
  ['wirtschaftlich', 'economic', 'económico'],
  ['finanziell', 'financial', 'financiero'],
  ['rechtlich', 'legal', 'legal'],
  ['illegal', 'illegal', 'ilegal'],
  ['intern', 'internal', 'interno'],
  ['extern', 'external', 'externo'],
  ['global', 'global', 'global'],
  ['lokal', 'local', 'local'],
  ['regional', 'regional', 'regional'],
  ['national', 'national', 'nacional'],
  ['international', 'international', 'internacional'],
  ['politisch', 'political', 'político'],
  ['gesellschaftlich', 'societal', 'social'],
  ['kulturell', 'cultural', 'cultural'],
  ['technisch', 'technical', 'técnico'],
  ['theoretisch', 'theoretical', 'teórico'],
  ['komplex', 'complex', 'complejo'],
  ['strategisch', 'strategic', 'estratégico'],
  ['taktisch', 'tactical', 'táctico'],
  ['kritisch', 'critical', 'crítico'],
  ['positiv', 'positive', 'positivo'],
  ['negativ', 'negative', 'negativo'],
  ['neutral', 'neutral', 'neutral'],
  ['objektiv', 'objective', 'objetivo'],
  ['subjektiv', 'subjective', 'subjetivo'],
  ['rational', 'rational', 'racional'],
  ['emotional', 'emotional', 'emocional'],
  ['belastbar', 'resilient', 'resiliente'],
  ['detailorientiert', 'detail-oriented', 'orientado al detalle'],
  ['lösungsorientiert', 'solution-oriented', 'orientado a soluciones'],
  ['agil aufgestellt', 'agilely set up', 'organizado con agilidad'],
  ['lean aufgestellt', 'leanly organized', 'organizado en lean'],
  ['hybride aufgestellt', 'hybridly organized', 'organizado híbrido'],
  ['robust skalierbar', 'robustly scalable', 'escalable con robustez'],
  ['tragfähig skalierbar', 'viably scalable', 'escalable con solidez'],
  ['empirisch fundiert', 'empirically grounded', 'fundamentado empíricamente'],
  ['theoriegeleitet', 'theory-driven', 'guiado por teoría'],
  ['praxisnah', 'practice-oriented', 'cercano a la práctica'],
  ['ergebnisorientiert', 'results-oriented', 'orientado a resultados'],
  ['prozessorientiert', 'process-oriented', 'orientado a procesos'],
  ['kundenorientiert', 'customer-oriented', 'orientado al cliente'],
  ['weitblickend', 'far-sighted', 'con visión de futuro'],
  ['kurzsichtig handelnd', 'short-sightedly acting', 'actuando con cortoplacismo'],
  ['strategisch klug', 'strategically smart', 'estratégicamente inteligente'],
  ['taktisch geschickt', 'tactically skilled', 'hábil tácticamente'],
  ['operativ stark', 'operationally strong', 'fuerte operativamente'],
  ['kontrovers', 'controversial', 'controvertido'],
  ['paradox', 'paradoxical', 'paradójico'],
  ['subtil', 'subtle', 'sutil'],
  ['plausibel', 'plausible', 'plausible'],
  ['fragwürdig', 'questionable', 'cuestionable'],
  ['zweifelhaft', 'doubtful', 'dudoso'],
  ['ambitiös', 'ambitious', 'ambicioso'],
  ['aspirativ', 'aspirational', 'aspiracional'],
  ['visionär', 'visionary', 'visionario'],
  ['pragmatisch', 'pragmatic', 'pragmático'],
  ['ideologisch', 'ideological', 'ideológico'],
  ['dogmatisch', 'dogmatic', 'dogmático'],
  ['orthodox', 'orthodox', 'ortodoxo'],
  ['heterodox', 'heterodox', 'heterodoxo'],
  ['progressiv', 'progressive', 'progresista'],
  ['konservativ', 'conservative', 'conservador'],
  ['liberal', 'liberal', 'liberal'],
  ['autoritär', 'authoritarian', 'autoritario'],
  ['totalitär', 'totalitarian', 'totalitario'],
  ['demokratisch', 'democratic', 'democrático'],
  ['oligarchisch', 'oligarchic', 'oligárquico'],
  ['meritokratisch', 'meritocratic', 'meritocrático'],
  ['egalitär', 'egalitarian', 'igualitario'],
  ['elitär', 'elitist', 'elitista'],
  ['populistisch', 'populist', 'populista'],
], 'b2')

const g46 = line('feelings', 'adj', [
  ['entspannt', 'relaxed', 'relajado'],
  ['frustriert', 'frustrated', 'frustrado'],
  ['motiviert', 'motivated', 'motivado'],
  ['demotiviert', 'demotivated', 'desmotivado'],
  ['überfordert', 'overwhelmed', 'abrumado'],
  ['zuversichtlich', 'confident', 'confiado'],
  ['empathisch', 'empathic', 'empático'],
  ['apatisch', 'apathetic', 'apático'],
  ['euphorisch', 'euphoric', 'eufórico'],
  ['resigniert', 'resigned', 'resignado'],
], 'b2')

const g47 = noun('feelings', [
  ['Misstrauen', 'distrust', 'desconfianza', 'das', ''],
  ['Respekt', 'respect', 'respeto', 'der', ''],
  ['Ehrgeiz', 'ambition', 'ambición', 'der', ''],
  ['Zufriedenheit', 'satisfaction', 'satisfacción', 'die', ''],
  ['Unzufriedenheit', 'dissatisfaction', 'insatisfacción', 'die', ''],
  ['Schuldgefühl', 'guilt', 'culpa', 'das', 'Schuldgefühle'],
  ['Belastbarkeit', 'resilience', 'resiliencia', 'die', ''],
  ['Empathie', 'empathy', 'empatía', 'die', 'Empathien'],
  ['Apathie', 'apathy', 'apatía', 'die', 'Apathien'],
  ['Euphorie', 'euphoria', 'euforia', 'die', 'Euphorien'],
], 'b2')

const g48 = line('feelings', 'verb', [
  ['sich sorgen', 'to worry', 'preocuparse'],
  ['sich freuen', 'to be glad', 'alegrarse'],
  ['sich ärgern', 'to get annoyed', 'enfadarse'],
  ['sich beruhigen', 'to calm down', 'calmarse'],
  ['sich konzentrieren', 'to concentrate', 'concentrarse'],
], 'b2')

const g49 = line('feelings', 'phrase', [
  ['Ich bin überfordert', 'I am overwhelmed', 'estoy abrumado'],
  ['Das macht mich nervös', 'that makes me nervous', 'eso me pone nervioso'],
  ['Ich fühle mich wohl', 'I feel comfortable', 'me siento bien'],
], 'b2')

const g50 = noun('jobs', [
  ['Beruf', 'profession', 'profesión', 'der', 'Berufe'],
  ['Karriere', 'career', 'carrera', 'die', 'Karrieren'],
  ['Bewerbung', 'job application', 'solicitud de empleo', 'die', 'Bewerbungen'],
  ['Lebenslauf', 'CV', 'currículum', 'der', 'Lebensläufe'],
  ['Vertrag', 'contract', 'contrato', 'der', 'Verträge'],
  ['Kündigung', 'notice of termination', 'baja', 'die', 'Kündigungen'],
  ['Überstunden', 'overtime', 'horas extra', 'die', ''],
  ['Probezeit', 'probation period', 'periodo de prueba', 'die', 'Probezeiten'],
  ['Vorgesetzter', 'supervisor', 'superior', 'der', 'Vorgesetzten'],
  ['Praktikum', 'internship', 'prácticas', 'das', 'Praktika'],
  ['Ausbildung', 'vocational training', 'formación profesional', 'die', 'Ausbildungen'],
  ['Weiterbildung', 'continuing education', 'formación continua', 'die', 'Weiterbildungen'],
  ['Berufserfahrung', 'work experience', 'experiencia laboral', 'die', ''],
  ['Arbeitslosigkeit', 'unemployment', 'desempleo', 'die', ''],
  ['Arbeitsmarkt', 'labor market', 'mercado laboral', 'der', 'Arbeitsmärkte'],
  ['Selbstständigkeit', 'self-employment', 'autónomos', 'die', ''],
  ['Remote-Arbeit', 'remote work', 'teletrabajo', 'die', ''],
  ['Führungskraft', 'executive', 'directivo', 'die', 'Führungskräfte'],
  ['Fachkraft', 'skilled worker', 'trabajador cualificado', 'die', 'Fachkräfte'],
], 'b2')

const g51 = noun('school', [
  ['Semester', 'semester', 'semestre', 'das', 'Semester'],
  ['Vorlesung', 'lecture', 'conferencia', 'die', 'Vorlesungen'],
  ['Seminar', 'seminar', 'seminario', 'das', 'Seminare'],
  ['Bachelorarbeit', 'bachelor thesis', 'tesis de grado', 'die', 'Bachelorarbeiten'],
  ['Professor', 'professor', 'profesor', 'der', 'Professoren'],
  ['Dozent', 'lecturer', 'docente', 'der', 'Dozenten'],
  ['Studiengang', 'degree program', 'plan de estudios', 'der', 'Studiengänge'],
  ['Fachbereich', 'department faculty', 'facultad', 'der', 'Fachbereiche'],
  ['Forschung', 'research', 'investigación', 'die', ''],
  ['Methode', 'method', 'método', 'die', 'Methoden'],
  ['Hypothese', 'hypothesis', 'hipótesis', 'die', 'Hypothesen'],
  ['Theorie', 'theory', 'teoría', 'die', 'Theorien'],
  ['Praxis', 'practice', 'práctica', 'die', 'Praxen'],
  ['Zulassung', 'admission', 'admisión', 'die', 'Zulassungen'],
  ['Prüfungsamt', 'exams office', 'oficina de exámenes', 'das', 'Prüfungsämter'],
  ['Notensystem', 'grading system', 'sistema de notas', 'das', 'Notensysteme'],
  ['Wissenslücke', 'knowledge gap', 'laguna de conocimiento', 'die', 'Wissenslücken'],
  ['Lernziel', 'learning objective', 'objetivo de aprendizaje', 'das', 'Lernziele'],
  ['Modul', 'module', 'módulo', 'das', 'Module'],
  ['Exposé', 'research exposé', 'exposé de investigación', 'das', 'Exposés'],
  ['Peer Group', 'peer group', 'grupo de pares', 'die', 'Peer Groups'],
  ['Fachtagung', 'specialist conference', 'congreso especializado', 'die', 'Fachtagungen'],
  ['Kolloquium', 'colloquium', 'coloquio académico', 'das', 'Kolloquien'],
  ['Quellenangabe', 'citation', 'cita bibliográfica', 'die', 'Quellenangaben'],
  ['Empirie', 'empirical research', 'empirismo aplicado', 'die', ''],
], 'b2')

const g52 = line('school', 'verb', [
  ['recherchieren', 'to research', 'investigar'],
  ['zitieren', 'to cite', 'citar'],
  ['paraphrasieren', 'to paraphrase', 'parafrasear'],
  ['absolvieren', 'to complete a course', 'completar'],
], 'b2')

const g53 = noun('office', [
  ['Agenda', 'agenda', 'orden del día', 'die', 'Agenden'],
  ['Verantwortung', 'responsibility', 'responsabilidad', 'die', 'Verantwortungen'],
  ['Zuständigkeit', 'competence area', 'competencia', 'die', 'Zuständigkeiten'],
  ['Genehmigung', 'approval', 'aprobación', 'die', 'Genehmigungen'],
  ['Stellungnahme', 'statement', 'posición oficial', 'die', 'Stellungnahmen'],
  ['Mitteilung', 'notice', 'comunicado', 'die', 'Mitteilungen'],
  ['Richtlinie', 'guideline', 'directriz', 'die', 'Richtlinien'],
  ['Verfahren', 'procedure', 'procedimiento', 'das', 'Verfahren'],
  ['Qualitätskontrolle', 'quality control', 'control de calidad', 'die', ''],
  ['Lieferant', 'supplier', 'proveedor', 'der', 'Lieferanten'],
  ['Nachfrage', 'demand', 'demanda', 'die', 'Nachfragen'],
  ['Strategie', 'strategy', 'estrategia', 'die', 'Strategien'],
  ['Meilenstein', 'milestone', 'hito', 'der', 'Meilensteine'],
  ['Organigramm', 'org chart', 'organigrama', 'das', 'Organigramme'],
  ['Prozesslandkarte', 'process map', 'mapa de procesos', 'die', 'Prozesslandkarten'],
  ['Kennzahl', 'KPI metric', 'indicador clave', 'die', 'Kennzahlen'],
  ['Scorecard', 'scorecard', 'cuadro de mando', 'die', 'Scorecards'],
  ['Change Request', 'change request', 'solicitud de cambio', 'der', 'Change Requests'],
  ['Entscheidungsvorlage', 'decision memo', 'memorando de decisión', 'die', 'Entscheidungsvorlagen'],
  ['Sachstandsbericht', 'status report', 'informe de situación', 'der', 'Sachstandsberichte'],
  ['Maßnahmenkatalog', 'catalog of measures', 'catálogo de medidas', 'der', 'Maßnahmenkataloge'],
  ['Zielvereinbarung', 'target agreement', 'acuerdo de objetivos', 'die', 'Zielvereinbarungen'],
  ['Leistungsbeurteilung', 'performance review', 'evaluación de desempeño', 'die', 'Leistungsbeurteilungen'],
  ['Hierarchie', 'hierarchy', 'jerarquía', 'die', 'Hierarchien'],
  ['Kompetenz', 'competence', 'competencia profesional', 'die', 'Kompetenzen'],
  ['Kapazität', 'capacity', 'capacidad', 'die', 'Kapazitäten'],
  ['Roadmap', 'roadmap', 'hoja de ruta', 'die', 'Roadmaps'],
], 'b2')

const g54 = line('office', 'phrase', [
  ['Wir setzen uns zusammen', 'we will meet to discuss', 'nos reuniremos'],
  ['Ich nehme das mit', 'I\'ll take that on', 'me encargo de eso'],
], 'b2')

const g55 = noun('money', [
  ['Gewinn', 'profit', 'beneficio', 'der', 'Gewinne'],
  ['Verlust', 'loss', 'pérdida', 'der', 'Verluste'],
  ['Kredit', 'loan', 'crédito', 'der', 'Kredite'],
  ['Kaution', 'deposit', 'fianza', 'die', 'Kautionen'],
  ['Marge', 'margin', 'margen', 'die', 'Margen'],
  ['Eigenkapital', 'equity capital', 'capital propio', 'das', ''],
  ['Fremdkapital', 'debt capital', 'capital ajeno', 'das', ''],
  ['Deflation', 'deflation', 'deflación', 'die', 'Deflationen'],
  ['Rendite', 'return on investment', 'rentabilidad', 'die', 'Renditen'],
  ['Aktie', 'share of stock', 'acción bursátil', 'die', 'Aktien'],
  ['Portfolio', 'investment portfolio', 'cartera de inversión', 'das', 'Portfolios'],
], 'b2')

const g56 = line('money', 'verb', [
  ['abrechnen', 'to bill', 'facturar'],
  ['verrechnen', 'to offset charges', 'compensar'],
], 'b2')

const g57 = noun('health', [
  ['Diagnose', 'diagnosis', 'diagnóstico', 'die', 'Diagnosen'],
  ['Therapie', 'therapy', 'terapia', 'die', 'Therapien'],
  ['Rehabilitation', 'rehabilitation', 'rehabilitación', 'die', ''],
  ['Nebenwirkung', 'side effect', 'efecto secundario', 'die', 'Nebenwirkungen'],
  ['Krankenversicherung', 'health insurance', 'seguro médico', 'die', 'Krankenversicherungen'],
  ['Ernährung', 'nutrition', 'nutrición', 'die', ''],
  ['Erschöpfung', 'exhaustion', 'agotamiento', 'die', ''],
  ['Vorsorgeuntersuchung', 'check-up', 'revisión preventiva', 'die', 'Vorsorgeuntersuchungen'],
  ['Chronifizierung', 'chronification', 'cronificación', 'die', 'Chronifizierungen'],
  ['Symptom', 'symptom', 'síntoma', 'das', 'Symptome'],
], 'b2')

const g58 = line('health', 'adj', [
  ['chronisch', 'chronic', 'crónico'],
  ['akut', 'acute', 'agudo'],
], 'b2')

const g59 = line('health', 'verb', [
  ['sich erholen', 'to recover', 'recuperarse'],
  ['sich behandeln lassen', 'to get treated', 'someterse a tratamiento'],
], 'b2')

const g60 = noun('nature', [
  ['Umwelt', 'environment', 'medio ambiente', 'die', 'Umwelten'],
  ['Klimawandel', 'climate change', 'cambio climático', 'der', ''],
  ['Artenvielfalt', 'biodiversity', 'biodiversidad', 'die', ''],
  ['Ökosystem', 'ecosystem', 'ecosistema', 'das', 'Ökosysteme'],
  ['Ressource', 'resource', 'recurso', 'die', 'Ressourcen'],
  ['Verschmutzung', 'pollution', 'contaminación', 'die', ''],
  ['Recycling', 'recycling', 'reciclaje', 'das', ''],
  ['Abfall', 'waste', 'residuo', 'der', 'Abfälle'],
  ['Energie', 'energy', 'energía', 'die', 'Energien'],
  ['Erneuerbare', 'renewable energy source', 'renovable', 'die', 'Erneuerbaren'],
  ['Schutzgebiet', 'protected area', 'área protegida', 'das', 'Schutzgebiete'],
  ['Treibhausgas', 'greenhouse gas', 'gas de efecto invernadero', 'das', 'Treibhausgase'],
  ['Emission', 'emission', 'emisión', 'die', 'Emissionen'],
  ['Fußabdruck', 'carbon footprint', 'huella ecológica', 'der', 'Fußabdrücke'],
  ['Erneuerbare Energie', 'renewable energy', 'energía renovable', 'die', 'Erneuerbaren Energien'],
], 'b2')

const g61 = line('nature', 'adj', [
  ['bio', 'organic', 'ecológico'],
], 'b2')

const g62 = line('nature', 'verb', [
  ['recyceln', 'to recycle', 'reciclar'],
], 'b2')

const g63 = noun('materials', [
  ['Aluminium', 'aluminum', 'aluminio', 'das', ''],
  ['Textil', 'textile', 'textil', 'das', 'Textilien'],
  ['Isolation', 'insulation', 'aislamiento', 'die', 'Isolationen'],
  ['Rohstoff', 'raw material', 'materia prima', 'der', 'Rohstoffe'],
  ['Verbundstoff', 'composite material', 'material compuesto', 'der', 'Verbundstoffe'],
], 'b2')

const g64 = line('materials', 'adj', [
  ['recycelbar', 'recyclable', 'reciclable'],
  ['biologisch abbaubar', 'biodegradable', 'biodegradable'],
], 'b2')

const g65 = noun('tech', [
  ['Software', 'software', 'software', 'die', ''],
  ['Hardware', 'hardware', 'hardware', 'die', ''],
  ['Netzwerk', 'network', 'red', 'das', 'Netzwerke'],
  ['Server', 'server', 'servidor', 'der', 'Server'],
  ['Datenbank', 'database', 'base de datos', 'die', 'Datenbanken'],
  ['Verschlüsselung', 'encryption', 'cifrado', 'die', 'Verschlüsselungen'],
  ['Benutzerkonto', 'user account', 'cuenta de usuario', 'das', 'Benutzerkonten'],
  ['Schnittstelle', 'interface', 'interfaz', 'die', 'Schnittstellen'],
  ['Update', 'update', 'actualización', 'das', 'Updates'],
  ['Middleware', 'middleware', 'middleware', 'die', ''],
  ['API', 'application interface', 'interfaz de aplicación', 'die', 'APIs'],
  ['SDK', 'software kit', 'kit de software', 'das', 'SDKs'],
  ['Datenschutz', 'data protection', 'protección de datos', 'der', ''],
], 'b2')

const g66 = line('tech', 'adj', [
  ['digital', 'digital', 'digital'],
  ['automatisch', 'automatic', 'automático'],
], 'b2')

const g67 = noun('travel', [
  ['Grenzkontrolle', 'border control', 'control fronterizo', 'die', 'Grenzkontrollen'],
  ['Anschlussflug', 'connecting flight', 'vuelo de conexión', 'der', 'Anschlussflüge'],
], 'b2')

const g68 = line('travel', 'verb', [
  ['umbuchen', 'to rebook', 'reprogramar'],
], 'b2')

const g69 = noun('hobbies', [
  ['Workshop', 'workshop', 'taller', 'der', 'Workshops'],
], 'b2')

const g70 = line('hobbies', 'verb', [
  ['sich engagieren', 'to get involved', 'comprometerse'],
], 'b2')

const g71 = noun('city', [
  ['Infrastruktur', 'infrastructure', 'infraestructura', 'die', 'Infrastrukturen'],
  ['Wohnungsmarkt', 'housing market', 'mercado inmobiliario', 'der', 'Wohnungsmärkte'],
], 'b2')

const g72 = noun('transport', [
  ['ÖPNV', 'public transport', 'transporte público', 'der', ''],
], 'b2')

const g73 = noun('weather', [
  ['Unwetter', 'severe weather', 'temporal', 'das', 'Unwetter'],
], 'b2')

const g74 = line('time', 'other', [
  ['mittelfristig', 'medium-term', 'a medio plazo'],
  ['langfristig', 'long-term', 'a largo plazo'],
], 'b2')

const g75 = line('hello', 'phrase', [
  ['im Grunde genommen', 'basically', 'en el fondo'],
  ['aller Wahrscheinlichkeit nach', 'most likely', 'con toda probabilidad'],
  ['unter Berücksichtigung von', 'taking into account', 'teniendo en cuenta'],
  ['in diesem Zusammenhang', 'in this context', 'en este contexto'],
  ['mit anderen Worten', 'in other words', 'en otras palabras'],
  ['Vielen Dank im Voraus', 'thanks in advance', 'gracias de antemano'],
  ['Ungeachtet dessen', 'notwithstanding that', 'no obstante ello'],
  ['Dessen ungeachtet', 'regardless of that', 'a pesar de ello'],
  ['Nichtsdestotrotz', 'nevertheless still', 'no obstante aún así'],
  ['Nichtsdestoweniger', 'nonetheless', 'no obstante'],
], 'b2')

const g76 = line('office', 'other', [
  ['bzw.', 'respectively', 'respectivamente'],
  ['d. h.', 'that is', 'es decir'],
  ['u. a.', 'among others', 'entre otros'],
  ['inkl.', 'incl.', 'incl.'],
  ['zzgl.', 'plus', 'más'],
  ['max.', 'maximum', 'máx.'],
  ['min.', 'minimum', 'mín.'],
], 'b2')

const g77 = noun('tools', [
  ['Messgerät', 'measuring device', 'aparato de medición', 'das', 'Messgeräte'],
], 'b2')

const g78 = line('sport', 'verb', [
  ['trainieren', 'to train', 'entrenar'],
], 'b2')

const g79 = noun('sport', [
  ['Ausdauer', 'endurance', 'resistencia', 'die', ''],
], 'b2')

const g80 = noun('house', [
  ['Smart Home', 'smart home', 'casa inteligente', 'das', 'Smart Homes'],
], 'b2')

const g81 = noun('furniture', [
  ['Steckdosenleiste', 'power strip', 'regleta', 'die', 'Steckdosenleisten'],
], 'b2')

const g82 = noun('food', [
  ['Nahrungsmittel', 'foodstuff', 'alimento', 'das', 'Nahrungsmittel'],
], 'b2')

const g83 = noun('drinks', [
  ['Koffeinkonsum', 'caffeine intake', 'consumo de cafeína', 'der', ''],
], 'b2')

const g84 = noun('family', [
  ['Work-Life-Balance', 'work-life balance', 'equilibrio vida-trabajo', 'die', ''],
], 'b2')

const g85 = noun('clothes', [
  ['Businesskleidung', 'business attire', 'ropa de negocios', 'die', ''],
], 'b2')

const g86 = noun('animals', [
  ['Wildtier', 'wild animal', 'animal salvaje', 'das', 'Wildtiere'],
], 'b2')

const g87 = noun('shapes', [
  ['Diagramm', 'chart', 'diagrama', 'das', 'Diagramme'],
], 'b2')

const g88 = line('colors', 'adj', [
  ['dezent', 'subtle in color', 'discreto'],
], 'b2')

const g89 = noun('lands', [
  ['Entwicklungsland', 'developing country', 'país en desarrollo', 'das', 'Entwicklungsländer'],
], 'b2')

const g90 = noun('bath', [
  ['Pflegeprodukt', 'care product', 'producto de cuidado', 'das', 'Pflegeprodukte'],
], 'b2')

const g91 = line('health', 'adj', [
  ['impfberatend', 'vaccination-advisory', 'de asesoría de vacunas'],
], 'b1')

const g92 = line('travel', 'phrase', [
  ['Ich habe mich verlaufen', 'I got lost walking', 'me he perdido andando'],
], 'b1')

const g93 = line('shop', 'verb', [
  ['nachbestellen', 'to reorder stock', 'volver a pedir'],
], 'b1')

const g94 = noun('feelings', [
  ['Herzklopfen', 'heart flutter feeling', 'palpitación emocional', 'das', ''],
], 'b1')

const g95 = line('school', 'other', [
  ['ebd.', 'ibid. (ebd.)', 'íd. (ebd.)'],
], 'b1')

const g96 = noun('body', [
  ['Lymphknoten', 'lymph node', 'ganglio linfático', 'der', 'Lymphknoten'],
  ['Band', 'ligament', 'ligamento', 'das', 'Bänder'],
  ['Knorpel', 'cartilage', 'cartílago', 'der', 'Knorpel'],
  ['Gelenkschmiere', 'synovial fluid', 'líquido sinovial', 'die', ''],
], 'b2')

export const PART_F: Draft[] = [
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
