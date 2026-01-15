import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateSubscriber, sendTestResultsEmail } from '@/lib/mailerlite-service';

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting MailerLite integration...');
    
    const submission = await request.json();
    console.log('📝 Received submission:', {
      name: submission.name,
      email: submission.email,
      totalScore: submission.totalScore
    });

    // Validate required fields
    if (!submission.name || !submission.email || submission.totalScore === undefined) {
      console.error('❌ Missing required fields:', { 
        hasName: !!submission.name, 
        hasEmail: !!submission.email, 
        hasTotalScore: submission.totalScore !== undefined 
      });
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    // Create or update subscriber with custom fields (using hardcoded credentials)
    console.log('📧 Creating subscriber in MailerLite...');
    const subscriberResult = await createOrUpdateSubscriber(submission);
    console.log('📧 Subscriber result:', subscriberResult);

    if (!subscriberResult.success) {
      console.error('❌ Failed to create subscriber:', subscriberResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: subscriberResult.error || 'Failed to create subscriber in MailerLite' 
        },
        { status: 500 }
      );
    }

    // Send test results email (via automation or transactional)
    console.log('📧 Setting up email automation...');
    const emailResult = await sendTestResultsEmail(submission);

    if (!emailResult.success) {
      console.warn('⚠️ Email sending setup failed:', emailResult.error);
      // Don't fail the whole request if email setup fails
      // The subscriber is already added and automation should trigger
    }

    console.log('✅ MailerLite integration completed successfully');

    return NextResponse.json({ 
      success: true,
      subscriberId: subscriberResult.subscriberId,
      message: 'Successfully added to MailerLite and email sequence initiated'
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('❌ Error in MailerLite integration:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}
