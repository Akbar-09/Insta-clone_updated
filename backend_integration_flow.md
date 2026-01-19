✅ PHASE 1 — Prepare Your Frontend Environment
Step 1: Install required frontend packages
npm install axios react-router-dom socket.io-client

Step 2: Create a centralized Axios instance

📁 /src/api/axios.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;


✔ All API calls will go through the gateway
✔ Token is automatically attached

✅ PHASE 2 — Implement Authentication Layer
Step 3: Build AuthContext (global state)

📁 /src/context/AuthContext.js

store user

store token

login()

signup()

logout()

Step 4: Create Login + Signup Pages

Login will call:

POST /auth/login


Signup will call:

POST /auth/signup


On success:

Save token to localStorage

Redirect to feed page

Step 5: Fetch Current User

After login, call:

GET /users/me


Store user in global state.

✅ PHASE 3 — Setup Protected Routes
Step 6: Add Protected Route Component

📁 /src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}


Now wrap protected pages:

<Route path="/feed" element={
  <ProtectedRoute><FeedPage /></ProtectedRoute>
} />

✅ PHASE 4 — Integrate Feed Page
Step 7: Fetch Feed

Call:

GET /feed


Render:

user avatar

post images

likes

comments preview

username

Step 8: Implement Like / Unlike
POST /posts/:id/like
DELETE /posts/:id/like


Update UI instantly (optimistic update).

Step 9: View Comments
GET /posts/:id/comments

✅ PHASE 5 — Integrate Post Upload Feature
Step 10: Upload Image to Media Service
POST /media/upload


Receive:

{ "url": "http://cdn/.../image.jpg" }

Step 11: Create Post
POST /posts


Send:

caption

media URL

✅ PHASE 6 — Integrate Profile Pages
Step 12: Fetch another user's profile
GET /users/:username

Step 13: Fetch user’s posts, followers, following
GET /users/:username/posts
GET /users/:username/followers
GET /users/:username/following

Step 14: Follow / Unfollow Buttons
POST /users/:id/follow
DELETE /users/:id/follow

✅ PHASE 7 — Integrate Stories UI
Step 15: Fetch active stories
GET /stories

Step 16: Upload story
POST /stories

Step 17: Mark story as viewed
POST /stories/:id/view

✅ PHASE 8 — Integrate Explore Page
Step 18: Fetch explore grid
GET /explore


Render grid with image/video.

✅ PHASE 9 — Integrate Search Feature
Step 19: Search users or hashtags
GET /search?q=something

Step 20: Fetch recent search history
GET /search/recent


Allow removing history:

DELETE /search/recent

✅ PHASE 10 — Integrate Chat (DM) Feature
Step 21: Setup WebSocket Client
import { io } from "socket.io-client";

const socket = io("http://localhost:9000", {
  auth: { token: localStorage.getItem("token") }
});

Step 22: Fetch conversations
GET /conversations

Step 23: Fetch messages in conversation
GET /conversations/:id/messages

Step 24: Send message
POST /conversations/:id/messages


Socket receives realtime:

socket.on("message", (msg) => {
  setMessages((prev) => [...prev, msg]);
});

🚀 FINAL PHASE — Polish Your Frontend
Step 25: Implement loading + error states

Skeleton screens

Toast notifications

Step 26: Implement logout properly

Clear token and redirect.

Step 27: Add global error handlers

If 401 → logout automatically.

Step 28: Add infinite scroll for feed and explore

Backend already supports limit/offset.

Step 29: Add caching (optional)

Store feed in local state to avoid extra API calls.

🎯 Summary of Integration Plan
Phase	Feature             	Status
1	Setup Axios + AuthContext	🔜
2	Login + Signup          	🔜
3	Protected routes      🔜
4	Feed page               	🔜
5	Post upload	🔜
6	Profile page	🔜
7	Stories	🔜
8	Explore	🔜
9	Search	🔜
10	Chat/WebSocket	🔜