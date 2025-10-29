// Calculator logic for organics diversion and methane avoidance
// TODO: Update emission factors based on latest research

import type { CalculatorInputs, CalculatorOutputs } from './types';

// Emission factor: tonnes CO2e avoided per tonne of organic waste diverted
// This is a placeholder - actual factor depends on landfill conditions, moisture, etc.
const METHANE_AVOIDANCE_FACTOR = 0.5; // tCO2e per tonne organics

export function calculateOrganicsDiversion(inputs: CalculatorInputs): CalculatorOutputs {
  const { households, organicsPerHouseholdPerDay, captureRate } = inputs;
  
  // Calculate daily organics (kg)
  const dailyOrganicsKg = households * organicsPerHouseholdPerDay * (captureRate / 100);
  
  // Calculate annual organics (tonnes)
  const annualDivertedTonnes = (dailyOrganicsKg * 365) / 1000;
  
  // Calculate methane avoided (tCO2e)
  const methaneAvoidedTCO2e = annualDivertedTonnes * METHANE_AVOIDANCE_FACTOR;
  
  return {
    annualDivertedTonnes: Math.round(annualDivertedTonnes * 100) / 100,
    methaneAvoidedTCO2e: Math.round(methaneAvoidedTCO2e * 100) / 100,
  };
}

export function exportToCSV(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const rows = [
    ['Organics Diversion Calculator Results', ''],
    ['', ''],
    ['INPUTS', ''],
    ['Households', inputs.households.toString()],
    ['Organics per Household per Day (kg)', inputs.organicsPerHouseholdPerDay.toString()],
    ['Capture Rate (%)', inputs.captureRate.toString()],
    ['', ''],
    ['OUTPUTS', ''],
    ['Annual Diverted (tonnes)', outputs.annualDivertedTonnes.toString()],
    ['Methane Avoided (tCO₂e)', outputs.methaneAvoidedTCO2e.toString()],
  ];
  
  return rows.map(row => row.join(',')).join('\n');
}

export function downloadCSV(inputs: CalculatorInputs, outputs: CalculatorOutputs, filename: string = 'organics-calculator-results.csv') {
  const csv = exportToCSV(inputs, outputs);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

