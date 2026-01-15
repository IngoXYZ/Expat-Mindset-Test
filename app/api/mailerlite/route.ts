import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateSubscriber, sendTestResultsEmail } from '@/lib/mailerlite-service';

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting MailerLite integration...');
    
    const submission = await request.json();

    // Validate required fields
    if (!submission.name || !submission.email || !submission.totalScore) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or update subscriber with custom fields (using hardcoded credentials)
    const subscriberResult = await createOrUpdateSubscriber(submission);

    if (!subscriberResult.success) {
      console.error('❌ Failed to create subscriber:', subscriberResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: subscriberResult.error || 'Failed to create subscriber' 
        },
        { status: 500 }
      );
    }

    // Send test results email (via automation or transactional)
    const emailResult = await sendTestResultsEmail(submission);

    if (!emailResult.success) {
      console.warn('⚠️ Email sending setup failed:', emailResult.error);
      // Don't fail the whole request if email setup fails
    }

    console.log('✅ MailerLite integration completed successfully');

    return NextResponse.json({ 
      success: true,
      subscriberId: subscriberResult.subscriberId,
      message: 'Successfully added to MailerLite and email sequence initiated'
    });

  } catch (error) {
    console.error('❌ Error in MailerLite integration:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}
