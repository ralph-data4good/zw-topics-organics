// Help Desk page with form
import { useState } from 'react';
import { Container, Section, SectionTitle, SectionDescription, Button, Input, Label, Select, Textarea, useToast } from '@zwa/ui';
import { Mail, Loader2 } from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { submitHelpDeskRequest } from '@/lib/adapters/helpdesk';
import { HelpDeskSubmission } from '@/lib/types';
import { getUniqueCountries } from '@/lib/adapters/directory';

export function HelpDesk() {
  usePageTitle('Help Desk');
  const { showToast, ToastContainer } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    country: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const countries = getUniqueCountries();

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      showToast({
        message: 'Please fix the errors in the form',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submission: HelpDeskSubmission = {
        name: formData.name,
        email: formData.email,
        organization: formData.organization || undefined,
        country: formData.country,
        topic: 'organics',
        message: formData.message,
      };

      const result = await submitHelpDeskRequest(submission);

      if (result.success) {
        showToast({
          message: result.message,
          type: 'success',
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          organization: '',
          country: '',
          message: '',
        });
      } else {
        showToast({
          message: result.message,
          type: 'error',
        });
      }
    } catch (error) {
      showToast({
        message: 'An error occurred. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Topics', href: '/' },
            { label: 'Organics', href: '/' },
            { label: 'Help Desk' },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-fg mb-3">Organics Help Desk</h1>
          <p className="text-base text-fg-muted leading-relaxed">
            Need assistance with organic waste management? Our team of experts is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <Section className="lg:col-span-2">
            <SectionTitle>Send Us a Message</SectionTitle>
            <SectionDescription>
              Fill out the form below and we'll get back to you within 2-3 business days.
            </SectionDescription>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  error={!!errors.name}
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  error={!!errors.email}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="organization">
                  Organization <span className="text-fg-muted">(optional)</span>
                </Label>
                <Input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={e => handleChange('organization', e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="country" required>
                  Country
                </Label>
                <Select
                  id="country"
                  value={formData.country}
                  onChange={e => handleChange('country', e.target.value)}
                  error={!!errors.country}
                  disabled={isSubmitting}
                >
                  <option value="">Select a country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Select>
                {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
              </div>

              <div>
                <Label htmlFor="message" required>
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder="Please describe your question or request..."
                  error={!!errors.message}
                  disabled={isSubmitting}
                  rows={6}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                <p className="text-xs text-fg-muted mt-1">
                  Minimum 10 characters
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Section>

          {/* Sidebar */}
          <div className="space-y-6">
            <Section>
              <h3 className="text-lg font-semibold text-fg mb-3">Contact Information</h3>
              <div className="space-y-3 text-sm text-fg-muted">
                <p>
                  <strong className="text-fg">Email:</strong><br />
                  organics@zerowasteasia.org
                </p>
                <p>
                  <strong className="text-fg">Response Time:</strong><br />
                  2-3 business days
                </p>
                <p>
                  <strong className="text-fg">Topics:</strong><br />
                  Composting, organic waste collection, policy guidance, technical assistance
                </p>
              </div>
            </Section>

            <Section>
              <h3 className="text-lg font-semibold text-fg mb-3">Other Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/resources" className="text-primary hover:underline">
                    Resource Library
                  </a>
                </li>
                <li>
                  <a href="/calculator" className="text-primary hover:underline">
                    Calculator Tool
                  </a>
                </li>
                <li>
                  <a href="/map" className="text-primary hover:underline">
                    Directory & Map
                  </a>
                </li>
              </ul>
            </Section>
          </div>
        </div>
      </Container>

      <ToastContainer />
    </>
  );
}

