# Privacy & Interaction Settings - End-to-End Userflow

This document defines the complete user journeys and behavior for the remaining privacy and interaction settings to be implemented in Jaadoe.

---

## 1. Close Friends
**Goal:** Allow users to curate a private list of followers to share exclusive content (Stories, Posts) with.

**Userflow:**
1. **Entry Point:** User navigates to `Profile > Settings > Close Friends`.
2. **View List:** 
   - User sees a list of currently added "Close Friends".
   - If empty, an empty state illustration with a "Get Started" prompt is shown.
3. **Add Friends:** 
   - User taps a search bar at the top or browses a "Suggested" list (based on interaction frequency).
   - User taps "Add" next to a user's name. They are instantly moved to the active list.
4. **Remove Friends:** 
   - User taps "Remove" next to an existing close friend. No notification is sent to the removed user.
5. **Impact / Application:** 
   - When creating a new Story or Post, the user can select "Close Friends" as the audience. 
   - Only users on this list will see the content, marked with a distinctive green ring/badge.

---

## 2. Blocked Accounts
**Goal:** Completely sever interaction capabilities with specific users.

**Userflow:**
1. **Entry Point:** User navigates to `Profile > Settings > Blocked`.
2. **View List:** Shows a chronological list of all blocked accounts.
3. **Unblock:** 
   - User taps "Unblock" next to a name. A confirmation modal appears: "Unblock @username?". Upon confirming, the user is removed from the list.
4. **Block (From Settings):** 
   - User taps the `+` icon, searches for a username, and taps "Block".
5. **Block (From Profile):**
   - Alternatively, user visits someone's profile, taps the `More (...)` menu, and selects "Block".
6. **Impact Application:**
   - Blocked users cannot search for the user, see their profile, view posts/stories, or send messages. 
   - Existing chat threads are disabled (input box removed).

---

## 3. Hide Story & Live
**Goal:** Prevent specific followers from viewing ephemeral content without removing or blocking them.

**Userflow:**
1. **Entry Point:** User navigates to `Profile > Settings > Hide Story and Live`.
2. **Selection UI:** 
   - A list of all followers is displayed. 
   - User checks the box next to users they want to hide content from.
3. **Impact Application:**
   - When the user posts a Story or goes Live, the backend actively filters out the selected users from the broadcast/distribution list. 
   - The hidden users still see normal grid posts and reels unharmed.

---

## 4. Messages (Message Controls)
**Goal:** Control who can slide into the user's Direct Messages.

**Userflow:**
1. **Entry Point:** User navigates to `Profile > Settings > Messages`.
2. **Routing Rules:** User configures drop-downs/radio buttons for different cohorts:
   - *Your Followers:* Deliver to Main Chat, Message Requests, or Don't Receive.
   - *Others on Jaadoe:* Deliver to Message Requests or Don't Receive.
   - *Group Invites:* Who can add the user to groups (Everyone, Only people you follow).
3. **Impact Application:**
   - When user B messages user A: The system checks A's message settings. 
   - If "Don't Receive" is active, user B sees an error: "This user does not accept new message requests." 
   - If "Message Requests" is active, the chat bypasses the main inbox and lands in a hidden requests folder requiring approval.

---

## 5. Tags & Mentions
**Goal:** Prevent spam and control where the user's handle can be linked.

**Userflow:**
1. **Entry Point:** User navigates to `Profile > Settings > Tags & Mentions`.
2. **Tags Settings:**
   - Allow tags from: `Everyone` | `People you follow` | `No one`
   - *Manually Approve Tags:* Toggle switch. If ON, when another user tags them in a post, it goes to a "Pending Tags" queue, and doesn't show on their profile until approved.
3. **Mentions Settings (Stories/Comments):**
   - Allow @mentions from: `Everyone` | `People you follow` | `No one`
4. **Impact Application:**
   - If "No one" is selected and User B types `@UserA` in a comment or story, the UI warns User B: "@UserA doesn't allow mentions." and the text will not convert into a clickable hyperlink.

---

## 6. Comments
**Goal:** Prevent harassment through advanced comment filtering.

**Userflow:**
1. **Entry Point:** User navigates to `Profile > Settings > Comments`.
2. **Comment Permissions:**
   - Allow comments from: `Everyone` | `People you follow and your followers` | `People you follow` | `Your followers`.
   - Block comments from: Opens a list to manually block specific users exclusively from commenting (but still allowing them to see posts).
3. **Word Filters:**
   - *Hide Offensive Comments:* Toggle switch (Backend AI/dictionary check).
   - *Custom Words:* A text field where the user inputs comma-separated words/emojis.
4. **Impact Application:**
   - Any comment containing a custom blocked word is immediately hidden/deleted upon submission by the backend.

---

## 7. Restricted Accounts
**Goal:** Soft-block toxic users. The toxic user doesn't know they are restricted.

**Userflow:**
1. **Entry Point:** User navigates to `Profile > Settings > Restricted Accounts` (or via the user's profile `...` menu).
2. **Action:** User searches and adds a user to the restricted list.
3. **Impact Application (The "Shadowban" effect):**
   - *Comments:* The restricted user can comment on posts, but the comment is ONLY visible to the restricted user. The owner sees a prompt "Review Comment", and can choose to make it public, delete it, or leave it hidden.
   - *Messages:* The restricted user's DMs are moved to the "Message Requests" folder. Read receipts and typing indicators are disabled for them.
   - *Status:* They cannot see when the restricting user is online.

---

## 8. Muted Accounts
**Goal:** Clean up the feed without the social friction of unfollowing.

**Userflow:**
1. **Entry Point:** User navigates to `Profile > Settings > Muted Accounts` (or via the user's profile `Following` button).
2. **Mute Toggles:**
   - The user can independently check triggers for: `Posts`, `Stories`, and `Notes`.
3. **Impact Application:**
   - Muted users stay on the Following list.
   - If `Posts` are muted, backend timeline generation simply excludes their posts from the feed query.
   - If `Stories` are muted, they are pushed to the very end of the horizontal story tray and greyed out, or completely excluded depending on preference.
   - Muted accounts receive no notification that they were muted.
