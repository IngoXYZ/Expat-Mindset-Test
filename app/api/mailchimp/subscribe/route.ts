import { NextRequest, NextResponse } from 'next/server';
import { subscribeToMailchimp } from '@/lib/mailchimp-service';

/**
 * POST /api/mailchimp/subscribe
 * 
 * Subscribe a user to the Mailchimp mailing list
 * 
 * Request body:
 * {
 *   email: string;
 *   firstName: string;
 *   tags?: string[];
 *   mergeFields?: Record<string, any>;
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, firstName, tags, mergeFields } = body;

    // Validate required fields
    if (!email || !firstName) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email and first name are required'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format'
        },
        { status: 400 }
      );
    }

    // Check if Mailchimp is configured
    if (!process.env.MAILCHIMP_API_KEY || 
        !process.env.MAILCHIMP_SERVER_PREFIX || 
        !process.env.MAILCHIMP_LIST_ID) {
      console.warn('Mailchimp is not configured. Skipping subscription.');
      return NextResponse.json(
        {
          success: true,
          message: 'Mailchimp is not configured. User data saved locally.',
          skipped: true
        },
        { status: 200 }
      );
    }

    // Subscribe to Mailchimp
    const result = await subscribeToMailchimp({
      email,
      firstName,
      status: 'subscribed',
      tags: tags || ['Expat Mindset Test'],
      mergeFields: mergeFields || {}
    });

    if (!result.success) {
      // Log error but don't fail the request
      // This ensures the quiz can continue even if Mailchimp fails
      console.error('Mailchimp subscription failed:', result.message);
      
      return NextResponse.json(
        {
          success: true,
          message: 'User data saved. Mailchimp subscription pending.',
          mailchimpError: result.message,
          warning: true
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.data
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in Mailchimp subscribe API:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/mailchimp/subscribe
 * 
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Mailchimp subscribe API is running',
      configured: !!(
        process.env.MAILCHIMP_API_KEY && 
        process.env.MAILCHIMP_SERVER_PREFIX && 
        process.env.MAILCHIMP_LIST_ID
      )
    },
    { status: 200 }
  );
}
