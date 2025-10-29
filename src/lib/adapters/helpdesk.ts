// Help Desk adapter - mock implementation
// TODO: Replace with Supabase insert when ready

import type { HelpDeskSubmission } from '../types';

export async function submitHelpDeskRequest(data: HelpDeskSubmission): Promise<{ success: boolean; message: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (!data.email.includes('@')) {
    return {
      success: false,
      message: 'Invalid email address',
    };
  }
  
  // Log to console (in production, this would send to Supabase)
  console.log('Help Desk Submission (MOCK):', data);
  
  return {
    success: true,
    message: 'Your request has been submitted successfully. We will get back to you within 2-3 business days.',
  };
}

