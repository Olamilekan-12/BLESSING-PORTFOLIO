import { NextResponse } from 'next/server';

// EmailJS configuration - Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Form submission received:', JSON.stringify(body, null, 2));
    
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Using EmailJS to handle the form submission
    const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: name,
          from_email: email,
          to_email: 'blessingoghie@outlook.com',
          subject: `New Contact Form: ${subject}`,
          message: message,
        },
      }),
    });
    
    const result = await emailjsResponse.json().catch(() => ({}));
    console.log('EmailJS response:', {
      status: emailjsResponse.status,
      statusText: emailjsResponse.statusText,
      result
    });

    if (!emailjsResponse.ok) {
      throw new Error(result.message || 'Failed to submit form');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in form submission:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again later.';
    const statusCode = 'status' in (error as any) ? (error as any).status : 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode as number }
    );
  }
}
