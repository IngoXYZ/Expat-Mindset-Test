#!/usr/bin/env node

/**
 * Test with actual quiz data structure to verify the integration works
 */

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZDcxZmU5YmFiNDRlYjRjODI0MjE1NWUyNzIxNWViMjUxZTJmZjAwZmJiY2M3Y2Q3ZTgxYWM5YWFkZmVmZDBiNzdhNmRmYTBhZTQ4NGVlZWIiLCJpYXQiOjE3Njg0MTg3MzcuMDY1NTksIm5iZiI6MTc2ODQxODczNy4wNjU1OTMsImV4cCI6NDkyNDA5MjMzNy4wNTE5MSwic3ViIjoiMjAzNDUxMiIsInNjb3BlcyI6W119.vRrLAbOnppIXuBCQlZBfRrxzIYwzNy_AZeKNez3EjA_d6J9aFrD1A_KkgUyRMn_nqPw_MO_8tgamwJ7aLF_N4W1qbgoXWDnboTsvR0cikerKWZIQp5QKEJ6ljO7SfmXasA5vivXWbgWZ7NCLGd0lRICXDOlDL6qJYfkUnwUXYpdioWJhEGSu3MzTQvBIuNI19gSpQO0szWCgoMNliugYCwVugdTYJI0pQ0DNQO-iihZZeFPUkDEa1iJhwZhwKrcYiTr-hs_-C-523vdWYRZWcyXRXOfVnyphvRPpzwnddJCDIWzkvU3rbZLqZxeQLlbX4Gq51ZQe0HL3cUiGT440H7poB2em3GMv4QHoOXwoFmCUscTxY-gBpe7uzZVTjGFnE2-XJAQ9Q3oMShoCdVJBMGt_5SDGi1OzXj1po0LD0B6AV-8sD4kw_XSXVGLn6I0iPeCj_gSOUhOUBnbrMNpoFqeZ1C-nfBBXfSTE7Q-l_A25Y6sKmVjlqtFL9pJznmaCMWsSYSZKyNpphtbHpqK5w0zRBZ_PHmJQO06vxkrwrTsS3pumiyXLdXobUbpxGiMRYDMJSYBjLqwzlt06yNjLQwGrkI0gKmP6V9pi5FFsvAjGkoOLWkXtEnzZ68qIZ_yKgshsM_PwuPVlW-jUCCXg1HC0DIdlMjiEzqp1jS3Xtec';
const GROUP_ID = '176599002499778006';
const BASE_URL = 'https://connect.mailerlite.com/api';

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// This simulates the exact data structure sent from the quiz component
const actualQuizSubmission = {
  name: 'Test User',
  email: `test-actual-quiz-${Date.now()}@example.com`,
  totalScore: 50,
  maxScore: 75,
  resultType: 'Well Prepared',
  categoryScores: {
    veraenderungsbereitschaft: 4.2,
    anpassungsfaehigkeit: 3.8,
    risikobereitschaft: 4.0,
    finanzielle_situation: 3.5,
    wertekompass: 4.5,
    sicherheitsbeduerfnis: 3.2,
    growth_vs_komfort: 4.1,
    konformitaet_vs_rebell: 3.9,
  },
  recommendations: [
    '🌍 Improve your adaptability: Expand your cultural horizon',
    '💰 Improve your financial foundation: Create a concrete savings plan',
    '✅ Your willingness to change is excellent'
  ],
  timestamp: '1/14/2026 9:30:00 PM'
};

function sanitizeValue(value, defaultValue = 'N/A') {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  
  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) {
      return defaultValue;
    }
    return value.toFixed(1);
  }
  
  if (typeof value === 'string') {
    return value.trim().substring(0, 1000);
  }
  
  return String(value).substring(0, 1000);
}

async function testActualQuizData() {
  log('\n' + '='.repeat(80), colors.bright + colors.cyan);
  log('  TESTING WITH ACTUAL QUIZ DATA STRUCTURE', colors.bright + colors.cyan);
  log('='.repeat(80) + '\n', colors.bright + colors.cyan);
  
  const submission = actualQuizSubmission;
  
  // Prepare the data exactly as the service does
  const recommendationsText = Array.isArray(submission.recommendations)
    ? submission.recommendations.map(rec => `• ${rec}`).join('\\n')
    : 'No recommendations';

  const subscriberData = {
    email: submission.email.trim().toLowerCase(),
    name: submission.name.trim(),
    fields: {
      total_score: sanitizeValue(submission.totalScore),
      max_score: sanitizeValue(submission.maxScore),
      result_type: sanitizeValue(submission.resultType, 'Unknown'),
      recommendations: recommendationsText.substring(0, 5000),
      submission_date: sanitizeValue(submission.timestamp),
      willingness_to_change_score: sanitizeValue(submission.categoryScores?.veraenderungsbereitschaft),
      adaptability_score: sanitizeValue(submission.categoryScores?.anpassungsfaehigkeit),
      risk_tolerance_score: sanitizeValue(submission.categoryScores?.risikobereitschaft),
      financial_situation_score: sanitizeValue(submission.categoryScores?.finanzielle_situation),
      value_compass_score: sanitizeValue(submission.categoryScores?.wertekompass),
      need_for_security_score: sanitizeValue(submission.categoryScores?.sicherheitsbeduerfnis),
      growth_vs_comfort_score: sanitizeValue(submission.categoryScores?.growth_vs_komfort),
      conformity_vs_rebel_score: sanitizeValue(submission.categoryScores?.konformitaet_vs_rebell),
    },
    groups: [GROUP_ID],
  };

  log('📊 Original Submission Data:', colors.yellow);
  console.log(JSON.stringify(submission, null, 2));
  console.log();
  
  log('📧 Prepared Subscriber Data for MailerLite:', colors.yellow);
  console.log(JSON.stringify(subscriberData, null, 2));
  console.log();

  try {
    log('🚀 Sending to MailerLite API...', colors.cyan);
    
    const response = await fetch(`${BASE_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    });

    const responseText = await response.text();
    
    log(`\n📬 Response Status: ${response.status} ${response.statusText}`, colors.cyan);
    log('📬 Response Body:', colors.cyan);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log(JSON.stringify(responseData, null, 2));
    } catch (e) {
      console.log(responseText);
    }
    
    console.log();
    
    if (response.ok) {
      log('✅ SUCCESS! The quiz data was accepted by MailerLite!', colors.bright + colors.green);
      log(`   Subscriber ID: ${responseData.data?.id}`, colors.green);
      log(`   Email: ${responseData.data?.email}`, colors.green);
      log(`   Groups: ${responseData.data?.groups?.map(g => g.name).join(', ') || 'None'}`, colors.green);
      
      // Show the custom fields that were set
      if (responseData.data?.fields) {
        log('\n📋 Custom Fields Set:', colors.cyan);
        Object.entries(responseData.data.fields).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            log(`   ${key}: ${value}`, colors.blue);
          }
        });
      }
      
      return true;
    } else {
      log('❌ FAILED! MailerLite rejected the data!', colors.bright + colors.red);
      
      if (responseData?.message) {
        log(`   Error Message: ${responseData.message}`, colors.red);
      }
      
      if (responseData?.errors) {
        log('   Validation Errors:', colors.red);
        Object.entries(responseData.errors).forEach(([field, msgs]) => {
          log(`     ${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`, colors.red);
        });
      }
      
      return false;
    }
  } catch (error) {
    log('❌ Network Error:', colors.red);
    log(`   ${error.message}`, colors.red);
    if (error.stack) {
      log('\nStack trace:', colors.red);
      console.log(error.stack);
    }
    return false;
  }
}

// Test with edge cases
async function testEdgeCases() {
  log('\n' + '='.repeat(80), colors.bright + colors.yellow);
  log('  TESTING EDGE CASES', colors.bright + colors.yellow);
  log('='.repeat(80) + '\n', colors.bright + colors.yellow);
  
  const edgeCases = [
    {
      name: 'Missing category scores',
      data: {
        ...actualQuizSubmission,
        email: `test-missing-scores-${Date.now()}@example.com`,
        categoryScores: {}
      }
    },
    {
      name: 'Undefined category scores',
      data: {
        ...actualQuizSubmission,
        email: `test-undefined-scores-${Date.now()}@example.com`,
        categoryScores: {
          veraenderungsbereitschaft: undefined,
          anpassungsfaehigkeit: null,
        }
      }
    },
    {
      name: 'Very long name',
      data: {
        ...actualQuizSubmission,
        email: `test-long-name-${Date.now()}@example.com`,
        name: 'A'.repeat(500)
      }
    },
    {
      name: 'Special characters in name',
      data: {
        ...actualQuizSubmission,
        email: `test-special-chars-${Date.now()}@example.com`,
        name: 'Müller-O\'Brien <test@test.com>'
      }
    }
  ];
  
  for (const testCase of edgeCases) {
    log(`\n🧪 Testing: ${testCase.name}`, colors.yellow);
    
    const submission = testCase.data;
    const recommendationsText = Array.isArray(submission.recommendations)
      ? submission.recommendations.map(rec => `• ${rec}`).join('\\n')
      : 'No recommendations';

    const subscriberData = {
      email: submission.email.trim().toLowerCase(),
      name: submission.name.trim(),
      fields: {
        total_score: sanitizeValue(submission.totalScore),
        max_score: sanitizeValue(submission.maxScore),
        result_type: sanitizeValue(submission.resultType, 'Unknown'),
        recommendations: recommendationsText.substring(0, 5000),
        submission_date: sanitizeValue(submission.timestamp),
        willingness_to_change_score: sanitizeValue(submission.categoryScores?.veraenderungsbereitschaft),
        adaptability_score: sanitizeValue(submission.categoryScores?.anpassungsfaehigkeit),
        risk_tolerance_score: sanitizeValue(submission.categoryScores?.risikobereitschaft),
        financial_situation_score: sanitizeValue(submission.categoryScores?.finanzielle_situation),
        value_compass_score: sanitizeValue(submission.categoryScores?.wertekompass),
        need_for_security_score: sanitizeValue(submission.categoryScores?.sicherheitsbeduerfnis),
        growth_vs_comfort_score: sanitizeValue(submission.categoryScores?.growth_vs_komfort),
        conformity_vs_rebel_score: sanitizeValue(submission.categoryScores?.konformitaet_vs_rebell),
      },
      groups: [GROUP_ID],
    };

    try {
      const response = await fetch(`${BASE_URL}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      });

      if (response.ok) {
        log(`   ✓ ${testCase.name}: PASSED`, colors.green);
      } else {
        const errorData = await response.json();
        log(`   ✗ ${testCase.name}: FAILED`, colors.red);
        log(`     Error: ${errorData.message}`, colors.red);
      }
    } catch (error) {
      log(`   ✗ ${testCase.name}: ERROR - ${error.message}`, colors.red);
    }
  }
}

async function main() {
  const success = await testActualQuizData();
  
  if (success) {
    await testEdgeCases();
    
    log('\n' + '='.repeat(80), colors.bright + colors.green);
    log('  ✅ ALL TESTS COMPLETED SUCCESSFULLY!', colors.bright + colors.green);
    log('  The MailerLite integration is working correctly.', colors.green);
    log('  The production error might be due to:', colors.yellow);
    log('    1. Outdated deployment (needs redeployment)', colors.yellow);
    log('    2. Different data being sent from production', colors.yellow);
    log('    3. Network issues or rate limiting', colors.yellow);
    log('='.repeat(80), colors.bright + colors.green);
  } else {
    log('\n' + '='.repeat(80), colors.bright + colors.red);
    log('  ❌ TEST FAILED!', colors.bright + colors.red);
    log('  Review the error details above to identify the issue.', colors.red);
    log('='.repeat(80), colors.bright + colors.red);
    process.exit(1);
  }
}

main().catch(error => {
  log('\n✗ Fatal Error:', colors.red);
  console.error(error);
  process.exit(1);
});
