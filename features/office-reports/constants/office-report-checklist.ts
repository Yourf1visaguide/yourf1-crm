export const OFFICE_REPORT_CHECKLIST = [
  {
    key: "reception_clean",
    category: "CLEANLINESS",
    label: "Reception area clean",
  },
  {
    key: "floor_clean",
    category: "CLEANLINESS",
    label: "Floors and common areas clean",
  },
  {
    key: "washroom_clean",
    category: "CLEANLINESS",
    label: "Washroom clean",
  },
  {
    key: "pantry_clean",
    category: "CLEANLINESS",
    label: "Pantry clean",
  },
  {
    key: "beverage_area_clean",
    category: "CLEANLINESS",
    label: "Soda / beverage area clean",
  },
  {
    key: "dustbins_empty",
    category: "CLEANLINESS",
    label: "Dustbins emptied",
  },

  {
    key: "drinking_water",
    category: "FACILITIES",
    label: "Drinking water available",
  },
  {
    key: "washroom_supplies",
    category: "FACILITIES",
    label: "Washroom supplies available",
  },
  {
    key: "lights_working",
    category: "FACILITIES",
    label: "Lights working",
  },
  {
    key: "ac_fans_working",
    category: "FACILITIES",
    label: "AC / fans working",
  },
  {
    key: "internet_working",
    category: "FACILITIES",
    label: "Internet working",
  },

  {
    key: "printer_working",
    category: "EQUIPMENT",
    label: "Printer working",
  },
  {
    key: "scanner_working",
    category: "EQUIPMENT",
    label: "Scanner working",
  },
  {
    key: "reception_computer",
    category: "EQUIPMENT",
    label: "Reception computer working",
  },
  {
    key: "cctv_working",
    category: "EQUIPMENT",
    label: "CCTV / security system working",
  },
] as const;

export const OFFICE_REPORT_ITEM_KEYS = OFFICE_REPORT_CHECKLIST.map(
    (item) => item.key, ) as 
    [
    (typeof OFFICE_REPORT_CHECKLIST)[number]["key"],
    ...Array<(typeof OFFICE_REPORT_CHECKLIST)[number]["key"]>,
  ];