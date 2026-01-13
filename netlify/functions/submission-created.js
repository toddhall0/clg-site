import sgMail from '@sendgrid/mail';

// Resource mapping based on form selection
const RESOURCES = {
  'closing-checklist': {
    name: 'Commercial Real Estate Closing Checklist',
    filename: 'closing-checklist.pdf',
    description: 'A practical, attorney-built checklist to help developers and investors avoid last-minute surprises.'
  },
  'fha-hud-checklist': {
    name: 'FHA/HUD Multifamily Loan Opinion Checklist',
    filename: 'fha-hud-checklist.pdf',
    description: 'Key requirements and considerations for FHA/HUD multifamily loan opinion letters.'
  },
  'retail-lease-guide': {
    name: 'Retail Lease Red Flags Guide',
    filename: 'retail-lease-guide.pdf',
    description: 'Common issues to watch for when reviewing retail lease agreements.'
  }
};

export async function handler(event) {
  // Parse the form submission payload
  const { payload } = JSON.parse(event.body);
  const { form_name, data } = payload;

  // Only process lead-magnet form submissions
  if (form_name !== 'lead-magnet') {
    console.log(`Skipping email for form: ${form_name}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Not a lead-magnet form submission' })
    };
  }

  // Check for required environment variable
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY environment variable is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email service not configured' })
    };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { name, email, interest } = data;
  const resource = RESOURCES[interest];

  if (!resource) {
    console.error(`Unknown resource requested: ${interest}`);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Unknown resource requested' })
    };
  }

  // Get the site URL from environment or use default
  const siteUrl = process.env.URL || 'https://www.clglawaz.com';
  const downloadUrl = `${siteUrl}/resources/${resource.filename}`;

  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL || 'info@clglawaz.com',
      name: 'Camelback Law Group'
    },
    subject: `Your Resource: ${resource.name}`,
    text: `
Hello ${name},

Thank you for your interest in Camelback Law Group.

You requested: ${resource.name}

${resource.description}

Download your resource here:
${downloadUrl}

If you have questions about a current transaction or would like to schedule a consultation, please don't hesitate to reach out.

Best regards,
Camelback Law Group
2720 E Camelback Rd
Phoenix, AZ 85016
(480) 203-3039
info@clglawaz.com
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1a1f1f 0%, #232a2a 100%); padding: 30px; border-radius: 8px 8px 0 0;">
    <h1 style="color: #1a9ba5; margin: 0; font-size: 24px;">Camelback Law Group</h1>
  </div>

  <div style="background: #f5f5f2; padding: 30px; border-radius: 0 0 8px 8px;">
    <p style="margin-top: 0;">Hello ${name},</p>

    <p>Thank you for your interest in Camelback Law Group.</p>

    <p><strong>You requested:</strong> ${resource.name}</p>

    <p style="color: #666; font-style: italic;">${resource.description}</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${downloadUrl}" style="display: inline-block; background: #1a9ba5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: 600;">Download Your Resource</a>
    </div>

    <p>If you have questions about a current transaction or would like to schedule a consultation, please don't hesitate to reach out.</p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

    <p style="margin-bottom: 0; color: #666; font-size: 14px;">
      <strong>Camelback Law Group</strong><br>
      2720 E Camelback Rd<br>
      Phoenix, AZ 85016<br>
      <a href="tel:4802033039" style="color: #1a9ba5;">(480) 203-3039</a><br>
      <a href="mailto:info@clglawaz.com" style="color: #1a9ba5;">info@clglawaz.com</a>
    </p>
  </div>
</body>
</html>
    `.trim()
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully to ${email} for resource: ${interest}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('SendGrid error:', error);
    if (error.response) {
      console.error('SendGrid response body:', error.response.body);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
}
