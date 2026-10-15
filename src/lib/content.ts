/* Site content — taken verbatim from the final Claude Design prototype. */

export const CONTACT = {
  email: 'evcore@ugent.be',
  phone: '+32 9 332 28 13',
  location: 'The CORE (entrance 37); Campus UZ Gent, Corneel Heymanslaan 10; 9000 Ghent, Belgium',
  hours: 'Mon–Fri, 9:00 AM – 5:00 PM CET',
};

export const HOME_SERVICES = [
  { t: 'EV Isolation & Separation', d: 'Differential ultracentrifugation, density gradient ultracentrifugation, and size exclusion chromatography — alone or combined — to isolate EVs from any biological matrix.' },
  { t: 'Biophysical Characterisation', d: 'Particle size, concentration, and zeta potential via NTA (Nanosight LM10, ZetaView Twin), and high-resolution fractionation and sizing via AF4 coupled to MALS, UV, and fluorescence detection (Wyatt Eclipse).' },
  { t: 'Biochemical Characterisation', d: 'Immunoblotting, ELISA, single-molecule dSTORM imaging (Oxford NanoImager), molecular quantification, and omics-based analyses for comprehensive EV cargo profiling.' },
  { t: 'Training & Education', d: "Hands-on training for individuals and lab groups across all EV isolation and characterisation methods, following the field's minimal information guidelines." },
  { t: 'Consultation', d: 'Expert study design, protocol optimisation, and data interpretation to ensure your EV research meets the highest standards for peer review and publication.' },
];

export const HOME_EQUIPMENT = [
  { tag: 'NTA', name: 'Nanosight LM10', sub: 'Malvern Panalytical', desc: 'Nanoparticle tracking analysis for size distribution and concentration measurements.' },
  { tag: 'NTA · Zeta Potential', name: 'ZetaView Twin', sub: 'Particle Metrix', desc: 'Dual-laser NTA with direct zeta potential and fluorescence detection for size, concentration, and surface charge.' },
  { tag: 'Super-resolution', name: 'Oxford NanoImager', sub: 'ONI', desc: 'Single-molecule dSTORM imaging for nanoscale morphological assessment of EVs.' },
  { tag: 'AF4 · MALS', name: 'Eclipse + Dawn Helios-II', sub: 'Wyatt Technology', desc: 'Asymmetrical flow field-flow fractionation coupled to multi-angle light scattering, UV and fluorescence detectors.' },
  { tag: 'Ultracentrifugation', name: 'Optima XPN-80', sub: 'Beckman Coulter (×2)', desc: 'Differential & density gradient UC with SW32.1 and SW55 rotors.' },
  { tag: 'High-speed', name: 'Avanti JXN-26', sub: 'Beckman Coulter', desc: 'High-speed centrifugation for pre-clearing and large-EV pellet preparation.' },
  { tag: 'Benchtop', name: 'Centrifuge 5810 R', sub: 'Eppendorf (×3)', desc: 'Refrigerated benchtop centrifugation for routine EV sample preparation workflows.' },
  { tag: 'Automated SEC', name: 'Ascent', sub: 'Everest Biolabs', desc: 'Automated EV isolation via SEC — up to 8 columns in parallel, 12 fractions per column, programmable fraction collection.' },
  { tag: 'Liquid Handler', name: 'Biomek 4000', sub: 'Beckman Coulter', desc: 'Robotic workstation for automated density gradient preparation and fraction collection, with HEPA positive-pressure enclosure.' },
];

export const STATS = [
  { n: '< 20 nm', l: 'Single-molecule resolution', sub: 'Morphological imaging via Oxford NanoImager dSTORM' },
  { n: '3', l: 'Orthogonal isolation methods', sub: 'Differential UC, density gradient UC, and SEC' },
  { n: '9+', l: 'Core instruments', sub: 'Covering isolation through biochemical characterisation' },
];

/** `slug` is used for deep links like /services#isolation (footer links). */
export const SERVICES = [
  {
    slug: 'isolation',
    t: 'EV Isolation & Separation',
    methods: ['Differential ultracentrifugation', 'Density gradient ultracentrifugation', 'Size exclusion chromatography (SEC)', 'Combined multi-step workflows', 'Support for serum, plasma, urine, conditioned media'],
    d: "Isolation of EVs relies on their biophysical features — size and density. We offer three orthogonal approaches (differential UC, density gradient UC, and SEC) to isolate EVs from any biological sample. Protocols are tailored to your specific sample type and downstream application, in compliance with the field's minimal information guidelines.",
  },
  {
    slug: 'biophysical',
    t: 'Biophysical Characterisation',
    methods: ['NTA — ZetaView Twin / Nanosight LM10', 'AF4 — Eclipse (Wyatt Technology)', 'MALS — Dawn Helios-II (Wyatt)', 'Transmission Electron Microscopy', 'Fluorescence detection (Agilent Infinity 1260)', 'Particle size, concentration & surface charge'],
    d: 'We characterise EV particle size distribution and concentration using nanoparticle tracking analysis (NTA) on the Nanosight LM10 and the ZetaView Twin, which adds direct zeta potential measurement for colloidal-stability assessment. For high-resolution fractionation and multi-parameter sizing, we employ asymmetrical flow field-flow fractionation (AF4) coupled to multi-angle light scattering, UV, and fluorescence detectors — providing an exceptionally complete biophysical picture of your sample.',
  },
  {
    slug: 'biochemical',
    t: 'Biochemical Characterisation',
    methods: ['Immunoblotting', 'ELISA', 'Single-molecule dSTORM imaging (Oxford NanoImager)', 'Molecular quantification', 'Omics-based analysis'],
    d: 'Beyond biophysical sizing, we offer a broad spectrum of biochemical analyses. Super-resolution dSTORM microscopy on the Oxford NanoImager provides single-molecule morphological imaging. Combined with immunoblotting, ELISA, and omics workflows, these tools deliver a comprehensive view of EV cargo and surface composition.',
  },
  {
    slug: 'microscopy',
    t: 'Super-resolution Microscopy',
    methods: ['Oxford NanoImager (ONI)', 'dSTORM single-molecule imaging', 'Nanoscale morphological assessment', 'Fluorescence-based localisation'],
    d: 'The Oxford NanoImager enables direct stochastic optical reconstruction microscopy (dSTORM) at single-molecule resolution. This allows detailed morphological assessment and spatial mapping of EV surface markers at sub-20 nm precision — ideal for validating isolation purity and studying heterogeneous EV populations.',
  },
  {
    slug: 'training',
    t: 'Training & Education',
    methods: ['Hands-on instrument training', 'Protocol development workshops', 'Lab group training sessions', 'Method-specific courses (NTA, AF4, dSTORM, UC)', 'Intake meeting & competency assessment'],
    d: 'We provide formal training for individuals and entire lab groups across all EV isolation and characterisation methods available at the facility. Training is hands-on with real samples. An intake meeting is required for all new users, followed by reservation rules and usage fees as described on the UGent core facility webpage.',
  },
  {
    slug: 'consultation',
    t: 'Study Design & Consultation',
    methods: ['Experimental design consultation', 'Sample preparation guidance', 'Protocol optimisation', 'Data interpretation support', 'Manuscript preparation assistance'],
    d: "Expert consultation to ensure your EV research meets the highest quality standards — from study design and protocol selection through data interpretation and reporting. We help researchers generate faster, more accurate, and more reliable insights in compliance with the field's minimal information guidelines.",
  },
];

export const EQUIPMENT = [
  { name: 'Nanosight LM10', mfr: 'Malvern Panalytical', tag: 'NTA — Nanoparticle Tracking Analysis', d: 'Nanoparticle tracking analysis system that measures particle size distribution and concentration using light scattering and Brownian motion. Provides reliable, reproducible quantification of EVs in complex biological fluids.', specs: ['Size range: 10–2,000 nm', 'Concentration measurement', 'Single-particle tracking', 'Video-based analysis'] },
  { name: 'ZetaView Twin', mfr: 'Particle Metrix', tag: 'NTA — Nanoparticle Tracking Analysis with Zeta Potential', d: 'Dual-laser nanoparticle tracking analyser adding direct zeta potential measurement and dual-channel fluorescence to size and concentration analysis — measured in-cell, with no disposables. Ideal for orthogonal sizing and colloidal-stability assessment of EV preparations.', specs: ['Size range: 10–1,000 nm', 'Concentration: 10⁵–10⁹ particles/mL', 'Zeta potential: −500 to +500 mV', '2 lasers · up to 6 fluorescence channels'] },
  { name: 'Oxford NanoImager', mfr: 'ONI', tag: 'Super-resolution — dSTORM Microscopy', d: 'Benchtop super-resolution microscope enabling direct stochastic optical reconstruction microscopy (dSTORM). Provides single-molecule localisation imaging for nanoscale morphological assessment of EVs and their surface markers at sub-20 nm precision.', specs: ['< 20 nm localisation precision', 'Single-molecule imaging', 'Multi-colour dSTORM', 'Morphological assessment'] },
  { name: 'Eclipse + Dawn Helios-II', mfr: 'Wyatt Technology', tag: 'AF4 — Asymmetrical Flow Field-Flow Fractionation', d: 'High-resolution fractionation system coupled to multi-angle light scattering (MALS), UV (Shimadzu SPD-M20A), and fluorescence (Agilent Infinity 1260) detectors. Separates and characterises EVs, liposomes, LNPs, and viral particles by size without a stationary phase.', specs: ['MALS (Dawn Helios-II)', 'UV detector (Shimadzu)', 'Fluorescence (Agilent)', 'No stationary phase'] },
  { name: 'Optima XPN-80', mfr: 'Beckman Coulter (×2)', tag: 'Ultracentrifugation — EV Isolation', d: 'High-performance preparative ultracentrifuge for differential and density gradient ultracentrifugation of EVs. Equipped with SW32.1 and SW55 rotors for processing a wide range of sample volumes.', specs: ['SW32.1 & SW55 rotors', 'Max speed: 150,000 × g', 'Iodixanol density gradients', 'Temperature-controlled'] },
  { name: 'Avanti JXN-26', mfr: 'Beckman Coulter', tag: 'High-speed Centrifugation', d: 'High-speed centrifuge for pre-clearing complex biological samples and pelleting large EVs and cell debris. Essential first step in multi-step EV isolation workflows from serum, plasma, urine and conditioned media.', specs: ['Max speed: 26,000 rpm', 'Pre-clearing step', 'Large-EV pelleting', 'Multiple rotor options'] },
  { name: 'Centrifuge 5810 R', mfr: 'Eppendorf (×3)', tag: 'Benchtop Centrifugation', d: 'Refrigerated benchtop centrifuge for routine EV sample preparation. Three units available for concurrent processing, ensuring throughput and flexibility across simultaneous user projects.', specs: ['Refrigerated (4 °C)', '3 units for throughput', 'Swing-bucket & fixed-angle', 'Up to 50 mL tubes'] },
  { name: 'Ascent', mfr: 'Everest Biolabs', tag: 'Automated SEC — EV Isolation', d: 'Automated high-throughput fraction collector for EV isolation via SEC columns. Runs up to 8 columns simultaneously with programmable fraction collection, high-precision optical drop detection, and Column Saver to prevent columns drying out between runs.', specs: ['Up to 8 columns in parallel', 'Up to 12 fractions per column', 'Programmable collection sequence', 'Compatible with Apex & qEV columns'] },
  { name: 'Biomek 4000', mfr: 'Beckman Coulter', tag: 'Liquid Handling — Gradient Automation', d: 'Laboratory automation workstation for robot-assisted density gradient preparation and fraction collection. Features 12 deck positions, liquid-level sensing pipetting (1–1000 µL), and a positive-pressure HEPA enclosure for sterility. Operated with a custom-made script for EV density gradient workflows.', specs: ['12 deck positions', '1–1000 µL liquid-level sensing', 'HEPA positive-pressure enclosure', 'Custom density gradient script'] },
];

/** Instrument names in the admin "Instrument status" panel (seeded into the database). */
export const INSTRUMENTS = [
  'Nanosight LM10', 'ZetaView Twin', 'Oxford NanoImager', 'AF4 Eclipse + MALS',
  'Optima XPN-80 #1', 'Optima XPN-80 #2', 'Ascent', 'Biomek 4000', 'Avanti JXN-26',
];

/** `photo` / `objectPosition` reproduce the framing set in the prototype's image slots. */
export const TEAM = [
  { name: 'Prof. An Hendrix', role: 'Scientific Supervisor', bio: 'Full professor at UGent and head of the Laboratory of Experimental Cancer Research. Scientific lead of the CORE EV facility, with extensive expertise in EV biology, liquid biopsies, and cancer research.', photo: '/images/team/an-hendrix.webp', objectPosition: '50% 6%' },
  { name: 'Dr. Cláudio Pinheiro', role: 'Head of CORE', bio: 'Head of the CORE EV facility. Leads facility operations, user support, and instrument management. Specialist in EV isolation, characterisation, liquid biopsies, and cancer research.', photo: '/images/team/claudio-pinheiro.webp', objectPosition: '50% 15%' },
  { name: 'Frédéric Clement', role: 'Core Research Facilities Manager', bio: 'Core facility manager at the Faculty of Medicine and Health Sciences, UGent. Supports facility governance, user scheduling, onboarding, and day-to-day operational continuity.', photo: '/images/team/frederic-clement.webp', objectPosition: '50% 50%' },
  { name: 'Valerie Baumont', role: 'Core Facility Admin', bio: 'Serves as the central point of contact, helps researchers and staff access facility resources, manages bookings and documentation, and ensures smooth and efficient facility operations.', photo: '/images/team/valerie-baumont.webp', objectPosition: '50% 50%' },
];

export const STEERING = [
  { name: 'Prof. Bruno De Geest', dept: 'Department of Pharmaceutics' },
  { name: 'Daisy Flamez, PhD', dept: 'Department of Data Analysis and Mathematical Modelling' },
  { name: 'Prof. Hannelore Denys', dept: 'Board of Governors / Executive Board' },
  { name: 'Prof. Katrien Smits', dept: 'Department of Internal Medicine, Reproduction and Population Medicine' },
  { name: 'Prof. Kristof De Schutter', dept: 'Department of Plants and Crops' },
  { name: 'Prof. Peter Vandenabeele', dept: 'Department of Biomedical Molecular Biology' },
];

export const TOOLS = [
  { id: 'evtrack', name: 'EV-TRACK', tagline: 'Transparent reporting & centralizing knowledge in EV research', url: 'https://evtrack.org/', logo: '/images/logos/ev-track.webp', logoW: 758, logoH: 296, logoBox: 76, desc: 'A crowdsourcing knowledgebase that centralises EV biology and methodology, coaching researchers through the EV-METRIC to improve reproducibility and transparent reporting.' },
  { id: 'evoke', name: 'EVOKE', tagline: 'Quality control platform for standardised EV research', url: 'https://evoke-tool.org/', logo: '/images/logos/evoke.webp', logoW: 900, logoH: 899, logoBox: 110, desc: 'An advanced quality-control platform that evaluates EV preparation methods across key performance metrics to enhance reproducibility and comparability across studies.' },
];

export const PUBLICATIONS = [
  { year: 2026, title: 'No Dye Fits All: Illuminating the Challenges of Fluorescent Extracellular Vesicle Labeling', authors: 'Vrdoljak P, Idrovo-Gavilanes A, Nguyen TH, Vander Cruyssen A, Guilbert N, Pinheiro C, Fabiano M, Pannetta M, Lippens L, Hendrix A', journal: 'Journal of Extracellular Vesicles', doi: '10.1002/jev2.70291' },
  { year: 2024, title: 'Identification and validation of extracellular vesicle reference genes for the normalization of RT-qPCR data', authors: 'Pinheiro C, Guilbert N, Lippens L, Roux Q, Boiy R, Fischer S, Van Dorpe S, De Craene B, Berx G, Boterberg T, Sys G, Denys H, Miinalainen I, Mestdagh P, Vandesompele J, De Wever O, Hendrix A', journal: 'Journal of Extracellular Vesicles', doi: '10.1002/jev2.12421' },
  { year: 2023, title: 'Extracellular vesicle analysis', authors: 'Hendrix A, Lippens L, Pinheiro C, Théry C, Martin-Jaular L, Lötvall J, Lässer C, Hill AF, Witwer KW', journal: 'Nature Reviews Methods Primers', doi: '10.1038/s43586-023-00240-z' },
  { year: 2023, title: 'Integrating automated liquid handling in the separation workflow of extracellular vesicles enhances specificity and reproducibility', authors: 'Van Dorpe S, Lippens L, Boiy R, Pinheiro C, Vergauwen G, De Wever O, Hendrix A', journal: 'Journal of Nanobiotechnology', doi: '10.1186/s12951-023-01917-z' },
  { year: 2021, title: 'Recombinant extracellular vesicles as biological reference material for method development, data normalization and assessment of (pre-)analytical variables', authors: 'Geeurickx E, Lippens L, Rappu P, De Geest BG, De Wever O, Hendrix A', journal: 'Nature Protocols', doi: '10.1038/s41596-020-00446-5' },
];

export const CONTACT_SUBJECTS = [
  'EV Isolation Services', 'Particle Characterisation', 'Immunophenotyping',
  'Training & Education', 'Study Design Consultation', 'General Inquiry',
];

export const PORTAL_SUBJECTS = [
  'Project status update', 'Results question', 'New project request',
  'File upload issue', 'Invoice / billing', 'Other',
];
