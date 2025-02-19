const adjectives = [
  'Swift', 'Bright', 'Cosmic', 'Digital', 'Electric', 'Fluid', 'Global', 'Hyper',
  'Infinite', 'Jovial', 'Kinetic', 'Lunar', 'Mystic', 'Neural', 'Orbital', 'Prismatic',
  'Quantum', 'Radiant', 'Solar', 'Technic', 'Ultra', 'Vivid', 'Wavelength', 'Xenial',
  'Yielding', 'Zenith'
];

const nouns = [
  'Atlas', 'Beacon', 'Cipher', 'Delta', 'Echo', 'Flux', 'Galaxy', 'Horizon',
  'Impulse', 'Journey', 'Kernel', 'Legacy', 'Matrix', 'Nexus', 'Orbit', 'Pulse',
  'Quest', 'Radius', 'Sphere', 'Tensor', 'Unity', 'Vector', 'Wave', 'Xcel',
  'Yield', 'Zone'
];

export const generateUniqueName = (): string => {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
};

export const generateUniqueNameWithNumber = (): string => {
  const baseName = generateUniqueName();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${baseName}${randomNumber}`;
};