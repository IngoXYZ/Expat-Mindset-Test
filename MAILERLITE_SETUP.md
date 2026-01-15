# MailerLite Integration Setup Guide

## Overview

This app integrates with MailerLite to:
1. Automatically add quiz takers as subscribers
2. Store their test results as custom fields
3. Trigger automated email sequences (4 emails)
4. Build your email list for future marketing

## Step 1: Get Your MailerLite Credentials

### API Key
1. Log into MailerLite dashboard
2. Go to **Integrations** → **Developer API**
3. Copy your **API Key** (starts with `eyJ0...`)
4. Save it securely

### Group ID
1. Go to **Subscribers** → **Groups**
2. Create a new group: "Expat Mindset Test Users"
3. Click on the group
4. The Group ID is in the URL: `dashboard.mailerlite.com/subscribers/groups/[GROUP_ID]`
5. Or use the MailerLite API to get the group ID

**Your current Group ID:** `176599002499778006`

## Step 2: Configure Custom Fields in MailerLite

Go to **Subscribers** → **Fields** and create these custom fields:

| Field Name | Type | Description |
|------------|------|-------------|
| `name` | Text | User's name |
| `total_score` | Text | Total quiz score (e.g., "45") |
| `max_score` | Text | Maximum possible score (e.g., "75") |
| `result_type` | Text | Expat type result |
| `recommendations` | Text | Personalized recommendations |
| `submission_date` | Text | Date/time of submission |
| `veraenderungsbereitschaft_score` | Text | Willingness to change score |
| `anpassungsfaehigkeit_score` | Text | Adaptability score |
| `risikobereitschaft_score` | Text | Risk tolerance score |
| `finanzielle_situation_score` | Text | Financial situation score |
| `wertekompass_score` | Text | Value compass score |
| `sicherheitsbeduerfnis_score` | Text | Need for security score |
| `growth_vs_komfort_score` | Text | Growth vs comfort score |
| `konformitaet_vs_rebell_score` | Text | Conformity vs rebel score |

**Note:** While some fields are numeric, MailerLite custom fields work best as text type for flexibility.

## Step 3: Create Email Templates in MailerLite

### Upload HTML Templates

The app includes 4 pre-designed HTML email templates in `/email-templates/`:

1. `email1_test_results.html` - Test results
2. `email2_keep_dream_alive.html` - Personal story
3. `email3_shadow_work_urgency.html` - Shadow work introduction
4. `email4_final_push.html` - Final CTA

### How to Use Templates:

1. Go to **Campaigns** → **Email campaigns** → **Create campaign**
2. Choose **Regular campaign**
3. In the email editor, click **< >** (HTML) button
4. Copy/paste the HTML from each template file
5. Customize placeholders:
   - `{{user_name}}` - Subscriber's name
   - `{{total_score}}` - Total quiz score
   - `{{max_score}}` - Maximum score
   - `{{result_type}}` - Expat type
   - `{{recommendations}}` - Recommendations
   - `{{submission_date}}` - Submission date
   - Category scores (use custom field merge tags)

6. Save each template with a descriptive name

### Email Template Placeholders

MailerLite uses merge tags to insert custom field values:
- `{$name}` - Name
- `{$total_score}` - Total score
- `{$result_type}` - Result type
- etc.

**IMPORTANT:** Replace `{{user_name}}` style placeholders with `{$name}` style in MailerLite's editor.

## Step 4: Set Up Email Automation

### Create Automation Workflow:

1. Go to **Automations** → **Create workflow**
2. **Trigger:** "Subscriber joins a group"
3. Select your group: "Expat Mindset Test Users"

### Automation Sequence:

```
Trigger: Subscriber joins group
  ↓
[Email 1] Test Results - Send immediately
  ↓
[Wait] 1 day
  ↓
[Email 2] Keep Dream Alive - Send
  ↓
[Wait] 1 day
  ↓
[Email 3] Shadow Work Urgency - Send
  ↓
[Wait] 1 day
  ↓
[Email 4] Final Push - Send
  ↓
[End]
```

### Configure Each Email Step:

1. Add "Send email" action
2. Select the corresponding email template
3. Ensure merge tags are correctly mapped to custom fields
4. Add delays between emails (1 day each)

## Step 5: Set Environment Variables

### For Local Development:

Create/update `.env` file:
```
MAILERLITE_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...
MAILERLITE_GROUP_ID=176599002499778006
```

### For Vercel Deployment:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add:
   - `MAILERLITE_API_KEY` = your API key
   - `MAILERLITE_GROUP_ID` = your group ID
4. Redeploy the application

## Step 6: Test the Integration

### Testing Locally:

1. Run `npm install` (if you haven't already)
2. Run `npm run dev`
3. Fill out the quiz with a test email
4. Check MailerLite dashboard:
   - New subscriber should appear in the group
   - Custom fields should be populated
   - Automation should trigger
5. Check test email inbox for Email 1

### Testing on Vercel:

1. Deploy to Vercel
2. Use a test email (not your main email)
3. Complete the quiz
4. Verify in MailerLite dashboard

## Troubleshooting

### Subscriber Not Added
- Check API key is correct
- Verify group ID exists
- Check Vercel environment variables are set
- Look at Vercel logs for errors

### Emails Not Sending
- Verify automation is activated
- Check email templates exist
- Ensure merge tags match custom field names
- Verify subscriber is in the correct group

### Custom Fields Empty
- Check field names match exactly (case-sensitive)
- Verify fields are created in MailerLite
- Look at API response in logs

### API Rate Limits
- MailerLite free plan: 12,000 emails/month
- API rate limits: Check MailerLite documentation
- Consider upgrading plan if needed

## MailerLite API Reference

### Endpoints Used:
- `POST /api/subscribers` - Create or update subscriber
- Custom fields are set in the `fields` object
- Groups are assigned via `groups` array

### Official Documentation:
- API Docs: https://developers.mailerlite.com/
- Custom Fields: https://developers.mailerlite.com/docs/fields
- Groups: https://developers.mailerlite.com/docs/groups
- Automations: Set up via dashboard only

## Email Sequence Details

### Email 1: Test Results (Immediate)
**Subject:** Your Expat Mindset Test Results
**CTA:** Join Our Expat Community Forum
**Goal:** Deliver value, build trust, introduce community

### Email 2: Keep Dream Alive (Day 2)
**Subject:** Don't Let Your Living Abroad Dream Die
**CTA:** Subscribe to My YouTube Channel
**Goal:** Personal connection, demonstrate credibility, build relationship

### Email 3: Shadow Work Urgency (Day 3)
**Subject:** The Secret No One Tells You About Moving Abroad
**CTA:** Book Your Free Strategy Call
**Goal:** Create urgency, introduce shadow work concept, offer 1:1 connection

### Email 4: Final Push (Day 4)
**Subject:** I Was Lost Once. Successfully Lost.
**CTA:** Download Shadow Work Starter Kit
**Goal:** Maximum vulnerability, final offer, leave door open

## Security Notes

- **Never commit** `.env` file to git
- Keep API keys secure
- Use environment variables for all credentials
- Regenerate API key if exposed

## Support & Resources

- MailerLite Support: support.mailerlite.com
- MailerLite Community: community.mailerlite.com
- API Issues: Check Vercel function logs
- Quiz Issues: Check browser console

---

**Last Updated:** January 2026
**Integration Version:** 1.0
