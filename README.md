
# Expat Mindset Test - MailerLite Integration

## 🚀 Ready for deployment on Vercel!

### ✅ Features
- 15 Quiz questions in English
- Responsive design (thesmallreset.org style)
- **MailerLite Integration** - Automated email sequences
- **LocalStorage** for session management
- **No database** required
- Production-ready

## 📧 MailerLite Setup (IMPORTANT!)

### 1. Create MailerLite Account
1. Go to **mailerlite.com**
2. **Register** for an account (free plan available)
3. **Verify** your email

### 2. Get API Key
1. Dashboard → **Integrations** → **Developer API**
2. Copy your **API Key**
3. Save it for environment variables

### 3. Create Subscriber Group
1. Dashboard → **Subscribers** → **Groups**
2. Create a new group (e.g., "Expat Mindset Test Users")
3. Copy the **Group ID** from the URL or API settings

### 4. Set Up Email Templates in MailerLite
Create 4 email templates in MailerLite dashboard:

1. **Email 1: Test Results** - Immediate send with test results
2. **Email 2: Keep Dream Alive** - Day 2, personal story
3. **Email 3: Shadow Work Urgency** - Day 3, create urgency
4. **Email 4: Final Push** - Day 4, vulnerability and final CTA

Use the HTML templates in the `/email-templates/` directory as reference.

### 5. Configure Custom Fields
Create these custom fields in MailerLite:
- `name` (Text)
- `total_score` (Number)
- `max_score` (Number)
- `result_type` (Text)
- `recommendations` (Text)
- `submission_date` (Text)
- `veraenderungsbereitschaft_score` (Text)
- `anpassungsfaehigkeit_score` (Text)
- `risikobereitschaft_score` (Text)
- `finanzielle_situation_score` (Text)
- `wertekompass_score` (Text)
- `sicherheitsbeduerfnis_score` (Text)
- `growth_vs_komfort_score` (Text)
- `konformitaet_vs_rebell_score` (Text)

### 6. Set Up Automation
1. Create automation triggered when subscriber is added to the group
2. Configure email sequence (Emails 1-4 with appropriate delays)
3. Use custom fields in email templates for personalization

## 🔧 Vercel Environment Variables

Add in Vercel → Settings → Environment Variables:

```
MAILERLITE_API_KEY=your_api_key_here
MAILERLITE_GROUP_ID=your_group_id_here
```

## 🚀 Deployment

### 1. GitHub Upload
- Delete ALL files in your repository
- Upload ALL files from this directory to the root directory

### 2. Vercel Setup
- **Root Directory**: `.` (dot)
- **Build Command**: Leave as default
- **Environment Variables**: MailerLite configuration (see above)

### 3. That's it!
- Vercel automatically detects Next.js
- No database issues
- Immediately functional

## 📊 How It Works

1. **User** enters name + email → **LocalStorage**
2. **User** completes quiz → **LocalStorage** 
3. **Quiz results** are calculated
4. **MailerLite API** creates/updates subscriber with custom fields
5. **MailerLite Automation** sends email sequence
6. **User** sees results immediately

## 🎯 Advantages

- ✅ **Immediately functional** on Vercel
- ✅ **No database problems**
- ✅ **Automated email sequences**
- ✅ **Complete quiz functionality**
- ✅ **Responsive design**
- ✅ **Professional email marketing integration**

## 📧 Email Sequence

1. **Email 1** (Immediate): Test results with CTA to join forum
2. **Email 2** (Day 2): Personal story about moving abroad, CTA to YouTube
3. **Email 3** (Day 3): Shadow Work introduction with urgency, CTA to book strategy call
4. **Email 4** (Day 4): Final push with vulnerability, CTA to download Shadow Work Starter Kit

## 📞 Support

For MailerLite configuration questions:
- MailerLite Documentation: developers.mailerlite.com
- Support: support.mailerlite.com
- Community forum available

## 🗂️ Project Structure

```
/app                    # Next.js app directory
  /api
    /mailerlite        # MailerLite integration API
    /quiz/submit       # Quiz submission endpoint
/components            # React components
/email-templates       # HTML email templates (4 emails)
/lib                   # Utility functions
  mailerlite-service.ts # MailerLite service
  questions.ts         # Quiz questions and logic
```
