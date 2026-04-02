# PocketBase Setup — CreateSkills.xyz

Follow these steps in the PocketBase admin UI at **pb.naviklabs.com/_/**.

---

## 1. Enable OTP Authentication on the `users` collection

1. Go to **Collections → users**
2. Click **API Rules** tab
3. Enable **Auth via OTP** (one-time password) in the Auth settings
4. Save

> PocketBase will now auto-create user records when an OTP is requested for an unknown email. No manual user creation needed.

---

## 2. Create the `skill_leads` collection

1. Go to **Collections → New Collection**
2. **Name:** `skill_leads`
3. **Type:** Base collection (not auth)
4. **Fields** (create each as Text type unless noted):

| Field name    | Type   | Required | Notes |
|---------------|--------|----------|-------|
| `email`       | Text   | ✓        | User's email |
| `skill_type`  | Text   | ✓        | `url`, `github`, `md`, `txt`, `file`, `youtube`, `thoughts` |
| `source_input`| Text   | ✓        | The raw source URL or text |
| `user_prompt` | Text   |          | Optional guide context |
| `skill_id`    | Text   | ✓        | UUID generated server-side |
| `skill_name`  | Text   | ✓        | Slugified name |
| `user_id`     | Text   |          | PocketBase user record ID (linked after auth) |
| `status`      | Text   | ✓        | Default: `pending` |

5. **API Rules** → Set **Create** rule to empty (allow all) or use your preferred rule
6. **API Rules** → Set **List/View** rule to `@request.auth.id != ""` (authenticated only)
7. Save

---

## 3. Environment Variables

Create a `.env.local` file in `createskills/`:

```env
# No required env vars for basic operation.
# PocketBase URL is hardcoded to https://pb.naviklabs.com
# To override, update lib/pocketbase.ts

NODE_ENV=production
```

---

## 4. Run the app

```bash
cd createskills
npm run dev        # development
npm run build      # production build
npm run start      # production server
```

---

## 5. Verify the flow

1. Open `localhost:3000`
2. Paste any URL → click Generate
3. Enter your email → click "Generate My Skill"
4. Check your email for the 6-digit OTP
5. Enter the OTP → you're redirected to `/my-skills`
6. Check **pb.naviklabs.com/_/** → `skill_leads` collection → your record should appear
