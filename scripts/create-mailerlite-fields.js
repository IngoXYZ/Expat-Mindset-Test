// Script to create custom fields in MailerLite
// Run with: node scripts/create-mailerlite-fields.js

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZDcxZmU5YmFiNDRlYjRjODI0MjE1NWUyNzIxNWViMjUxZTJmZjAwZmJiY2M3Y2Q3ZTgxYWM5YWFkZmVmZDBiNzdhNmRmYTBhZTQ4NGVlZWIiLCJpYXQiOjE3Njg0MTg3MzcuMDY1NTksIm5iZiI6MTc2ODQxODczNy4wNjU1OTMsImV4cCI6NDkyNDA5MjMzNy4wNTE5MSwic3ViIjoiMjAzNDUxMiIsInNjb3BlcyI6W119.vRrLAbOnppIXuBCQlZBfRrxzIYwzNy_AZeKNez3EjA_d6J9aFrD1A_KkgUyRMn_nqPw_MO_8tgamwJ7aLF_N4W1qbgoXWDnboTsvR0cikerKWZIQp5QKEJ6ljO7SfmXasA5vivXWbgWZ7NCLGd0lRICXDOlDL6qJYfkUnwUXYpdioWJhEGSu3MzTQvBIuNI19gSpQO0szWCgoMNliugYCwVugdTYJI0pQ0DNQO-iihZZeFPUkDEa1iJhwZhwKrcYiTr-hs_-C-523vdWYRZWcyXRXOfVnyphvRPpzwnddJCDIWzkvU3rbZLqZxeQLlbX4Gq51ZQe0HL3cUiGT440H7poB2em3GMv4QHoOXwoFmCUscTxY-gBpe7uzZVTjGFnE2-XJAQ9Q3oMShoCdVJBMGt_5SDGi1OzXj1po0LD0B6AV-8sD4kw_XSXVGLn6I0iPeCj_gSOUhOUBnbrMNpoFqeZ1C-nfBBXfSTE7Q-l_A25Y6sKmVjlqtFL9pJznmaCMWsSYSZKyNpphtbHpqK5w0zRBZ_PHmJQO06vxkrwrTsS3pumiyXLdXobUbpxGiMRYDMJSYBjLqwzlt06yNjLQwGrkI0gKmP6V9pi5FFsvAjGkoOLWkXtEnzZ68qIZ_yKgshsM_PwuPVlW-jUCCXg1HC0DIdlMjiEzqp1jS3Xtec';
const API_URL = 'https://connect.mailerlite.com/api';

// Custom fields to create (lowercase English names)
// Note: 'name' already exists in MailerLite as a default field
// Valid types: 'text', 'number', 'date'
const fields = [
  { name: 'total_score', type: 'text' },
  { name: 'max_score', type: 'text' },
  { name: 'result_type', type: 'text' },
  { name: 'recommendations', type: 'text' },
  { name: 'submission_date', type: 'text' },
  { name: 'willingness_to_change_score', type: 'text' },
  { name: 'adaptability_score', type: 'text' },
  { name: 'risk_tolerance_score', type: 'text' },
  { name: 'financial_situation_score', type: 'text' },
  { name: 'value_compass_score', type: 'text' },
  { name: 'need_for_security_score', type: 'text' },
  { name: 'growth_vs_comfort_score', type: 'text' },
  { name: 'conformity_vs_rebel_score', type: 'text' },
];

async function createField(field) {
  try {
    const response = await fetch(`${API_URL}/fields`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(field),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Created field: ${field.name}`);
      return { success: true, data };
    } else {
      // Check if field already exists
      if (data.message && data.message.includes('already exists')) {
        console.log(`⚠️  Field already exists: ${field.name}`);
        return { success: true, exists: true };
      }
      console.error(`❌ Failed to create field: ${field.name}`, data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error(`❌ Error creating field: ${field.name}`, error.message);
    return { success: false, error: error.message };
  }
}

async function createAllFields() {
  console.log('🚀 Starting MailerLite custom fields creation...\n');
  console.log('Note: "name" field already exists as a default field in MailerLite\n');
  
  const results = [];
  
  for (const field of fields) {
    const result = await createField(field);
    results.push({ field: field.name, ...result });
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Successful: ${results.filter(r => r.success).length}`);
  console.log(`❌ Failed: ${results.filter(r => !r.success).length}`);
  
  console.log('\n✨ Field creation complete!');
  console.log('\nYou can now use these fields in your MailerLite email templates with merge tags:');
  console.log('Examples:');
  console.log('  {$name} - Name (default field)');
  console.log('  {$total_score} - Total score');
  console.log('  {$result_type} - Result type');
  console.log('  etc...');
}

// Run the script
createAllFields().catch(console.error);
