# Quick Fix Reference: MailerLite "Invalid Data" Error

## 🎯 The Problem
```
❌ Error: "Email sending failed: The given data was invalid. Results saved locally."
```

## ⚡ The Solution (1-Line Fix)

### Before ❌
```javascript
const subscriberData = {
  email: submission.email,
  fields: {
    name: submission.name,  // ❌ WRONG LOCATION
    total_score: ...,
    // other fields
  }
}
```

### After ✅
```javascript
const subscriberData = {
  email: submission.email,
  name: submission.name,  // ✅ MOVED TO TOP LEVEL
  fields: {
    // name removed from here
    total_score: ...,
    // other fields
  }
}
```

## 🔑 Key Insight
- `name` is a **default MailerLite field** → goes at **root level**
- Custom fields (total_score, max_score, etc.) → go inside **`fields` object**

## ✅ Test Results
```bash
✅ HTTP 201 (Created)
✅ Subscriber ID: 176624502649652630
✅ All fields populated correctly
```

## 📝 Files Changed
- `lib/mailerlite-service.ts` (Line 35: moved name field)
- `test-mailerlite.js` (Line 40: updated test)

## 🚀 Deploy
```bash
npm run build
npm start
# Then test with a real quiz submission
```

---
**Fixed**: January 15, 2026 | **Verified**: All tests passing ✅
