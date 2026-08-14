import connectDB from '@/config/db';
import ChatSession from '@/models/ChatSession';
import Appointment from '@/models/Appointment';
import Report from '@/models/Report';
import { triggerAppointmentWebhook } from '@/services/automation';
import { healthPackages } from '@/config/packages';
import { centreInfo } from '@/config/centreInfo';

export interface BotResponse {
  replyText: string;
  actionTaken?: string;
  bookingCreated?: any;
}

const SERVICE_OPTIONS: Record<string, string> = {
  '1': 'Ultrasound Scan (USG)',
  '2': 'Digital X-Ray',
  '3': 'CT Scan',
  '4': 'Pathology & Blood Laboratory',
  '5': 'Master Health Checkup (58 Tests)',
  '6': 'ECG & Heart Monitoring',
  'usg': 'Ultrasound Scan (USG)',
  'ultrasound': 'Ultrasound Scan (USG)',
  'xray': 'Digital X-Ray',
  'x-ray': 'Digital X-Ray',
  'ct': 'CT Scan',
  'blood': 'Pathology & Blood Laboratory',
  'lab': 'Pathology & Blood Laboratory',
  'master': 'Master Health Checkup (58 Tests)',
  'package': 'Master Health Checkup (58 Tests)',
  'ecg': 'ECG & Heart Monitoring'
};

function getFastingInfo(serviceName: string): { required: boolean; guidelines: string } {
  const s = serviceName.toLowerCase();
  if (s.includes('master') || s.includes('diabetic') || s.includes('lipid') || s.includes('fasting') || s.includes('wellness') || s.includes('cardiac') || s.includes('senior')) {
    return {
      required: true,
      guidelines: '10-12 hours overnight fasting required. Drink plain water only.'
    };
  }
  if (s.includes('usg') || s.includes('ultrasound') || s.includes('abdomen')) {
    return {
      required: true,
      guidelines: '6-8 hours fasting for abdomen scan. Drink 4 glasses of water 1 hour prior for pelvic scan.'
    };
  }
  if (s.includes('ct')) {
    return {
      required: true,
      guidelines: '4 hours fasting if contrast is required. Bring prior scan reports.'
    };
  }
  return {
    required: false,
    guidelines: 'No special fasting required. Standard hydration recommended.'
  };
}

export async function processInboundWhatsAppMessage(
  fromPhone: string,
  messageBody: string,
  senderName: string = 'Valued Patient'
): Promise<BotResponse> {
  await connectDB();

  const cleanPhone = fromPhone.replace(/[^0-9]/g, '');
  const text = (messageBody || '').trim();
  const lower = text.toLowerCase();

  // Find or create user session
  let session = await ChatSession.findOne({ phone: cleanPhone });
  if (!session) {
    session = new ChatSession({
      phone: cleanPhone,
      patientName: senderName,
      step: 'IDLE',
      bookingData: {}
    });
  }

  // Update sender name if available
  if (senderName && senderName !== 'Valued Patient' && !session.bookingData?.fullName) {
    session.patientName = senderName;
  }

  session.lastMessageAt = new Date();

  // GLOBAL RESET / MENU COMMANDS
  if (lower === 'hi' || lower === 'hello' || lower === 'hey' || lower === 'menu' || lower === 'start' || lower === 'reset' || lower === '0' || lower === 'cancel') {
    session.step = 'IDLE';
    session.bookingData = {};
    await session.save();

    return {
      replyText: `🏥 *Welcome to Asha Jyothi Diagnostic Centre, Toopran!* 👋\n\nHello *${session.patientName}*, how can we help you today?\n\n1️⃣ *Book a Scan / Test (Walk-in or Home Sample)*\n2️⃣ *Check My Test Report Status*\n3️⃣ *Health Checkup Packages & Pricing*\n4️⃣ *Clinic Timings & Google Maps Directions*\n5️⃣ *Speak to Receptionist*\n\n_👉 Reply with *1*, *2*, *3*, *4*, or *5* to begin._`
    };
  }

  // STEP: IDLE (Main Menu Routing)
  if (session.step === 'IDLE') {
    if (lower === '1' || lower.includes('book') || lower.includes('appointment') || lower.includes('scan') || lower.includes('test')) {
      session.step = 'AWAITING_NAME';
      session.bookingData = {};
      await session.save();

      return {
        replyText: `👤 *Step 1 of 5: Patient Details*\n\nPlease enter the **Patient's Full Name**.\n\n_(Example: Ramesh Kumar)_\n_(Type '0' anytime to cancel and return to menu)_`
      };
    }

    if (lower === '2' || lower.includes('report') || lower.includes('result') || lower.includes('download')) {
      session.step = 'AWAITING_REPORT_QUERY';
      await session.save();

      return {
        replyText: `📄 *Diagnostic Report Inquiry*\n\nPlease reply with your **Report Code** (e.g. \`AJ-RPT-101-4921\`) or type your **10-digit mobile number** to check your verified test results.`
      };
    }

    if (lower === '3' || lower.includes('package') || lower.includes('pricing') || lower.includes('cost') || lower.includes('price')) {
      let packageText = `🩺 *Asha Jyothi Preventive Health Packages:*\n\n`;
      healthPackages.forEach((pkg, idx) => {
        packageText += `*${idx + 1}. ${pkg.name}*\n`;
        packageText += `• ${pkg.testsCount} Tests | ${pkg.tagline}\n`;
        packageText += `• Fasting: ${pkg.fasting}\n\n`;
      });
      packageText += `_👉 Reply with *1* to book an appointment, or *0* for main menu._`;
      return { replyText: packageText };
    }

    if (lower === '4' || lower.includes('location') || lower.includes('address') || lower.includes('timing') || lower.includes('map') || lower.includes('where')) {
      return {
        replyText: `📍 *Asha Jyothi Diagnostic Centre, Toopran*\n\n🏠 *Address:*\n${centreInfo.address}\n\n⏰ *Working Hours:*\n${centreInfo.contact.workingHours}\n\n🗺️ *1-Click Google Maps Navigation:*\n${centreInfo.mapUrl}\n\n📞 *Direct Phone:* ${centreInfo.contact.phones.join(' / ')}\n\n_👉 Reply with *1* to book an appointment._`
      };
    }

    if (lower === '5' || lower.includes('talk') || lower.includes('reception') || lower.includes('call') || lower.includes('human')) {
      return {
        replyText: `📞 *Contact Asha Jyothi Reception*\n\nOur front desk is available to assist you directly:\n📞 Phone: *+91 73863 20634* / *+91 94400 09788*\n📍 Address: 13-21/1/A, Keshava Nagar Colony, Toopran.\n\n_Our receptionist will also contact you shortly on this number._`
      };
    }

    // Default Fallback
    return {
      replyText: `🏥 *Asha Jyothi Diagnostic Centre, Toopran*\n\nI didn't quite catch that. Please reply with a number:\n\n1️⃣ *Book a Scan / Home Sample*\n2️⃣ *Check My Test Report*\n3️⃣ *Health Packages & Pricing*\n4️⃣ *Location & Timings*\n5️⃣ *Speak to Receptionist*`
    };
  }

  // STEP: AWAITING_NAME (Collects real patient name)
  if (session.step === 'AWAITING_NAME') {
    if (text.length < 2) {
      return {
        replyText: `⚠️ Please provide a valid patient full name (e.g. Ramesh Kumar).`
      };
    }

    session.bookingData.fullName = text;
    session.patientName = text;
    session.step = 'AWAITING_AGE_GENDER';
    await session.save();

    return {
      replyText: `🎂 *Step 2 of 5: Age & Gender*\n\nThanks, *${text}*! Please reply with the **Patient's Age & Gender** *(required for calibrated medical reference ranges)*.\n\n_(Example: '45, Male' or '32, Female')_`
    };
  }

  // STEP: AWAITING_AGE_GENDER (Collects age and gender)
  if (session.step === 'AWAITING_AGE_GENDER') {
    session.bookingData.age = text;
    session.step = 'AWAITING_SERVICE';
    await session.save();

    return {
      replyText: `🧪 *Step 3 of 5: Select Test or Scan*\n\nWhich scan or health checkup would you like to book?\n\n1️⃣ *Ultrasound Scan (USG)*\n2️⃣ *Digital X-Ray*\n3️⃣ *CT Scan*\n4️⃣ *Blood / Pathology Laboratory*\n5️⃣ *Master Health Checkup (58 Tests)*\n6️⃣ *ECG & Heart Monitoring*\n\n_👉 Reply with the number (1-6) or type any specific test name._`
    };
  }

  // STEP: AWAITING_SERVICE
  if (session.step === 'AWAITING_SERVICE') {
    let selectedService = SERVICE_OPTIONS[lower];

    if (!selectedService) {
      if (text.length >= 2) {
        selectedService = text;
      } else {
        return {
          replyText: `⚠️ Please choose a valid option (1 to 6) or type the test name you require.\n\n1. USG\n2. Digital X-Ray\n3. CT Scan\n4. Blood / Lab Tests\n5. Master Health Checkup\n6. ECG`
        };
      }
    }

    const fasting = getFastingInfo(selectedService);
    session.bookingData.service = selectedService;
    session.bookingData.fastingRequired = fasting.required;
    session.bookingData.fastingGuidelines = fasting.guidelines;
    session.step = 'AWAITING_BOOKING_TYPE';
    await session.save();

    return {
      replyText: `✅ Selected: *${selectedService}*\n\n*Step 4 of 5: Visit Preference*\nWould you prefer:\n1️⃣ *Home Sample Collection* (Doorstep phlebotomist in Toopran)\n2️⃣ *Clinic Walk-in* (Visit Asha Jyothi Centre, Toopran)\n\n_👉 Reply with *1* for Home Collection or *2* for Clinic Walk-in._`
    };
  }

  // STEP: AWAITING_BOOKING_TYPE
  if (session.step === 'AWAITING_BOOKING_TYPE') {
    if (lower === '1' || lower.includes('home') || lower.includes('doorstep')) {
      session.bookingData.bookingType = 'home_collection';
      session.step = 'AWAITING_ADDRESS';
      await session.save();

      return {
        replyText: `🏠 *Step 5 of 5: Doorstep Address*\n\nPlease reply with your **House No, Street / Colony, & Landmark in Toopran** for the phlebotomist visit.\n\n_(Example: Plot 42, Keshava Nagar Colony, near Hanuman Temple)_`
      };
    } else if (lower === '2' || lower.includes('walk') || lower.includes('clinic') || lower.includes('centre')) {
      session.bookingData.bookingType = 'walk-in';
      session.bookingData.address = 'Clinic Walk-in';
      session.bookingData.landmark = 'Toopran Centre';
      session.step = 'AWAITING_SLOT';
      await session.save();

      return {
        replyText: `🏥 *Step 5 of 5: Preferred Date & Time*\n\nWhat date & time slot would you like to visit the centre?\n\n_(Example: 'Tomorrow 9:00 AM' or '17 Aug 10:30 AM')_`
      };
    } else {
      return {
        replyText: `⚠️ Please reply with:\n*1* for Home Sample Collection\n*2* for Clinic Walk-in`
      };
    }
  }

  // STEP: AWAITING_ADDRESS (Only for Home Collection)
  if (session.step === 'AWAITING_ADDRESS') {
    if (text.length < 5) {
      return {
        replyText: `⚠️ Please provide a complete doorstep address and nearby landmark for the phlebotomist.`
      };
    }

    session.bookingData.address = text;
    session.bookingData.landmark = 'Toopran';
    session.step = 'AWAITING_SLOT';
    await session.save();

    return {
      replyText: `📍 Address saved: *${text}*\n\nWhen would you like the sample collected?\n\n_(Example: 'Tomorrow 7:30 AM' or '16 Aug 8:00 AM')_`
    };
  }

  // STEP: AWAITING_SLOT (Final Confirmation & Direct Booking Creation)
  if (session.step === 'AWAITING_SLOT') {
    const slotText = text;
    const today = new Date().toISOString().split('T')[0];
    const patientFullName = session.bookingData.fullName || session.patientName || 'Patient';
    const patientAgeGender = session.bookingData.age ? ` (Age/Gender: ${session.bookingData.age})` : '';

    // Create the real appointment in MongoDB!
    const newAppointment = await Appointment.create({
      patientName: patientFullName,
      phone: session.phone,
      service: session.bookingData.service || 'Diagnostic Scan',
      bookingType: session.bookingData.bookingType || 'walk-in',
      address: session.bookingData.address || '',
      landmark: session.bookingData.landmark || '',
      preferredDate: today,
      preferredTime: slotText,
      fastingRequired: session.bookingData.fastingRequired || false,
      message: `Booked via 24/7 WhatsApp Chatbot.${patientAgeGender} Preferred Slot: ${slotText}`,
      status: 'new'
    });

    // Reset session back to IDLE
    const bookedService = session.bookingData.service;
    const bookedType = session.bookingData.bookingType === 'home_collection' ? 'Home Sample Collection' : 'Clinic Walk-in';
    const bookedAddress = session.bookingData.address || 'Clinic Walk-in (Toopran)';
    const fastingNote = session.bookingData.fastingGuidelines || 'Standard hydration';

    session.step = 'IDLE';
    session.bookingData = {};
    await session.save();

    // Trigger n8n Automation (Google Sheets, Google Calendar, Phlebotomist Alert with Google Maps URL)
    try {
      await triggerAppointmentWebhook(newAppointment);
    } catch (err) {
      console.error('[WhatsApp Bot] Webhook trigger error:', err);
    }

    return {
      replyText: `🎉 *BOOKING CONFIRMED!* 🎉\n\n🔖 *Ref ID:* \`${newAppointment._id.toString().slice(-8).toUpperCase()}\`\n👤 *Patient:* ${newAppointment.patientName}${patientAgeGender}\n📞 *Phone:* ${newAppointment.phone}\n🧪 *Service:* ${bookedService}\n📍 *Type:* ${bookedType}\n🏠 *Location:* ${bookedAddress}\n⏰ *Requested Slot:* ${slotText}\n\n⚠️ *Preparation Guidelines:*\n${fastingNote}\n\nOur team is notified and will ensure timely service.\n📞 *Clinic Helpline:* +91 73863 20634\n\n_Thank you for choosing Asha Jyothi Diagnostics!_`,
      actionTaken: 'APPOINTMENT_CREATED',
      bookingCreated: newAppointment
    };
  }

  // STEP: AWAITING_REPORT_QUERY
  if (session.step === 'AWAITING_REPORT_QUERY') {
    session.step = 'IDLE';
    await session.save();

    const query = text.trim();
    const reports = await Report.find({
      $or: [
        { reportCode: new RegExp(query, 'i') },
        { phone: cleanPhone },
        { phone: query.replace(/[^0-9]/g, '') }
      ]
    }).sort({ createdAt: -1 }).limit(3);

    if (reports.length === 0) {
      return {
        replyText: `🔍 *No reports found for:* \`${query}\`\n\nYour test may still be under clinical processing by our pathologists.\n\n📞 Please call our lab desk directly at *+91 73863 20634* with your patient slip reference.`
      };
    }

    let reportMsg = `📄 *Found ${reports.length} Verified Diagnostic Report(s):*\n\n`;
    reports.forEach((rpt, idx) => {
      reportMsg += `*${idx + 1}. ${rpt.testName}*\n`;
      reportMsg += `• Patient: ${rpt.patientName} (${rpt.gender || 'M'}, ${rpt.age || '35'}y)\n`;
      reportMsg += `• Date: ${rpt.testDate} | Doctor: ${rpt.doctorName}\n`;
      reportMsg += `• Status: *${rpt.status.toUpperCase()}*\n`;
      reportMsg += `🔗 *Download Calibrated PDF:* https://rrk-diagnostic.vercel.app/reports?code=${rpt.reportCode}\n\n`;
    });

    reportMsg += `_👉 Reply with *0* to return to main menu._`;
    return { replyText: reportMsg };
  }

  return {
    replyText: `🏥 Reply with *1* to book an appointment or *0* for menu.`
  };
}
