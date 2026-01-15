// Test script for MailerLite API integration
const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZDcxZmU5YmFiNDRlYjRjODI0MjE1NWUyNzIxNWViMjUxZTJmZjAwZmJiY2M3Y2Q3ZTgxYWM5YWFkZmVmZDBiNzdhNmRmYTBhZTQ4NGVlZWIiLCJpYXQiOjE3Njg0MTg3MzcuMDY1NTksIm5iZiI6MTc2ODQxODczNy4wNjU1OTMsImV4cCI6NDkyNDA5MjMzNy4wNTE5MSwic3ViIjoiMjAzNDUxMiIsInNjb3BlcyI6W119.vRrLAbOnppIXuBCQlZBfRrxzIYwzNy_AZeKNez3EjA_d6J9aFrD1A_KkgUyRMn_nqPw_MO_8tgamwJ7aLF_N4W1qbgoXWDnboTsvR0cikerKWZIQp5QKEJ6ljO7SfmXasA5vivXWbgWZ7NCLGd0lRICXDOlDL6qJYfkUnwUXYpdioWJhEGSu3MzTQvBIuNI19gSpQO0szWCgoMNliugYCwVugdTYJI0pQ0DNQO-iihZZeFPUkDEa1iJhwZhwKrcYiTr-hs_-C-523vdWYRZWcyXRXOfVnyphvRPpzwnddJCDIWzkvU3rbZLqZxeQLlbX4Gq51ZQe0HL3cUiGT440H7poB2em3GMv4QHoOXwoFmCUscTxY-gBpe7uzZVTjGFnE2-XJAQ9Q3oMShoCdVJBMGt_5SDGi1OzXj1po0LD0B6AV-8sD4kw_XSXVGLn6I0iPeCj_gSOUhOUBnbrMNpoFqeZ1C-nfBBXfSTE7Q-l_A25Y6sKmVjlqtFL9pJznmaCMWsSYSZKyNpphtbHpqK5w0zRBZ_PHmJQO06vxkrwrTsS3pumiyXLdXobUbpxGiMRYDMJSYBjLqwzlt06yNjLQwGrkI0gKmP6V9pi5FFsvAjGkoOLWkXtEnzZ68qIZ_yKgshsM_PwuPVlW-jUCCXg1HC0DIdlMjiEzqp1jS3Xtec';
const MAILERLITE_GROUP_ID = '176599002499778006';
const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api';

async function testMailerLiteAPI() {
  console.log('🧪 Testing MailerLite API integration...\n');

  // Test 1: Verify API credentials by getting groups
  console.log('Test 1: Verifying API credentials...');
  try {
    const groupsResponse = await fetch(`${MAILERLITE_API_URL}/groups`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json',
      },
    });

    console.log('Status:', groupsResponse.status);
    const groupsText = await groupsResponse.text();
    console.log('Response:', groupsText.substring(0, 500));

    if (groupsResponse.ok) {
      console.log('✅ API credentials are valid\n');
    } else {
      console.log('❌ API credentials failed\n');
      return;
    }
  } catch (error) {
    console.error('❌ Error testing API:', error);
    return;
  }

  // Test 2: Create a test subscriber
  console.log('Test 2: Creating test subscriber...');
  const testEmail = `test+${Date.now()}@example.com`;
  const subscriberData = {
    email: testEmail,
    name: 'Test User', // Default field at top level, NOT in fields
    fields: {
      // Only custom fields here
      total_score: '50',
      max_score: '75',
      result_type: 'Well Prepared',
      recommendations: '• Test recommendation 1\n• Test recommendation 2',
      submission_date: new Date().toLocaleDateString('en-US'),
      willingness_to_change_score: '4.5',
      adaptability_score: '4.0',
      risk_tolerance_score: '3.5',
      financial_situation_score: '4.0',
      value_compass_score: '4.5',
      need_for_security_score: '3.0',
      growth_vs_comfort_score: '4.0',
      conformity_vs_rebel_score: '3.5',
    },
    groups: [MAILERLITE_GROUP_ID],
  };

  try {
    console.log('Request data:', JSON.stringify(subscriberData, null, 2));
    
    const response = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    });

    console.log('Status:', response.status);
    const responseText = await response.text();
    console.log('Response:', responseText);

    if (response.ok) {
      console.log('✅ Test subscriber created successfully!\n');
      const result = JSON.parse(responseText);
      console.log('Subscriber ID:', result.data?.id || result.id);
    } else {
      console.log('❌ Failed to create test subscriber\n');
    }
  } catch (error) {
    console.error('❌ Error creating subscriber:', error);
  }
}

testMailerLiteAPI();
