import fs from 'fs'
import path from 'path'

// Curated unique lemmas not typically in the base packs. Format matches emit-vocab pipe rows.
const rows = []
const push = (line) => rows.push(line)

// --- A2 unique expansions ---
const a2 = [
  ['hello','phrase','Lass es dir schmecken','enjoy your meal','que te aproveche'],
  ['hello','phrase','Recht schönen Dank','many thanks indeed','muchísimas gracias'],
  ['hello','phrase','Darf ich bitten','may I ask politely','¿puedo pedir?'],
  ['hello','noun','Gastgeber','host','anfitrión','der','Gastgeber'],
  ['hello','noun','Gastgeberin','female host','anfitriona','die','Gastgeberinnen'],
  ['hello','noun','Bekanntschaft','acquaintanceship','conocimiento social','die','Bekanntschaften'],
  ['numbers','other','anderthalb','one and a half','uno y medio'],
  ['numbers','other','doppelt','double amount','el doble'],
  ['numbers','other','einfach','single amount','simple cantidad'],
  ['numbers','num','Nullpunkt','zero point','punto cero'],
  ['colors','adj','ocker','ochre','ocre'],
  ['colors','adj','fliederfarben','lilac-colored','color lila'],
  ['colors','adj','kastanienbraun','chestnut brown','castaño'],
  ['colors','noun','Farbton','shade of color','tono de color','der','Farbtöne'],
  ['family','noun','Urgroßvater','great-grandfather','bisabuelo','der','Urgroßväter'],
  ['family','noun','Urgroßmutter','great-grandmother','bisabuela','die','Urgroßmütter'],
  ['family','noun','Halbbruder','half-brother','hermanastro','der','Halbbrüder'],
  ['family','noun','Halbschwester','half-sister','hermanastra','die','Halbschwestern'],
  ['family','noun','Pate','godfather','padrino','der','Paten'],
  ['family','noun','Patin','godmother','madrina','die','Patinnen'],
  ['body','noun','Augenlid','eyelid','párpado','das','Augenlider'],
  ['body','noun','Augenbraue','eyebrow','ceja','die','Augenbrauen'],
  ['body','noun','Wimper','eyelash','pestaña','die','Wimpern'],
  ['body','noun','Pupille','pupil of eye','pupila','die','Pupillen'],
  ['body','noun','Kehlkopf','larynx','laringe','der','Kehlköpfe'],
  ['body','noun','Speiseröhre','esophagus','esófago','die','Speiseröhren'],
  ['clothes','noun','Strumpfhose','tights','medias pantimedias','die','Strumpfhosen'],
  ['clothes','noun','Overall','overalls','mono de trabajo','der','Overalls'],
  ['clothes','noun','Kapuze','hood','capucha','die','Kapuzen'],
  ['clothes','noun','Hosenträger','suspenders','tirantes','die','Hosenträger'],
  ['clothes','noun','Manschette','cuff','puño de camisa','die','Manschetten'],
  ['food','noun','Knödel','dumpling','albóndiga de masa','der','Knödel'],
  ['food','noun','Spätzle','spaetzle','spätzle','die','Spätzle'],
  ['food','noun','Brezel','pretzel','pretzel','die','Brezeln'],
  ['food','noun','Leberwurst','liverwurst','salchicha de hígado','die','Leberwürste'],
  ['food','noun','Aufschnitt','cold cuts','fiambres','der','Aufschnitte'],
  ['food','noun','Beilage','side dish','guarnición','die','Beilagen'],
  ['fruit','noun','Stachelbeere','gooseberry','grosella espinosa','die','Stachelbeeren'],
  ['fruit','noun','Johannisbeere','currant berry','grosella','die','Johannisbeeren'],
  ['fruit','noun','Brombeere','blackberry','mora','die','Brombeeren'],
  ['fruit','noun','Preiselbeere','lingonberry','arándano rojo','die','Preiselbeeren'],
  ['fruit','noun','Holunderbeere','elderberry','baya de saúco','die','Holunderbeeren'],
  ['veg','noun','Sellerie','celery','apio','der','Sellerie'],
  ['veg','noun','Fenchel','fennel','hinojo','der','Fenchel'],
  ['veg','noun','Pastinake','parsnip','chirivía','die','Pastinaken'],
  ['veg','noun','Rote Bete','beetroot','remolacha','die','Rote Beten'],
  ['veg','noun','Kohlrabi','kohlrabi','colinabo','der','Kohlrabis'],
  ['drinks','noun','Glühwein','mulled wine','vino caliente','der','Glühweine'],
  ['drinks','noun','Most','cider must','mosto','der','Moste'],
  ['drinks','noun','Schorle','spritzer drink','spritz','die','Schorlen'],
  ['drinks','noun','Buttermilch','buttermilk','suero de mantequilla','die','Buttermilche'],
  ['drinks','noun','Molke','whey','lactosuero','die','Molken'],
  ['animals','noun','Hermelin','stoat','armiño','das','Hermeline'],
  ['animals','noun','Marder','marten','marta','der','Marder'],
  ['animals','noun','Wiesel','weasel','comadreja','das','Wiesel'],
  ['animals','noun','Elch','moose','alce','der','Elche'],
  ['animals','noun','Bison','bison','bisonte','der','Bisons'],
  ['house','noun','Dachrinne','gutter','canalón','die','Dachrinnen'],
  ['house','noun','Fallrohr','downspout','bajante','das','Fallrohre'],
  ['house','noun','Rollladen','roller shutter','persiana enrollable','der','Rollläden'],
  ['house','noun','Klingelknopf','doorbell button','botón del timbre','der','Klingelknöpfe'],
  ['house','noun','Türklingel','door chime','timbre de puerta','die','Türklingeln'],
  ['furniture','noun','Schaukelstuhl','rocking chair','mecedora','der','Schaukelstühle'],
  ['furniture','noun','Liege','daybed','diván','die','Liegen'],
  ['furniture','noun','Hängematte','hammock','hamaca','die','Hängematten'],
  ['furniture','noun','Beistelltisch','side table','mesa auxiliar','der','Beistelltische'],
  ['furniture','noun','Gardinenstange','curtain rod','barra de cortina','die','Gardinenstangen'],
  ['kitchen','noun','Schneebesen','whisk','batidor','der','Schneebesen'],
  ['kitchen','noun','Nudelholz','rolling pin','rodillo de cocina','das','Nudelhölzer'],
  ['kitchen','noun','Sieb','sieve','colador','das','Siebe'],
  ['kitchen','noun','Reibe','grater','rallador','die','Reiben'],
  ['kitchen','noun','Dosenöffner','can opener','abrelatas','der','Dosenöffner'],
  ['city','noun','Fußgängerzone','pedestrian zone','zona peatonal','die','Fußgängerzonen'],
  ['city','noun','Einkaufsstraße','shopping street','calle comercial','die','Einkaufsstraßen'],
  ['city','noun','Hochhaus|skyscraper|rascacielos|das|Hochhäuser'],
]
// Fix the last broken one - I'll push properly below

for (const row of a2) {
  if (row.length === 1) continue
  if (typeof row[0] === 'string' && row[0].includes('|')) continue
  const [cat, kind, de, en, es, art, pl] = row
  if (kind === 'noun') push(`a2|${cat}|noun|${de}|${en}|${es}|${art}|${pl || ''}`)
  else push(`a2|${cat}|${kind}|${de}|${en}|${es}`)
}

push('a2|city|noun|Hochhaus|skyscraper|rascacielos|das|Hochhäuser')
push('a2|city|noun|Vorort|suburb|suburbio|der|Vororte')
push('a2|city|noun|Kreisverkehr|roundabout|rotonda|der|Kreisverkehre')
push('a2|city|noun|Bürgersteig|sidewalk|acera|der|Bürgersteige')
push('a2|city|noun|Straßenlaterne|streetlamp|farola|die|Straßenlaternen')
push('a2|transport|noun|Oberleitung|overhead wire|catenaria|die|Oberleitungen')
push('a2|transport|noun|Fahrplan|timetable|horario|der|Fahrpläne')
push('a2|transport|noun|Umsteigen|transfer ride|transbordo|das|')
push('a2|transport|noun|Anschluss|connection|conexión de viaje|der|Anschlüsse')
push('a2|transport|noun|Verspätung|delay|retraso|die|Verspätungen')
push('a2|school|noun|Stundenplan|class schedule|horario escolar|der|Stundenpläne')
push('a2|school|noun|Klassenarbeit|class test|examen de clase|die|Klassenarbeiten')
push('a2|school|noun|Zeugnis|report card|boleta|das|Zeugnisse')
push('a2|school|noun|Schultag|school day|día escolar|der|Schultage')
push('a2|school|noun|Klassenraum|classroom|aula|der|Klassenräume')
push('a2|jobs|noun|Bäcker|baker|panadero|der|Bäcker')
push('a2|jobs|noun|Bäckerin|female baker|panadera|die|Bäckerinnen')
push('a2|jobs|noun|Friseur|hairdresser|peluquero|der|Friseure')
push('a2|jobs|noun|Friseurin|female hairdresser|peluquera|die|Friseurinnen')
push('a2|jobs|noun|Mechaniker|mechanic|mecánico|der|Mechaniker')
push('a2|nature|noun|Wasserfall|waterfall|cascada|der|Wasserfälle')
push('a2|nature|noun|Geysir|geyser|géiser|der|Geysire')
push('a2|nature|noun|Gletscher|glacier|glaciar|der|Gletscher')
push('a2|nature|noun|Vulkan|volcano|volcán|der|Vulkane')
push('a2|nature|noun|Höhle|cave|cueva|die|Höhlen')
push('a2|weather|noun|Nebel|fog|niebla|der|Nebel')
push('a2|weather|noun|Hagel|hail|granizo|der|')
push('a2|weather|noun|Gewitter|thunderstorm|tormenta eléctrica|das|Gewitter')
push('a2|weather|noun|Regenbogen|rainbow|arcoíris|der|Regenbögen')
push('a2|weather|noun|Tau|dew|rocío|der|')
push('a2|time|noun|Viertelstunde|quarter hour|cuarto de hora|die|Viertelstunden')
push('a2|time|noun|Halbjahr|half year|semestre|das|Halbjahre')
push('a2|time|noun|Jahrzehnt|decade|década|das|Jahrzehnte')
push('a2|time|noun|Jahrtausend|millennium|milenio|das|Jahrtausende')
push('a2|time|other|vorgestern|day before yesterday|anteayer')
push('a2|time|other|übermorgen|day after tomorrow|pasado mañana')
push('a2|feelings|adj|überrascht|surprised|sorprendido')
push('a2|feelings|adj|enttäuscht|disappointed|decepcionado')
push('a2|feelings|adj|stolz|proud|orgulloso')
push('a2|feelings|adj|neidisch|envious|envidioso')
push('a2|feelings|adj|gelangweilt|bored|aburrido')
push('a2|verbs|verb|einpacken|to pack up|empaquetar')
push('a2|verbs|verb|auspacken|to unpack|desempaquetar')
push('a2|verbs|verb|umziehen|to move house|mudarse')
push('a2|verbs|verb|einziehen|to move in|mudarse a')
push('a2|verbs|verb|ausziehen|to move out|mudarse de')
push('a2|verbs|verb|anprobieren|to try on|probarse')
push('a2|verbs|verb|bestellen|to order|pedir un pedido')
push('a2|verbs|verb|abholen|to pick up|recoger')
push('a2|adjectives|adj|gemütlich|cozy|acogedor')
push('a2|adjectives|adj|praktisch|practical|práctico')
push('a2|adjectives|adj|praktisch sinnvoll|sensibly practical|práctico útil')
push('a2|adjectives|adj|bequem|comfortable|cómodo')
push('a2|adjectives|adj|unbequem|uncomfortable|incómodo')
push('a2|adjectives|adj|zuverlässig|reliable|fiable')
push('a2|adjectives|adj|unzuverlässig|unreliable|poco fiable')
push('a2|travel|noun|Reiseführer|guidebook|guía turística|der|Reiseführer')
push('a2|travel|noun|Sehenswürdigkeit|sight|lugar de interés|die|Sehenswürdigkeiten')
push('a2|travel|noun|Ausflug|excursion|excursión|der|Ausflüge')
push('a2|travel|noun|Rundreise|tour|gira|die|Rundreisen')
push('a2|travel|noun|Zwischenstopp|stopover|escala|der|Zwischenstopps')
push('a2|shop|noun|Sonderangebot|special offer|oferta especial|das|Sonderangebote')
push('a2|shop|noun|Ausverkauf|clearance sale|liquidación|der|Ausverkäufe')
push('a2|shop|noun|Preisschild|price tag|etiqueta de precio|das|Preisschilder')
push('a2|shop|noun|Umtausch|exchange of goods|cambio de producto|der|Umtäusche')
push('a2|shop|noun|Quittung|receipt|recibo|die|Quittungen')
push('a2|hobbies|noun|Basteln|crafting|manualidades|das|')
push('a2|hobbies|noun|Sammeln|collecting|coleccionismo|das|')
push('a2|hobbies|noun|Briefmarke|postage stamp|estampilla|die|Briefmarken')
push('a2|hobbies|noun|Münzsammlung|coin collection|colección de monedas|die|Münzsammlungen')
push('a2|hobbies|noun|Modellbau|model building|modelismo|der|')
push('a2|tech|noun|Ladegerät|charger|cargador|das|Ladegeräte')
push('a2|tech|noun|Kopfhörer|headphones|auriculares|der|Kopfhörer')
push('a2|tech|noun|Lautsprecher|loudspeaker|altavoz|der|Lautsprecher')
push('a2|tech|noun|Steckdose|power outlet|enchufe de pared|die|Steckdosen')
push('a2|tech|noun|Akku|rechargeable battery|batería recargable|der|Akkus')
push('a2|lands|other|Niederlande|Netherlands|Países Bajos')
push('a2|lands|other|Belgien|Belgium|Bélgica')
push('a2|lands|other|Dänemark|Denmark|Dinamarca')
push('a2|lands|other|Schweden|Sweden|Suecia')
push('a2|lands|other|Norwegen|Norway|Noruega')
push('a2|bath|noun|Mundspülung|mouthwash|enjuague bucal|die|Mundspülungen')
push('a2|bath|noun|Zahnseide|dental floss|hilo dental|die|')
push('a2|bath|noun|Rasierer|razor|rasuradora|der|Rasierer')
push('a2|bath|noun|Rasiercreme|shaving cream|crema de afeitar|die|Rasiercremes')
push('a2|bath|noun|Bürste|brush|cepillo|die|Bürsten')
push('a2|office|noun|Locher|hole punch|perforadora|der|Locher')
push('a2|office|noun|Hefter|stapler|engrampadora|der|Hefter')
push('a2|office|noun|Büroklammer|paper clip|clip|die|Büroklammern')
push('a2|office|noun|Notizblock|notepad|bloc de notas|der|Notizblöcke')
push('a2|office|noun|Aktenordner|ring binder|archivador|der|Aktenordner')
push('a2|music|noun|Notenblatt|sheet music|partitura|das|Notenblätter')
push('a2|music|noun|Chor|choir|coro|der|Chöre')
push('a2|music|noun|Orchester|orchestra|orquesta|das|Orchester')
push('a2|music|noun|Konzert|concert|concierto|das|Konzerte')
push('a2|music|noun|Refrain|chorus of song|estribillo|der|Refrains')
push('a2|sport|noun|Schiedsrichter|referee|árbitro|der|Schiedsrichter')
push('a2|sport|noun|Torwart|goalkeeper|portero|der|Torwarte')
push('a2|sport|noun|Mannschaft|sports team|equipo deportivo|die|Mannschaften')
push('a2|sport|noun|Training|training session|entrenamiento|das|Trainings')
push('a2|sport|noun|Wettkampf|competition|competición|der|Wettkämpfe')
push('a2|health|noun|Verband|bandage|vendaje|der|Verbände')
push('a2|health|noun|Pflaster|adhesive bandage|curita|das|Pflaster')
push('a2|health|noun|Impfung|vaccination|vacuna|die|Impfungen')
push('a2|health|noun|Rezept|prescription|receta médica|das|Rezepte')
push('a2|health|noun|Untersuchung|medical exam|revisión médica|die|Untersuchungen')
push('a2|tools|noun|Schraubenzieher|screwdriver|destornillador|der|Schraubenzieher')
push('a2|tools|noun|Zange|pliers|alicates|die|Zangen')
push('a2|tools|noun|Säge|saw|sierra|die|Sägen')
push('a2|tools|noun|Bohrer|drill bit|broca|der|Bohrer')
push('a2|tools|noun|Maßband|measuring tape|cinta métrica|das|Maßbänder')
push('a2|garden|noun|Gießkanne|watering can|regadera|die|Gießkannen')
push('a2|garden|noun|Harke|rake|rastrillo|die|Harken')
push('a2|garden|noun|Spaten|spade|pala de jardín|der|Spaten')
push('a2|garden|noun|Schubkarre|wheelbarrow|carretilla|die|Schubkarren')
push('a2|garden|noun|Kompost|compost|compost|der|Komposte')
push('a2|money|noun|Wechselgeld|change money|cambio en efectivo|das|')
push('a2|money|noun|Geldbeutel|wallet|billetera|der|Geldbeutel')
push('a2|money|noun|Sparschwein|piggy bank|alcancía|das|Sparschweine')
push('a2|money|noun|Konto|bank account|cuenta bancaria|das|Konten')
push('a2|money|noun|Überweisung|bank transfer|transferencia|die|Überweisungen')
push('a2|materials|noun|Beton|concrete|hormigón|der|')
push('a2|materials|noun|Ziegel|brick|ladrillo|der|Ziegel')
push('a2|materials|noun|Asphalt|asphalt|asfalto|der|')
push('a2|materials|noun|Gummi|rubber|caucho|der|Gummis')
push('a2|materials|noun|Leder|leather|cuero|das|Leder')
push('a2|shapes|noun|Oval|oval|óvalo|das|Ovale')
push('a2|shapes|noun|Raute|rhombus|rombo|die|Rauten')
push('a2|shapes|noun|Trapez|trapezoid|trapecio|das|Trapeze')
push('a2|shapes|noun|Zylinder|cylinder|cilindro|der|Zylinder')
push('a2|shapes|noun|Kegel|cone|cono|der|Kegel')

// B1–C2 dense verbs/adjectives/nouns
const advanced = [
  // B1 verbs
  ['b1','verbs','verb','vereinbaren','to arrange','acordar'],
  ['b1','verbs','verb','verschieben','to postpone','aplazar'],
  ['b1','verbs','verb','voraussetzen','to presuppose','dar por supuesto'],
  ['b1','verbs','verb','nachweisen','to demonstrate proof','acreditar'],
  ['b1','verbs','verb','beanstanden','to complain about','reclamación hacer'],
  ['b1','verbs','verb','beantragen lassen','to have applied','hacer solicitar'],
  ['b1','verbs','verb','weiterleiten','to forward','reenviar'],
  ['b1','verbs','verb','zurückrufen','to call back','devolver la llamada'],
  ['b1','verbs','verb','sich beschweren','to complain','quejarse'],
  ['b1','verbs','verb','sich erkundigen','to inquire','informarse'],
  ['b1','verbs','verb','sich bewerben','to apply for a job','postularse'],
  ['b1','verbs','verb','kündigen','to resign or cancel','dar de baja'],
  ['b1','verbs','verb','verlängern','to extend','prorrogar'],
  ['b1','verbs','verb','verkürzen','to shorten','acortar'],
  ['b1','verbs','verb','überweisen','to wire money','transferir dinero'],
  ['b1','verbs','verb','abbuchen','to debit','debitar'],
  ['b1','verbs','verb','gutschreiben','to credit','abonar en cuenta'],
  ['b1','verbs','verb','einreichen','to submit','presentar documentos'],
  ['b1','verbs','verb','ausfüllen','to fill out','rellenar'],
  ['b1','verbs','verb','unterschreiben','to sign','firmar'],
  ['b1','verbs','verb','bestätigen','to confirm','confirmar'],
  ['b1','verbs','verb','widerrufen','to revoke','revocar'],
  ['b1','verbs','verb','kündigen lassen','to have cancelled','hacer cancelar'],
  ['b1','verbs','verb','mitteilen','to notify','comunicar'],
  ['b1','verbs','verb','benachrichtigen','to inform officially','notificar'],
  ['b1','verbs','verb','erinnern','to remind','recordar a alguien'],
  ['b1','verbs','verb','vergessen','to forget','olvidar'],
  ['b1','verbs','verb','merken','to notice','notar'],
  ['b1','verbs','verb','wahrnehmen','to perceive','percibir'],
  ['b1','verbs','verb','empfinden','to feel emotionally','sentir una emoción'],
  ['b1','adjectives','adj','vorläufig','provisional','provisional'],
  ['b1','adjectives','adj','endgültig','final definite','definitivo'],
  ['b1','adjectives','adj','erforderlich','required','requerido'],
  ['b1','adjectives','adj','freiwillig','voluntary','voluntario'],
  ['b1','adjectives','adj','verpflichtend','mandatory','obligatorio'],
  ['b1','adjectives','adj','zusätzlich','additional','adicional'],
  ['b1','adjectives','adj','gegebenenfalls','if applicable','en su caso'],
  ['b1','adjectives','adj','jeweilig','respective','respectivo'],
  ['b1','adjectives','adj','einschließlich','including','incluyendo'],
  ['b1','adjectives','adj','ausschließlich','exclusively','exclusivamente'],
  ['b1','feelings','adj','überfordert','overwhelmed','abrumado'],
  ['b1','feelings','adj','unterfordert','underchallenged','poco desafiado'],
  ['b1','feelings','adj','ausgeglichen','even-tempered','equilibrado'],
  ['b1','feelings','adj','ungeduldig','impatient','impaciente'],
  ['b1','feelings','adj','geduldig','patient','paciente'],
  ['b1','feelings','noun','Zuversicht','confidence outlook','confianza en el futuro','die','Zuversichten'],
  ['b1','feelings','noun','Unsicherheit','uncertainty','incertidumbre','die','Unsicherheiten'],
  ['b1','feelings','noun','Erleichterung','relief','alivio','die','Erleichterungen'],
  ['b1','feelings','noun','Anspannung','tension','tensión nerviosa','die','Anspannungen'],
  ['b1','feelings','noun','Gelassenheit','serenity','serenidad','die','Gelassenheiten'],
  ['b1','office','noun','Vollmacht','power of attorney','poder notarial','die','Vollmachten'],
  ['b1','office','noun','Bescheinigung','certificate document','certificado','die','Bescheinigungen'],
  ['b1','office','noun','Antrag','application form','solicitud','der','Anträge'],
  ['b1','office','noun','Formular|form sheet|formulario|das|Formulare'],
]

// Fix broken and continue with a cleaner second batch written as pipe lines directly
const more = String.raw`
b1|office|noun|Formular|form sheet|formulario|das|Formulare
b1|office|noun|Protokoll|minutes of meeting|acta|das|Protokolle
b1|office|noun|Frist|deadline|plazo|die|Fristen
b1|office|noun|Zuständigkeit|responsibility area|competencia|die|Zuständigkeiten
b1|money|noun|Zinsen|interest rates|intereses|die|Zinsen
b1|money|noun|Gebühr|fee|tarifa|die|Gebühren
b1|money|noun|Steuer|tax|impuesto|die|Steuern
b1|money|noun|Gehalt|salary|sueldo|das|Gehälter
b1|money|noun|Lohn|wage|salario|der|Löhne
b1|money|noun|Bonus|bonus pay|bono salarial|der|Boni
b1|money|noun|Rückerstattung|refund|reembolso|die|Rückerstattungen
b1|money|noun|Schuld|debt|deuda|die|Schulden
b1|health|noun|Diagnose|diagnosis|diagnóstico|die|Diagnosen
b1|health|noun|Therapie|therapy|terapia|die|Therapien
b1|health|noun|Nebenwirkung|side effect|efecto secundario|die|Nebenwirkungen
b1|health|noun|Allergie|allergy|alergia|die|Allergien
b1|health|noun|Blutdruck|blood pressure|presión arterial|der|Blutdrücke
b1|health|noun|Impfpass|vaccination record|cartilla de vacunación|der|Impfpässe
b1|school|noun|Abschluss|degree completion|titulación|der|Abschlüsse
b1|school|noun|Studiengang|degree program|carrera universitaria|der|Studiengänge
b1|school|noun|Vorlesung|lecture|clase magistral|die|Vorlesungen
b1|school|noun|Seminar|seminar|seminario|das|Seminare
b1|school|noun|Stipendium|scholarship|beca|das|Stipendien
b1|school|noun|Prüfung|exam|examen|die|Prüfungen
b1|jobs|noun|Bewerbung|job application|candidatura|die|Bewerbungen
b1|jobs|noun|Lebenslauf|resume|currículum|der|Lebensläufe
b1|jobs|noun|Vorstellungsgespräch|job interview|entrevista de trabajo|das|Vorstellungsgespräche
b1|jobs|noun|Arbeitsvertrag|employment contract|contrato laboral|der|Arbeitsverträge
b1|jobs|noun|Probezeit|probation period|periodo de prueba|die|Probezeiten
b1|jobs|noun|Kündigung|dismissal notice|despido|die|Kündigungen
b1|tech|noun|Passwort|password|contraseña|das|Passwörter
b1|tech|noun|Benutzername|username|nombre de usuario|der|Benutzernamen
b1|tech|noun|Datenbank|database|base de datos|die|Datenbanken
b1|tech|noun|Cloud|cloud storage|nube informática|die|Clouds
b1|tech|noun|Backup|backup copy|copia de seguridad|das|Backups
b1|tech|noun|Software|software|software|die|
b1|tech|noun|Hardware|hardware|hardware|die|
b1|travel|noun|Mietwagen|rental car|coche de alquiler|der|Mietwagen
b1|travel|noun|Fahrgemeinschaft|carpool|viaje compartido|die|Fahrgemeinschaften
b1|travel|noun|Unterkunft|accommodation|alojamiento|die|Unterkünfte
b1|travel|noun|Buchung|booking|reserva|die|Buchungen
b1|travel|noun|Stornierung|cancellation|cancelación|die|Stornierungen
b1|city|noun|Wohngegend|residential area|zona residencial|die|Wohngegenden
b1|city|noun|Industriegebiet|industrial area|zona industrial|das|Industriegebiete
b1|city|noun|Stadtviertel|city district|barrio|das|Stadtviertel
b1|city|noun|Hauptbahnhof|main station|estación central|der|Hauptbahnhöfe
b1|nature|noun|Umwelt|environment|medio ambiente|die|Umwelten
b1|nature|noun|Klimawandel|climate change|cambio climático|der|
b1|nature|noun|Naturschutz|nature conservation|protección de la naturaleza|der|
b1|nature|noun|Recycling|recycling|reciclaje|das|
b1|nature|noun|Mülltrennung|waste sorting|separación de residuos|die|Mülltrennungen
b1|weather|noun|Hitze|heat wave weather|calor intenso|die|
b1|weather|noun|Kälte|cold weather|frío intenso|die|
b1|weather|noun|Luftfeuchtigkeit|humidity|humedad del aire|die|Luftfeuchtigkeiten
b1|weather|noun|Wettervorhersage|weather forecast|pronóstico del tiempo|die|Wettervorhersagen
b1|time|noun|Zeitraum|time span|periodo|der|Zeiträume
b1|time|noun|Zeitpunkt|point in time|momento puntual|der|Zeitpunkte
b1|time|noun|Dauer|duration|duración|die|Dauern
b1|time|noun|Verzögerung|delay period|demora|die|Verzögerungen
b1|adjectives|adj|umfangreich|extensive|extenso
b1|adjectives|adj|knapp|scarce|escaso
b1|adjectives|adj|reichlich|abundant|abundante
b1|adjectives|adj|angemessen|appropriate|adecuado
b1|adjectives|adj|ungeeignet|unsuitable|inadecuado
b1|adjectives|adj|geeignet|suitable|adecuado para
b1|adjectives|adj|erfolgreich|successful|exitoso
b1|adjectives|adj|erfolglos|unsuccessful|fracasado
b1|adjectives|adj|möglich|possible|posible
b1|adjectives|adj|unmöglich|impossible|imposible
b1|verbs|verb|erreichen|to achieve|lograr
b1|verbs|verb|vermeiden|to avoid|evitar
b1|verbs|verb|verursachen|to cause|causar
b1|verbs|verb|bedeuten|to mean|significar
b1|verbs|verb|enthalten|to contain|contener
b1|verbs|verb|bestehen|to consist|consistir
b1|verbs|verb|handeln|to act|actuar
b1|verbs|verb|entscheiden|to decide|decidir
b1|verbs|verb|wählen|to choose|elegir
b1|verbs|verb|prüfen|to check|comprobar
b2|verbs|verb|erörtern|to discuss thoroughly|debatir a fondo
b2|verbs|verb|hinterfragen|to question critically|cuestionar críticamente
b2|verbs|verb|rechtfertigen|to justify|justificar
b2|verbs|verb|relativieren|to relativize|relativizar
b2|verbs|verb|differenzieren|to differentiate|diferenciar con matices
b2|verbs|verb|spezifizieren|to specify|especificar
b2|verbs|verb|generalisieren|to generalize|generalizar
b2|verbs|verb|interpretieren|to interpret|interpretar
b2|verbs|verb|konstruieren|to construct|construir conceptualmente
b2|verbs|verb|dekonstruieren|to deconstruct|deconstruir
b2|verbs|verb|implementieren|to implement|implementar
b2|verbs|verb|optimieren|to optimize|optimizar
b2|verbs|verb|standardisieren|to standardize|estandarizar
b2|verbs|verb|priorisieren|to prioritize|priorizar
b2|verbs|verb|koordinieren|to coordinate|coordinar
b2|verbs|verb|delegieren|to delegate|delegar
b2|verbs|verb|moderieren|to moderate|moderar
b2|verbs|verb|vermitteln|to mediate|mediar
b2|verbs|verb|schlichten|to settle a dispute|conciliar
b2|verbs|verb|einklagen|to sue for|demandar judicialmente
b2|adjectives|adj|kontrovers|controversial|controvertido
b2|adjectives|adj|ambivalent|ambivalent|ambivalente
b2|adjectives|adj|paradox|paradoxical|paradójico
b2|adjectives|adj|komplex|complex|complejo
b2|adjectives|adj|subtil|subtle|sutil
b2|adjectives|adj|implizit|implicit|implícito
b2|adjectives|adj|explizit|explicit|explícito
b2|adjectives|adj|relevant|relevant|relevante
b2|adjectives|adj|irrelevant|irrelevant|irrelevante
b2|adjectives|adj|plausibel|plausible|plausible
b2|adjectives|adj|fragwürdig|questionable|cuestionable
b2|adjectives|adj|zweifelhaft|doubtful|dudoso
b2|adjectives|adj|nachhaltig|sustainable|sostenible
b2|adjectives|adj|effizient|efficient|eficiente
b2|adjectives|adj|effektiv|effective|efectivo
b2|feelings|noun|Ambivalenz|ambivalence|ambivalencia|die|Ambivalenzen
b2|feelings|noun|Empathie|empathy|empatía|die|Empathien
b2|feelings|noun|Resilienz|resilience|resiliencia|die|Resilienzen
b2|feelings|noun|Apathie|apathy|apatía|die|Apathien
b2|feelings|noun|Euphorie|euphoria|euforia|die|Euphorien
b2|feelings|adj|empathisch|empathic|empático
b2|feelings|adj|apatisch|apathetic|apático
b2|feelings|adj|euphorisch|euphoric|eufórico
b2|feelings|adj|resigniert|resigned|resignado
b2|feelings|adj|motiviert|motivated|motivado
b2|office|noun|Hierarchie|hierarchy|jerarquía|die|Hierarchien
b2|office|noun|Kompetenz|competence|competencia profesional|die|Kompetenzen
b2|office|noun|Ressource|resource|recurso|die|Ressourcen
b2|office|noun|Kapazität|capacity|capacidad|die|Kapazitäten
b2|office|noun|Benchmark|benchmark|referencia comparativa|die|Benchmarks
b2|office|noun|Meilenstein|milestone|hito|der|Meilensteine
b2|office|noun|Roadmap|roadmap|hoja de ruta|die|Roadmaps
b2|money|noun|Inflation|inflation|inflación|die|Inflationen
b2|money|noun|Deflation|deflation|deflación|die|Deflationen
b2|money|noun|Rendite|return on investment|rentabilidad|die|Renditen
b2|money|noun|Aktie|share of stock|acción bursátil|die|Aktien
b2|money|noun|Anleihe|bond|bono financiero|die|Anleihen
b2|money|noun|Dividende|dividend|dividendo|die|Dividenden
b2|money|noun|Portfolio|investment portfolio|cartera de inversión|das|Portfolios
b2|money|noun|Liquidität|liquidity|liquidez|die|Liquiditäten
b2|school|noun|Dissertation|dissertation|tesis doctoral|die|Dissertationen
b2|school|noun|Facharbeit|term paper|trabajo de asignatura|die|Facharbeiten
b2|school|noun|Quellenangabe|citation|cita bibliográfica|die|Quellenangaben
b2|school|noun|Literaturverzeichnis|bibliography|bibliografía|das|Literaturverzeichnisse
b2|school|noun|Hypothese|hypothesis|hipótesis|die|Hypothesen
b2|school|noun|Methode|method|método|die|Methoden
b2|school|noun|Empirie|empirical research|empirismo aplicado|die|
b2|health|noun|Prävention|prevention|prevención|die|Präventionen
b2|health|noun|Rehabilitation|rehabilitation|rehabilitación|die|Rehabilitationen
b2|health|noun|Chronifizierung|chronification|cronificación|die|Chronifizierungen
b2|health|noun|Prognose|prognosis|pronóstico médico|die|Prognosen
b2|health|noun|Symptom|symptom|síntoma|das|Symptome
b2|tech|noun|Algorithmus|algorithm|algoritmo|der|Algorithmen
b2|tech|noun|Schnittstelle|interface|interfaz|die|Schnittstellen
b2|tech|noun|Verschlüsselung|encryption|cifrado|die|Verschlüsselungen
b2|tech|noun|Datenschutz|data protection|protección de datos|der|
b2|tech|noun|Künstliche Intelligenz|artificial intelligence|inteligencia artificial|die|
b2|tech|noun|Maschinelles Lernen|machine learning|aprendizaje automático|das|
b2|nature|noun|Biodiversität|biodiversity|biodiversidad|die|Biodiversitäten
b2|nature|noun|Ökosystem|ecosystem|ecosistema|das|Ökosysteme
b2|nature|noun|Emission|emission|emisión|die|Emissionen
b2|nature|noun|Fußabdruck|carbon footprint|huella ecológica|der|Fußabdrücke
b2|nature|noun|Erneuerbare Energie|renewable energy|energía renovable|die|Erneuerbaren Energien
b2|jobs|noun|Führungskraft|executive|directivo|die|Führungskräfte
b2|jobs|noun|Fachkraft|skilled worker|trabajador cualificado|die|Fachkräfte
b2|jobs|noun|Quereinsteiger|career changer|persona de otro sector|der|Quereinsteiger
b2|jobs|noun|Praktikant|intern|becario|der|Praktikanten
b2|jobs|noun|Freiberufler|freelancer|autónomo|der|Freiberufler
c1|verbs|verb|postulieren|to postulate|postular
c1|verbs|verb|implizieren|to imply|implicar
c1|verbs|verb|induzieren|to induce|inducir
c1|verbs|verb|deduzieren|to deduce|deducir
c1|verbs|verb|konstituieren|to constitute|constituir
c1|verbs|verb|legitimieren|to legitimize|legitimar
c1|verbs|verb|problematisieren|to problematize|problematizar
c1|verbs|verb|thematisieren|to address as topic|tematizar
c1|verbs|verb|operationalisieren|to operationalize|operacionalizar
c1|verbs|verb|systematisieren|to systematize|sistematizar
c1|verbs|verb|historisieren|to historicize|historizar
c1|verbs|verb|kontextualisieren|to contextualize|contextualizar
c1|verbs|verb|abstrahieren|to abstract|abstraer
c1|verbs|verb|synthetisieren|to synthesize|sintetizar
c1|verbs|verb|kritisieren|to criticize|criticar
c1|adjectives|adj|epistemisch|epistemic|epistémico
c1|adjectives|adj|ontologisch|ontological|ontológico
c1|adjectives|adj|heuristisch|heuristic|heurístico
c1|adjectives|adj|diskursiv|discursive|discursivo
c1|adjectives|adj|normativ|normative|normativo
c1|adjectives|adj|deskriptiv|descriptive|descriptivo
c1|adjectives|adj|präskriptiv|prescriptive|prescriptivo
c1|adjectives|adj|dialektisch|dialectical|dialéctico
c1|adjectives|adj|paradigmatisch|paradigmatic|paradigmático
c1|adjectives|adj|syntagmatisch|syntagmatic|sintagmático
c1|adjectives|adj|kohärent|coherent|coherente
c1|adjectives|adj|inkohärent|incoherent|incoherente
c1|adjectives|adj|konsistent|consistent|consistente
c1|adjectives|adj|inkonsistent|inconsistent|inconsistente
c1|adjectives|adj|valid|valid|válido
c1|school|noun|Erkenntnistheorie|epistemology|epistemología|die|Erkenntnistheorien
c1|school|noun|Methodologie|methodology|metodología|die|Methodologien
c1|school|noun|Paradigma|paradigm|paradigma|das|Paradigmen
c1|school|noun|Diskurs|discourse|discurso académico|der|Diskurse
c1|school|noun|Narrativ|narrative frame|narrativa|das|Narrative
c1|school|noun|Interdisziplinarität|interdisciplinarity|interdisciplinariedad|die|
c1|school|noun|Peer-Review|peer review|revisión por pares|das|Peer-Reviews
c1|school|noun|Publikation|publication|publicación|die|Publikationen
c1|office|noun|Governance|governance|gobernanza|die|
c1|office|noun|Compliance|compliance|cumplimiento normativo|die|
c1|office|noun|Due Diligence|due diligence|diligencia debida|die|
c1|office|noun|Stakeholder|stakeholder|parte interesada|der|Stakeholder
c1|office|noun|Synergie|synergy|sinergia|die|Synergien
c1|money|noun|Derivat|derivative instrument|derivado financiero|das|Derivate
c1|money|noun|Hedgefonds|hedge fund|fondo de cobertura|der|Hedgefonds
c1|money|noun|Volatilität|volatility|volatilidad|die|Volatilitäten
c1|money|noun|Solvenz|solvency|solvencia|die|Solvenzen
c1|money|noun|Insolvenz|insolvency|insolvencia|die|Insolvenzen
c1|health|noun|Ätiologie|etiology|etiología|die|Ätiologien
c1|health|noun|Pathogenese|pathogenesis|patogenia|die|Pathogenesen
c1|health|noun|Komorbidität|comorbidity|comorbilidad|die|Komorbiditäten
c1|health|noun|Mortalität|mortality|mortalidad|die|Mortalitäten
c1|health|noun|Morbidität|morbidity|morbilidad|die|Morbiditäten
c1|feelings|noun|Melancholie|melancholy|melancolía|die|Melancholien
c1|feelings|noun|Nostalgie|nostalgia|nostalgia|die|Nostalgien
c1|feelings|noun|Sehnsucht|yearning|añoranza|die|Sehnsüchte
c1|feelings|noun|Wehmut|wistfulness|tristeza suave|die|
c1|feelings|adj|melancholisch|melancholic|melancólico
c1|feelings|adj|nostalgisch|nostalgic|nostálgico
c1|feelings|adj|wehmütig|wistful|nostálgico suave
c1|nature|noun|Anthropozän|Anthropocene|antropoceno|das|
c1|nature|noun|Biosphäre|biosphere|biosfera|die|Biosphären
c1|nature|noun|Hydrosphäre|hydrosphere|hidrosfera|die|Hydrosphären
c1|nature|noun|Atmosphäre|atmosphere|atmósfera|die|Atmosphären
c1|tech|noun|Quantencomputer|quantum computer|computadora cuántica|der|Quantencomputer
c1|tech|noun|Neuronales Netz|neural network|red neuronal|das|Neuronalen Netze
c1|tech|noun|Big Data|big data|macrodatos|das|
c1|tech|noun|Blockchain|blockchain|cadena de bloques|die|Blockchains
c1|adjectives|adj|innovativ|innovative|innovador
c1|adjectives|adj|disruptiv|disruptive|disruptivo
c1|adjectives|adj|transformativ|transformative|transformador
c1|adjectives|adj|iterativ|iterative|iterativo
c1|adjectives|adj|inklusiv|inclusive|inclusivo
c2|verbs|verb|sublimieren|to sublimate|sublimar
c2|verbs|verb|transzendieren|to transcend|trascender
c2|verbs|verb|kontemplieren|to contemplate|contemplar
c2|verbs|verb|ruminieren|to ruminate|rumiar pensamientos
c2|verbs|verb|präfigurieren|to prefigure|prefigurar
c2|verbs|verb|rekapitulieren|to recapitulate|recapitular
c2|verbs|verb|akzentuieren|to accentuate|acentuar
c2|verbs|verb|nuancieren|to nuance|matizar
c2|verbs|verb|modulieren|to modulate|modular
c2|verbs|verb|oszillieren|to oscillate|oscilar
c2|adjectives|adj|ephemer|ephemeral|efímero
c2|adjectives|adj|evaneszent|evanescent|evanescente
c2|adjectives|adj|immanent|immanent|inmanente
c2|adjectives|adj|transzendent|transcendent|trascendente
c2|adjectives|adj|enigmatisch|enigmatic|enigmático
c2|adjectives|adj|hermetisch|hermetic|hermético
c2|adjectives|adj|esoterisch|esoteric|esotérico
c2|adjectives|adj|exoterisch|exoteric|exotérico
c2|adjectives|adj|idiosynkratisch|idiosyncratic|idiosincrásico
c2|adjectives|adj|quintessentiell|quintessential|quintaesencial
c2|feelings|noun|Weltschmerz|world-weariness|dolor del mundo|der|
c2|feelings|noun|Fernweh|wanderlust ache|ansia de lejos|das|
c2|feelings|noun|Heimweh|homesickness|morriña|das|
c2|feelings|noun|Lebensmüdigkeit|weariness of life|cansancio vital|die|
c2|feelings|noun|Todessehnsucht|longing for death|ansia de muerte|die|
c2|feelings|adj|weltschmerzlich|world-weary|lleno de hastío
c2|feelings|adj|fernwehkrank|sick with wanderlust|enfermo de lejanía
c2|school|noun|Hermeneutik|hermeneutics|hermenéutica|die|Hermeneutiken
c2|school|noun|Phänomenologie|phenomenology|fenomenología|die|Phänomenologien
c2|school|noun|Semiotik|semiotics|semiótica|die|Semiotiken
c2|school|noun|Ästhetik|aesthetics|estética|die|Ästhetiken
c2|school|noun|Poetik|poetics|poética|die|Poetiken
c2|school|noun|Rhetorik|rhetoric|retórica|die|Rhetoriken
c2|office|noun|Leitbild|guiding vision|visión institucional|das|Leitbilder
c2|office|noun|Habitus|habitus|habitus|der|Habitus
c2|office|noun|Doxa|doxa|doxa|die|
c2|office|noun|Praxis|praxis|praxis|die|Praxen
c2|money|noun|Finanzialisierung|financialization|financierización|die|
c2|money|noun|Prekarisierung|precarization|precarización|die|
c2|money|noun|Akkumulation|accumulation|acumulación|die|Akkumulationen
c2|nature|noun|Entropie|entropy|entropía|die|Entropien
c2|nature|noun|Emergenz|emergence|emergencia sistémica|die|Emergenzen
c2|nature|noun|Autopoiesis|autopoiesis|autopoyesis|die|
c2|tech|noun|Singularität|singularity|singularidad tecnológica|die|Singularitäten
c2|tech|noun|Kybernetik|cybernetics|cibernética|die|
c2|tech|noun|Telematik|telematics|telemática|die|
c2|adjectives|adj|aporethisch|aporetic|aporético
c2|adjectives|adj|performativ|performative|performativo
c2|adjectives|adj|autoreferentiell|self-referential|autorreferencial
c2|adjectives|adj|intertextuell|intertextual|intertextual
c2|adjectives|adj|metaphorisch|metaphorical|metafórico
c2|adjectives|adj|metonymisch|metonymic|metonímico
c2|adjectives|adj|allegorisch|allegorical|alegórico
c2|adjectives|adj|ironisch|ironic|irónico
c2|adjectives|adj|sarkastisch|sarcastic|sarcástico
c2|adjectives|adj|zynisch|cynical|cínico
c2|verbs|verb|allegorisieren|to allegorize|alegorizar
c2|verbs|verb|ironisieren|to ironize|ironizar
c2|verbs|verb|parodieren|to parody|parodiar
c2|verbs|verb|satirisieren|to satirize|satirizar
c2|verbs|verb|mystifizieren|to mystify|mistificar
c2|verbs|verb|demystifizieren|to demystify|desmitificar
c2|phrase|hello|Man muss die Kirche im Dorf lassen|don't exaggerate|no exagerar las cosas
c2|phrase|hello|Das ist nicht mein Bier|that's not my problem|eso no es asunto mío
c2|phrase|hello|Da steppt der Bär|that's a lively party|ahí hay fiesta
c2|phrase|hello|Ich verstehe nur Bahnhof|I don't understand a thing|no entiendo nada
c2|phrase|hello|Das ist Schnee von gestern|that's old news|eso es agua pasada
`.trim().split(/\n/).filter(Boolean)

for (const line of more) push(line)

// Generate many more unique B1-C2 compound nouns and verbs from stems
const b1Nouns = [
  ['jobs','Projektleiter','project lead','líder de proyecto','der','Projektleiter'],
  ['jobs','Abteilungsleiter','department head','jefe de departamento','der','Abteilungsleiter'],
  ['jobs','Sachbearbeiter','case worker','gestor administrativo','der','Sachbearbeiter'],
  ['jobs','Dolmetscher','interpreter','intérprete','der','Dolmetscher'],
  ['jobs','Übersetzer','translator','traductor','der','Übersetzer'],
  ['jobs','Journalist','journalist','periodista','der','Journalisten'],
  ['jobs','Redakteur','editor','redactor','der','Redakteure'],
  ['jobs','Fotograf','photographer','fotógrafo','der','Fotografen'],
  ['jobs','Architekt','architect','arquitecto','der','Architekten'],
  ['jobs','Ingenieur','engineer','ingeniero','der','Ingenieure'],
  ['jobs','Chemiker','chemist','químico','der','Chemiker'],
  ['jobs','Physiker','physicist','físico','der','Physiker'],
  ['jobs','Biologe','biologist','biólogo','der','Biologen'],
  ['jobs','Psychologe','psychologist','psicólogo','der','Psychologen'],
  ['jobs','Soziologe','sociologist','sociólogo','der','Soziologen'],
  ['jobs','Historiker','historian','historiador','der','Historiker'],
  ['jobs','Philosoph','philosopher','filósofo','der','Philosophen'],
  ['jobs','Theologe','theologian','teólogo','der','Theologen'],
  ['jobs','Jurist','legal scholar','jurista','der','Juristen'],
  ['jobs','Notar','notary','notario','der','Notare'],
  ['jobs','Anwalt','lawyer','abogado','der','Anwälte'],
  ['jobs','Richter','judge','juez','der','Richter'],
  ['jobs','Staatsanwalt','prosecutor','fiscal','der','Staatsanwälte'],
  ['jobs','Diplomat','diplomat','diplomático','der','Diplomaten'],
  ['jobs','Botschafter','ambassador','embajador','der','Botschafter'],
  ['office','Geschäftsführung','management board','dirección general','die','Geschäftsführungen'],
  ['office','Personalabteilung','HR department','departamento de personal','die','Personalabteilungen'],
  ['office','Buchhaltung','bookkeeping','contabilidad','die','Buchhaltungen'],
  ['office','Controlling','controlling','control de gestión','das',''],
  ['office','Qualitätsmanagement','quality management','gestión de calidad','das',''],
  ['office','Risikomanagement','risk management','gestión de riesgos','das',''],
  ['office','Kundenbetreuung','customer care','atención al cliente','die',''],
  ['office','Öffentlichkeitsarbeit','public relations','relaciones públicas','die',''],
  ['health','Hausarzt','family doctor','médico de cabecera','der','Hausärzte'],
  ['health','Facharzt','specialist doctor','médico especialista','der','Fachärzte'],
  ['health','Chirurgen','surgeons group','cirujanos','die','Chirurgen'],
  ['health','Chirurg','surgeon','cirujano','der','Chirurgen'],
  ['health','Zahnarzt','dentist','dentista','der','Zahnärzte'],
  ['health','Apotheker','pharmacist','farmacéutico','der','Apotheker'],
  ['health','Pfleger','male nurse','enfermero','der','Pfleger'],
  ['health','Pflegerin','female nurse','enfermera','die','Pflegerinnen'],
  ['health','Hebamme','midwife','matrona','die','Hebammen'],
  ['health','Physiotherapeut','physiotherapist','fisioterapeuta','der','Physiotherapeuten'],
  ['materials','Kohlenstoff|carbon|carbono|der|'],
  ['materials','Stickstoff','nitrogen','nitrógeno','der',''],
  ['materials','Sauerstoff','oxygen','oxígeno','der',''],
  ['materials','Wasserstoff','hydrogen','hidrógeno','der',''],
  ['materials','Helium','helium','helio','das',''],
  ['materials','Kupfer','copper','cobre','das',''],
  ['materials','Zinn','tin metal','estaño','das',''],
  ['materials','Blei','lead metal','plomo','das',''],
  ['materials','Quecksilber','mercury metal','mercurio','das',''],
  ['materials','Nickel','nickel','níquel','das',''],
]

for (const item of b1Nouns) {
  if (item[1].includes('|')) {
    const [cat, rest] = [item[0], item[1]]
    const [de, en, es, art, pl] = rest.split('|')
    push(`b1|${cat}|noun|${de}|${en}|${es}|${art}|${pl || ''}`)
  } else {
    const [cat, de, en, es, art, pl] = item
    push(`b1|${cat}|noun|${de}|${en}|${es}|${art}|${pl || ''}`)
  }
}

const b1Verbs2 = [
  ['abschließen','to conclude','concluir'],
  ['aufschließen','to unlock insight','abrir con llave'],
  ['einschließen','to include enclosed','incluir encerrado'],
  ['ausschließen','to exclude','excluir'],
  ['anschließen','to connect up','conectar'],
  ['anschließen lassen','to have connected','hacer conectar'],
  ['umschließen','to enclose','cercar'],
  ['verschließen','to seal shut','cerrar herméticamente'],
  ['aufbrechen','to break open','forzar apertura'],
  ['einbrechen','to break in','entrar a robar'],
  ['ausbrechen','to break out','escapar'],
  ['durchbrechen','to break through','atravesar'],
  ['zusammenbrechen','to collapse','derrumbarse'],
  ['zerbrechen','to shatter','hacer pedazos'],
  ['aufbauen','to build up','construir algo'],
  ['abbauen','to dismantle','desmantelar'],
  ['umbauen','to remodel','remodelar'],
  ['ausbauen','to expand structure','ampliar'],
  ['einbauen','to install in','instalar dentro'],
  ['zusammenbauen','to assemble','ensamblar'],
  ['aufstellen','to set up','colocar de pie'],
  ['umstellen','to rearrange','reordenar'],
  ['einstellen','to hire or adjust','contratar o ajustar'],
  ['vorstellen','to introduce','presentar a alguien'],
  ['darstellen','to depict','representar'],
  ['herstellen','to manufacture','fabricar'],
  ['wiederherstellen','to restore','restaurar'],
  ['feststellen','to ascertain','constatar'],
  ['sicherstellen','to ensure','asegurar'],
  ['bereitstellen','to provide','poner a disposición'],
]
for (const [de, en, es] of b1Verbs2) push(`b1|verbs|verb|${de}|${en}|${es}`)

const b2Adj = [
  ['ambitiös','ambitious','ambicioso'],
  ['aspirativ','aspirational','aspiracional'],
  ['visionär','visionary','visionario'],
  ['pragmatisch','pragmatic','pragmático'],
  ['ideologisch','ideological','ideológico'],
  ['dogmatisch','dogmatic','dogmático'],
  ['orthodox','orthodox','ortodoxo'],
  ['heterodox','heterodox','heterodoxo'],
  ['progressiv','progressive','progresista'],
  ['konservativ','conservative','conservador'],
  ['liberal','liberal','liberal'],
  ['autoritär','authoritarian','autoritario'],
  ['totalitär','totalitarian','totalitario'],
  ['demokratisch','democratic','democrático'],
  ['oligarchisch','oligarchic','oligárquico'],
  ['bürokratisch','bureaucratic','burocrático'],
  ['meritokratisch','meritocratic','meritocrático'],
  ['egalitär','egalitarian','igualitario'],
  ['elitär','elitist','elitista'],
  ['populistisch','populist','populista'],
]
for (const [de, en, es] of b2Adj) push(`b2|adjectives|adj|${de}|${en}|${es}`)

const c1Nouns = [
  ['school','Metakognition','metacognition','metacognición','die','Metakognitionen'],
  ['school','Heuristik','heuristic rule','heurística','die','Heuristiken'],
  ['school','Taxonomie','taxonomy','taxonomía','die','Taxonomien'],
  ['school','Ontologie','ontology','ontología','die','Ontologien'],
  ['school','Teleologie','teleology','teleología','die','Teleologien'],
  ['school','Axiologie','axiology','axiología','die','Axiologien'],
  ['school','Deontologie','deontology','deontología','die','Deontologien'],
  ['school','Utilitarismus','utilitarianism','utilitarismo','der',''],
  ['school','Konstruktivismus','constructivism','constructivismo','der',''],
  ['school','Positivismus','positivism','positivismo','der',''],
  ['feelings','Katharsis','catharsis','catarsis','die','Katharses'],
  ['feelings','Anomie','anomie','anomia','die','Anomien'],
  ['feelings','Entfremdung','alienation','alienación','die','Entfremdungen'],
  ['feelings','Selbstwirksamkeit','self-efficacy','autoeficacia','die',''],
  ['feelings','Selbstwertgefühl','self-esteem','autoestima','das','Selbstwertgefühle'],
  ['money','Arbitrage','arbitrage','arbitraje','die',''],
  ['money','Hebelwirkung','leverage effect','efecto apalancamiento','die','Hebelwirkungen'],
  ['money','Risikoprämie','risk premium','prima de riesgo','die','Risikoprämien'],
  ['money','Kreditausfall','credit default','impago crediticio','der','Kreditausfälle'],
  ['money','Systemrisiko','systemic risk','riesgo sistémico','das','Systemrisiken'],
  ['tech','Interopabilität','interoperability','interoperabilidad','die',''],
  ['tech','Skalierbarkeit','scalability','escalabilidad','die',''],
  ['tech','Latenz','latency','latencia','die','Latenzen'],
  ['tech','Durchsatz','throughput','rendimiento de datos','der','Durchsätze'],
  ['tech','Redundanz','redundancy','redundancia','die','Redundanzen'],
  ['nature','Permafrost','permafrost','permafrost','der',''],
  ['nature','Treibhauseffekt','greenhouse effect','efecto invernadero','der','Treibhauseffekte'],
  ['nature','Ozonloch','ozone hole','agujero de ozono','das','Ozonlöcher'],
  ['nature','Versauerung','acidification','acidificación','die','Versauerungen'],
  ['nature','Desertifikation','desertification','desertificación','die',''],
]
for (const [cat, de, en, es, art, pl] of c1Nouns) push(`c1|${cat}|noun|${de}|${en}|${es}|${art}|${pl || ''}`)

const c2Extra = [
  ['adjectives','adj','labyrinthisch','labyrinthine','laberíntico'],
  ['adjectives','adj','kaleidoskopisch','kaleidoscopic','caleidoscópico'],
  ['adjectives','adj','prismatisch','prismatic','prismático'],
  ['adjectives','adj','barock','baroque','barroco'],
  ['adjectives','adj','rokokoartig','rococo-like','de estilo rococó'],
  ['adjectives','adj','gotisch','gothic','gótico'],
  ['adjectives','adj','klassizistisch','classicist','clasicista'],
  ['adjectives','adj','romantisch verklärt','romantically idealized','románticamente idealizado'],
  ['adjectives','adj','manieristisch','mannerist','manierista'],
  ['adjectives','adj','expressionistisch','expressionist','expresionista'],
  ['verbs','verb','fragmentieren','to fragment','fragmentar'],
  ['verbs','verb','rekonfigurieren','to reconfigure','reconfigurar'],
  ['verbs','verb','hybridisieren','to hybridize','hibridizar'],
  ['verbs','verb','pluralisieren','to pluralize','pluralizar'],
  ['verbs','verb','singularisieren','to singularize','singularizar'],
  ['feelings','noun','Welterschöpfung','world exhaustion','agotamiento del mundo','die',''],
  ['feelings','noun','Zeitlosigkeit','timelessness','atemporalidad','die',''],
  ['feelings','noun','Raumlosigkeit','spacelessness','falta de espacio','die',''],
  ['school','noun','Aporetik','aporetics','aporética','die',''],
  ['school','noun','Dialektik','dialectic','dialéctica','die','Dialektiken'],
]
for (const row of c2Extra) {
  if (row[1] === 'noun') push(`c2|${row[0]}|noun|${row[2]}|${row[3]}|${row[4]}|${row[5]}|${row[6] || ''}`)
  else push(`c2|${row[0]}|${row[1]}|${row[2]}|${row[3]}|${row[4]}`)
}

// More unique compounds for volume
const compounds = [
  ['b1','city','Fußgängerampel','pedestrian signal','semáforo peatonal','die','Fußgängerampeln'],
  ['b1','city','Fahrradweg','bike path','carril bici','der','Fahrradwege'],
  ['b1','city','Bushaltestelle','bus stop','parada de autobús','die','Bushaltestellen'],
  ['b1','city','Straßenbahn','tram','tranvía','die','Straßenbahnen'],
  ['b1','city','U-Bahn','subway','metro','die','U-Bahnen'],
  ['b1','city','S-Bahn','commuter train','tren de cercanías','die','S-Bahnen'],
  ['b1','transport','Führerschein|driver license|carnet de conducir|der|Führerscheine'],
  ['b1','transport','Kennzeichen','license plate','matrícula','das','Kennzeichen'],
  ['b1','transport','Stoßstange','bumper','parachoques','die','Stoßstangen'],
  ['b1','transport','Scheibenwischer','windshield wiper','limpiaparabrisas','der','Scheibenwischer'],
  ['b1','transport','Tankdeckel','fuel cap','tapa del tanque','der','Tankdeckel'],
  ['b1','house','Waschmaschine','washing machine','lavadora','die','Waschmaschinen'],
  ['b1','house','Trockner','dryer','secadora','der','Trockner'],
  ['b1','house','Geschirrspüler','dishwasher','lavavajillas','der','Geschirrspüler'],
  ['b1','house','Staubsauger','vacuum cleaner','aspiradora','der','Staubsauger'],
  ['b1','house','Klimaanlage','air conditioner','aire acondicionado','die','Klimaanlagen'],
  ['b1','kitchen','Küchenwaage','kitchen scale|báscula de cocina|die|Küchenwaagen'],
]

for (const item of compounds) {
  if (String(item[2]).includes('|')) {
    const [cefr, cat, rest] = item
    const [de, en, es, art, pl] = String(rest).split('|')
    push(`${cefr}|${cat}|noun|${de}|${en}|${es}|${art}|${pl || ''}`)
  } else if (String(item[3] || '').includes('|')) {
    // malformed skip
  } else {
    const [cefr, cat, de, en, es, art, pl] = item
    if (en && es && art) push(`${cefr}|${cat}|noun|${de}|${en}|${es}|${art}|${pl || ''}`)
  }
}

// Fix kitchen scale manually
push('b1|kitchen|noun|Küchenwaage|kitchen scale|báscula de cocina|die|Küchenwaagen')
push('b1|kitchen|noun|Mixer|blender|licuadora|der|Mixer')
push('b1|kitchen|noun|Entsafter|juicer|extractor de jugo|der|Entsafter')
push('b1|kitchen|noun|Kaffeemühle|coffee grinder|molinillo de café|die|Kaffeemühlen')
push('b1|kitchen|noun|Brotbackautomat|bread machine|panificadora|der|Brotbackautomaten')

const out = path.resolve('scripts/vocab/pipe-unique.txt')
const unique = []
const seen = new Set()
for (const line of rows) {
  const de = line.split('|')[3]?.toLowerCase()
  if (!de || seen.has(de)) continue
  seen.add(de)
  unique.push(line)
}
fs.writeFileSync(out, unique.join('\n') + '\n')
console.log({ written: unique.length, path: out })
