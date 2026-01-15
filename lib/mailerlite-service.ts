// MailerLite Service for subscriber management and email sending

export interface QuizSubmission {
  name: string;
  email: string;
  totalScore: number;
  maxScore: number;
  resultType: string;
  categoryScores: Record<string, number>;
  recommendations: string[];
  timestamp: string;
}

// Hardcoded MailerLite credentials
const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZDcxZmU5YmFiNDRlYjRjODI0MjE1NWUyNzIxNWViMjUxZTJmZjAwZmJiY2M3Y2Q3ZTgxYWM5YWFkZmVmZDBiNzdhNmRmYTBhZTQ4NGVlZWIiLCJpYXQiOjE3Njg0MTg3MzcuMDY1NTksIm5iZiI6MTc2ODQxODczNy4wNjU1OTMsImV4cCI6NDkyNDA5MjMzNy4wNTE5MSwic3ViIjoiMjAzNDUxMiIsInNjb3BlcyI6W119.vRrLAbOnppIXuBCQlZBfRrxzIYwzNy_AZeKNez3EjA_d6J9aFrD1A_KkgUyRMn_nqPw_MO_8tgamwJ7aLF_N4W1qbgoXWDnboTsvR0cikerKWZIQp5QKEJ6ljO7SfmXasA5vivXWbgWZ7NCLGd0lRICXDOlDL6qJYfkUnwUXYpdioWJhEGSu3MzTQvBIuNI19gSpQO0szWCgoMNliugYCwVugdTYJI0pQ0DNQO-iihZZeFPUkDEa1iJhwZhwKrcYiTr-hs_-C-523vdWYRZWcyXRXOfVnyphvRPpzwnddJCDIWzkvU3rbZLqZxeQLlbX4Gq51ZQe0HL3cUiGT440H7poB2em3GMv4QHoOXwoFmCUscTxY-gBpe7uzZVTjGFnE2-XJAQ9Q3oMShoCdVJBMGt_5SDGi1OzXj1po0LD0B6AV-8sD4kw_XSXVGLn6I0iPeCj_gSOUhOUBnbrMNpoFqeZ1C-nfBBXfSTE7Q-l_A25Y6sKmVjlqtFL9pJznmaCMWsSYSZKyNpphtbHpqK5w0zRBZ_PHmJQO06vxkrwrTsS3pumiyXLdXobUbpxGiMRYDMJSYBjLqwzlt06yNjLQwGrkI0gKmP6V9pi5FFsvAjGkoOLWkXtEnzZ68qIZ_yKgshsM_PwuPVlW-jUCCXg1HC0DIdlMjiEzqp1jS3Xtec';
const MAILERLITE_GROUP_ID = '176599002499778006';
const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api';

/**
 * Create or update subscriber in MailerLite with custom fields
 */
export async function createOrUpdateSubscriber(
  submission: QuizSubmission
): Promise<{ success: boolean; subscriberId?: string; error?: string }> {
  try {
    // Format recommendations as bullet points
    const recommendationsText = submission.recommendations
      .map(rec => `• ${rec}`)
      .join('\\n');

    // Prepare subscriber data with custom fields (lowercase English names)
    const subscriberData = {
      email: submission.email,
      fields: {
        name: submission.name,
        total_score: submission.totalScore.toString(),
        max_score: submission.maxScore.toString(),
        result_type: submission.resultType,
        recommendations: recommendationsText,
        submission_date: submission.timestamp,
        // Category scores (English lowercase field names)
        willingness_to_change_score: submission.categoryScores.veraenderungsbereitschaft?.toFixed(1) || 'N/A',
        adaptability_score: submission.categoryScores.anpassungsfaehigkeit?.toFixed(1) || 'N/A',
        risk_tolerance_score: submission.categoryScores.risikobereitschaft?.toFixed(1) || 'N/A',
        financial_situation_score: submission.categoryScores.finanzielle_situation?.toFixed(1) || 'N/A',
        value_compass_score: submission.categoryScores.wertekompass?.toFixed(1) || 'N/A',
        need_for_security_score: submission.categoryScores.sicherheitsbeduerfnis?.toFixed(1) || 'N/A',
        growth_vs_comfort_score: submission.categoryScores.growth_vs_komfort?.toFixed(1) || 'N/A',
        conformity_vs_rebel_score: submission.categoryScores.konformitaet_vs_rebell?.toFixed(1) || 'N/A',
      },
      groups: [MAILERLITE_GROUP_ID], // Add to specified group
    };

    console.log('📧 Creating/updating subscriber in MailerLite...');
    console.log('📧 Subscriber data:', JSON.stringify(subscriberData, null, 2));

    // Create or update subscriber
    const response = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    });

    console.log('📧 Response status:', response.status);
    console.log('📧 Response headers:', Object.fromEntries(response.headers.entries()));

    // Read response text first for debugging
    const responseText = await response.text();
    console.log('📧 Response body:', responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText };
      }
      console.error('❌ MailerLite subscriber creation failed:', errorData);
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}: ${responseText}`,
      };
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Failed to parse response JSON:', e);
      return {
        success: false,
        error: 'Invalid JSON response from MailerLite',
      };
    }

    console.log('✅ Subscriber created/updated successfully');
    console.log('✅ Full result:', JSON.stringify(result, null, 2));

    // MailerLite API returns subscriber data directly or in a data wrapper
    const subscriberId = result.data?.id || result.id;
    
    if (!subscriberId) {
      console.warn('⚠️ No subscriber ID found in response, but operation may have succeeded');
    }

    return {
      success: true,
      subscriberId: subscriberId,
    };
  } catch (error) {
    console.error('❌ Error creating subscriber:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send email via MailerLite (using campaigns or transactional emails)
 * Note: MailerLite doesn't have a direct \"send email\" API like SendGrid.
 * Instead, you typically:
 * 1. Create email templates in MailerLite dashboard
 * 2. Trigger automations based on subscriber groups/fields
 * 3. Or use transactional emails (if available in your plan)
 * 
 * For now, we'll rely on MailerLite automations triggered by group membership
 * and custom fields to send the sequence.
 */
export async function sendTestResultsEmail(
  submission: QuizSubmission
): Promise<{ success: boolean; error?: string }> {
  try {
    // The test results email should be sent via MailerLite automation
    // triggered when a subscriber is added to the group with the custom fields set
    
    // Alternatively, if you have transactional email enabled:
    // You can use the MailerLite API to send individual emails
    
    console.log('✅ Test results email will be sent via MailerLite automation');
    
    return {
      success: true,
    };
  } catch (error) {
    console.error('❌ Error setting up email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Helper function to format category scores for email
 */
export function formatCategoryScores(categoryScores: Record<string, number>): string {
  return Object.entries(categoryScores)
    .map(([category, score]) => {
      const categoryName = category
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return `${categoryName}: ${score.toFixed(1)}/5`;
    })
    .join('\\n');
}
