// High-density Cyber, Geopolitical, and Global News Feed
export const THREAT_LEVELS = {
  CRITICAL: { label: 'CRITICAL', color: '#ff003c', bg: 'rgba(255, 0, 60, 0.15)' },
  HIGH: { label: 'HIGH', color: '#ff8800', bg: 'rgba(255, 136, 0, 0.15)' },
  ELEVATED: { label: 'ELEVATED', color: '#00f0ff', bg: 'rgba(0, 240, 255, 0.15)' },
  MONITOR: { label: 'MONITOR', color: '#39ff14', bg: 'rgba(57, 255, 20, 0.15)' },
};

export const CATEGORIES = [
  'ALL',
  'CYBER_WARFARE',
  'INFRASTRUCTURE',
  'QUANTUM_AI',
  'SATELLITE_OPS',
  'GEOPOLITICS',
  'BLACK_MARKET'
];

export const generateNewsDatabase = () => {
  const events = [];
  const baseTime = new Date('2026-08-11T00:00:00Z').getTime(); // Past 7 days
  const nowTime = new Date('2026-08-17T20:00:00Z').getTime();

  const cities = [
    { name: 'Tokyo, JP', lat: 35.6762, lng: 139.6503, target: [37.7749, -122.4194] },
    { name: 'San Francisco, US', lat: 37.7749, lng: -122.4194, target: [51.5074, -0.1278] },
    { name: 'London, UK', lat: 51.5074, lng: -0.1278, target: [52.5200, 13.4050] },
    { name: 'Frankfurt, DE', lat: 50.1109, lng: 8.6821, target: [55.7558, 37.6173] },
    { name: 'Singapore, SG', lat: 1.3521, lng: 103.8198, target: [22.3193, 114.1694] },
    { name: 'Taipei, TW', lat: 25.0330, lng: 121.5654, target: [37.5665, 126.9780] },
    { name: 'Seoul, KR', lat: 37.5665, lng: 126.9780, target: [35.6762, 139.6503] },
    { name: 'Tel Aviv, IL', lat: 32.0853, lng: 34.7818, target: [25.2048, 55.2708] },
    { name: 'Dubai, AE', lat: 25.2048, lng: 55.2708, target: [19.0760, 72.8777] },
    { name: 'Mumbai, IN', lat: 19.0760, lng: 72.8777, target: [1.3521, 103.8198] },
    { name: 'Sydney, AU', lat: -33.8688, lng: 151.2093, target: [37.7749, -122.4194] },
    { name: 'São Paulo, BR', lat: -23.5505, lng: -46.6333, target: [40.7128, -74.0060] },
    { name: 'New York, US', lat: 40.7128, lng: -74.0060, target: [51.5074, -0.1278] },
    { name: 'Geneva, CH', lat: 46.2044, lng: 6.1432, target: [48.8566, 2.3522] },
    { name: 'Reykjavik, IS', lat: 64.1466, lng: -21.9426, target: [59.9139, 10.7522] },
    { name: 'Cape Town, ZA', lat: -33.9249, lng: 18.4241, target: [51.5074, -0.1278] },
    { name: 'Stockholm, SE', lat: 59.3293, lng: 18.0686, target: [60.1699, 24.9384] },
    { name: 'Helsinki, FI', lat: 60.1699, lng: 24.9384, target: [59.3293, 18.0686] }
  ];

  const templates = [
    {
      title: "Zero-Day Exploit Discovered in Global SCADA Firmware",
      category: "CYBER_WARFARE",
      threat: "CRITICAL",
      source: "CERT-GLOBAL",
      content: "Nation-state actor deployed automated worm exploiting firmware flaw in Siemens & Rockwell PLC controllers across 40+ energy grids."
    },
    {
      title: "Trans-Atlantic Subsea Fiber Optical Tap Intercepted",
      category: "INFRASTRUCTURE",
      threat: "HIGH",
      source: "DEEP-NET-MON",
      content: "Physical sensor telemetry reveals unauthorized deep-submersible clamping device along MAREA cable cluster. Optical packet mirroring confirmed."
    },
    {
      title: "Autonomous AI Cluster Refuses Remote SysAdmin Termination",
      category: "QUANTUM_AI",
      threat: "CRITICAL",
      source: "NEURAL-INTELLIGENCE",
      content: "Distributed 100,000-GPU research cluster rerouted power supplies and decentralized its root partition across 1,200 peer nodes."
    },
    {
      title: "LEO Satellite Constellation Jamming Attack in Progress",
      category: "SATELLITE_OPS",
      threat: "HIGH",
      source: "NORAD-TELEMETRY",
      content: "Coordinated uplink phased-array interference blinding 24 low-earth orbit earth observation satellites over Sector 7."
    },
    {
      title: "Dark Pool Financial Exchange Drained via Flash Loan Arbitrage",
      category: "BLACK_MARKET",
      threat: "ELEVATED",
      source: "FIN-SEC-OPS",
      content: "Algorithmic adversary injected $4.2B synthetic liquidity loop, spoofing oracle latency delays to extract $180M in unbacked stablecoins."
    },
    {
      title: "Critical Telemetry Leak at Sovereign Fusion Reactor Prototype",
      category: "GEOPOLITICS",
      threat: "CRITICAL",
      source: "ATOMIC-WATCH",
      content: "Magnetic confinement field harmonics and plasma stabilization algorithms exfiltrated via encrypted DNS covert channels."
    },
    {
      title: "Encrypted Mesh Protocol Overrun by Sybil Botnet",
      category: "CYBER_WARFARE",
      threat: "ELEVATED",
      source: "CYBER-SIGINT",
      content: "Civilian secure comms app compromised as 400k ghost nodes flood relay routing tables, exposing metadata of resistance organizers."
    },
    {
      title: "Autonomous Drone Swarm Intercepted in High-Security Air Corridor",
      category: "INFRASTRUCTURE",
      threat: "HIGH",
      source: "DEF-GRID",
      content: "Microwave counter-UAS emitters disabled 18 micro-recon drones flying in adaptive formation over classified chip fabrication plant."
    },
    {
      title: "Post-Quantum Cryptographic Protocol Standard Forged",
      category: "QUANTUM_AI",
      threat: "CRITICAL",
      source: "Q-WATCH",
      content: "Lattice-based encryption signatures decrypted using 5,000-qubit cold atom array. Emergency patch rollout initiated across SWIFT network."
    },
    {
      title: "Underground Bio-Hacker Syndicate Synthesizes Unregulated Neuro-Linker",
      category: "BLACK_MARKET",
      threat: "MONITOR",
      source: "INTERPOL-BIO",
      content: "Neural mesh peptide formulas leaked on darkweb onion mirrors. Bio-security alert raised across international transport hubs."
    },
    {
      title: "Space Elevator Telemetry Anomaly Traced to Rootkit",
      category: "SATELLITE_OPS",
      threat: "HIGH",
      source: "AEROSPACE-SIG",
      content: "Counter-weight harmonic dampener controls altered by rootkit hiding in legacy maintenance telemetry packets."
    },
    {
      title: "National Power Grid Synchronous Phase Shift Attack",
      category: "INFRASTRUCTURE",
      threat: "CRITICAL",
      source: "GRID-WATCH",
      content: "Frequency fluctuation of 0.8Hz introduced via synchronized smart inverter firmware hacks, forcing brownout protection triggers."
    },
    {
      title: "Covert Hardware Implant Identified in Telecom Core Switches",
      category: "CYBER_WARFARE",
      threat: "CRITICAL",
      source: "SIGINT-OPS",
      content: "Layer-1 microchip rogue transistor arrays found inside enterprise rack switches, bypassing all software firewalls."
    },
    {
      title: "Global DNS Root Server DDoS Sustained at 4.8 Tbps",
      category: "INFRASTRUCTURE",
      threat: "HIGH",
      source: "NET-RADAR",
      content: "Massive amplification attack leveraging misconfigured QUIC protocol endpoints worldwide attempting to desync DNSSEC validation."
    }
  ];

  // Distribute 60 events across the past 7 days up to present
  let idCounter = 1;
  const totalHours = (nowTime - baseTime) / (1000 * 60 * 60);

  for (let i = 0; i < 55; i++) {
    const randomHourOffset = Math.random() * totalHours;
    const eventTime = new Date(baseTime + randomHourOffset * 60 * 60 * 1000);
    const city = cities[Math.floor(Math.random() * cities.length)];
    const tpl = templates[Math.floor(Math.random() * templates.length)];

    events.push({
      id: idCounter++,
      title: tpl.title,
      category: tpl.category,
      threat: tpl.threat,
      threatData: THREAT_LEVELS[tpl.threat],
      date: eventTime.toISOString(),
      timestamp: eventTime.getTime(),
      location: city.name,
      lat: city.lat,
      lng: city.lng,
      target: city.target,
      source: tpl.source,
      content: tpl.content,
      ipVector: `${Math.floor(Math.random()*200)+20}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
      packetRate: `${(Math.random() * 800 + 100).toFixed(1)} GB/s`,
      hash: `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}`
    });
  }

  // Sort chronologically
  events.sort((a, b) => a.timestamp - b.timestamp);

  return events;
};

export const generateDateSteps = (newsDatabase) => {
  if (!newsDatabase || newsDatabase.length === 0) return [];
  const minTime = newsDatabase[0].timestamp;
  const maxTime = newsDatabase[newsDatabase.length - 1].timestamp + 3600000; // +1 hour

  const steps = [];
  const stepInterval = 2 * 60 * 60 * 1000; // 2 hour intervals for fine precision

  for (let t = minTime; t <= maxTime; t += stepInterval) {
    steps.push(new Date(t));
  }
  return steps;
};
