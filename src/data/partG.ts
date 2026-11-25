import { line, noun, type Draft } from './draft'

const g0 = line('verbs', 'verb', [
  ['herausstellen', 'to reveal as significant', 'destacar'],
  ['voraussetzen', 'to presume', 'presuponer'],
  ['unterstreichen', 'to emphasize', 'subrayar'],
  ['nahelegen', 'to suggest subtly', 'sugerir'],
  ['belegen', 'to substantiate', 'fundamentar'],
  ['widerlegen', 'to refute', 'refutar'],
  ['ableiten', 'to derive', 'derivar'],
  ['deduzieren', 'to deduce', 'deducir'],
  ['interpretieren', 'to interpret', 'interpretar'],
  ['kontextualisieren', 'to contextualize', 'contextualizar'],
  ['systematisieren', 'to systematize', 'sistematizar'],
  ['kategorisieren', 'to categorize', 'categorizar'],
  ['operationalisieren', 'to operationalize', 'operacionalizar'],
  ['validieren', 'to validate', 'validar'],
  ['verallgemeinern', 'to generalize', 'generalizar'],
  ['spezifizieren', 'to specify', 'especificar'],
  ['präzisieren', 'to make precise', 'precisar'],
  ['relativieren', 'to put into perspective', 'relativizar'],
  ['problematisieren', 'to problematize', 'problematizar'],
  ['erörtern', 'to discuss thoroughly', 'debatir a fondo'],
  ['verknüpfen', 'to link conceptually', 'vincular'],
  ['herausarbeiten', 'to elaborate analytically', 'elaborar'],
  ['auseinandersetzen', 'to engage critically', 'confrontar'],
  ['synthetisieren', 'to synthesize', 'sintetizar'],
  ['konzipieren', 'to conceive', 'concebir'],
  ['theoretisieren', 'to theorize', 'teorizar'],
  ['empirisch prüfen', 'to test empirically', 'comprobar empíricamente'],
  ['triangulieren', 'to triangulate data', 'triangular'],
  ['replizieren', 'to replicate a study', 'replicar'],
  ['randomisieren', 'to randomize', 'aleatorizar'],
  ['standardisieren', 'to standardize', 'estandarizar'],
  ['normieren', 'to norm', 'normar'],
  ['kalibrieren', 'to calibrate', 'calibrar'],
  ['modellieren', 'to model', 'modelar'],
  ['prognostizieren', 'to forecast', 'pronosticar'],
  ['extrapolieren', 'to extrapolate', 'extrapolar'],
  ['interpolieren', 'to interpolate', 'interpolar'],
  ['verifizieren', 'to verify', 'verificar'],
  ['falsifizieren', 'to falsify scientifically', 'falsar'],
  ['postulieren', 'to postulate', 'postular'],
  ['konstatieren', 'to ascertain', 'constatar'],
  ['subsumieren', 'to subsume', 'subsumir'],
  ['deduktiv schließen', 'to reason deductively', 'razonar deductivamente'],
  ['induktiv schließen', 'to reason inductively', 'razonar inductivamente'],
  ['argumentieren', 'to argue academically', 'argumentar'],
  ['persuadieren', 'to persuade rhetorically', 'persuadir'],
  ['kumulieren', 'to accumulate', 'acumular'],
  ['dekonstruieren', 'to deconstruct', 'deconstruir'],
  ['rekonstruieren', 'to reconstruct', 'reconstruir'],
  ['rezipieren', 'to receive intellectually', 'recibir intelectualmente'],
  ['adäquat behandeln', 'to treat adequately', 'tratar adecuadamente'],
  ['in Frage stellen', 'to call into question', 'cuestionar'],
  ['veranschaulichen', 'to illustrate with clarity', 'ilustrar'],
  ['abwägen', 'to weigh options', 'sopesar'],
  ['gewichten', 'to weight factors', 'ponderar'],
  ['priorisieren nach Dringlichkeit', 'to prioritize by urgency', 'priorizar por urgencia'],
  ['extrahieren', 'to extract data', 'extraer'],
  ['kodieren', 'to code qualitatively', 'codificar'],
  ['transkribieren', 'to transcribe', 'transcribir'],
  ['gegenüberstellen', 'to juxtapose', 'yuxtaponer'],
  ['stratifizieren', 'to stratify', 'estratificar'],
  ['evaluieren', 'to evaluate formally', 'evaluar formalmente'],
  ['operationalisieren weiter', 'to operationalize further', 'operacionalizar más'],
  ['dekonstruieren lassen', 'to have deconstructed', 'hacer deconstruir'],
  ['rekontextualisieren', 'to recontextualize', 'recontextualizar'],
  ['deterritorialisieren', 'to deterritorialize', 'desterritorializar'],
  ['reterritorialisieren', 'to reterritorialize', 'reterritorializar'],
  ['hybridisieren lassen', 'to have hybridized', 'hacer hibridizar'],
  ['pluralisieren lassen', 'to have pluralized', 'hacer pluralizar'],
  ['subjektivieren', 'to subjectivate', 'subjetivar'],
  ['objektivieren', 'to objectify', 'objetivar'],
  ['historisieren lassen', 'to have historicized', 'hacer historizar'],
  ['dekonstruieren weiter', 'to deconstruct further', 'deconstruir más'],
  ['rekonfigurieren weiter', 'to reconfigure further', 'reconfigurar más'],
  ['transformieren', 'to transform', 'transformar'],
  ['reformulieren', 'to reformulate', 'reformular'],
  ['implizieren', 'to imply', 'implicar'],
  ['induzieren', 'to induce', 'inducir'],
  ['konstituieren', 'to constitute', 'constituir'],
  ['legitimieren', 'to legitimize', 'legitimar'],
  ['thematisieren', 'to address as topic', 'tematizar'],
  ['historisieren', 'to historicize', 'historizar'],
  ['abstrahieren', 'to abstract', 'abstraer'],
], 'c1')

const g1 = line('adjectives', 'adj', [
  ['epistemologisch', 'epistemological', 'epistemológico'],
  ['ontologisch', 'ontological', 'ontológico'],
  ['methodisch', 'methodical', 'metódico'],
  ['empirisch', 'empirical', 'empírico'],
  ['deduktiv', 'deductive', 'deductivo'],
  ['induktiv', 'inductive', 'inductivo'],
  ['analytisch', 'analytical', 'analítico'],
  ['synthetisch', 'synthetic in reasoning', 'sintético'],
  ['deskriptiv', 'descriptive', 'descriptivo'],
  ['präskriptiv', 'prescriptive', 'prescriptivo'],
  ['normativ', 'normative', 'normativo'],
  ['deskriptiv-normativ', 'descriptive-normative', 'descriptivo-normativo'],
  ['inkrementell', 'incremental', 'incremental'],
  ['paradigmatisch', 'paradigmatic', 'paradigmático'],
  ['heuristisch', 'heuristic', 'heurístico'],
  ['kausal', 'causal', 'causal'],
  ['korrelativ', 'correlative', 'correlativo'],
  ['multikausal', 'multicausal', 'multicausal'],
  ['interdisziplinär', 'interdisciplinary', 'interdisciplinario'],
  ['transdisziplinär', 'transdisciplinary', 'transdisciplinario'],
  ['multidisziplinär', 'multidisciplinary', 'multidisciplinario'],
  ['kohärent', 'coherent', 'coherente'],
  ['inkohärent', 'incoherent', 'incoherente'],
  ['widersprüchlich', 'contradictory', 'contradictorio'],
  ['ambivalent', 'ambivalent', 'ambivalente'],
  ['dichotom', 'dichotomous', 'dicotómico'],
  ['nuanciert', 'nuanced', 'matizado'],
  ['fundamental', 'fundamental', 'fundamental'],
  ['peripher', 'peripheral', 'periférico'],
  ['zentral', 'central to thesis', 'central'],
  ['auxiliär', 'auxiliary', 'auxiliar'],
  ['primär', 'primary', 'primario'],
  ['sekundär', 'secondary', 'secundario'],
  ['tertiär', 'tertiary', 'terciario'],
  ['latent', 'latent', 'latente'],
  ['manifest', 'manifest', 'manifiesto'],
  ['implizit', 'implicit', 'implícito'],
  ['explizit', 'explicit', 'explícito'],
  ['verfahren', 'biased in method', 'sesgado metodológicamente'],
  ['unverzerrt', 'unbiased', 'sin sesgo'],
  ['kanonisch', 'canonical', 'canónico'],
  ['revisionistisch', 'revisionist', 'revisionista'],
  ['teleologisch', 'teleological', 'teleológico'],
  ['deterministisch', 'deterministic', 'determinista'],
  ['konstruktivistisch', 'constructivist', 'constructivista'],
  ['poststrukturalistisch', 'poststructuralist', 'postestructuralista'],
  ['idiographisch', 'idiographic', 'idiográfico'],
  ['nomothetisch', 'nomothetic', 'nomotético'],
  ['explanatorisch', 'explanatory', 'explicativo'],
  ['prädiktiv', 'predictive', 'predictivo'],
  ['retrospektiv', 'retrospective', 'retrospectivo'],
  ['prospektiv', 'prospective', 'prospectivo'],
  ['epistemisch gehaltvoll', 'epistemically rich', 'rico epistémicamente'],
  ['ontologisch fundiert', 'ontologically grounded', 'fundado ontológicamente'],
  ['heuristisch fruchtbar', 'heuristically fruitful', 'fértil heurísticamente'],
  ['diskursiv anschlussfähig', 'discursively connectable', 'conectable discursivamente'],
  ['normativ gehaltvoll', 'normatively rich', 'rico normativamente'],
  ['selbstreflexiv', 'self-reflexive', 'autorreflexivo'],
  ['metareflexiv', 'meta-reflexive', 'metarreflexivo'],
  ['kritisch-rational', 'critically rational', 'crítico-racional'],
  ['hermeneutisch', 'hermeneutic', 'hermenéutico'],
  ['phänomenologisch', 'phenomenological', 'fenomenológico'],
  ['strukturalistisch', 'structuralist', 'estructuralista'],
  ['dekonstruktiv', 'deconstructive', 'deconstructivo'],
  ['systemtheoretisch', 'systems-theoretical', 'de teoría de sistemas'],
  ['gesellschaftskritisch', 'socially critical', 'crítico social'],
  ['theoriebildend', 'theory-building', 'generador de teoría'],
  ['erkenntnisfördernd', 'knowledge-promoting', 'promotor de conocimiento'],
  ['diskursprägend', 'discourse-shaping', 'que marca el discurso'],
  ['paradigmenwechselnd', 'paradigm-shifting', 'que cambia el paradigma'],
  ['anschlussfähig gedacht', 'connectably conceived', 'pensado de forma conectable'],
  ['epistemisch', 'epistemic', 'epistémico'],
  ['diskursiv', 'discursive', 'discursivo'],
  ['dialektisch', 'dialectical', 'dialéctico'],
  ['syntagmatisch', 'syntagmatic', 'sintagmático'],
  ['konsistent', 'consistent', 'consistente'],
  ['inkonsistent', 'inconsistent', 'inconsistente'],
  ['valid', 'valid', 'válido'],
  ['innovativ', 'innovative', 'innovador'],
  ['disruptiv', 'disruptive', 'disruptivo'],
  ['transformativ', 'transformative', 'transformador'],
  ['iterativ', 'iterative', 'iterativo'],
  ['inklusiv', 'inclusive', 'inclusivo'],
], 'c1')

const g2 = noun('school', [
  ['Dissertation', 'doctoral thesis', 'tesis doctoral', 'die', 'Dissertationen'],
  ['Promotion', 'doctoral degree process', 'doctorado', 'die', 'Promotionen'],
  ['Habilitierung', 'postdoctoral qualification', 'habilitación', 'die', 'Habilitierungen'],
  ['Abstract', 'abstract summary', 'resumen', 'das', 'Abstracts'],
  ['Fußnote', 'footnote', 'nota al pie', 'die', 'Fußnoten'],
  ['Literaturverzeichnis', 'bibliography', 'bibliografía', 'das', 'Literaturverzeichnisse'],
  ['Paraphrase', 'paraphrase', 'paráfrasis', 'die', 'Paraphrasen'],
  ['Forschungsfrage', 'research question', 'pregunta de investigación', 'die', 'Forschungsfragen'],
  ['Forschungslücke', 'research gap', 'brecha investigativa', 'die', 'Forschungslücken'],
  ['Methodik', 'methodology', 'metodología', 'die', 'Methodiken'],
  ['Operationalisierung', 'operationalization', 'operacionalización', 'die', 'Operationalisierungen'],
  ['Stichprobe', 'sample', 'muestra', 'die', 'Stichproben'],
  ['Population', 'population statistics', 'población', 'die', 'Populationen'],
  ['Variablen', 'variables', 'variables', 'die', ''],
  ['Kontrollgruppe', 'control group', 'grupo de control', 'die', 'Kontrollgruppen'],
  ['Experiment', 'experiment', 'experimento', 'das', 'Experimente'],
  ['Feldstudie', 'field study', 'estudio de campo', 'die', 'Feldstudien'],
  ['Fallstudie', 'case study', 'estudio de caso', 'die', 'Fallstudien'],
  ['Peer Review', 'peer review', 'revisión por pares', 'das', 'Peer Reviews'],
  ['Zeitschriftenartikel', 'journal article', 'artículo científico', 'der', 'Zeitschriftenartikel'],
  ['Konferenzband', 'conference proceedings', 'actas de congreso', 'der', 'Konferenzbände'],
  ['Paradigma', 'paradigm', 'paradigma', 'das', 'Paradigmen'],
  ['Diskurs', 'discourse', 'discurso', 'der', 'Diskurse'],
  ['Epoche', 'epoch period', 'época', 'die', 'Epochen'],
  ['Hermeneutik', 'hermeneutics', 'hermenéutica', 'die', ''],
  ['Phenomenologie', 'phenomenology', 'fenomenología', 'die', ''],
  ['Evidenzniveau', 'level of evidence', 'nivel de evidencia', 'das', 'Evidenzniveaus'],
  ['Metaanalyse', 'meta-analysis', 'metaanálisis', 'die', 'Metaanalysen'],
  ['Effektstärke', 'effect size', 'tamaño del efecto', 'die', 'Effektstärken'],
  ['Signifikanzniveau', 'significance level', 'nivel de significancia', 'das', 'Signifikanzniveaus'],
  ['Gegenargument', 'counterargument', 'contraargumento', 'das', 'Gegenargumente'],
  ['Literaturkritik', 'literature critique', 'crítica bibliográfica', 'die', 'Literaturkritiken'],
  ['Forschungsdesign', 'research design', 'diseño de investigación', 'das', 'Forschungsdesigns'],
  ['Grundgesamtheit', 'population stats', 'población estadística', 'die', 'Grundgesamtheiten'],
  ['Validität', 'validity research', 'validez', 'die', 'Validitäten'],
  ['Reliabilität', 'reliability research', 'fiabilidad científica', 'die', 'Reliabilitäten'],
  ['Erkenntnistheorie', 'epistemology', 'epistemología', 'die', 'Erkenntnistheorien'],
  ['Narrativ', 'narrative frame', 'narrativa', 'das', 'Narrative'],
  ['Interdisziplinarität', 'interdisciplinarity', 'interdisciplinariedad', 'die', ''],
  ['Publikation', 'publication', 'publicación', 'die', 'Publikationen'],
  ['Metakognition', 'metacognition', 'metacognición', 'die', 'Metakognitionen'],
  ['Heuristik', 'heuristic rule', 'heurística', 'die', 'Heuristiken'],
  ['Taxonomie', 'taxonomy', 'taxonomía', 'die', 'Taxonomien'],
  ['Ontologie', 'ontology', 'ontología', 'die', 'Ontologien'],
  ['Teleologie', 'teleology', 'teleología', 'die', 'Teleologien'],
  ['Axiologie', 'axiology', 'axiología', 'die', 'Axiologien'],
  ['Deontologie', 'deontology', 'deontología', 'die', 'Deontologien'],
  ['Utilitarismus', 'utilitarianism', 'utilitarismo', 'der', ''],
  ['Konstruktivismus', 'constructivism', 'constructivismo', 'der', ''],
  ['Positivismus', 'positivism', 'positivismo', 'der', ''],
], 'c1')

const g3 = line('school', 'verb', [
  ['zitieren nach APA', 'to cite in APA style', 'citar según APA'],
], 'c1')

const g4 = line('school', 'phrase', [
  ['Aus fachlicher Sicht', 'from a professional viewpoint', 'desde un punto de vista profesional'],
  ['Im Sinne der These', 'in the sense of the thesis', 'en el sentido de la tesis'],
  ['Daraus folgt zwingend', 'it necessarily follows', 'de ello se sigue necesariamente'],
  ['Dies gilt analog', 'this applies analogously', 'esto se aplica de manera análoga'],
  ['In der Gesamtschau', 'overall', 'en conjunto'],
  ['Unter Abwägung aller Faktoren', 'weighing all factors', 'sopesando todos los factores'],
  ['Es lässt sich festhalten', 'it can be stated', 'puede afirmarse'],
  ['Dabei ist zu bedenken', 'it should be considered', 'debe tenerse en cuenta'],
  ['Im Ergebnis zeigt sich', 'the result shows', 'el resultado muestra'],
  ['Dies steht in Kontrast zu', 'this contrasts with', 'esto contrasta con'],
  ['In Anbetracht der Komplexität', 'given the complexity', 'dada la complejidad'],
  ['Entsprechend der Literatur', 'according to the literature', 'según la bibliografía'],
], 'c1')

const g5 = noun('office', [
  ['Compliance', 'compliance', 'cumplimiento normativo', 'die', ''],
  ['Due Diligence', 'due diligence', 'auditoría previa', 'die', ''],
  ['Governance', 'corporate governance', 'gobernanza', 'die', ''],
  ['Transparenzbericht', 'transparency report', 'informe de transparencia', 'der', 'Transparenzberichte'],
  ['Stakeholder', 'stakeholder', 'parte interesada', 'der', 'Stakeholder'],
  ['Risikomanagement', 'risk management', 'gestión de riesgos', 'das', ''],
  ['Audit', 'audit', 'auditoría', 'das', 'Audits'],
  ['Bilanz', 'balance sheet', 'balance', 'die', 'Bilanzen'],
  ['GuV', 'profit and loss statement', 'cuenta de resultados', 'die', ''],
  ['Cashflow', 'cash flow', 'flujo de caja', 'der', 'Cashflows'],
  ['Wirtschaftsprüfer', 'auditor', 'auditor', 'der', 'Wirtschaftsprüfer'],
  ['Schadenfall', 'damage case', 'caso de siniestro', 'der', 'Schadenfälle'],
  ['Schiedsverfahren', 'arbitration proceeding', 'arbitraje', 'das', 'Schiedsverfahren'],
  ['Vollmacht', 'power of attorney', 'poder notarial', 'die', 'Vollmachten'],
  ['NDA', 'non-disclosure agreement', 'acuerdo de confidencialidad', 'das', 'NDAs'],
  ['Klausel', 'clause', 'cláusula', 'die', 'Klauseln'],
  ['Haftungsausschluss', 'disclaimer', 'exención de responsabilidad', 'der', 'Haftungsausschlüsse'],
  ['Wettbewerbsrecht', 'competition law', 'derecho de competencia', 'das', ''],
  ['Szenarioplanung', 'scenario planning', 'planificación de escenarios', 'die', ''],
  ['Synergie', 'synergy', 'sinergia', 'die', 'Synergien'],
], 'c1')

const g6 = line('office', 'verb', [
  ['haftbar machen', 'to hold liable', 'hacer responsable'],
  ['rechtskräftig werden', 'to become legally binding', 'adquirir firmeza legal'],
], 'c1')

const g7 = noun('money', [
  ['Derivative', 'derivative financial product', 'derivado financiero', 'das', 'Derivate'],
  ['Anleihe', 'bond', 'bono', 'die', 'Anleihen'],
  ['Aktienportfolio', 'stock portfolio', 'cartera de acciones', 'das', 'Aktienportfolios'],
  ['Volatilität', 'volatility', 'volatilidad', 'die', ''],
  ['Liquidität', 'liquidity', 'liquidez', 'die', ''],
  ['Solvenz', 'solvency', 'solvencia', 'die', ''],
  ['Insolvenz', 'insolvency', 'insolvencia', 'die', 'Insolvenzen'],
  ['Bilanzierung', 'accounting', 'contabilización', 'die', ''],
  ['Abschreibung', 'depreciation', 'amortización', 'die', 'Abschreibungen'],
  ['Wertberichtigung', 'write-down', 'corrección de valor', 'die', 'Wertberichtigungen'],
  ['Dividende', 'dividend', 'dividendo', 'die', 'Dividenden'],
  ['Börsenkurs', 'stock price', 'cotización', 'der', 'Börsenkurse'],
  ['Benchmark', 'benchmark', 'referencia', 'das', 'Benchmarks'],
  ['Synergieeffekt', 'synergy effect', 'efecto sinérgico', 'der', 'Synergieeffekte'],
  ['Sanierung', 'financial restructuring', 'reestructuración', 'die', 'Sanierungen'],
  ['Nachrangdarlehen', 'subordinated loan', 'préstamo subordinado', 'das', 'Nachrangdarlehen'],
  ['Private Equity', 'private equity', 'capital privado', 'das', ''],
  ['Venture Capital', 'venture capital', 'capital riesgo', 'das', ''],
  ['Crowdfunding', 'crowdfunding', 'financiación colectiva', 'das', ''],
  ['Mikrokredit', 'microcredit', 'microcrédito', 'der', 'Mikrokredite'],
  ['Sozialanleihe', 'social bond', 'bono social', 'die', 'Sozialanleihen'],
  ['Hedgefonds', 'hedge fund', 'fondo de cobertura', 'der', 'Hedgefonds'],
  ['Hebelwirkung', 'leverage effect', 'efecto apalancamiento', 'die', 'Hebelwirkungen'],
  ['Risikoprämie', 'risk premium', 'prima de riesgo', 'die', 'Risikoprämien'],
  ['Kreditausfall', 'credit default', 'impago crediticio', 'der', 'Kreditausfälle'],
  ['Systemrisiko', 'systemic risk', 'riesgo sistémico', 'das', 'Systemrisiken'],
], 'c1')

const g8 = line('money', 'verb', [
  ['hedgen', 'to hedge financially', 'cubrirse'],
  ['diversifizieren', 'to diversify', 'diversificar'],
  ['spekulieren', 'to speculate', 'especular'],
], 'c1')

const g9 = noun('health', [
  ['Multimorbidität', 'multimorbidity', 'multimorbilidad', 'die', ''],
  ['Pharmakologie', 'pharmacology', 'farmacología', 'die', ''],
  ['Randomisierung', 'randomization', 'aleatorización', 'die', 'Randomisierungen'],
  ['Placebo', 'placebo', 'placebo', 'das', 'Placebos'],
  ['Studienprotokoll', 'study protocol', 'protocolo del estudio', 'das', 'Studienprotokolle'],
  ['Ethikkommission', 'ethics board', 'comité de ética', 'die', 'Ethikkommissionen'],
  ['Prognose', 'prognosis', 'pronóstico', 'die', 'Prognosen'],
  ['Remission', 'remission', 'remisión', 'die', ''],
  ['Rezidiv', 'relapse', 'recidiva', 'das', 'Rezidive'],
  ['Compliance patient', 'treatment adherence', 'adherencia al tratamiento', 'die', ''],
  ['Telemedizin', 'telemedicine', 'telemedicina', 'die', ''],
  ['Ätiologie', 'etiology', 'etiología', 'die', 'Ätiologien'],
  ['Pathogenese', 'pathogenesis', 'patogenia', 'die', 'Pathogenesen'],
  ['Komorbidität', 'comorbidity', 'comorbilidad', 'die', 'Komorbiditäten'],
  ['Mortalität', 'mortality', 'mortalidad', 'die', 'Mortalitäten'],
  ['Morbidität', 'morbidity', 'morbilidad', 'die', 'Morbiditäten'],
], 'c1')

const g10 = line('health', 'adj', [
  ['iatrogen', 'iatrogenic', 'iatrogénico'],
  ['prophylaktisch', 'prophylactic', 'profiláctico'],
], 'c1')

const g11 = line('health', 'verb', [
  ['blindisieren', 'to blind a clinical trial', 'cegar un ensayo'],
], 'c1')

const g12 = noun('nature', [
  ['Anthropozän', 'Anthropocene', 'antropoceno', 'das', ''],
  ['Carbonisierung', 'carbonization', 'carbonización', 'die', ''],
  ['Dekarbonisierung', 'decarbonization', 'descarbonización', 'die', ''],
  ['Biodiversitätsverlust', 'biodiversity loss', 'pérdida de biodiversidad', 'der', ''],
  ['Ökobilanz', 'life cycle assessment', 'evaluación del ciclo de vida', 'die', 'Ökobilanzen'],
  ['Emissionshandel', 'emissions trading', 'comercio de emisiones', 'der', ''],
  ['Kipppunkt', 'tipping point', 'punto de inflexión', 'der', 'Kipppunkte'],
  ['Regenerationsphase', 'regeneration phase', 'fase de regeneración', 'die', 'Regenerationsphasen'],
  ['Naturschutzrahmenrichtlinie', 'nature protection framework', 'marco de protección natural', 'die', 'Naturschutzrahmenrichtlinien'],
  ['Rückkopplung', 'feedback loop', 'bucle de retroalimentación', 'die', 'Rückkopplungen'],
  ['Kippelement', 'tipping element', 'elemento de vuelco', 'das', 'Kippelemente'],
  ['Planetare Grenze', 'planetary boundary', 'límite planetario', 'die', 'Planetaren Grenzen'],
  ['Biosphäre', 'biosphere', 'biosfera', 'die', 'Biosphären'],
  ['Hydrosphäre', 'hydrosphere', 'hidrosfera', 'die', 'Hydrosphären'],
  ['Atmosphäre', 'atmosphere', 'atmósfera', 'die', 'Atmosphären'],
  ['Permafrost', 'permafrost', 'permafrost', 'der', ''],
  ['Treibhauseffekt', 'greenhouse effect', 'efecto invernadero', 'der', 'Treibhauseffekte'],
  ['Ozonloch', 'ozone hole', 'agujero de ozono', 'das', 'Ozonlöcher'],
  ['Versauerung', 'acidification', 'acidificación', 'die', 'Versauerungen'],
  ['Desertifikation', 'desertification', 'desertificación', 'die', ''],
], 'c1')

const g13 = noun('materials', [
  ['Nanomaterial', 'nanomaterial', 'nanomaterial', 'das', 'Nanomaterialien'],
  ['Polymer', 'polymer', 'polímero', 'das', 'Polymere'],
  ['Korrosionsbeständigkeit', 'corrosion resistance', 'resistencia a la corrosión', 'die', ''],
  ['Zugfestigkeit', 'tensile strength', 'resistencia a tracción', 'die', ''],
  ['Leichtbauweise', 'lightweight construction', 'construcción ligera', 'die', 'Leichtbauweisen'],
  ['Graphen', 'graphene', 'grafeno', 'das', ''],
  ['Nanoröhre', 'nanotube', 'nanotubo', 'die', 'Nanoröhren'],
  ['Aerogel', 'aerogel', 'aerogel', 'das', 'Aerogele'],
  ['Biokunststoff', 'bioplastic', 'bioplástico', 'der', 'Biokunststoffe'],
], 'c1')

const g14 = line('materials', 'adj', [
  ['porös', 'porous', 'poroso'],
], 'c1')

const g15 = noun('tech', [
  ['Algorithmus', 'algorithm', 'algoritmo', 'der', 'Algorithmen'],
  ['Machine Learning', 'machine learning', 'aprendizaje automático', 'das', ''],
  ['Künstliche Intelligenz', 'artificial intelligence', 'inteligencia artificial', 'die', ''],
  ['Big Data', 'big data', 'macrodados', 'die', ''],
  ['Datenschutzgrundverordnung', 'GDPR', 'RGPD', 'die', ''],
  ['Open Source', 'open source', 'código abierto', 'das', ''],
  ['Blockchain', 'blockchain', 'cadena de bloques', 'die', 'Blockchains'],
  ['API-Schnittstelle', 'API interface', 'interfaz API', 'die', 'API-Schnittstellen'],
  ['Latenzzeit', 'latency', 'latencia', 'die', 'Latenzzeiten'],
  ['Rechenzentrum', 'data center', 'centro de datos', 'das', 'Rechenzentren'],
  ['Zero-Trust-Architektur', 'zero trust architecture', 'arquitectura de confianza cero', 'die', 'Zero-Trust-Architekturen'],
  ['Quantencomputer', 'quantum computer', 'computadora cuántica', 'der', 'Quantencomputer'],
  ['Neuronales Netz', 'neural network', 'red neuronal', 'das', 'Neuronalen Netze'],
  ['Interopabilität', 'interoperability', 'interoperabilidad', 'die', ''],
  ['Skalierbarkeit', 'scalability', 'escalabilidad', 'die', ''],
  ['Durchsatz', 'throughput', 'rendimiento de datos', 'der', 'Durchsätze'],
  ['Redundanz', 'redundancy', 'redundancia', 'die', 'Redundanzen'],
], 'c1')

const g16 = line('tech', 'adj', [
  ['skalierbar', 'scalable', 'escalable'],
  ['fehlertolerant', 'fault-tolerant', 'tolerante a fallos'],
], 'c1')

const g17 = noun('feelings', [
  ['Ambivalenz', 'ambivalence', 'ambivalencia', 'die', 'Ambivalenzen'],
  ['Selbstwirksamkeit', 'self-efficacy', 'autoeficacia', 'die', ''],
  ['Resilienzfaktor', 'resilience factor', 'factor de resiliencia', 'der', 'Resilienzfaktoren'],
  ['Burn-out', 'burnout', 'síndrome de burnout', 'das', 'Burn-outs'],
  ['Affektregulation', 'emotion regulation', 'regulación emocional', 'die', ''],
  ['Emotionsarbeit', 'emotional labor', 'trabajo emocional', 'die', ''],
  ['Boreout', 'boreout', 'aburrimiento laboral', 'das', 'Boreouts'],
  ['Flow-Erleben', 'flow experience', 'experiencia de flow', 'das', 'Flow-Erleben'],
  ['Melancholie', 'melancholy', 'melancolía', 'die', 'Melancholien'],
  ['Nostalgie', 'nostalgia', 'nostalgia', 'die', 'Nostalgien'],
  ['Wehmut', 'wistfulness', 'tristeza suave', 'die', ''],
  ['Katharsis', 'catharsis', 'catarsis', 'die', 'Katharses'],
  ['Anomie', 'anomie', 'anomia', 'die', 'Anomien'],
  ['Entfremdung', 'alienation', 'alienación', 'die', 'Entfremdungen'],
  ['Selbstwertgefühl', 'self-esteem', 'autoestima', 'das', 'Selbstwertgefühle'],
], 'c1')

const g18 = line('feelings', 'adj', [
  ['desillusioniert', 'disillusioned', 'desilusionado'],
  ['melancholisch', 'melancholic', 'melancólico'],
  ['nostalgisch', 'nostalgic', 'nostálgico'],
  ['wehmütig', 'wistful', 'nostálgico suave'],
], 'c1')

const g19 = line('feelings', 'verb', [
  ['reflektieren', 'to reflect emotionally', 'reflexionar'],
], 'c1')

const g20 = line('feelings', 'phrase', [
  ['Emotional aufgeladen', 'emotionally charged', 'cargado emocionalmente'],
], 'c1')

const g21 = noun('jobs', [
  ['Forschungsgruppe', 'research group', 'grupo de investigación', 'die', 'Forschungsgruppen'],
  ['Tenure Track', 'tenure track', 'trayectoria hacia titularidad', 'der', ''],
  ['Lehrauftrag', 'teaching assignment', 'encargo docente', 'der', 'Lehraufträge'],
  ['Akademischer Rat', 'academic council member', 'consejero académico', 'der', 'Akademische Räte'],
  ['Postdoc', 'postdoctoral researcher', 'postdoctorando', 'der', 'Postdocs'],
  ['Gutachter', 'reviewer', 'evaluador', 'der', 'Gutachter'],
  ['Stipendiat', 'stipend holder', 'becario', 'der', 'Stipendiaten'],
  ['Berufsethos', 'professional ethics', 'ética profesional', 'das', 'Berufsethos'],
  ['Wissensmanagement', 'knowledge management', 'gestión del conocimiento', 'das', ''],
  ['Fachhochschullektor', 'university of applied sciences lecturer', 'profesor de FH', 'der', 'Fachhochschullektoren'],
  ['Chief Scientist', 'chief scientist', 'científico jefe', 'der', 'Chief Scientists'],
  ['Data Scientist', 'data scientist', 'científico de datos', 'der', 'Data Scientists'],
  ['Product Owner', 'product owner', 'dueño de producto', 'der', 'Product Owner'],
  ['Scrum Master', 'scrum master', 'scrum master', 'der', 'Scrum Master'],
  ['DevOps Engineer', 'devops engineer', 'ingeniero devops', 'der', 'DevOps Engineers'],
], 'c1')

const g22 = noun('travel', [
  ['Erneuerung Reisepass', 'passport renewal', 'renovación del pasaporte', 'die', 'Erneuerungen Reisepass'],
], 'c1')

const g23 = line('travel', 'verb', [
  ['quarantänepflichtig sein', 'to require quarantine', 'estar sujeto a cuarentena'],
], 'c1')

const g24 = line('school', 'other', [
  ['evtl.', 'possibly', 'posiblemente'],
  ['insbes.', 'especially', 'especialmente'],
  ['ggf.', 'if applicable', 'si procede'],
  ['vgl.', 'compare', 'véase'],
  ['ibid.', 'in the same place', 'íd.'],
  ['a. a. O.', 'op. cit.', 'ob. cit.'],
  ['Hg.', 'editor', 'ed.'],
  ['Hrsg.', 'edited by', 'coord.'],
], 'c1')

const g25 = noun('hobbies', [
  ['Citizen Science', 'citizen science', 'ciencia ciudadana', 'die', ''],
], 'c1')

const g26 = noun('city', [
  ['Gentrifizierung', 'gentrification', 'gentrificación', 'die', ''],
], 'c1')

const g27 = noun('transport', [
  ['Mobilitätswende', 'mobility transition', 'transición de movilidad', 'die', ''],
], 'c1')

const g28 = noun('weather', [
  ['Extremwetterereignis', 'extreme weather event', 'evento meteorológico extremo', 'das', 'Extremwetterereignisse'],
], 'c1')

const g29 = line('time', 'other', [
  ['epochenübergreifend', 'epoch-spanning', 'interépoca'],
], 'c1')

const g30 = noun('shop', [
  ['Preiselastizität', 'price elasticity', 'elasticidad del precio', 'die', 'Preiselastizitäten'],
], 'c1')

const g31 = noun('music', [
  ['Improvisationskompetenz', 'improvisation skill', 'competencia improvisatoria', 'die', ''],
], 'c1')

const g32 = noun('sport', [
  ['Leistungsdiagnostik', 'performance diagnostics', 'diagnóstico del rendimiento', 'die', ''],
], 'c1')

const g33 = noun('garden', [
  ['Insektenfreundliche Fläche', 'insect-friendly area', 'zona amigable con insectos', 'die', 'Insektenfreundlichen Flächen'],
], 'c1')

const g34 = noun('tools', [
  ['Kalibriergerät', 'calibration device', 'dispositivo de calibración', 'das', 'Kalibriergeräte'],
], 'c1')

const g35 = noun('house', [
  ['Energieeffizienzklasse', 'energy efficiency class', 'clase de eficiencia energética', 'die', 'Energieeffizienzklassen'],
], 'c1')

const g36 = noun('bath', [
  ['Dermatologische Untersuchung', 'dermatological exam', 'examen dermatológico', 'die', 'Dermatologischen Untersuchungen'],
], 'c1')

const g37 = noun('food', [
  ['Mikronährstoff', 'micronutrient', 'micronutriente', 'der', 'Mikronährstoffe'],
], 'c1')

const g38 = noun('drinks', [
  ['Dehydration', 'dehydration', 'deshidratación', 'die', ''],
], 'c1')

const g39 = noun('body', [
  ['Hormonhaushalt', 'hormone balance', 'equilibrio hormonal', 'der', 'Hormonhaushalte'],
], 'c1')

const g40 = noun('clothes', [
  ['Nachhaltige Mode', 'sustainable fashion', 'moda sostenible', 'die', ''],
], 'c1')

const g41 = noun('animals', [
  ['Invasionsart', 'invasive species', 'especie invasora', 'die', 'Invasionsarten'],
], 'c1')

const g42 = noun('shapes', [
  ['Schwerpunktdiagramm', 'bubble chart', 'diagrama de burbujas', 'das', 'Schwerpunktdiagramme'],
], 'c1')

const g43 = noun('numbers', [
  ['Standardabweichung', 'standard deviation', 'desviación estándar', 'die', 'Standardabweichungen'],
], 'c1')

const g44 = line('colors', 'adj', [
  ['monochromatisch', 'monochromatic', 'monocromático'],
], 'c1')

const g45 = line('hello', 'phrase', [
  ['Mit akademischen Grüßen', 'with academic regards', 'saludos académicos'],
  ['In Anbetracht dessen', 'in consideration of that', 'en consideración de ello'],
  ['Vor dem Hintergrund', 'against the backdrop', 'ante el trasfondo'],
  ['Im Lichte dessen', 'in light of that', 'a la luz de ello'],
  ['Im Zuge dessen', 'in the course of that', 'en el curso de ello'],
], 'c1')

const g46 = noun('lands', [
  ['Schwellenland', 'emerging economy country', 'país emergente', 'das', 'Schwellenländer'],
], 'c1')

const g47 = noun('kitchen', [
  ['Batch Cooking', 'batch cooking', 'cocción por lotes', 'das', ''],
], 'c1')

const g48 = noun('furniture', [
  ['Ergonomisches Setup', 'ergonomic setup', 'configuración ergonómica', 'das', 'Ergonomischen Setups'],
], 'c1')

const g49 = line('verbs', 'verb', [
  ['durchdeklinieren', 'to cover exhaustively', 'recorrer exhaustivamente'],
  ['herausmodulieren', 'to tune out subtly', 'modular hacia fuera'],
  ['zurechtrücken', 'to set straight mentally', 'enderezar mentalmente'],
  ['durchkreuzen', 'to thwart thoroughly', 'frustrar totalmente'],
  ['vorausahnen', 'to anticipate beforehand', 'anticipar de antemano'],
  ['mitspielen lassen', 'to allow to play along', 'dejar participar'],
  ['nachvollziehbar machen', 'to make comprehensible', 'hacer comprensible'],
  ['unterfüttern', 'to underpin rhetorically', 'sustentar retóricamente'],
  ['ausbuchstabieren', 'to spell out clearly', 'deletrear con claridad'],
  ['herunterbrechen', 'to break down for audience', 'desglosar para el público'],
  ['anschlussfähig machen', 'to make connectable', 'hacer conectable'],
  ['sich festbeißen', 'to get fixated', 'obsesionarse'],
  ['sich rausreden', 'to talk one\'s way out', 'escabullirse con palabras'],
  ['schönreden', 'to gloss over', 'pintar bonito'],
  ['herunterspielen', 'to downplay', 'minimizar'],
  ['hochspielen', 'to dramatize', 'dramatizar'],
  ['durchwühlen', 'to rummage thoroughly', 'hurgar a fondo'],
  ['durchforsten', 'to scour thoroughly', 'rebuscar a fondo'],
  ['abhandenkommen', 'to go missing', 'extraviarse'],
  ['beiseitelegen', 'to set aside', 'apartar'],
  ['hinzukommen', 'to come on top of that', 'sumarse'],
  ['wegfallen', 'to drop out', 'caer en saco roto'],
  ['nachreichen', 'to submit subsequently', 'entregar posteriormente'],
  ['nachschieben', 'to push back informally', 'aplazar informalmente'],
  ['verschlanken', 'to streamline', 'agilizar'],
  ['verstauben', 'to gather dust', 'empolvarse'],
  ['veralten', 'to become outdated', 'quedar obsoleto'],
  ['umdenken', 'to rethink', 'repensar'],
  ['nachjustieren', 'to fine-tune', 'ajustar finamente'],
  ['dazwischenfunken', 'to chip in conversation', 'intervenir de repente'],
  ['einwerfen', 'to interject', 'intercalar'],
  ['überreagieren', 'to overreact', 'sobre-reaccionar'],
  ['untertreiben', 'to understate', 'quedarse corto'],
  ['überinterpretieren', 'to overinterpret', 'sobreinterpretar'],
  ['herumlavieren', 'to hedge evasively', 'vacilar evasivamente'],
  ['herumeiern', 'to waffle evasively', 'divagar'],
  ['vorgeben', 'to pretend feign', 'fingir'],
  ['vorspielen', 'to feign act', 'simular'],
  ['durchhalten', 'to hold out endure', 'aguantar'],
  ['nachlassen', 'to let up weaken', 'ceder'],
  ['sich verhaspeln', 'to fumble slip up', 'lío'],
  ['verzetteln', 'to get sidetracked scatter', 'distraerse'],
  ['sich austoben', 'to let off steam', 'desahogarse'],
  ['sich breitmachen', 'to spread out take space', 'extenderse'],
  ['sich versprechen', 'to misspeak', 'equivocarse al hablar'],
  ['poetisieren', 'to poeticize language', 'poetizar el lenguaje'],
  ['prosaisieren', 'to make prosaic', 'hacer prosaico'],
  ['dramatisieren', 'to dramatize events', 'dramatizar hechos'],
  ['lyrisieren', 'to lyricize', 'lirizar'],
  ['episieren', 'to epicize', 'epizar'],
  ['vergegenwärtigen', 'to make present', 'hacer presente mentalmente'],
  ['verewigen', 'to eternalize', 'eternizar'],
  ['verflüchtigen', 'to volatilize', 'volatilizar'],
  ['verklären', 'to transfigure', 'transfigurar'],
  ['verfremden', 'to alienate artistically', 'extrañar artísticamente'],
  ['sublimieren', 'to sublimate', 'sublimar'],
  ['transzendieren', 'to transcend', 'trascender'],
  ['kontemplieren', 'to contemplate', 'contemplar'],
  ['ruminieren', 'to ruminate', 'rumiar pensamientos'],
  ['präfigurieren', 'to prefigure', 'prefigurar'],
  ['rekapitulieren', 'to recapitulate', 'recapitular'],
  ['akzentuieren', 'to accentuate', 'acentuar'],
  ['nuancieren', 'to nuance', 'matizar'],
  ['modulieren', 'to modulate', 'modular'],
  ['oszillieren', 'to oscillate', 'oscilar'],
  ['allegorisieren', 'to allegorize', 'alegorizar'],
  ['ironisieren', 'to ironize', 'ironizar'],
  ['parodieren', 'to parody', 'parodiar'],
  ['satirisieren', 'to satirize', 'satirizar'],
  ['mystifizieren', 'to mystify', 'mistificar'],
  ['demystifizieren', 'to demystify', 'desmitificar'],
  ['fragmentieren', 'to fragment', 'fragmentar'],
  ['rekonfigurieren', 'to reconfigure', 'reconfigurar'],
  ['hybridisieren', 'to hybridize', 'hibridizar'],
  ['pluralisieren', 'to pluralize', 'pluralizar'],
  ['singularisieren', 'to singularize', 'singularizar'],
], 'c2')

const g50 = line('adjectives', 'adj', [
  ['schwammig', 'vague fluffy', 'impreciso'],
  ['holzschnittartig', 'blunt simplistic', 'tosco y simplista'],
  ['rundheraus', 'bluntly direct', 'directo y sin rodeos'],
  ['unverblümt', 'unvarnished frank', 'franco sin rodeos'],
  ['salbungsvoll', 'unctuous', 'adulatorio'],
  ['weltfremd', 'out of touch', 'desconectado del mundo'],
  ['praxisfern', 'far from practice', 'alejado de la práctica'],
  ['praxistauglich', 'practically viable', 'viable en la práctica'],
  ['stilsicher', 'stylistically confident', 'con dominio del estilo'],
  ['wortgewandt', 'eloquent', 'elocuente'],
  ['treffend formuliert', 'aptly worded', 'bien formulado'],
  ['zutiefst irritierend', 'deeply irritating', 'profundamente irritante'],
  ['selbstverständlich wirkend', 'deceptively obvious', 'obvio de manera engañosa'],
  ['überzeichnet', 'overdrawn exaggerated', 'exagerado'],
  ['unterkühlt', 'coolly detached', 'fríamente distante'],
  ['wortkarg', 'terse', 'lacónico'],
  ['ausschweifend', 'long-winded', 'prolijo'],
  ['schlagfertig', 'quick-witted', 'ágil mentalmente'],
  ['einsilbig', 'monosyllabic terse', 'monosilábico'],
  ['weit hergeholt', 'far-fetched', 'forzado'],
  ['schlüssig', 'coherent convincing', 'coherente y convincente'],
  ['schlüssig argumentiert', 'convincingly argued', 'argumentado con solidez'],
  ['unverhofft', 'unexpected welcome', 'inesperado'],
  ['pikiert', 'miffed', 'picado'],
  ['schnoddrig', 'cheeky casual', 'descarado informal'],
  ['ruppig', 'brusque rough', 'brusco'],
  ['galant', 'gallant courteous', 'galante'],
  ['pfiffig', 'clever crafty', 'astuto'],
  ['tiefsinnig', 'profound thoughtful', 'profundo'],
  ['weltgewandt', 'worldly sophisticated', 'cosmopolita'],
  ['abberanzig', 'outlandishly odd', 'estrafalario'],
  ['unerschrocken', 'undaunted', 'intrépido'],
  ['unerschütterlich', 'unshakable', 'inquebrantable'],
  ['poetologisch', 'poetological', 'poetológico'],
  ['narratologisch', 'narratological', 'narratológico'],
  ['tropologisch', 'tropological', 'tropológico'],
  ['figural', 'figural', 'figural'],
  ['emblematisch', 'emblematic', 'emblemático'],
  ['aporethisch angelegt', 'aporetic in design', 'aporético en diseño'],
  ['palimpsestartig', 'palimpsest-like', 'como un palimpsesto'],
  ['rhizomatisch', 'rhizomatic', 'rizomático'],
  ['chaotisch geordnet', 'chaotically ordered', 'ordenado caóticamente'],
  ['fragil stabil', 'fragilely stable', 'frágilmente estable'],
  ['zeitentrückt', 'removed from time', 'ajeno al tiempo'],
  ['raumentrückt', 'removed from space', 'ajeno al espacio'],
  ['welthaltig', 'world-containing', 'rico en mundo'],
  ['sinnstiftend', 'meaning-making', 'generador de sentido'],
  ['sinnentleert', 'emptied of meaning', 'vacío de sentido'],
  ['ephemer', 'ephemeral', 'efímero'],
  ['evaneszent', 'evanescent', 'evanescente'],
  ['immanent', 'immanent', 'inmanente'],
  ['transzendent', 'transcendent', 'trascendente'],
  ['enigmatisch', 'enigmatic', 'enigmático'],
  ['hermetisch', 'hermetic', 'hermético'],
  ['esoterisch', 'esoteric', 'esotérico'],
  ['exoterisch', 'exoteric', 'exotérico'],
  ['idiosynkratisch', 'idiosyncratic', 'idiosincrásico'],
  ['quintessentiell', 'quintessential', 'quintaesencial'],
  ['aporethisch', 'aporetic', 'aporético'],
  ['performativ', 'performative', 'performativo'],
  ['autoreferentiell', 'self-referential', 'autorreferencial'],
  ['intertextuell', 'intertextual', 'intertextual'],
  ['metaphorisch', 'metaphorical', 'metafórico'],
  ['metonymisch', 'metonymic', 'metonímico'],
  ['allegorisch', 'allegorical', 'alegórico'],
  ['ironisch', 'ironic', 'irónico'],
  ['sarkastisch', 'sarcastic', 'sarcástico'],
  ['zynisch', 'cynical', 'cínico'],
  ['labyrinthisch', 'labyrinthine', 'laberíntico'],
  ['kaleidoskopisch', 'kaleidoscopic', 'caleidoscópico'],
  ['prismatisch', 'prismatic', 'prismático'],
  ['barock', 'baroque', 'barroco'],
  ['rokokoartig', 'rococo-like', 'de estilo rococó'],
  ['gotisch', 'gothic', 'gótico'],
  ['klassizistisch', 'classicist', 'clasicista'],
  ['romantisch verklärt', 'romantically idealized', 'románticamente idealizado'],
  ['manieristisch', 'mannerist', 'manierista'],
  ['expressionistisch', 'expressionist', 'expresionista'],
], 'c2')

const g51 = line('hello', 'phrase', [
  ['Das ist ein zweischneidiges Schwert', 'it is a double-edged sword', 'es una espada de dos filos'],
  ['Das geht an die Substanz', 'that cuts to the core', 'eso toca lo esencial'],
  ['Das ist nicht in Stein gemeißelt', 'not set in stone', 'no está grabado en piedra'],
  ['Da beißt die Maus keinen Faden ab', 'there is no way around it', 'ahí no hay vuelta de hoja'],
  ['Ins Schwarze treffen', 'to hit the bullseye', 'dar en el blanco'],
  ['Den Nagel auf den Kopf treffen', 'to hit the nail on the head', 'clavar el clavo'],
  ['Die Kirche im Dorf lassen', 'not exaggerate', 'no exagerar'],
  ['Mit dem Schiff nach der Hochzeit kommen', 'too little too late', 'llegar tarde'],
  ['Zwei Fliegen mit einer Klappe schlagen', 'kill two birds with one stone', 'matar dos pájaros de un tiro'],
  ['Honig um den Mund schmieren', 'to butter someone up', 'adular'],
  ['Jemandem die Zähne zeigen', 'to show teeth', 'mostrar los dientes'],
  ['Auf dem Holzweg sein', 'to be on the wrong track', 'estar en el camino equivocado'],
  ['Das Fass zum Überlaufen bringen', 'to be the last straw', 'ser la gota que colma el vaso'],
  ['Am seidenen Faden hängen', 'to hang by a thread', 'colgar de un hilo'],
  ['Die Flinte ins Korn werfen', 'to throw in the towel', 'tirar la toalla'],
  ['Kleinvieh macht auch Mist', 'small things add up', 'muchas cosas pequeñas suman'],
  ['Etwas auf die lange Bank schieben', 'to shelve something', 'postergar algo'],
  ['Den Ball flach halten', 'keep expectations realistic', 'mantener expectativas realistas'],
  ['Aus der Haut fahren', 'to blow one\'s top', 'salirse de sus casillas'],
  ['Gerade noch so', 'just barely', 'apenas'],
  ['So mittel', 'so-so lukewarm', 'regular'],
  ['Völlig aus dem Rahmen', 'completely out of line', 'totalmente fuera de lugar'],
  ['Knapp zusammenhängend', 'loosely connected', 'conexión tenue'],
  ['Damit ist das gesagt', 'that said it all', 'con eso está dicho'],
  ['Mach\'s gut', 'take care informal', 'cuídate'],
  ['Alles paletti', 'all sorted colloquial', 'todo en orden'],
  ['Na dann mal los', 'well then let\'s go', 'pues allá vamos'],
  ['Quod erat demonstrandum', 'which was to be shown', 'lo que se quería demostrar'],
  ['Summa summarum', 'all in all Latin', 'en resumen latino'],
  ['Ceteris paribus', 'other things equal', 'permaneciendo igual lo demás'],
  ['Mutatis mutandis', 'with necessary changes', 'cambiando lo que haya que cambiar'],
  ['Pars pro toto', 'part for the whole', 'la parte por el todo'],
  ['Man muss die Kirche im Dorf lassen', 'don\'t exaggerate', 'no exagerar las cosas'],
  ['Das ist nicht mein Bier', 'that\'s not my problem', 'eso no es asunto mío'],
  ['Da steppt der Bär', 'that\'s a lively party', 'ahí hay fiesta'],
  ['Ich verstehe nur Bahnhof', 'I don\'t understand a thing', 'no entiendo nada'],
  ['Das ist Schnee von gestern', 'that\'s old news', 'eso es agua pasada'],
], 'c2')

const g52 = noun('feelings', [
  ['Grübelzwang', 'compulsive rumination', 'rumiación compulsiva', 'der', ''],
  ['Schadenfreude', 'pleasure in others\' misfortune', 'schadenfreude', 'die', ''],
  ['Weltschmerz', 'world-weariness', 'melancolía existencial', 'der', ''],
  ['Fernweh', 'longing for faraway places', 'ansia de lejanía', 'das', ''],
  ['Bedrängnis', 'distress', 'angustia', 'die', 'Bedrängnisse'],
  ['Sehnsuchtsort', 'place of longing', 'lugar de añoranza', 'der', 'Sehnsuchtsorte'],
  ['Sehnsuchtsbild', 'image of longing', 'imagen de añoranza', 'das', 'Sehnsuchtsbilder'],
  ['Sehnsuchtstraum', 'dream of longing', 'sueño de añoranza', 'der', 'Sehnsuchtsträume'],
  ['Lebenshunger', 'hunger for life', 'hambre de vivir', 'der', ''],
  ['Lebensfreude', 'joy of living', 'alegría de vivir', 'die', ''],
  ['Existenzangst', 'existential anxiety', 'angustia existencial', 'die', 'Existenzängste'],
  ['Todesangst', 'fear of death', 'miedo a la muerte', 'die', 'Todesängste'],
  ['Freiheitsdrang', 'urge for freedom', 'ansia de libertad', 'der', ''],
  ['Geborgenheitsgefühl', 'sense of security', 'sentimiento de amparo', 'das', 'Geborgenheitsgefühle'],
  ['Unbehaustheit', 'unhousedness', 'desamparo existencial', 'die', ''],
  ['Lebensmüdigkeit', 'weariness of life', 'cansancio vital', 'die', ''],
  ['Todessehnsucht', 'longing for death', 'ansia de muerte', 'die', ''],
  ['Welterschöpfung', 'world exhaustion', 'agotamiento del mundo', 'die', ''],
  ['Zeitlosigkeit', 'timelessness', 'atemporalidad', 'die', ''],
  ['Raumlosigkeit', 'spacelessness', 'falta de espacio', 'die', ''],
], 'c2')

const g53 = line('feelings', 'adj', [
  ['bockig', 'stubborn mood', 'obstinado'],
  ['verschnupft', 'petulantly offended', 'ofendido y hosco'],
  ['verzagt', 'disheartened', 'desanimado'],
  ['weltschmerzlich', 'world-weary', 'lleno de hastío'],
  ['fernwehkrank', 'sick with wanderlust', 'enfermo de lejanía'],
], 'c2')

const g54 = line('feelings', 'verb', [
  ['sich vergaloppieren', 'to rush ahead foolishly', 'precipitarse'],
  ['sich einmischen', 'to meddle', 'entrometerse'],
], 'c2')

const g55 = noun('jobs', [
  ['Feinmechaniker', 'precision mechanic', 'mecánico de precisión', 'der', 'Feinmechaniker'],
  ['Kulturmanager', 'cultural manager', 'gestor cultural', 'der', 'Kulturmanager'],
  ['Mediationsbeauftragter', 'mediation officer', 'mediador designado', 'der', 'Mediationsbeauftragten'],
  ['Quereinsteiger', 'career changer', 'profesional reconvertido', 'der', 'Quereinsteiger'],
  ['Quotenregelung', 'quota regulation', 'regulación de cuotas', 'die', 'Quotenregelungen'],
], 'c2')

const g56 = line('jobs', 'phrase', [
  ['Zwischen den Stühlen sitzen', 'to fall between two stools', 'quedar entre dos aguas'],
], 'c2')

const g57 = noun('office', [
  ['Grauzone', 'gray area', 'zona gris', 'die', 'Grauzonen'],
  ['Schmutzige Wäsche', 'dirty laundry to air', 'ropa sucia', 'die', ''],
  ['Sachverhalt', 'state of facts', 'situación fáctica', 'der', 'Sachverhalte'],
  ['Leitbild', 'guiding vision', 'visión institucional', 'das', 'Leitbilder'],
  ['Habitus', 'habitus', 'habitus', 'der', 'Habitus'],
  ['Doxa', 'doxa', 'doxa', 'die', ''],
], 'c2')

const g58 = line('office', 'phrase', [
  ['Den roten Faden verlieren', 'to lose the thread', 'perder el hilo'],
  ['Die Verantwortung auf andere abwälzen', 'to shift responsibility', 'trasladar la responsabilidad'],
], 'c2')

const g59 = noun('money', [
  ['Schwarzgeld', 'black money', 'dinero negro', 'das', ''],
  ['Steuerschlupfloch', 'tax loophole', 'laguna fiscal', 'das', 'Steuerschlupflöcher'],
  ['Pfennigfuchser', 'penny pincher', 'tacaño extremo', 'der', 'Pfennigfuchser'],
  ['Pfändung', 'garnishment', 'embargo salarial', 'die', 'Pfändungen'],
  ['Finanzialisierung', 'financialization', 'financierización', 'die', ''],
  ['Prekarisierung', 'precarization', 'precarización', 'die', ''],
  ['Akkumulation', 'accumulation', 'acumulación', 'die', 'Akkumulationen'],
], 'c2')

const g60 = line('money', 'phrase', [
  ['Das Geld locker sitzen haben', 'to be flush with money', 'tener dinero holgado'],
], 'c2')

const g61 = noun('health', [
  ['Hausarztpraxis', 'general practice clinic', 'consultorio de médico general', 'die', 'Hausarztpraxen'],
  ['Belastungsgrenze', 'stress limit', 'límite de carga', 'die', 'Belastungsgrenzen'],
], 'c2')

const g62 = line('health', 'phrase', [
  ['Auf eigenen Nacken behandeln', 'to treat at own risk', 'tratar por cuenta propia'],
], 'c2')

const g63 = noun('nature', [
  ['Frühjahrsputz', 'spring cleanup', 'limpieza de primavera', 'der', ''],
  ['Aprilwetter', 'April weather', 'cambios de clima de abril', 'das', ''],
  ['Moorlandschaft', 'moor landscape', 'paisaje de turbera', 'die', 'Moorlandschaften'],
  ['Gaia-Hypothese', 'Gaia hypothesis', 'hipótesis Gaia', 'die', ''],
  ['Tiefengeologie', 'deep geology', 'geología profunda', 'die', ''],
  ['Kryosphäre', 'cryosphere', 'criosfera', 'die', 'Kryosphären'],
  ['Pedosphäre', 'pedosphere', 'pedosfera', 'die', 'Pedosphären'],
  ['Noosphäre', 'noosphere', 'noosfera', 'die', 'Noosphären'],
  ['Entropie', 'entropy', 'entropía', 'die', 'Entropien'],
  ['Emergenz', 'emergence', 'emergencia sistémica', 'die', 'Emergenzen'],
  ['Autopoiesis', 'autopoiesis', 'autopoyesis', 'die', ''],
], 'c2')

const g64 = line('nature', 'phrase', [
  ['Wie Pilze aus dem Boden schießen', 'to mushroom everywhere', 'brotar como hongos'],
], 'c2')

const g65 = noun('materials', [
  ['Schindeln', 'roof shingles', 'tejas de madera', 'die', ''],
  ['Mörtel', 'mortar binding', 'mortero', 'der', 'Mörtel'],
  ['Dämmstoff', 'insulation material', 'material aislante', 'der', 'Dämmstoffe'],
], 'c2')

const g66 = line('materials', 'adj', [
  ['brüchig', 'brittle crumbly', 'quebradizo'],
], 'c2')

const g67 = noun('tech', [
  ['Funkloch', 'coverage dead zone', 'zona sin cobertura', 'das', 'Funklöcher'],
  ['Datenmüll', 'data junk', 'basura digital', 'der', ''],
  ['Firmware', 'firmware', 'firmware', 'die', ''],
  ['Endgerät', 'end device', 'dispositivo final', 'das', 'Endgeräte'],
  ['Singularität', 'singularity', 'singularidad tecnológica', 'die', 'Singularitäten'],
  ['Kybernetik', 'cybernetics', 'cibernética', 'die', ''],
  ['Telematik', 'telematics', 'telemática', 'die', ''],
], 'c2')

const g68 = line('tech', 'phrase', [
  ['Offline gehen', 'to go offline', 'desconectarse'],
], 'c2')

const g69 = noun('school', [
  ['Blaupause', 'blueprint master copy', 'plano maestro', 'die', 'Blaupausen'],
  ['Semesterarbeit', 'semester paper', 'trabajo semestral', 'die', 'Semesterarbeiten'],
  ['Ideengeschichte', 'history of ideas', 'historia de las ideas', 'die', ''],
  ['Begriffsgeschichte', 'conceptual history', 'historia conceptual', 'die', ''],
  ['Mentalitätsgeschichte', 'history of mentalities', 'historia de mentalidades', 'die', ''],
  ['Alltagsgeschichte', 'history of everyday life', 'historia de lo cotidiano', 'die', ''],
  ['Mikrogeschichte', 'microhistory', 'microhistoria', 'die', 'Mikrogeschichten'],
  ['Semiotik', 'semiotics', 'semiótica', 'die', 'Semiotiken'],
  ['Ästhetik', 'aesthetics', 'estética', 'die', 'Ästhetiken'],
  ['Poetik', 'poetics', 'poética', 'die', 'Poetiken'],
  ['Rhetorik', 'rhetoric', 'retórica', 'die', 'Rhetoriken'],
  ['Aporetik', 'aporetics', 'aporética', 'die', ''],
  ['Dialektik', 'dialectic', 'dialéctica', 'die', 'Dialektiken'],
], 'c2')

const g70 = line('school', 'phrase', [
  ['Mit spitzen Fingern anfassen', 'to handle with kid gloves', 'tratar con sumo cuidado'],
  ['Das bleibt abzuwarten', 'that remains to be seen', 'eso queda por ver'],
], 'c2')

const g71 = line('hello', 'other', [
  ['sozusagen', 'so to speak', 'por así decirlo'],
  ['gewissermaßen', 'in a certain sense', 'en cierto sentido'],
  ['gleichsam', 'as it were', 'como quien dice'],
  ['wohlwollend', 'benevolently', 'benevolentemente'],
], 'c2')

const g72 = line('feelings', 'phrase', [
  ['Mir fällt ein Stein vom Herzen', 'a weight off my shoulders', 'me cae una losa del corazón'],
], 'c2')

const g73 = noun('travel', [
  ['Ankunftshalle', 'arrival hall', 'sala de llegadas', 'die', 'Ankunftshallen'],
  ['Zeitzonenwechsel', 'time zone change', 'cambio de huso horario', 'der', 'Zeitzonenwechsel'],
], 'c2')

const g74 = noun('city', [
  ['Hinterhof', 'back courtyard', 'patio trasero', 'der', 'Hinterhöfe'],
  ['Bezirk', 'borough district', 'distrito', 'der', 'Bezirke'],
], 'c2')

const g75 = noun('transport', [
  ['Scharte', 'dent in timetables', 'hueco en horarios', 'die', 'Scharten'],
  ['Pendlerstrecke', 'commute route', 'trayecto de desplazamiento', 'die', 'Pendlerstrecken'],
], 'c2')

const g76 = noun('weather', [
  ['Schneetreiben', 'blowing snow', 'ventisca de nieve', 'das', ''],
], 'c2')

const g77 = line('time', 'other', [
  ['gelegentlich mal', 'every now and then', 'de vez en cuando'],
], 'c2')

const g78 = noun('shop', [
  ['Schnäppchenjäger', 'bargain hunter', 'cazador de gangas', 'der', 'Schnäppchenjäger'],
  ['Filialnetz', 'store chain network', 'red de tiendas', 'das', 'Filialnetze'],
], 'c2')

const g79 = line('hobbies', 'phrase', [
  ['Aus dem Stehgreif vortragen', 'to speak off the cuff', 'improvisar al hablar'],
], 'c2')

const g80 = noun('music', [
  ['Gehörbildung', 'ear training', 'entrenamiento auditivo', 'die', ''],
  ['Kontrapunkt', 'counterpoint', 'contrapunto', 'der', 'Kontrapunkte'],
  ['Polyphonie', 'polyphony', 'polifonía', 'die', 'Polyphonien'],
  ['Homophonie', 'homophony', 'homofonía', 'die', 'Homophonien'],
  ['Dissonanz', 'dissonance', 'disonancia', 'die', 'Dissonanzen'],
  ['Konsonanz', 'consonance', 'consonancia', 'die', 'Konsonanzen'],
], 'c2')

const g81 = line('sport', 'phrase', [
  ['Auf der Zielgeraden sein', 'on the home stretch', 'en la recta final'],
], 'c2')

const g82 = noun('garden', [
  ['Laube', 'arbor garden house', 'glorieta', 'die', 'Lauben'],
  ['Rasenkante', 'lawn edge', 'borde del césped', 'die', 'Rasenkanten'],
], 'c2')

const g83 = noun('tools', [
  ['Schraubstock', 'vise', 'tornillo de banco', 'der', 'Schraubstöcke'],
  ['Meißel', 'chisel', 'cincel', 'der', 'Meißel'],
], 'c2')

const g84 = line('health', 'adj', [
  ['schlapp', 'weak sluggish', 'flojo'],
], 'c2')

const g85 = line('office', 'adj', [
  ['bürokratisch', 'bureaucratic', 'burocrático'],
], 'c2')

const g86 = line('school', 'adj', [
  ['stofflich dense', 'content-dense', 'denso en contenido'],
], 'c2')

const g87 = line('family', 'phrase', [
  ['Kind vor die Wand fahren', 'to clash with one\'s child', 'chocar con el hijo'],
], 'c2')

const g88 = noun('body', [
  ['Nackenverspannung', 'neck tension', 'tensión cervical', 'die', 'Nackenverspannungen'],
  ['Augenringe', 'dark under-eye circles', 'ojeras', 'die', ''],
], 'c2')

const g89 = line('house', 'phrase', [
  ['Alles unter einem Dach', 'all under one roof', 'todo bajo un mismo techo'],
], 'c2')

const g90 = line('food', 'phrase', [
  ['Bauch voll Kopf leer', 'stuffed belly empty head', 'barriga llena cabeza vacía'],
], 'c2')

const g91 = line('drinks', 'phrase', [
  ['Einen kurzen trinken', 'to have a quick drink', 'tomar un traguito'],
], 'c2')

const g92 = noun('lands', [
  ['Heimatgefühl', 'sense of homeland', 'sentido de hogar', 'das', ''],
], 'c2')

const g93 = noun('bath', [
  ['Kalkablagerung', 'limescale buildup', 'acumulación de cal', 'die', 'Kalkablagerungen'],
], 'c2')

const g94 = line('clothes', 'adj', [
  ['schickimicki', 'flashy pretentious', 'pijo'],
], 'c2')

const g95 = line('animals', 'phrase', [
  ['Da liegt der Hund begraben', 'that is the crux', 'ahí está el meollo'],
], 'c2')

const g96 = line('numbers', 'other', [
  ['auf den Cent genau', 'down to the cent', 'al céntimo'],
], 'c2')

const g97 = line('colors', 'phrase', [
  ['In Schwarz-Weiß denken', 'to think in black and white', 'pensar en blanco y negro'],
], 'c2')

const g98 = line('kitchen', 'phrase', [
  ['Mit der Gabel auf den Teller trommeln', 'to drum on plate impatiently', 'golpear el plato impaciente'],
], 'c2')

const g99 = noun('furniture', [
  ['Sitzecke', 'cozy seating nook', 'rincón de estar', 'die', 'Sitzecke'],
], 'c2')

const g100 = line('shapes', 'other', [
  ['rundherum', 'all around everywhere', 'por todas partes'],
], 'c2')

const g101 = line('feelings', 'other', [
  ['müde bis auf die Knochen', 'bone tired', 'muerto de cansancio'],
], 'c2')

const g102 = noun('hobbies', [
  ['Modellbauclub', 'model building club', 'club de modelismo', 'der', 'Modellbauclubs'],
  ['Kalligrafie', 'calligraphy', 'caligrafía', 'die', 'Kalligrafien'],
  ['Origami', 'origami', 'origami', 'das', ''],
  ['Ikebana', 'ikebana', 'ikebana', 'das', ''],
  ['Bonsai', 'bonsai', 'bonsái', 'der', 'Bonsais'],
  ['Aquarellmalerei', 'watercolor painting', 'acuarela pintura', 'die', ''],
], 'c2')

const g103 = noun('sport', [
  ['Trainingspensum', 'training load', 'carga de entrenamiento', 'das', 'Trainingspensum'],
], 'c2')

const g104 = line('lands', 'other', [
  ['Kurdistan', 'Kurdistan region', 'Kurdistán'],
  ['Patagonien', 'Patagonia', 'Patagonia'],
  ['Sibirien', 'Siberia', 'Siberia'],
  ['Skandinavien', 'Scandinavia', 'Escandinavia'],
  ['Balkan', 'Balkans', 'Balcanes'],
], 'c2')

export const PART_G: Draft[] = [
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
  ...g97,
  ...g98,
  ...g99,
  ...g100,
  ...g101,
  ...g102,
  ...g103,
  ...g104,
]
