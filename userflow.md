🧭 USER FLOW — Instagram Clone (Frontend)

This is how a real user will move inside your app 👇

1️⃣ Landing → Login / Signup

When user opens your website:

/ → Login page
      |
      └──> "Don't have an account?" → Signup page

Login Page

User enters:

Email

Password
Clicks Login

If success → goes to:

/feed

2️⃣ Signup Flow
/signup


User enters:

Username

Email

Password

Profile photo (optional)

Clicks Create Account
After success → auto login →

/feed

3️⃣ Feed (Home Screen)

This is the Instagram home page.

User sees:

Top bar → Logo + Upload icon + Profile icon

Post list:

User profile pic

Username

Image

Like button ❤️

Comment button 💬

Caption

User actions:

Like a post

Open comments

Click username → go to profile

Click "+" → upload post

4️⃣ Upload Post
/upload


User:

Selects image

Writes caption

Clicks Post

After upload → redirect to:

/feed


New post appears at top 🎉

5️⃣ Profile Page
/profile/:id


User sees:

Profile picture

Username

Followers / Following

Grid of posts

Follow / Unfollow button (if visiting someone else)

6️⃣ Follow System

From any profile:

Click Follow

Their posts start appearing in feed

7️⃣ Logout

Click profile → Logout
Token removed → back to:

/login

🗺️ ROUTES (React Router)
/login
/signup
/feed
/upload
/profile/:id

📱 COMPONENT STRUCTURE
App.jsx
 ├─ Navbar
 ├─ Feed
 │    └─ PostCard
 ├─ Upload
 ├─ Profile
 ├─ Login
 └─ Signup


 // command for running docker-compose
 docker-compose -f docker-compose.test.yml up -d postgres redis rabbitmq            