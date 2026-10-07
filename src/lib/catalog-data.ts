export interface CatalogProduct {
  id: string;
  srNo: number;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  specifications: { name: string; value: string }[];
  isFeatured: boolean;
  isAvailable: boolean;
  enquiryEnabled: boolean;
  legalMetrologyCert?: string;
}

export interface CatalogCategory {
  name: string;
  slug: string;
  description: string;
  iconName: string;
  order: number;
}

export interface CatalogService {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  licenseNo?: string;
}

export interface CatalogClient {
  id?: string;
  name: string;
  industry: string;
  location?: string;
  logoUrl?: string;
  logoText?: string;
  order?: number;
  isActive?: boolean;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  legalMetrologyLicNo: string;
  gstNo: string;
  msmeNo: string;
  primaryEmail: string;
  phoneOffice: string;
  phoneMobile: string;
  whatsAppNumber: string;
  address: string;
  aboutText: string;
}

export const COMPANY_INFO: CompanySettings = {
  companyName: "JESS ENTERPRISES",
  tagline: "Innovative Services",
  legalMetrologyLicNo: "22000126 - CLM",
  gstNo: "30AZCPG5317P1ZG",
  msmeNo: "UDYAM-GA-01-0024091 (Micro)",
  primaryEmail: "jess.enterprises14@gmail.com",
  phoneOffice: "9225901519",
  phoneMobile: "9158391519",
  whatsAppNumber: "919225901519",
  address: "Goa, India",
  aboutText:
    "JESS ENTERPRISES is a professional company established to deliver best services to its Clients. We look forward to a mutually beneficial business association with your esteemed organization.",
};

export const CATEGORIES: CatalogCategory[] = [
  {
    name: "Analytical & Lab Instruments",
    slug: "analytical-lab-instruments",
    description: "High-precision laboratory analytical meters, spectrophotometers, refractometers, and diagnostic units.",
    iconName: "FlaskConical",
    order: 1,
  },
  {
    name: "Weighing & Legal Metrology",
    slug: "weighing-legal-metrology",
    description: "Authorized balances, crane scales, moisture analyzers, and NABL certified standard reference weights.",
    iconName: "Scale",
    order: 2,
  },
  {
    name: "Thermal & Environmental Equipment",
    slug: "thermal-environmental",
    description: "Controlled temperature water baths, muffle furnaces, ice flakers, and BOD incubators.",
    iconName: "Thermometer",
    order: 3,
  },
  {
    name: "Sample Preparation & Mixing",
    slug: "sample-prep-mixing",
    description: "Ultrasonic cleaners, probe sonicators, ceramic magnetic stirrers, shakers, and centrifuges.",
    iconName: "RotateCw",
    order: 4,
  },
  {
    name: "Custom Fabrication & Storage",
    slug: "custom-fabrication-storage",
    description: "Custom Stainless Steel (SS), Mild Steel (MS), Acrylic, PVC, Teflon, Polycarbonate fabrication & column storage.",
    iconName: "Boxes",
    order: 5,
  },
];

export const PRODUCTS: CatalogProduct[] = [
  {
    id: "prod-1",
    srNo: 1,
    name: "Nano Bio-Spectrophotometer & Spectrophotometer",
    slug: "nano-bio-spectrophotometer-spectrophotometer",
    categorySlug: "analytical-lab-instruments",
    categoryName: "Analytical & Lab Instruments",
    shortDescription: "High precision spectrophotometer for Nucleic Acid, Protein, and UV-Vis Double/Single Beam spectrum analysis.",
    fullDescription: "Nano Bio-Spectrophotometer and UV-Vis Spectrophotometer designed for quantitative nucleic acid and protein assays. Offers selectable beam configurations and variable bandwidth options for analytical and biochemical laboratory research.",
    images: ["/images/products/spectrophotometer.jpg"],
    specifications: [
      { name: "Target Analytes", value: "Nucleic Acid, Protein" },
      { name: "Beam Configuration", value: "UV-Vis Double / Single Beam" },
      { name: "Variable Bandwidth (BW)", value: "0.5 / 1.0 / 2 / ... 10 nm" },
      { name: "Application Area", value: "Biochemical research & pharmaceutical QC" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-2",
    srNo: 2,
    name: "Ion / pH Meter / Conductivity / TDS / DO",
    slug: "ion-ph-meter-conductivity-tds-do",
    categorySlug: "analytical-lab-instruments",
    categoryName: "Analytical & Lab Instruments",
    shortDescription: "Multi-parameter electrochemistry benchtop meter with 5-point calibration and 500-data memory storage.",
    fullDescription: "Comprehensive multi-parameter electrochemistry instrument for measuring pH, Ion concentration, Conductivity, Total Dissolved Solids (TDS), and Dissolved Oxygen (DO). Features high-resolution measurement options and a large clear display.",
    images: ["/images/products/ph_meter.jpg"],
    specifications: [
      { name: "Calibration Points", value: "5 point calibration" },
      { name: "Resolution", value: "0.001 / 0.01 & 0.1 Resolution" },
      { name: "Data Memory Storage", value: "500 data memory records" },
      { name: "Display Type", value: "Big Digital Display" },
      { name: "Parameters Measured", value: "pH, Ion, Conductivity, TDS, Dissolved Oxygen (DO)" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-3",
    srNo: 3,
    name: "Density Meter Kit",
    slug: "density-meter-kit",
    categorySlug: "analytical-lab-instruments",
    categoryName: "Analytical & Lab Instruments",
    shortDescription: "Specialized kit for accurate density determination of solid samples in analytical laboratories.",
    fullDescription: "Precision density meter kit engineered for buoyancy-based and displacement density measurements of solid materials, polymers, and raw chemical samples.",
    images: ["/images/products/density_meter.jpg"],
    specifications: [
      { name: "Function", value: "Density determination of solid samples" },
      { name: "Sample Compatibility", value: "Solid raw materials, polymers, solids" },
      { name: "Measurement Technique", value: "Precision hydrostatic balance method" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-4",
    srNo: 4,
    name: "Polarimeter",
    slug: "polarimeter",
    categorySlug: "analytical-lab-instruments",
    categoryName: "Analytical & Lab Instruments",
    shortDescription: "Automatic polarimeter with 6-time repeat measurement and automatic average calculation.",
    fullDescription: "Automated digital polarimeter for measuring optical rotation of optically active substances in pharmaceutical, sugar, and chemical laboratories.",
    images: ["/images/products/polarimeter.jpg"],
    specifications: [
      { name: "Measurement Mode", value: "Automatic measurement of 6 times" },
      { name: "Calculation", value: "Automatic average value calculation" },
      { name: "Application", value: "Chiral analysis, optical purity, sugar concentration" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-5",
    srNo: 5,
    name: "Refractometer – Touch Screen",
    slug: "refractometer-touch-screen",
    categorySlug: "analytical-lab-instruments",
    categoryName: "Analytical & Lab Instruments",
    shortDescription: "Touch screen digital refractometer with 1024 result memory and ultra-fast 2-second reading time.",
    fullDescription: "High-speed touchscreen digital refractometer designed for rapid refractive index and Brix measurements with onboard data retention for quality control.",
    images: ["/images/products/refractometer.jpg"],
    specifications: [
      { name: "User Interface", value: "Touch Screen Interface" },
      { name: "Memory Capacity", value: "Up to 1024 result records" },
      { name: "Reading Speed", value: "Fast reading time of 2 seconds" },
      { name: "Application", value: "Chemical, food, beverage & pharma QC" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-6",
    srNo: 6,
    name: "Viscometer",
    slug: "viscometer",
    categorySlug: "analytical-lab-instruments",
    categoryName: "Analytical & Lab Instruments",
    shortDescription: "Digital viscometer with auto range function, direct viscosity readout, and temperature display.",
    fullDescription: "Precision rotational viscometer featuring automatic range selection, continuous viscosity readout, and integrated temperature display for fluid rheology analysis.",
    images: ["/images/products/viscometer.jpg"],
    specifications: [
      { name: "Range Selection", value: "Auto range function" },
      { name: "Readout Display", value: "Direct viscosity reading & Temperature display" },
      { name: "Fluid Testing", value: "Oils, polymers, solutions, paints & syrups" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-7",
    srNo: 7,
    name: "Probe Sonicator",
    slug: "probe-sonicator",
    categorySlug: "sample-prep-mixing",
    categoryName: "Sample Preparation & Mixing",
    shortDescription: "Ultrasonic homogenizer probe sonicator with processing capacity from 1.8 to 25 liters.",
    fullDescription: "High-intensity probe sonicator for ultrasonic cell disruption, emulsification, nanoparticle dispersion, and liquid degassing across medium to large batch volumes.",
    images: ["/images/products/probe_sonicator.jpg"],
    specifications: [
      { name: "Volume Capacity", value: "1.8 to 25 liters" },
      { name: "Process Method", value: "High-intensity ultrasonic probe" },
      { name: "Applications", value: "Cell lysis, nano-dispersion, emulsification" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-8",
    srNo: 8,
    name: "Ultrasonic Cleaner",
    slug: "ultrasonic-cleaner",
    categorySlug: "sample-prep-mixing",
    categoryName: "Sample Preparation & Mixing",
    shortDescription: "Industrial and lab ultrasonic bath cleaner with tank capacities from 6 to 25 liters.",
    fullDescription: "Robust stainless steel ultrasonic bath cleaner for thorough cleaning of intricate glass items, test sieves, surgical tools, and precision mechanical components.",
    images: ["/images/products/ultrasonic_cleaner.jpg"],
    specifications: [
      { name: "Tank Capacity", value: "6 to 25 liters" },
      { name: "Construction", value: "Stainless Steel tank & transducer cavity" },
      { name: "Cleaning Action", value: "Ultrasonic cavitation agitation" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-9",
    srNo: 9,
    name: "Ice Flaker / Ice Maker",
    slug: "ice-flaker-ice-maker",
    categorySlug: "thermal-environmental",
    categoryName: "Thermal & Environmental Equipment",
    shortDescription: "Fully automatic microprocessor desktop ice flaker with low water and ice full indicators.",
    fullDescription: "Desktop microprocessor-controlled ice flaking machine for generating continuous flake ice used in biological sample storage, enzyme preservation, and chemical reaction temperature control.",
    images: ["/images/products/ice_flaker.jpg"],
    specifications: [
      { name: "Control System", value: "Fully Automatic Microprocessor" },
      { name: "Form Factor", value: "Compact Desk top design" },
      { name: "Safety Indicators", value: "'Low water level' indication, 'Ice Full' indicator" },
      { name: "Ice Type", value: "Flaked Ice" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-10",
    srNo: 10,
    name: "Ceramic Magnetic Stirrer",
    slug: "ceramic-magnetic-stirrer",
    categorySlug: "sample-prep-mixing",
    categoryName: "Sample Preparation & Mixing",
    shortDescription: "Hotplate magnetic stirrer with chemical-resistant ceramic top, up to 2000ml volume and 300°C.",
    fullDescription: "Laboratory ceramic hotplate magnetic stirrer offering high thermal efficiency, speed control up to 1250 rpm, and heating capabilities up to 300°C.",
    images: ["/images/products/magnetic_stirrer.jpg"],
    specifications: [
      { name: "Max Volume Capacity", value: "2000 ml" },
      { name: "Max Temperature", value: "300 °C" },
      { name: "Stirring Speed", value: "Up to 1250 rpm" },
      { name: "Top Plate Material", value: "Chemical resistant Ceramic plate" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-11",
    srNo: 11,
    name: "Lab & Industrial Balances",
    slug: "lab-industrial-balances",
    categorySlug: "weighing-legal-metrology",
    categoryName: "Weighing & Legal Metrology",
    shortDescription: "High accuracy laboratory analytical balances and heavy-duty industrial weighing balances.",
    fullDescription: "Complete lineup of precision analytical, micro, precision top-loading, and heavy industrial platform balances. Full support for Legal Metrology stamping, verification, and Annual Maintenance Contracts (AMC).",
    images: ["/images/products/lab_balance.jpg"],
    specifications: [
      { name: "Balance Class", value: "Lab Analytical & Industrial Heavy Duty" },
      { name: "Metrology Authorization", value: "Authorised Legal Metrology Lic.No. 22000126 - CLM" },
      { name: "Service Offerings", value: "AMC, L&M Stamping, Anti-Vibration Pad & Table" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
    legalMetrologyCert: "Lic.No. 22000126 - CLM Authorised",
  },
  {
    id: "prod-12",
    srNo: 12,
    name: "Crane Scale",
    slug: "crane-scale",
    categorySlug: "weighing-legal-metrology",
    categoryName: "Weighing & Legal Metrology",
    shortDescription: "Heavy-duty industrial hanging crane scale, 5 Ton to 10 Ton capacity with wireless indicator.",
    fullDescription: "Rugged industrial crane scale for overhead weighing operations in factories and warehouses. Features wireless remote display unit and high-capacity rechargeable battery pack.",
    images: ["/images/products/crane_scale.jpg"],
    specifications: [
      { name: "Capacity Range", value: "5 Ton to 10 Ton" },
      { name: "Indicator Unit", value: "Wireless handheld/desktop indicator" },
      { name: "Power Source", value: "Rechargeable internal battery pack" },
      { name: "Build Quality", value: "Heavy-duty industrial alloy body" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-13",
    srNo: 13,
    name: "Moisture Analyzer",
    slug: "moisture-analyzer",
    categorySlug: "weighing-legal-metrology",
    categoryName: "Weighing & Legal Metrology",
    shortDescription: "Precision halogen heating moisture determination balance with 0.01mg / 1mg display resolution.",
    fullDescription: "Halogen heating moisture analyzer for rapid loss-on-drying (LOD) moisture content analysis in pharma powders, food samples, granules, and organic materials.",
    images: ["/images/products/moisture_analyzer.jpg"],
    specifications: [
      { name: "Display Resolution", value: "0.01 mg / 1 mg" },
      { name: "Heating System", value: "Rapid Halogen heating lamp" },
      { name: "Measurement Principle", value: "Loss on drying (LOD)" },
      { name: "Compliance", value: "Legal Metrology Stamping & Calibration Supported" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
    legalMetrologyCert: "Lic.No. 22000126 - CLM",
  },
  {
    id: "prod-14",
    srNo: 14,
    name: "Standard Weights (E1, E2, F1 & F2 Class)",
    slug: "standard-weights-e1-e2-f1-f2-class",
    categorySlug: "weighing-legal-metrology",
    categoryName: "Weighing & Legal Metrology",
    shortDescription: "NABL certified standard precision mass reference weights in E1, E2, F1, and F2 accuracy classes.",
    fullDescription: "Complete set and individual stainless steel calibration weights conforming to OIML guidelines across E1, E2, F1, and F2 tolerance classes. Delivered with official NABL calibration certificate.",
    images: ["/images/products/standard_weights.jpg"],
    specifications: [
      { name: "Accuracy Classes", value: "E1, E2, F1, & F2 Class" },
      { name: "Certification", value: "All standard weights NABL certified" },
      { name: "Material", value: "Austenitic Stainless Steel / Brass" },
      { name: "Application", value: "Analytical balance calibration & Legal Metrology verification" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
    legalMetrologyCert: "NABL Certified Calibration Weights",
  },
  {
    id: "prod-15",
    srNo: 15,
    name: "Water Bath",
    slug: "water-bath",
    categorySlug: "thermal-environmental",
    categoryName: "Thermal & Environmental Equipment",
    shortDescription: "Digital precision temperature-controlled laboratory water bath.",
    fullDescription: "Digital thermostatic water bath designed for uniform temperature distribution, sample incubation, warming reagents, and temperature-sensitive assays.",
    images: ["/images/products/water_bath.jpg"],
    specifications: [
      { name: "Control Type", value: "Digital PID temperature controller" },
      { name: "Bath Material", value: "Corrosion-resistant Stainless Steel interior" },
      { name: "Function", value: "Thermostatic sample heating & incubation" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-16",
    srNo: 16,
    name: "Melting Points Apparatus",
    slug: "melting-points-apparatus",
    categorySlug: "analytical-lab-instruments",
    categoryName: "Analytical & Lab Instruments",
    shortDescription: "Quick-reading melting point apparatus supporting 3 sample testings simultaneously.",
    fullDescription: "Digital melting point instrument for fast and reliable determination of crystalline melting temperatures, supporting up to 3 capillary samples concurrently.",
    images: ["/images/products/melting_point.jpg"],
    specifications: [
      { name: "Speed & Reading", value: "Quick & Fast Reading" },
      { name: "Sample Throughput", value: "3 sample melting at same time" },
      { name: "Application", value: "Purity determination of solid chemical substances" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-17",
    srNo: 17,
    name: "Muffle Furnace",
    slug: "muffle-furnace",
    categorySlug: "thermal-environmental",
    categoryName: "Thermal & Environmental Equipment",
    shortDescription: "High-temperature lab muffle furnace operating from 1000 °C up to 1300 °C.",
    fullDescription: "Heavy-duty high-temperature muffle furnace for ash testing, heat treatment, sintering, and high-temp chemical reactions with digital temperature control.",
    images: ["/images/products/muffle_furnace.jpg"],
    specifications: [
      { name: "Max Temperature", value: "Max Temp. 1000 °C to 1300 °C" },
      { name: "Insulation", value: "High-grade ceramic fiber thermal insulation" },
      { name: "Application", value: "Loss on Ignition (LOI), ash content testing, heat treating" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-18",
    srNo: 18,
    name: "Magnetic Shakers (Orbital, Rocking, 3D, Tube Roller, Rotator)",
    slug: "magnetic-shakers",
    categorySlug: "sample-prep-mixing",
    categoryName: "Sample Preparation & Mixing",
    shortDescription: "Versatile laboratory shakers: Orbital, Rocking, 3D, Tube Roller, and Rotator models.",
    fullDescription: "Comprehensive line of laboratory shakers and mixers providing uniform motion for tubes, flasks, microplates, and blood tubes under controlled speeds.",
    images: ["/images/products/shakers.jpg"],
    specifications: [
      { name: "Available Types", value: "Orbital, Rocking, 3D, Tube Roller, Rotator" },
      { name: "Drive System", value: "Maintenance-free magnetic motor drive" },
      { name: "Application", value: "Cell culture, staining, hybridisation, sample mixing" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-19",
    srNo: 19,
    name: "BOD Incubator",
    slug: "bod-incubator",
    categorySlug: "thermal-environmental",
    categoryName: "Thermal & Environmental Equipment",
    shortDescription: "Biochemical Oxygen Demand (BOD) incubator operating across 0 °C to 65 °C.",
    fullDescription: "Precision low-temperature incubator for BOD determination, plant cell growth, microorganism culture, and environmental test incubation.",
    images: ["/images/products/bod_incubator.jpg"],
    specifications: [
      { name: "Temperature Range", value: "0 °C to 65 °C" },
      { name: "Control Sensitivity", value: "Microprocessor PID control" },
      { name: "Application", value: "BOD testing, biological incubation, pharma stability" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-20",
    srNo: 20,
    name: "SS Fabrication Work",
    slug: "ss-fabrication-work",
    categorySlug: "custom-fabrication-storage",
    categoryName: "Custom Fabrication & Storage",
    shortDescription: "Custom Stainless Steel (SS) lab equipment, tables, trolleys, and cabinetry fabrication.",
    fullDescription: "Custom Stainless Steel (SS 304 / SS 316) fabrication engineered according to exact user drawings and cleanroom specifications for pharmaceutical and research facilities.",
    images: ["/images/products/ss_fabrication.jpg"],
    specifications: [
      { name: "Material Grade", value: "Stainless Steel (SS 304 / SS 316)" },
      { name: "Customization", value: "As per customer requirement & engineering specs" },
      { name: "Products Fabricated", value: "Lab tables, trolleys, hoods, cleanroom fixtures" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-21",
    srNo: 21,
    name: "MS Fabrication Work",
    slug: "ms-fabrication-work",
    categorySlug: "custom-fabrication-storage",
    categoryName: "Custom Fabrication & Storage",
    shortDescription: "Heavy-duty Mild Steel (MS) custom industrial structures, frames, and stands.",
    fullDescription: "Industrial Mild Steel (MS) custom fabrication work, powder-coated or painted structural frames, heavy equipment support tables, and transport carts.",
    images: ["/images/products/ms_fabrication.jpg"],
    specifications: [
      { name: "Material Grade", value: "Mild Steel (MS)" },
      { name: "Customization", value: "As per customer requirement" },
      { name: "Finish", value: "Powder coated / Industrial epoxy finish" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-22",
    srNo: 22,
    name: "Acrylic Fabrication Work",
    slug: "acrylic-fabrication-work",
    categorySlug: "custom-fabrication-storage",
    categoryName: "Custom Fabrication & Storage",
    shortDescription: "Custom clear acrylic cabinets, protective covers, trays, and glove boxes.",
    fullDescription: "Precision acrylic fabrication work for laboratory safety enclosures, clear view cabinets, desiccator boxes, chemical trays, and protective shielding as per custom dimensions.",
    images: ["/images/products/acrylic_fabrication.jpg"],
    specifications: [
      { name: "Material", value: "High-clarity PMMA Acrylic" },
      { name: "Customization", value: "Any type of Cabinet, Tray, Box, Enclosure, etc." },
      { name: "Application", value: "Lab containment, clear storage, chemical spill trays" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-23",
    srNo: 23,
    name: "HPLC Column Storage Cabinet",
    slug: "hplc-column-storage-cabinet",
    categorySlug: "custom-fabrication-storage",
    categoryName: "Custom Fabrication & Storage",
    shortDescription: "Dedicated HPLC column storage cabinet available in 60-piece and 72-piece configurations.",
    fullDescription: "Secure, padded HPLC column storage cabinet designed to store analytical HPLC and GC columns systematically, protecting sensitive stationary phases from physical damage.",
    images: ["/images/products/hplc_storage.jpg"],
    specifications: [
      { name: "Storage Capacity", value: "60 pcs & 72 pcs per cabinet" },
      { name: "Cabinet Type", value: "Dedicated HPLC & Column organizing drawer cabinet" },
      { name: "Protection", value: "Vibration dampening slots for column safety" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-24",
    srNo: 24,
    name: "Centrifuge",
    slug: "centrifuge",
    categorySlug: "sample-prep-mixing",
    categoryName: "Sample Preparation & Mixing",
    shortDescription: "Low-noise lightweight laboratory centrifuge with speed options of 4000 rpm, 12000 rpm & 16000 rpm.",
    fullDescription: "High-performance low-noise benchtop laboratory centrifuge designed for micro-tubes and standard tube separation, featuring digital speed control up to 16000 rpm.",
    images: ["/images/products/centrifuge.jpg"],
    specifications: [
      { name: "Noise Level", value: "Low noise operational design" },
      { name: "Build", value: "Light weight, compact benchtop" },
      { name: "Speed Options", value: "4000 rpm, 12000 rpm & 16000 rpm" },
      { name: "Application", value: "Sample separation, clinical assays & research" },
    ],
    isFeatured: false,
    isAvailable: true,
    enquiryEnabled: true,
  },
  {
    id: "prod-25",
    srNo: 25,
    name: "Legal Metrology Stamping & AMC Services",
    slug: "legal-metrology-stamping-amc-services",
    categorySlug: "weighing-legal-metrology",
    categoryName: "Weighing & Legal Metrology",
    shortDescription: "Authorized Legal Metrology verification, stamping, balance AMC, and anti-vibration table setups.",
    fullDescription: "Official Legal Metrology compliance service. Authorised for L & M Stamping, verification, Annual Maintenance Contracts (AMC) for lab & industrial balances, printer integration, and anti-vibration table installations.",
    images: ["/images/products/legal_metrology_services.jpg"],
    specifications: [
      { name: "Legal Metrology License", value: "Lic.No. – 22000126 - CLM" },
      { name: "Stamping Scope", value: "L & M Stamping & Re-verification" },
      { name: "Service Offerings", value: "Balances AMC, Anti-Vibration Pad & Table, Printer integration" },
      { name: "Certificate", value: "Official Metrology Stamping & Calibration Certificates" },
    ],
    isFeatured: true,
    isAvailable: true,
    enquiryEnabled: true,
    legalMetrologyCert: "Lic.No. 22000126 - CLM Authorised",
  },
];

export const SERVICES: CatalogService[] = [
  {
    title: "Legal Metrology – Authorised Stamping & Verification",
    slug: "legal-metrology-stamping",
    category: "Legal Metrology",
    shortDescription: "Government authorised Legal Metrology stamping, verification, and certification for weighing balances.",
    fullDescription: "Jess Enterprises holds Legal Metrology License No. 22000126 - CLM. We provide complete Legal Metrology stamping, re-verification, and weight certification services to ensure strict compliance with statutory weights and measures regulations.",
    highlights: [
      "Authorized License No. 22000126 - CLM",
      "L & M Stamping for laboratory & industrial balances",
      "Supply of New Standard Weights with official NABL / Metrology Certificates",
      "Documentation support for statutory compliance audits",
    ],
    licenseNo: "22000126 - CLM",
  },
  {
    title: "Sales, Services & AMC of Lab & Industrial Balances",
    slug: "balances-sales-service-amc",
    category: "Servicing & AMC",
    shortDescription: "Annual Maintenance Contracts (AMC), repairs, calibration, and anti-vibration table installation.",
    fullDescription: "Comprehensive routine maintenance, breakdown servicing, and precision calibration for analytical, micro, and industrial weighing balances. We also install specialized anti-vibration pads and granite tables to eliminate environmental noise.",
    highlights: [
      "Preventive Maintenance & Calibration",
      "Anti-Vibration Pad & Table installation",
      "Printer connectivity & data logging setup",
      "Fast breakdown repair response",
    ],
  },
  {
    title: "Custom Acrylic, Teflon, Polycarbonate, SS & MS Fabrication",
    slug: "custom-fabrication-services",
    category: "Custom Fabrication",
    shortDescription: "Precision fabrication work in Acrylic, PVC, Teflon, Polycarbonate, SS, and MS as per customer drawings.",
    fullDescription: "Engineered fabrication solutions tailored to custom laboratory, pharmaceutical, and industrial specifications. We build clear acrylic enclosures, HPLC column cabinets, chemical spill trays, stainless steel cleanroom fixtures, and heavy MS structural frames.",
    highlights: [
      "Acrylic clear cabinets, desiccator boxes & glove trays",
      "HPLC Column Storage cabinets (60 & 72 pcs capacity)",
      "Stainless Steel (SS 304/316) cleanroom tables & hoods",
      "Mild Steel (MS) heavy-duty industrial trolleys & frames",
      "Polycarbonate, PVC, and Teflon custom chemical components",
    ],
  },
];

export const CLIENT_LOGOS: CatalogClient[] = [
  { name: "Colorcon", industry: "Pharma Excipients & Coatings" },
  { name: "Glenmark Pharmaceuticals Ltd.", industry: "Pharmaceuticals" },
  { name: "Geno Pharmaceuticals Limited", industry: "Pharmaceuticals" },
  { name: "Centaur Pharmaceuticals", industry: "Pharmaceuticals" },
  { name: "Venus Ethoxyethers (A Harcros Group Company)", industry: "Chemicals & Ethoxylates" },
  { name: "Unichem Laboratories Ltd.", industry: "Pharmaceuticals" },
  { name: "Syngenta", industry: "Agrochemicals & Crop Science" },
  { name: "Zydus Cadila", industry: "Pharmaceuticals" },
  { name: "Kineco Kaman Composite Structures", industry: "Aerospace & Composites" },
  { name: "Micro Labs Limited", industry: "Pharmaceuticals" },
  { name: "Sanofi", industry: "Global Healthcare & Pharma" },
  { name: "Indoco Remedies Limited", industry: "Pharmaceuticals" },
  { name: "Fertin Pharma", industry: "Pharmaceuticals" },
  { name: "Cipla", industry: "Pharmaceuticals" },
  { name: "National Institute of Oceanography (NIO), Goa", industry: "Research Institute" },
  { name: "Esteem Group", industry: "Industrial Engineering" },
  { name: "Deccan Fine Chemicals (India) Pvt. Ltd.", industry: "Specialty Chemicals" },
  { name: "BITS Pilani (K K Birla Goa Campus)", industry: "Educational & Research Institute" },
];
