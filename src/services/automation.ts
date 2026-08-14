import connectDB from '@/config/db';
import IntegrationLog from '@/models/IntegrationLog';

const N8N_APPOINTMENT_WEBHOOK = process.env.N8N_APPOINTMENT_WEBHOOK;
const N8N_ENQUIRY_WEBHOOK = process.env.N8N_ENQUIRY_WEBHOOK;
const N8N_REPORT_WEBHOOK = process.env.N8N_REPORT_WEBHOOK;
const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || 'demo_webhook_secret_token';

async function logIntegration(
  type: 'appointment' | 'enquiry' | 'status_change' | 'report_ready',
  relatedId: any,
  webhookUrl: string,
  status: 'success' | 'failed',
  payload: any,
  errorMessage?: string,
  retryCount = 0
) {
  try {
    await connectDB();
    await IntegrationLog.create({
      type,
      relatedId,
      webhookUrl,
      status,
      errorMessage,
      retryCount,
      payload
    });
  } catch (error) {
    console.error('Error writing integration log to DB:', error);
  }
}

export async function triggerAppointmentWebhook(appointment: any): Promise<boolean> {
  const webhookUrl = N8N_APPOINTMENT_WEBHOOK;
  
  // Calculate preparation instructions for automated SMS / WhatsApp messages
  let fastingGuidelines = 'No specific fasting required.';
  if (
    appointment.fastingRequired ||
    appointment.service?.toLowerCase().includes('blood') ||
    appointment.service?.toLowerCase().includes('package') ||
    appointment.service?.toLowerCase().includes('profile') ||
    appointment.service?.toLowerCase().includes('diabetic') ||
    appointment.service?.toLowerCase().includes('lipid')
  ) {
    fastingGuidelines = '10-12 hours overnight fasting required. Water is permitted.';
  } else if (appointment.service?.toLowerCase().includes('ultrasound') || appointment.service?.toLowerCase().includes('usg')) {
    fastingGuidelines = 'Drink 3-4 glasses of water 1 hour prior to scan for clear pelvic imaging.';
  }

  // Pre-generate Google Maps navigation coordinates for phlebotomist dispatch
  const mapsUrl = appointment.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appointment.address + ', Toopran, Telangana')}`
    : undefined;

  const payload = {
    event: 'appointment.created',
    appointment: {
      id: appointment._id,
      patientName: appointment.patientName,
      phone: appointment.phone,
      email: appointment.email,
      service: appointment.service,
      bookingType: appointment.bookingType || 'walk-in',
      address: appointment.address || '',
      landmark: appointment.landmark || '',
      googleMapsNavigationUrl: mapsUrl,
      fastingGuidelines,
      referringDoctor: appointment.referringDoctor || 'Self / Walk-in',
      preferredDate: appointment.preferredDate,
      preferredTime: appointment.preferredTime,
      message: appointment.message,
      status: appointment.status,
      createdAt: appointment.createdAt
    }
  };

  if (!webhookUrl) {
    console.log('[Automation Service] Demo Mode: Appointment Webhook not configured. Payload:', payload);
    await logIntegration('appointment', appointment._id, 'MOCK_WEBHOOK_URL', 'success', payload);
    return true;
  }

  return sendWebhookRequest('appointment', appointment._id, webhookUrl, payload);
}

export async function triggerEnquiryWebhook(enquiry: any): Promise<boolean> {
  const webhookUrl = N8N_ENQUIRY_WEBHOOK;
  const payload = {
    event: 'enquiry.created',
    enquiry: {
      id: enquiry._id,
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email,
      service: enquiry.service,
      message: enquiry.message,
      status: enquiry.status,
      createdAt: enquiry.createdAt
    }
  };

  if (!webhookUrl) {
    console.log('[Automation Service] Demo Mode: Enquiry Webhook not configured. Payload:', payload);
    await logIntegration('enquiry', enquiry._id, 'MOCK_WEBHOOK_URL', 'success', payload);
    return true;
  }

  return sendWebhookRequest('enquiry', enquiry._id, webhookUrl, payload);
}

export async function triggerStatusChangeWebhook(appointment: any): Promise<boolean> {
  const webhookUrl = N8N_APPOINTMENT_WEBHOOK;
  const payload = {
    event: 'appointment.status_changed',
    appointment: {
      id: appointment._id,
      patientName: appointment.patientName,
      phone: appointment.phone,
      email: appointment.email,
      service: appointment.service,
      bookingType: appointment.bookingType || 'walk-in',
      status: appointment.status,
      preferredDate: appointment.preferredDate,
      preferredTime: appointment.preferredTime,
      updatedAt: appointment.updatedAt
    }
  };

  if (!webhookUrl) {
    console.log('[Automation Service] Demo Mode: Status Change Webhook not configured. Payload:', payload);
    await logIntegration('status_change', appointment._id, 'MOCK_WEBHOOK_URL', 'success', payload);
    return true;
  }

  return sendWebhookRequest('status_change', appointment._id, webhookUrl, payload);
}

export async function triggerReportReadyWebhook(report: any): Promise<boolean> {
  const webhookUrl = N8N_REPORT_WEBHOOK || N8N_APPOINTMENT_WEBHOOK;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const downloadUrl = `${baseUrl}/reports?code=${report.reportCode}`;

  const payload = {
    event: 'report.published',
    report: {
      id: report._id,
      reportCode: report.reportCode,
      patientName: report.patientName,
      phone: report.phone,
      testName: report.testName,
      testDate: report.testDate,
      doctorName: report.doctorName,
      conclusion: report.conclusion,
      downloadPortalUrl: downloadUrl,
      whatsappMessageDraft: `Dear ${report.patientName}, your test report for ${report.testName} is now ready. You can download your official verified report at: ${downloadUrl} - Asha Jyothi Diagnostic Centre Toopran.`,
      status: report.status,
      publishedAt: report.createdAt
    }
  };

  if (!webhookUrl) {
    console.log('[Automation Service] Demo Mode: Report Ready Webhook not configured. Payload:', payload);
    await logIntegration('report_ready', report._id, 'MOCK_WEBHOOK_URL', 'success', payload);
    return true;
  }

  return sendWebhookRequest('report_ready', report._id, webhookUrl, payload);
}

async function sendWebhookRequest(
  type: 'appointment' | 'enquiry' | 'status_change' | 'report_ready',
  relatedId: any,
  webhookUrl: string,
  payload: any,
  retryCount = 0
): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': N8N_WEBHOOK_SECRET,
        'Authorization': `Bearer ${N8N_WEBHOOK_SECRET}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      await logIntegration(type, relatedId, webhookUrl, 'success', payload, undefined, retryCount);
      return true;
    } else {
      const errorMsg = `Server responded with status code ${response.status}`;
      await logIntegration(type, relatedId, webhookUrl, 'failed', payload, errorMsg, retryCount);
      return false;
    }
  } catch (error: any) {
    const errorMsg = error.name === 'AbortError' ? 'Webhook request timed out (5s limit)' : error.message || 'Unknown network error';
    console.error(`Webhook connection failed to ${webhookUrl}:`, errorMsg);
    await logIntegration(type, relatedId, webhookUrl, 'failed', payload, errorMsg, retryCount);
    return false;
  }
}

export async function retryFailedWebhook(logId: string): Promise<boolean> {
  try {
    await connectDB();
    const logEntry = await IntegrationLog.findById(logId);
    if (!logEntry || logEntry.status === 'success') {
      return false;
    }

    const nextRetryCount = logEntry.retryCount + 1;
    let success = false;

    if (logEntry.webhookUrl === 'MOCK_WEBHOOK_URL') {
      success = true;
      logEntry.status = 'success';
      logEntry.retryCount = nextRetryCount;
      await logEntry.save();
    } else {
      success = await sendWebhookRequest(
        logEntry.type,
        logEntry.relatedId,
        logEntry.webhookUrl,
        logEntry.payload,
        nextRetryCount
      );

      if (success) {
        logEntry.status = 'success';
        logEntry.errorMessage = undefined;
      }
      logEntry.retryCount = nextRetryCount;
      await logEntry.save();
    }

    return success;
  } catch (error) {
    console.error('Retry webhook execution error:', error);
    return false;
  }
}
