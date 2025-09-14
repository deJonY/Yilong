// src/lib/i18nAliases.ts

export const SECTION_ID_ALIASES: Record<string, string> = {
  "reklamno-vystavochnoe": "reklamnoe-i-vystavochnoe-oborudovanie",
  "alyuminievye-profily": "alyuminievye-profili",
  "alyuminievye-profilya-i-komplektuyushchie": "alyuminievye-profili",
  "metal-i-plast-furnitura": "metallicheskaya-i-plastiknaya-furnitura",
  "rulon-materialy": "rulonnye-materialy",
  "rulonnye-materialy": "rulonnye-materialy",
  "istochniki-sveta": "istochniki-sveta",
  "transformatory-i-upravlenie": "transformatory-i-upravlenie",
  "chernila-kraski": "chernila-kraski",
  "kleevye-resheniya": "kleevye-resheniya",
  "instrumenty": "instrumenty",
  "frezy-i-gravery": "frezy-i-gravery",
  "listovye-materialy": "listovye-materialy"
};

export const CATEGORY_ID_ALIASES: Record<string, Record<string, string>> = {
  "rulonnye-materialy": {
    "bannernaya-tkan": "bannernaya-tkan",
    "materialy-dlya-pechati": "materialy-dlya-pechati",
    "tentovaya-tkan": "tentovaya-tkan",
    "plenki-dlya-laminirovaniya": "plenki-dlya-laminirovaniya",
    "tsvetnaya-samokleyushchayasya-plenka": "tsvetnaya-samokleyushchayasya-plenka",
    "montazhnye-plenki": "montazhnye-plenki",
    "vitrazhnye-plenki": "vitrazhnye-plenki",
    "magnitnyy-vinil": "magnitnyy-vinil",
    "oboi-dlya-pechati": "oboi-dlya-pechati",
    "banner-tkan": "bannernaya-tkan",
    "oboi-pechati": "oboi-dlya-pechati",
    "plenki-laminirovaniya": "plenki-dlya-laminirovaniya",
    "montazhnyye-plenki": "montazhnye-plenki",
    "magnitnyj-vinil": "magnitnyy-vinil",
    "tent-tkan": "tentovaya-tkan"
  },

  "istochniki-sveta": {
    "led-prozhektory": "led-prozhektory",
    "moduli-svetodiodnye": "moduli-svetodiodnye",
    "svetodiodnye-lenty": "svetodiodnye-lenty",
    "led-prozhektory-sofity": "led-prozhektory",
    "svetodiodnye-lenty-led": "svetodiodnye-lenty"
  },

  "transformatory-i-upravlenie": {
    "transformatory-vnutrennie": "transformatory-vnutrennie",
    "kontrollery-dimmeri": "kontrollery-dimmeri",
    "chernila-kraski": "chernila-kraski"
  },

  "chernila-kraski": {
    "solventnye-kraski": "solventnye-kraski",
    "ekosolventnye-kraski": "ekosolventnye-kraski",
    "solvent": "solventnye-kraski",
    "ecosolvent": "ekosolventnye-kraski"
  },

  "reklamnoe-i-vystavochnoe-oborudovanie": {
    "pop-up-stendy": "pop-up-stendy",
    "x-konstruktsii": "x-konstruktsii",
    "roll-stendy": "roll-stendy",
    "promostoly": "promostoly",
    "flagi": "flagi",
    "posm-materialy": "posm-materialy",
    "profily-alyuminievye": "profili-alyuminievye",
    "komplektuyushchie-dlya-profilya": "komplektuyushchie-dlya-profily",
    "profil-dlya-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent"
  },

  "alyuminievye-profili": {
    "profily-alyuminievye": "profili-alyuminievye",
    "komplektuyushchie-dlya-profily": "komplektuyushchie-dlya-profily",
    "komplektuyushchie-dlya-profilya": "komplektuyushchie-dlya-profily",
    "alyuminievye-profili-dlya-svetodiodnyh-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent",
    "profil-dlya-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent"
  },

  "kleevye-resheniya": {
    "klei": "klei",
    "skotch": "skotch"
  },

  "metallicheskaya-i-plastiknaya-furnitura": {
    "kaima-plastiknaya": "kaima-plastiknaya",
    "kajma-plastikovaya": "kaima-plastiknaya",
    "metallicheskaya-furnitura": "metallicheskaya-furnitura",
    "metal-furnitura": "metallicheskaya-furnitura",
    "neodimovye-magnity": "neodimovye-magnity"
  },

  "instrumenty": {
    "ruchnye-instrumenty": "ruchnye-instrumenty",
    "postpechatnye-instrumenty": "postpechatnye-instrumenty"
  },

  "frezy-i-gravery": {
    "frezy": "frezy",
    "gravery": "gravery"
  }
};

export const canonSectionId = (id: string) =>
  SECTION_ID_ALIASES[id] ?? id;

export const canonCategoryId = (sectionId: string, categoryId: string) => {
  const s = canonSectionId(sectionId);
  return CATEGORY_ID_ALIASES[s]?.[categoryId] ?? categoryId;
};
