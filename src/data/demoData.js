// ============================================================
// SmartEnergy AI — Centralized     // All values below are simulated for           .
// No live IoT sensors or smart meters are connected.
// ============================================================

export const ORG = {
  name: 'Shreeji Precision Works',
  type: 'Small Manufacturing Unit (    )',
  location: 'Coimbatore, Tamil Nadu',
  sanctionedLoad: '63 kVA',
  tariff: 7.2, // INR per kWh, demo rate
}

export const DEMO_CREDENTIALS = {
  email: 'demo@smartenergy.ai',
  password: 'demo123',
}

// ---- Equipment master list ----------------------------------
export const EQUIPMENT = [
  {
    id: 'motor-01',
    name: 'Motor 01',
    type: 'Motor',
    zone: 'Fabrication Line',
    health: 91,
    efficiency: 88,
    energyPerHour: 3.1,
    expectedPerHour: 3.0,
    operatingHours: 11,
    status: 'Healthy',
  },
  {
    id: 'compressor-02',
    name: 'Compressor 02',
    type: 'Compressor',
    zone: 'Air Supply Room',
    health: 72,
    efficiency: 58,
    energyPerHour: 8.4,
    expectedPerHour: 5.9,
    operatingHours: 12,
    status: 'Attention Required',
  },
  {
    id: 'hvac-01',
    name: 'HVAC 01',
    type: 'HVAC',
    zone: 'Office & QC Lab',
    health: 84,
    efficiency: 76,
    energyPerHour: 6.2,
    expectedPerHour: 5.4,
    operatingHours: 10,
    status: 'Healthy',
  },
  {
    id: 'pump-03',
    name: 'Pump 03',
    type: 'Pump',
    zone: 'Coolant Circuit',
    health: 96,
    efficiency: 93,
    energyPerHour: 1.8,
    expectedPerHour: 1.75,
    operatingHours: 9,
    status: 'Healthy',
  },
  {
    id: 'lighting-sys',
    name: 'Lighting System',
    type: 'Lighting',
    zone: 'Shop Floor',
    health: 89,
    efficiency: 85,
    energyPerHour: 2.4,
    expectedPerHour: 2.2,
    operatingHours: 14,
    status: 'Healthy',
  },
]

export const STATUS_STYLES = {
  Healthy: { color: 'text-success', bg: 'bg-success/10', ring: 'ring-success/30', dot: 'bg-success' },
  'Attention Required': { color: 'text-amber-400', bg: 'bg-amber-500/10', ring: 'ring-amber-500/30', dot: 'bg-amber-500' },
  Critical: { color: 'text-danger', bg: 'bg-danger/10', ring: 'ring-danger/30', dot: 'bg-danger' },
}

// ---- Hourly consumption (24h) vs baseline --------------------
// Production shift: 8:00–20:00. Compressor 02 keeps running 8AM-8PM
// including the 1–3PM low-production lull, causing the waste story.
export const HOURLY_CONSUMPTION = [
  { hour: '00:00', actual: 9, baseline: 9 },
  { hour: '01:00', actual: 8, baseline: 8 },
  { hour: '02:00', actual: 8, baseline: 8 },
  { hour: '03:00', actual: 8, baseline: 8 },
  { hour: '04:00', actual: 9, baseline: 9 },
  { hour: '05:00', actual: 10, baseline: 10 },
  { hour: '06:00', actual: 14, baseline: 13 },
  { hour: '07:00', actual: 22, baseline: 20 },
  { hour: '08:00', actual: 34, baseline: 31 },
  { hour: '09:00', actual: 38, baseline: 34 },
  { hour: '10:00', actual: 41, baseline: 36 },
  { hour: '11:00', actual: 40, baseline: 36 },
  { hour: '12:00', actual: 33, baseline: 28 },
  { hour: '13:00', actual: 31, baseline: 22 },
  { hour: '14:00', actual: 30, baseline: 21 },
  { hour: '15:00', actual: 37, baseline: 33 },
  { hour: '16:00', actual: 42, baseline: 37 },
  { hour: '17:00', actual: 44, baseline: 39 },
  { hour: '18:00', actual: 39, baseline: 35 },
  { hour: '19:00', actual: 28, baseline: 25 },
  { hour: '20:00', actual: 18, baseline: 17 },
  { hour: '21:00', actual: 13, baseline: 12 },
  { hour: '22:00', actual: 11, baseline: 10 },
  { hour: '23:00', actual: 9, baseline: 9 },
]

export const WEEKLY_TREND = [
  { day: 'Mon', consumption: 418, baseline: 372 },
  { day: 'Tue', consumption: 431, baseline: 378 },
  { day: 'Wed', consumption: 402, baseline: 369 },
  { day: 'Thu', consumption: 426, baseline: 374 },
  { day: 'Fri', consumption: 440, baseline: 381 },
  { day: 'Sat', consumption: 356, baseline: 320 },
  { day: 'Sun', consumption: 198, baseline: 190 },
]

export const EQUIPMENT_USAGE_SHARE = EQUIPMENT.map((e) => ({
  name: e.name,
  value: Number((e.energyPerHour * e.operatingHours).toFixed(1)),
}))

// ---- Dashboard summary ----------------------------------------
export const DASHBOARD_SUMMARY = {
  todayConsumption: 426, // kWh
  currentDemand: 48.6, // kW
  energyWasted: 37, // kWh
  potentialSavingsInr: 780,
  co2ReductionKg: 67,
  efficiencyScore: 82,
}

// ---- AI-detected anomalies / waste -----------------------------
export const ANOMALIES = [
  {
    id: 'anom-01',
    equipmentId: 'compressor-02',
    equipment: 'Compressor 02',
    title: 'High energy consumption',
    severity: 'High',
    current: 8.4,
    expected: 5.9,
    deviationPct: 42,
    cause:
      'Possible cause based on available demo data: the compressor continues running at full load through the 1–3 PM low-production window instead of idling or shutting down.',
    monthlyWasteKwh: 54,
    monthlyCostInr: 420,
  },
  {
    id: 'anom-02',
    equipmentId: 'hvac-01',
    equipment: 'HVAC 01',
    title: 'Extended runtime beyond occupancy',
    severity: 'Medium',
    current: 6.2,
    expected: 5.4,
    deviationPct: 15,
    cause:
      'Possible cause based on available demo data: HVAC schedule is not aligned with office occupancy hours and keeps running after staff leave.',
    monthlyWasteKwh: 21,
    monthlyCostInr: 151,
  },
  {
    id: 'anom-03',
    equipmentId: 'lighting-sys',
    equipment: 'Lighting System',
    title: 'Lighting active in low-occupancy zones',
    severity: 'Low',
    current: 2.4,
    expected: 2.2,
    deviationPct: 9,
    cause:
      'Possible cause based on available demo data: shop-floor lighting zones remain fully lit even in aisles with intermittent activity.',
    monthlyWasteKwh: 9,
    monthlyCostInr: 65,
  },
]

// ---- AI recommendations -----------------------------------------
export const RECOMMENDATIONS = [
  {
    id: 'rec-01',
    title: 'Shift Compressor Operation',
    equipment: 'Compressor 02',
    problem: 'Compressor 02 draws 8.4 kWh/hour against an expected 5.9 kWh/hour, a 42% deviation.',
    reason: 'High consumption detected during the low-production period (1 PM – 3 PM).',
    action: 'Schedule Compressor 02 to idle or power down between 1 PM and 3 PM, and resume at full load only when line demand returns.',
    savingKwh: 54,
    savingInr: 420,
    co2Kg: 44,
    priority: 'High',
  },
  {
    id: 'rec-02',
    title: 'Optimize HVAC Schedule',
    equipment: 'HVAC 01',
    problem: 'HVAC 01 continues running roughly 1.5 hours past office occupancy each evening.',
    reason: 'No automatic shutoff tied to occupancy hours.',
    action: 'Align HVAC 01 operating schedule to 9 AM – 6 PM to match actual office occupancy.',
    savingKwh: 21,
    savingInr: 151,
    co2Kg: 17,
    priority: 'Medium',
  },
  {
    id: 'rec-03',
    title: 'Reduce Idle Equipment Operation',
    equipment: 'Motor 01 & Pump 03',
    problem: 'Motor 01 and Pump 03 remain powered during scheduled line changeovers with no output.',
    reason: 'Idle-run detection shows periods of near-zero mechanical output while equipment stays energized.',
    action: 'Introduce a standard changeover checklist step to power down idle motors and pumps during changeovers longer than 15 minutes.',
    savingKwh: 16,
    savingInr: 115,
    co2Kg: 13,
    priority: 'Medium',
  },
  {
    id: 'rec-04',
    title: 'Avoid Simultaneous High Load',
    equipment: 'Compressor 02 & HVAC 01',
    problem: 'Compressor 02 and HVAC 01 peak loads frequently overlap between 4 PM and 5 PM, pushing demand charges higher.',
    reason: 'Overlapping high-load windows increase peak kW demand without increasing output.',
    action: 'Stagger compressor recharge cycles and HVAC compressor cycles by 20–30 minutes to flatten the peak.',
    savingKwh: 12,
    savingInr: 94,
    co2Kg: 10,
    priority: 'Low',
  },
]

// ---- Optimization Center opportunities ---------------------------
export const OPTIMIZATIONS = [
  {
    id: 'opt-01',
    equipment: 'Compressor 02',
    title: 'Schedule during production hours',
    currentSchedule: '8:00 AM – 8:00 PM',
    recommendedSchedule: '9:00 AM – 6:00 PM (idle 1–3 PM)',
    savingKwh: 54,
    savingInr: 420,
    status: 'pending',
  },
  {
    id: 'opt-02',
    equipment: 'HVAC 01',
    title: 'Align with office occupancy',
    currentSchedule: '8:30 AM – 7:30 PM',
    recommendedSchedule: '9:00 AM – 6:00 PM',
    savingKwh: 21,
    savingInr: 151,
    status: 'pending',
  },
  {
    id: 'opt-03',
    equipment: 'Lighting System',
    title: 'Zone-based dimming on shop floor',
    currentSchedule: 'Full brightness, all zones, 6 AM – 8 PM',
    recommendedSchedule: 'Dimmed in low-activity aisles, full only in active bays',
    savingKwh: 9,
    savingInr: 65,
    status: 'pending',
  },
]

// ---- Savings & Impact ------------------------------------------
export const SAVINGS_IMPACT = {
  energySavedKwh: 82,
  costSavedInr: 780,
  co2ReductionKg: 67,
  efficiencyImprovementPct: 12.7,
}

export const MONTHLY_BEFORE_AFTER = [
  { month: 'Mar', before: 12480, after: 12480 },
  { month: 'Apr', before: 12760, after: 11890 },
  { month: 'May', before: 13020, after: 11640 },
  { month: 'Jun', before: 12890, after: 11210 },
  { month: 'Jul', before: 13150, after: 10980 },
  { month: 'Aug', before: 12780, after: 10640 },
]

export const MONTHLY_SAVINGS_PROJECTION = [
  { month: 'Sep', projectedSavingInr: 18400 },
  { month: 'Oct', projectedSavingInr: 19100 },
  { month: 'Nov', projectedSavingInr: 19800 },
  { month: 'Dec', projectedSavingInr: 20600 },
  { month: 'Jan', projectedSavingInr: 21200 },
  { month: 'Feb', projectedSavingInr: 21900 },
]

// ---- Demo Mode step script -----------------------------------
export const DEMO_STEPS = [
  { id: 1, title: 'Collecting Energy Data', detail: 'Reading simulated meter values across 5 equipment lines.' },
  { id: 2, title: 'Analyzing Consumption', detail: 'Comparing hourly draw against the expected baseline curve.' },
  { id: 3, title: 'Detecting Abnormal Pattern', detail: 'Flagging a +42% deviation during the 1–3 PM production lull.' },
  { id: 4, title: 'Identifying Compressor 02', detail: 'Isolating the equipment responsible for the deviation.' },
  { id: 5, title: 'Generating AI Explanation', detail: 'Building a plain-language explanation from the demo dataset.' },
  { id: 6, title: 'Generating Recommendation', detail: 'Drafting a schedule change to close the gap.' },
  { id: 7, title: 'Calculating Savings', detail: 'Projecting monthly energy, cost, and CO2 impact.' },
  { id: 8, title: 'Creating Optimization Plan', detail: 'Preparing the schedule update for review.' },
  { id: 9, title: 'Updating Efficiency Score', detail: 'Recalculating the facility efficiency score.' },
]

export const DEMO_RESULT = {
  beforeKwh: 426,
  afterKwh: 374,
  savingKwh: 52,
  savingInr: Math.round(52 * ORG.tariff),
  co2Kg: Math.round(52 * 0.82), // ~0.82 kg CO2 per kWh, demo grid factor
}

// ---- AI Analysis page sample result -----------------------------
export const ANALYSIS_STEPS = [
  'Collecting energy data...',
  'Analyzing consumption patterns...',
  'Comparing with baseline...',
  'Checking equipment efficiency...',
  'Detecting anomalies...',
  'Generating recommendations...',
]

export const ANALYSIS_RESULT = ANOMALIES[0]

// ---- AI Assistant knowledge base ---------------------------------
export const ASSISTANT_SUGGESTIONS = [
  'Why is my energy consumption high?',
  'Which equipment wastes the most energy?',
  'How can I reduce my electricity bill?',
  'What is my efficiency score?',
  'How much can I save?',
  'Which equipment should I optimize first?',
]
