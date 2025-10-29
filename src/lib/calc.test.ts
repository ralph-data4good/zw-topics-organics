// Calculator unit tests (example)
// Run with: npm run test

import { describe, it, expect } from 'vitest';
import { calculateOrganicsDiversion } from './calc';

describe('calculateOrganicsDiversion', () => {
  it('calculates annual diverted tonnes correctly', () => {
    const result = calculateOrganicsDiversion({
      households: 1000,
      organicsPerHouseholdPerDay: 0.5,
      captureRate: 80,
    });

    // 1000 households * 0.5 kg/day * 80% * 365 days / 1000 = 146 tonnes
    expect(result.annualDivertedTonnes).toBe(146);
  });

  it('calculates methane avoided correctly', () => {
    const result = calculateOrganicsDiversion({
      households: 1000,
      organicsPerHouseholdPerDay: 0.5,
      captureRate: 100,
    });

    // 1000 * 0.5 * 365 / 1000 = 182.5 tonnes
    // 182.5 * 0.5 = 91.25 tCO2e
    expect(result.methaneAvoidedTCO2e).toBe(91.25);
  });

  it('handles zero capture rate', () => {
    const result = calculateOrganicsDiversion({
      households: 1000,
      organicsPerHouseholdPerDay: 0.5,
      captureRate: 0,
    });

    expect(result.annualDivertedTonnes).toBe(0);
    expect(result.methaneAvoidedTCO2e).toBe(0);
  });

  it('handles small values', () => {
    const result = calculateOrganicsDiversion({
      households: 10,
      organicsPerHouseholdPerDay: 0.1,
      captureRate: 50,
    });

    expect(result.annualDivertedTonnes).toBeGreaterThan(0);
    expect(result.methaneAvoidedTCO2e).toBeGreaterThan(0);
  });
});

