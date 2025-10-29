// Calculator page - Organics diversion calculator
import { useState } from 'react';
import { Container, Section, SectionTitle, SectionDescription, Button, Input, Label, Card, CardContent } from '@zwa/ui';
import { Download, Leaf } from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { calculateOrganicsDiversion, downloadCSV } from '@/lib/calc';
import type { CalculatorInputs, CalculatorOutputs } from '@/lib/types';
import { formatNumber } from '@/lib/format';

export function Calculator() {
  usePageTitle('Organics Calculator');

  const [inputs, setInputs] = useState<CalculatorInputs>({
    households: 1000,
    organicsPerHouseholdPerDay: 0.5,
    captureRate: 80,
  });

  const [outputs, setOutputs] = useState<CalculatorOutputs | null>(null);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const handleCalculate = () => {
    const results = calculateOrganicsDiversion(inputs);
    setOutputs(results);
  };

  const handleDownload = () => {
    if (outputs) {
      downloadCSV(inputs, outputs);
    }
  };

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Topics', href: '/' },
          { label: 'Organics', href: '/' },
          { label: 'Calculator' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-fg mb-3">
          Organics Diversion Calculator
        </h1>
        <p className="text-base text-fg-muted leading-relaxed">
          Estimate the annual organic waste diversion and methane emissions avoided from your program.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inputs Section */}
        <Section>
          <SectionTitle>Inputs</SectionTitle>
          <SectionDescription>
            Enter your program parameters below to calculate impact.
          </SectionDescription>

          <div className="space-y-6">
            <div>
              <Label htmlFor="households" required>
                Number of Households
              </Label>
              <Input
                id="households"
                type="number"
                min="1"
                value={inputs.households}
                onChange={e => handleInputChange('households', e.target.value)}
                className="pr-20"
              />
              <p className="text-xs text-fg-muted mt-1">
                Total households participating in the program
              </p>
            </div>

            <div>
              <Label htmlFor="organics" required>
                Organics per Household per Day (kg)
              </Label>
              <Input
                id="organics"
                type="number"
                min="0"
                step="0.1"
                value={inputs.organicsPerHouseholdPerDay}
                onChange={e => handleInputChange('organicsPerHouseholdPerDay', e.target.value)}
              />
              <p className="text-xs text-fg-muted mt-1">
                Average organic waste generated per household daily
              </p>
            </div>

            <div>
              <Label htmlFor="capture" required>
                Capture Rate (%)
              </Label>
              <div className="space-y-3">
                <Input
                  id="capture"
                  type="range"
                  min="0"
                  max="100"
                  value={inputs.captureRate}
                  onChange={e => handleInputChange('captureRate', e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-fg-muted">0%</span>
                  <span className="text-lg font-bold text-primary">{inputs.captureRate}%</span>
                  <span className="text-sm text-fg-muted">100%</span>
                </div>
              </div>
              <p className="text-xs text-fg-muted mt-1">
                Percentage of organics successfully captured and diverted
              </p>
            </div>

            <Button onClick={handleCalculate} variant="primary" className="w-full" size="lg">
              <Leaf className="h-5 w-5" />
              Calculate Impact
            </Button>
          </div>
        </Section>

        {/* Outputs Section */}
        <Section>
          <SectionTitle>Results</SectionTitle>
          <SectionDescription>
            {outputs
              ? 'Your estimated annual impact from organic waste diversion'
              : 'Click "Calculate Impact" to see your results'}
          </SectionDescription>

          {outputs ? (
            <div className="space-y-6">
              <Card className="bg-green-500/10 border-green-500/30">
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-fg-muted uppercase tracking-wide mb-2">
                    Annual Organics Diverted
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-green-500 mb-1">
                    {formatNumber(outputs.annualDivertedTonnes, 2)} tonnes
                  </div>
                  <p className="text-sm text-fg-muted">Per year</p>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-fg-muted uppercase tracking-wide mb-2">
                    Methane Emissions Avoided
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {formatNumber(outputs.methaneAvoidedTCO2e, 2)} tCO₂e
                  </div>
                  <p className="text-sm text-fg-muted">Tonnes of CO₂-equivalent per year</p>
                </CardContent>
              </Card>

              <div className="bg-bg-muted border border-border rounded-lg p-4">
                <p className="text-xs text-fg-muted leading-relaxed">
                  <strong>Note:</strong> Methane avoidance calculation uses a factor of 0.5 tCO₂e per tonne of organic waste diverted. Actual values may vary based on landfill conditions, waste composition, and diversion method.
                </p>
              </div>

              <Button onClick={handleDownload} variant="secondary" className="w-full">
                <Download className="h-5 w-5" />
                Download Results (CSV)
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-fg-muted">
              <div className="text-center">
                <Leaf className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-sm">Enter your parameters and click Calculate</p>
              </div>
            </div>
          )}
        </Section>
      </div>

      {/* Explainer */}
      <Section className="mt-8">
        <SectionTitle>About This Calculator</SectionTitle>
        <div className="prose prose-sm max-w-none">
          <p className="text-fg-muted leading-relaxed mb-4">
            This calculator helps estimate the environmental benefits of organic waste diversion programs. When organic waste decomposes in landfills without oxygen (anaerobic decomposition), it produces methane—a greenhouse gas that is over 80 times more potent than CO₂ over a 20-year period.
          </p>
          <p className="text-fg-muted leading-relaxed mb-4">
            By diverting organic waste through composting, anaerobic digestion, or other sustainable treatment methods, we can:
          </p>
          <ul className="list-disc list-inside space-y-2 text-fg-muted mb-4">
            <li>Prevent methane emissions from landfills</li>
            <li>Create valuable compost for soil health</li>
            <li>Reduce waste management costs</li>
            <li>Support circular economy principles</li>
          </ul>
          <p className="text-xs text-fg-muted">
            <strong>Disclaimer:</strong> Results are estimates based on general emission factors. For precise measurements, consult with waste management experts and conduct site-specific assessments.
          </p>
        </div>
      </Section>
    </Container>
  );
}

