#!/usr/bin/env node

/**
 * MailerLite Deep Diagnostics Script
 * This script performs comprehensive testing of the MailerLite API integration
 */

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZDcxZmU5YmFiNDRlYjRjODI0MjE1NWUyNzIxNWViMjUxZTJmZjAwZmJiY2M3Y2Q3ZTgxYWM5YWFkZmVmZDBiNzdhNmRmYTBhZTQ4NGVlZWIiLCJpYXQiOjE3Njg0MTg3MzcuMDY1NTksIm5iZiI6MTc2ODQxODczNy4wNjU1OTMsImV4cCI6NDkyNDA5MjMzNy4wNTE5MSwic3ViIjoiMjAzNDUxMiIsInNjb3BlcyI6W119.vRrLAbOnppIXuBCQlZBfRrxzIYwzNy_AZeKNez3EjA_d6J9aFrD1A_KkgUyRMn_nqPw_MO_8tgamwJ7aLF_N4W1qbgoXWDnboTsvR0cikerKWZIQp5QKEJ6ljO7SfmXasA5vivXWbgWZ7NCLGd0lRICXDOlDL6qJYfkUnwUXYpdioWJhEGSu3MzTQvBIuNI19gSpQO0szWCgoMNliugYCwVugdTYJI0pQ0DNQO-iihZZeFPUkDEa1iJhwZhwKrcYiTr-hs_-C-523vdWYRZWcyXRXOfVnyphvRPpzwnddJCDIWzkvU3rbZLqZxeQLlbX4Gq51ZQe0HL3cUiGT440H7poB2em3GMv4QHoOXwoFmCUscTxY-gBpe7uzZVTjGFnE2-XJAQ9Q3oMShoCdVJBMGt_5SDGi1OzXj1po0LD0B6AV-8sD4kw_XSXVGLn6I0iPeCj_gSOUhOUBnbrMNpoFqeZ1C-nfBBXfSTE7Q-l_A25Y6sKmVjlqtFL9pJznmaCMWsSYSZKyNpphtbHpqK5w0zRBZ_PHmJQO06vxkrwrTsS3pumiyXLdXobUbpxGiMRYDMJSYBjLqwzlt06yNjLQwGrkI0gKmP6V9pi5FFsvAjGkoOLWkXtEnzZ68qIZ_yKgshsM_PwuPVlW-jUCCXg1HC0DIdlMjiEzqp1jS3Xtec';
const GROUP_ID = '176599002499778006';
const BASE_URL = 'https://connect.mailerlite.com/api';

// ANSI colors for better readability
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

function logSection(title) {
  console.log('\n' + '='.repeat(80));
  log(title, colors.bright + colors.cyan);
  console.log('='.repeat(80) + '\n');
}

async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    data = text;
  }

  return { response, data };
}

// Step 1: Verify API Token
async function verifyApiToken() {
  logSection('STEP 1: Verifying API Token');
  
  try {
    const { response, data } = await makeRequest('/subscribers');
    
    if (response.ok) {
      log('✓ API Token is VALID', colors.green);
      log(`  Status: ${response.status}`, colors.green);
      return true;
    } else {
      log('✗ API Token is INVALID', colors.red);
      log(`  Status: ${response.status}`, colors.red);
      log(`  Error: ${JSON.stringify(data, null, 2)}`, colors.red);
      return false;
    }
  } catch (error) {
    log('✗ Network Error', colors.red);
    log(`  ${error.message}`, colors.red);
    return false;
  }
}

// Step 2: Fetch and List All Custom Fields
async function fetchCustomFields() {
  logSection('STEP 2: Fetching All Custom Fields');
  
  try {
    const { response, data } = await makeRequest('/fields');
    
    if (!response.ok) {
      log('✗ Failed to fetch custom fields', colors.red);
      log(`  Status: ${response.status}`, colors.red);
      log(`  Response: ${JSON.stringify(data, null, 2)}`, colors.red);
      return null;
    }

    log('✓ Successfully fetched custom fields', colors.green);
    log(`\nTotal custom fields: ${data.data?.length || 0}`, colors.bright);
    
    if (data.data && data.data.length > 0) {
      console.log('\nCustom Fields in MailerLite:');
      console.log('-'.repeat(80));
      data.data.forEach((field, index) => {
        log(`${index + 1}. Name: ${field.name}`, colors.cyan);
        log(`   Key: ${field.key}`, colors.blue);
        log(`   Type: ${field.type}`, colors.yellow);
        if (field.required) log(`   Required: Yes`, colors.red);
        console.log();
      });
    } else {
      log('\n⚠ No custom fields found in MailerLite account!', colors.yellow);
    }
    
    return data.data || [];
  } catch (error) {
    log('✗ Error fetching custom fields', colors.red);
    log(`  ${error.message}`, colors.red);
    return null;
  }
}

// Step 3: Verify Group Exists
async function verifyGroup() {
  logSection('STEP 3: Verifying Group');
  
  try {
    const { response, data } = await makeRequest(`/groups/${GROUP_ID}`);
    
    if (response.ok) {
      log('✓ Group EXISTS and is accessible', colors.green);
      log(`  Group ID: ${data.data.id}`, colors.cyan);
      log(`  Group Name: ${data.data.name}`, colors.cyan);
      log(`  Total Subscribers: ${data.data.active_count || 0}`, colors.cyan);
      return true;
    } else {
      log('✗ Group NOT FOUND or not accessible', colors.red);
      log(`  Status: ${response.status}`, colors.red);
      log(`  Response: ${JSON.stringify(data, null, 2)}`, colors.red);
      return false;
    }
  } catch (error) {
    log('✗ Error verifying group', colors.red);
    log(`  ${error.message}`, colors.red);
    return false;
  }
}

// Step 4: Test Minimal Subscriber Creation (Only required fields)
async function testMinimalSubscriber() {
  logSection('STEP 4: Testing Minimal Subscriber Creation (Email Only)');
  
  const testEmail = `test-minimal-${Date.now()}@example.com`;
  const payload = {
    email: testEmail,
  };
  
  log('Request payload:', colors.yellow);
  console.log(JSON.stringify(payload, null, 2));
  console.log();
  
  try {
    const { response, data } = await makeRequest('/subscribers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    log(`Response Status: ${response.status}`, colors.cyan);
    log('Response Body:', colors.cyan);
    console.log(JSON.stringify(data, null, 2));
    console.log();
    
    if (response.ok) {
      log('✓ Minimal subscriber creation SUCCESSFUL', colors.green);
      return { success: true, subscriberId: data.data.id };
    } else {
      log('✗ Minimal subscriber creation FAILED', colors.red);
      return { success: false, error: data };
    }
  } catch (error) {
    log('✗ Network Error', colors.red);
    log(`  ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

// Step 5: Test with Name Field
async function testWithName() {
  logSection('STEP 5: Testing Subscriber with Name Field');
  
  const testEmail = `test-name-${Date.now()}@example.com`;
  const payload = {
    email: testEmail,
    fields: {
      name: 'Test User'
    }
  };
  
  log('Request payload:', colors.yellow);
  console.log(JSON.stringify(payload, null, 2));
  console.log();
  
  try {
    const { response, data } = await makeRequest('/subscribers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    log(`Response Status: ${response.status}`, colors.cyan);
    log('Response Body:', colors.cyan);
    console.log(JSON.stringify(data, null, 2));
    console.log();
    
    if (response.ok) {
      log('✓ Subscriber with name field SUCCESSFUL', colors.green);
      return { success: true, subscriberId: data.data.id };
    } else {
      log('✗ Subscriber with name field FAILED', colors.red);
      log('⚠ Trying alternative: name at root level', colors.yellow);
      return await testWithNameAtRoot();
    }
  } catch (error) {
    log('✗ Network Error', colors.red);
    log(`  ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

async function testWithNameAtRoot() {
  const testEmail = `test-name-root-${Date.now()}@example.com`;
  const payload = {
    email: testEmail,
    name: 'Test User Root'
  };
  
  log('\nAlternative Request payload (name at root):', colors.yellow);
  console.log(JSON.stringify(payload, null, 2));
  console.log();
  
  try {
    const { response, data } = await makeRequest('/subscribers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    log(`Response Status: ${response.status}`, colors.cyan);
    log('Response Body:', colors.cyan);
    console.log(JSON.stringify(data, null, 2));
    console.log();
    
    if (response.ok) {
      log('✓ Subscriber with name at ROOT level SUCCESSFUL', colors.green);
      return { success: true, subscriberId: data.data.id };
    } else {
      log('✗ Subscriber with name at ROOT level FAILED', colors.red);
      return { success: false, error: data };
    }
  } catch (error) {
    log('✗ Network Error', colors.red);
    log(`  ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

// Step 6: Test with Custom Fields
async function testWithCustomFields(customFields) {
  logSection('STEP 6: Testing Subscriber with Custom Fields');
  
  if (!customFields || customFields.length === 0) {
    log('⚠ No custom fields to test', colors.yellow);
    return { success: false, reason: 'no_custom_fields' };
  }
  
  const testEmail = `test-custom-${Date.now()}@example.com`;
  const fields = {};
  
  // Add sample data for each custom field based on type
  customFields.forEach(field => {
    switch (field.type) {
      case 'NUMBER':
        fields[field.key] = 50;
        break;
      case 'TEXT':
        fields[field.key] = 'Sample text';
        break;
      case 'DATE':
        fields[field.key] = '2026-01-14';
        break;
      default:
        fields[field.key] = 'Sample value';
    }
  });
  
  const payload = {
    email: testEmail,
    name: 'Test Custom Fields',
    fields: fields,
    groups: [GROUP_ID]
  };
  
  log('Request payload:', colors.yellow);
  console.log(JSON.stringify(payload, null, 2));
  console.log();
  
  try {
    const { response, data } = await makeRequest('/subscribers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    log(`Response Status: ${response.status}`, colors.cyan);
    log('Response Body:', colors.cyan);
    console.log(JSON.stringify(data, null, 2));
    console.log();
    
    if (response.ok) {
      log('✓ Subscriber with custom fields SUCCESSFUL', colors.green);
      return { success: true, subscriberId: data.data.id };
    } else {
      log('✗ Subscriber with custom fields FAILED', colors.red);
      
      // Try to identify which field is causing the issue
      log('\n⚠ Attempting to identify problematic field...', colors.yellow);
      return await testFieldsIndividually(customFields, testEmail);
    }
  } catch (error) {
    log('✗ Network Error', colors.red);
    log(`  ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

// Step 7: Test fields individually to find the problematic one
async function testFieldsIndividually(customFields, baseEmail) {
  log('\nTesting each custom field individually...', colors.cyan);
  const results = [];
  
  for (let i = 0; i < customFields.length; i++) {
    const field = customFields[i];
    const testEmail = `${baseEmail.split('@')[0]}-field${i}@example.com`;
    
    let testValue;
    switch (field.type) {
      case 'NUMBER':
        testValue = 50;
        break;
      case 'TEXT':
        testValue = 'Sample text';
        break;
      case 'DATE':
        testValue = '2026-01-14';
        break;
      default:
        testValue = 'Sample value';
    }
    
    const payload = {
      email: testEmail,
      name: 'Test Individual Field',
      fields: {
        [field.key]: testValue
      },
      groups: [GROUP_ID]
    };
    
    log(`\nTesting field: ${field.name} (${field.key}, type: ${field.type})`, colors.blue);
    
    try {
      const { response, data } = await makeRequest('/subscribers', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        log(`  ✓ Field ${field.key} works fine`, colors.green);
        results.push({ field: field.key, success: true });
      } else {
        log(`  ✗ Field ${field.key} FAILED`, colors.red);
        log(`  Error: ${JSON.stringify(data, null, 2)}`, colors.red);
        results.push({ field: field.key, success: false, error: data });
      }
    } catch (error) {
      log(`  ✗ Field ${field.key} caused error: ${error.message}`, colors.red);
      results.push({ field: field.key, success: false, error: error.message });
    }
  }
  
  return { success: false, fieldTests: results };
}

// Step 8: Test with actual quiz data structure
async function testWithQuizData(customFields) {
  logSection('STEP 7: Testing with Actual Quiz Data Structure');
  
  const testEmail = `test-quiz-${Date.now()}@example.com`;
  const quizData = {
    email: testEmail,
    name: 'John Doe',
    fields: {
      total_score: 65,
      mindset_openness_score: 15,
      willingness_to_change_score: 12,
      resilience_adaptability_score: 14,
      social_integration_score: 13,
      bureaucracy_patience_score: 11,
      result_type: 'Well Prepared',
      result_description: 'You have a strong foundation for expat life.',
      recommendation: 'Consider taking the next steps in your journey.',
    },
    groups: [GROUP_ID]
  };
  
  log('Request payload (actual quiz structure):', colors.yellow);
  console.log(JSON.stringify(quizData, null, 2));
  console.log();
  
  try {
    const { response, data } = await makeRequest('/subscribers', {
      method: 'POST',
      body: JSON.stringify(quizData),
    });
    
    log(`Response Status: ${response.status}`, colors.cyan);
    log('Response Body:', colors.cyan);
    console.log(JSON.stringify(data, null, 2));
    console.log();
    
    if (response.ok) {
      log('✓ Quiz data submission SUCCESSFUL', colors.green);
      log('✓ This means the integration should work!', colors.bright + colors.green);
      return { success: true, subscriberId: data.data.id };
    } else {
      log('✗ Quiz data submission FAILED', colors.red);
      log('⚠ This is the issue causing the error in production', colors.yellow);
      return { success: false, error: data };
    }
  } catch (error) {
    log('✗ Network Error', colors.red);
    log(`  ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

// Main execution
async function main() {
  log('\n' + '█'.repeat(80), colors.bright + colors.cyan);
  log('  MAILERLITE DEEP DIAGNOSTICS - Finding the "Invalid Data" Error', colors.bright + colors.cyan);
  log('█'.repeat(80) + '\n', colors.bright + colors.cyan);
  
  // Step 1: Verify API Token
  const tokenValid = await verifyApiToken();
  if (!tokenValid) {
    log('\n⚠ Cannot proceed without valid API token. Exiting.', colors.red);
    process.exit(1);
  }
  
  // Step 2: Fetch Custom Fields
  const customFields = await fetchCustomFields();
  
  // Step 3: Verify Group
  const groupValid = await verifyGroup();
  if (!groupValid) {
    log('\n⚠ Cannot proceed without valid group. Exiting.', colors.red);
    process.exit(1);
  }
  
  // Step 4: Test Minimal Subscriber
  const minimalResult = await testMinimalSubscriber();
  
  // Step 5: Test with Name
  const nameResult = await testWithName();
  
  // Step 6: Test with Custom Fields
  let customFieldsResult = null;
  if (customFields && customFields.length > 0) {
    customFieldsResult = await testWithCustomFields(customFields);
  }
  
  // Step 7: Test with actual quiz data
  const quizDataResult = await testWithQuizData(customFields);
  
  // Summary
  logSection('DIAGNOSTIC SUMMARY');
  
  log('Results:', colors.bright);
  console.log();
  log(`1. API Token: ${tokenValid ? '✓ Valid' : '✗ Invalid'}`, tokenValid ? colors.green : colors.red);
  log(`2. Group Access: ${groupValid ? '✓ Valid' : '✗ Invalid'}`, groupValid ? colors.green : colors.red);
  log(`3. Custom Fields Found: ${customFields ? customFields.length : 0}`, colors.cyan);
  log(`4. Minimal Subscriber: ${minimalResult.success ? '✓ Success' : '✗ Failed'}`, minimalResult.success ? colors.green : colors.red);
  log(`5. With Name Field: ${nameResult.success ? '✓ Success' : '✗ Failed'}`, nameResult.success ? colors.green : colors.red);
  if (customFieldsResult) {
    log(`6. With Custom Fields: ${customFieldsResult.success ? '✓ Success' : '✗ Failed'}`, customFieldsResult.success ? colors.green : colors.red);
  }
  log(`7. With Quiz Data: ${quizDataResult.success ? '✓ Success' : '✗ Failed'}`, quizDataResult.success ? colors.green : colors.red);
  
  console.log();
  
  if (quizDataResult.success) {
    log('✓ DIAGNOSIS COMPLETE: The integration is working correctly!', colors.bright + colors.green);
    log('  The "invalid data" error might be in the production environment.', colors.yellow);
    log('  Check that environment variables are correctly set in Vercel.', colors.yellow);
  } else {
    log('✗ DIAGNOSIS COMPLETE: Found the issue!', colors.bright + colors.red);
    log('  The quiz data structure is causing the "invalid data" error.', colors.yellow);
    log('  Review the error details above to identify the problematic field.', colors.yellow);
    
    if (customFieldsResult && customFieldsResult.fieldTests) {
      log('\n  Problematic fields:', colors.red);
      customFieldsResult.fieldTests.forEach(test => {
        if (!test.success) {
          log(`    - ${test.field}`, colors.red);
        }
      });
    }
  }
  
  console.log();
}

// Run diagnostics
main().catch(error => {
  log('\n✗ Fatal Error:', colors.red);
  console.error(error);
  process.exit(1);
});
