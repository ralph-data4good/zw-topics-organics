// Help Desk adapter — posts submissions to a Google Sheet via Apps Script
// Deploy scripts/helpdesk-sheets-apps-script.gs and set VITE_HELPDESK_SHEETS_URL

import type { HelpDeskSubmission } from '../types';

export interface HelpDeskSubmitResult {
  success: boolean;
  message: string;
}

const SHEETS_URL = (import.meta.env.VITE_HELPDESK_SHEETS_URL as string | undefined)?.trim();

export async function submitHelpDeskRequest(
  data: HelpDeskSubmission
): Promise<HelpDeskSubmitResult> {
  if (!data.email.includes('@')) {
    return {
      success: false,
      message: 'Invalid email address',
    };
  }

  if (!SHEETS_URL) {
    console.error(
      'Help Desk: VITE_HELPDESK_SHEETS_URL is not set. Deploy the Apps Script and add the URL to .env.'
    );
    return {
      success: false,
      message:
        'Form submissions are not configured yet. Please email organicscongress@no-burn.org directly, or try again later.',
    };
  }

  try {
    // text/plain avoids a CORS preflight; Apps Script still receives JSON in postData.contents
    const response = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        organization: data.organization ?? '',
        country: data.country,
        topic: data.topic,
        message: data.message,
        submittedAt: new Date().toISOString(),
      }),
      redirect: 'follow',
    });

    // Apps Script often returns 200 with a redirect; try to parse JSON when available
    const text = await response.text();
    let parsed: { success?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(text) as { success?: boolean; error?: string };
    } catch {
      // Empty or HTML redirect body — treat HTTP ok as success
    }

    if (parsed && parsed.success === false) {
      return {
        success: false,
        message: parsed.error || 'Unable to save your request. Please try again.',
      };
    }

    if (!response.ok && parsed?.success !== true) {
      return {
        success: false,
        message: 'Unable to save your request. Please try again or email organicscongress@no-burn.org.',
      };
    }

    return {
      success: true,
      message:
        'Your request has been submitted successfully. We will get back to you within 2-3 business days.',
    };
  } catch (error) {
    console.error('Help Desk submission failed:', error);
    return {
      success: false,
      message:
        'Network error while submitting. Please try again or email organicscongress@no-burn.org.',
    };
  }
}
