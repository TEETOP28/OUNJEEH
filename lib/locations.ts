// Nigerian states and their major cities/local government areas
export interface LocationData {
  [state: string]: string[];
}

export const NIGERIAN_LOCATIONS: LocationData = {
  "Abia": ["Aba", "Umuahia", "Arochukwu", "Ohafia", "Bende", "Isiala Ngwa"],
  "Adamawa": ["Yola", "Mubi", "Jimeta", "Numan", "Ganye", "Gombi"],
  "Akwa Ibom": ["Uyo", "Ikot Ekpene", "Eket", "Oron", "Abak", "Ikot Abasi"],
  "Anambra": ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Agulu", "Ihiala"],
  "Bauchi": ["Bauchi", "Azare", "Misau", "Jama'are", "Katagum", "Ningi"],
  "Bayelsa": ["Yenagoa", "Brass", "Sagbama", "Ogbia", "Nembe", "Ekeremor"],
  "Benue": ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala", "Oturkpo", "Vandeikya"],
  "Borno": ["Maiduguri", "Bama", "Biu", "Dikwa", "Gubio", "Gwoza"],
  "Cross River": ["Calabar", "Ogoja", "Ikom", "Obudu", "Ugep", "Akamkpa"],
  "Delta": ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor", "Kwale"],
  "Ebonyi": ["Abakaliki", "Afikpo", "Onueke", "Ezza", "Ishielu", "Ikwo"],
  "Edo": ["Benin City", "Auchi", "Ekpoma", "Uromi", "Irrua", "Igarra"],
  "Ekiti": ["Ado Ekiti", "Ikere", "Efon Alaaye", "Ijero", "Omuo Ekiti", "Ise Ekiti"],
  "Enugu": ["Enugu", "Nsukka", "Oji River", "Agbani", "Awgu", "Udi"],
  "FCT": ["Abuja", "Gwagwalada", "Kubwa", "Kuje", "Nyanya", "Lugbe", "Maitama", "Asokoro"],
  "Gombe": ["Gombe", "Kumo", "Deba", "Billiri", "Kaltungo", "Nafada"],
  "Imo": ["Owerri", "Orlu", "Okigwe", "Oguta", "Mbaise", "Nkwerre"],
  "Jigawa": ["Dutse", "Hadejia", "Gumel", "Birnin Kudu", "Kazaure", "Ringim"],
  "Kaduna": ["Kaduna", "Zaria", "Kafanchan", "Kagoro", "Saminaka", "Lere"],
  "Kano": ["Kano", "Wudil", "Bichi", "Gwarzo", "Rano", "Kiru"],
  "Katsina": ["Katsina", "Daura", "Funtua", "Malumfashi", "Dutsin-Ma", "Kankia"],
  "Kebbi": ["Birnin Kebbi", "Argungu", "Jega", "Yauri", "Zuru", "Gwandu"],
  "Kogi": ["Lokoja", "Okene", "Idah", "Kabba", "Ankpa", "Koton Karfe"],
  "Kwara": ["Ilorin", "Offa", "Jebba", "Lafiagi", "Patigi", "Share"],
  "Lagos": ["Ikeja", "Lagos Island", "Victoria Island", "Lekki", "Ikorodu", "Epe", "Badagry", "Ajah", "Surulere", "Yaba"],
  "Nasarawa": ["Lafia", "Keffi", "Akwanga", "Nasarawa", "Doma", "Karu"],
  "Niger": ["Minna", "Bida", "Kontagora", "Suleja", "Lapai", "New Bussa"],
  "Ogun": ["Abeokuta", "Ijebu Ode", "Sagamu", "Ilishan Remo", "Ota", "Ilaro", "Ayetoro", "Ijebu Igbo"],
  "Ondo": ["Akure", "Ondo", "Owo", "Ore", "Ikare", "Okitipupa"],
  "Osun": ["Osogbo", "Ile Ife", "Ilesa", "Ede", "Iwo", "Ejigbo"],
  "Oyo": ["Ibadan", "Ogbomoso", "Oyo", "Iseyin", "Saki", "Eruwa"],
  "Plateau": ["Jos", "Bukuru", "Pankshin", "Shendam", "Langtang", "Mangu"],
  "Rivers": ["Port Harcourt", "Obio-Akpor", "Eleme", "Okrika", "Bonny", "Degema"],
  "Sokoto": ["Sokoto", "Tambuwal", "Gwadabawa", "Wurno", "Goronyo", "Bodinga"],
  "Taraba": ["Jalingo", "Wukari", "Bali", "Ibi", "Takum", "Gembu"],
  "Yobe": ["Damaturu", "Potiskum", "Gashua", "Nguru", "Geidam", "Buni Yadi"],
  "Zamfara": ["Gusau", "Kaura Namoda", "Talata Mafara", "Bungudu", "Anka", "Tsafe"]
};

// Get all states as array
export const getStates = (): string[] => {
  return Object.keys(NIGERIAN_LOCATIONS).sort();
};

// Get cities for a specific state
export const getCitiesByState = (state: string): string[] => {
  return NIGERIAN_LOCATIONS[state] || [];
};
