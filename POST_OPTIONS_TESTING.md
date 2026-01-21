# Post Options Menu - Testing Checklist

## ✅ Pre-Testing Setup

- [ ] Backend services running (`node start_services.js`)
- [ ] Frontend running (`npm run dev`)
- [ ] Database connected and seeded
- [ ] At least 2 test users created
- [ ] Multiple posts created by different users

---

## 🧪 Test Cases

### 1. Menu Display Tests

#### Test 1.1: Owner's Post Menu
- [ ] Login as User A
- [ ] Navigate to feed
- [ ] Click three-dot menu on User A's post
- [ ] **Expected**: Menu shows owner options (Delete, Edit, Hide likes, etc.)
- [ ] **Verify**: "Report" option is NOT visible
- [ ] **Verify**: "Unfollow" option is NOT visible

#### Test 1.2: Other User's Post Menu
- [ ] Stay logged in as User A
- [ ] Click three-dot menu on User B's post
- [ ] **Expected**: Menu shows viewer options (Report, Go to post, etc.)
- [ ] **Verify**: "Delete" option is NOT visible
- [ ] **Verify**: "Edit" option is NOT visible
- [ ] **Verify**: "Hide like count" option is NOT visible

#### Test 1.3: Menu Opening/Closing
- [ ] Click three-dot menu
- [ ] **Expected**: Menu opens with smooth animation
- [ ] Click "Cancel"
- [ ] **Expected**: Menu closes
- [ ] Click three-dot menu again
- [ ] Press ESC key
- [ ] **Expected**: Menu closes
- [ ] Click three-dot menu again
- [ ] Click outside the menu
- [ ] **Expected**: Menu closes

---

### 2. Owner Actions Tests

#### Test 2.1: Delete Post
- [ ] Login as User A
- [ ] Click three-dot menu on User A's post
- [ ] Click "Delete"
- [ ] **Expected**: Confirmation dialog appears
- [ ] Click "Cancel" on confirmation
- [ ] **Expected**: Post remains, menu closes
- [ ] Click three-dot menu again
- [ ] Click "Delete"
- [ ] Click "OK" on confirmation
- [ ] **Expected**: Post disappears from feed immediately
- [ ] Refresh page
- [ ] **Expected**: Post still gone (database deleted)
- [ ] Check database
- [ ] **Expected**: Post record deleted, likes/comments cascade deleted

#### Test 2.2: Edit Post
- [ ] Click three-dot menu on your post
- [ ] Click "Edit"
- [ ] **Expected**: Edit modal opens with current caption
- [ ] Change caption to "Updated caption test"
- [ ] Click "Save"
- [ ] **Expected**: Caption updates immediately
- [ ] **Expected**: Edit modal closes
- [ ] Refresh page
- [ ] **Expected**: New caption persists

#### Test 2.3: Hide Like Count
- [ ] Note current like count on your post
- [ ] Click three-dot menu
- [ ] Click "Hide like count"
- [ ] **Expected**: Menu closes
- [ ] **Expected**: Like count still visible to you
- [ ] Logout
- [ ] Login as different user
- [ ] View the post
- [ ] **Expected**: Like count is hidden
- [ ] Logout and login as original user
- [ ] Click three-dot menu
- [ ] Click "Unhide like count"
- [ ] **Expected**: Like count visible to everyone again

#### Test 2.4: Toggle Comments
- [ ] Click three-dot menu on your post
- [ ] Click "Turn off commenting"
- [ ] **Expected**: Comment box becomes disabled/hidden
- [ ] **Expected**: Existing comments still visible
- [ ] Try to add a comment
- [ ] **Expected**: Cannot add comment
- [ ] Logout and login as different user
- [ ] Try to comment on the post
- [ ] **Expected**: Cannot comment
- [ ] Logout and login as original user
- [ ] Click three-dot menu
- [ ] Click "Turn on commenting"
- [ ] **Expected**: Comment box enabled again
- [ ] Add a test comment
- [ ] **Expected**: Comment posted successfully

#### Test 2.5: Copy Link
- [ ] Click three-dot menu
- [ ] Click "Copy link"
- [ ] **Expected**: Toast notification "Link copied to clipboard"
- [ ] **Expected**: Menu closes
- [ ] Paste in browser address bar
- [ ] **Expected**: Correct post URL (e.g., http://localhost:5174/post/123)
- [ ] Navigate to URL
- [ ] **Expected**: Single post page opens

#### Test 2.6: Embed Code
- [ ] Click three-dot menu
- [ ] Click "Embed"
- [ ] **Expected**: Toast notification "Embed code copied to clipboard"
- [ ] **Expected**: Menu closes
- [ ] Paste in text editor
- [ ] **Expected**: Valid iframe HTML code
- [ ] **Verify**: iframe src contains correct post ID
- [ ] **Verify**: iframe has width, height, frameborder attributes

#### Test 2.7: Go to Post
- [ ] Click three-dot menu
- [ ] Click "Go to post"
- [ ] **Expected**: Navigate to /post/:postId
- [ ] **Expected**: Single post page displays correctly
- [ ] **Expected**: Menu closes

#### Test 2.8: About This Account
- [ ] Click three-dot menu
- [ ] Click "About this account"
- [ ] **Expected**: Navigate to your profile page
- [ ] **Expected**: Profile displays correctly

---

### 3. Viewer Actions Tests

#### Test 3.1: Report Post
- [ ] Login as User A
- [ ] Click three-dot menu on User B's post
- [ ] Click "Report"
- [ ] **Expected**: Report modal opens
- [ ] **Expected**: Categories displayed (Spam, Bullying, Violence, etc.)
- [ ] Click "Spam"
- [ ] **Expected**: Subcategories displayed
- [ ] Click a subcategory
- [ ] **Expected**: Loading indicator appears
- [ ] **Expected**: Success screen appears
- [ ] Click "Close"
- [ ] **Expected**: Modal closes
- [ ] Try to report same post again
- [ ] **Expected**: Error message "You have already reported this post"

#### Test 3.2: Report Own Post (Should Fail)
- [ ] Click three-dot menu on your own post
- [ ] **Expected**: "Report" option NOT visible
- [ ] Try to report via API (if testing API directly)
- [ ] **Expected**: Error "You cannot report your own post"

#### Test 3.3: Unfollow User
- [ ] Make sure you're following User B
- [ ] Click three-dot menu on User B's post
- [ ] **Expected**: "Unfollow" option visible (red, bold)
- [ ] Click "Unfollow"
- [ ] **Expected**: Confirmation dialog appears
- [ ] Click "OK"
- [ ] **Expected**: Success message
- [ ] **Expected**: Menu closes
- [ ] Navigate to User B's profile
- [ ] **Expected**: "Follow" button visible (not following anymore)

#### Test 3.4: Unfollow When Not Following
- [ ] Make sure you're NOT following User B
- [ ] Click three-dot menu on User B's post
- [ ] **Expected**: "Unfollow" option NOT visible

#### Test 3.5: Remove from Favorites
- [ ] Click three-dot menu on another user's post
- [ ] Click "Remove from favorites"
- [ ] **Expected**: Success message
- [ ] **Expected**: Menu closes

---

### 4. Edge Cases & Error Handling

#### Test 4.1: Network Error Handling
- [ ] Disconnect internet
- [ ] Try to delete a post
- [ ] **Expected**: Error message "Something went wrong"
- [ ] **Expected**: Post remains visible
- [ ] Reconnect internet
- [ ] Try again
- [ ] **Expected**: Works correctly

#### Test 4.2: Unauthorized Actions
- [ ] Try to access DELETE /posts/:postId API for another user's post
- [ ] **Expected**: 403 Forbidden error
- [ ] Try to access PUT /posts/:postId/hide-likes for another user's post
- [ ] **Expected**: 403 Forbidden error

#### Test 4.3: Loading States
- [ ] Click three-dot menu
- [ ] Click an action (e.g., Delete)
- [ ] **Expected**: Loading spinner appears
- [ ] **Expected**: All buttons disabled during loading
- [ ] **Expected**: Cannot click other options
- [ ] Wait for completion
- [ ] **Expected**: Loading state clears

#### Test 4.4: Multiple Posts
- [ ] Open menu on Post 1
- [ ] Without closing, scroll to Post 2
- [ ] **Expected**: Menu stays attached to Post 1 OR closes
- [ ] Close menu
- [ ] Open menu on Post 2
- [ ] **Expected**: Correct post ID used for all actions

#### Test 4.5: Deleted Post Persistence
- [ ] Delete a post
- [ ] Navigate to different page
- [ ] Navigate back to feed
- [ ] **Expected**: Deleted post still not visible
- [ ] Refresh browser
- [ ] **Expected**: Deleted post still not visible

---

### 5. Consistency Tests

#### Test 5.1: Feed Page
- [ ] Test all menu options on feed page
- [ ] **Expected**: All features work correctly

#### Test 5.2: Profile Page
- [ ] Navigate to profile
- [ ] Test all menu options on profile posts
- [ ] **Expected**: All features work correctly

#### Test 5.3: Explore Page
- [ ] Navigate to explore
- [ ] Test all menu options on explore posts
- [ ] **Expected**: All features work correctly

#### Test 5.4: Single Post Page
- [ ] Navigate to /post/:postId
- [ ] Test all menu options
- [ ] **Expected**: All features work correctly

#### Test 5.5: Saved Posts Page
- [ ] Navigate to saved posts
- [ ] Test all menu options
- [ ] **Expected**: All features work correctly

---

### 6. UI/UX Tests

#### Test 6.1: Visual Design
- [ ] Menu has dark background (#262626)
- [ ] Text is white
- [ ] Destructive actions (Delete, Report, Unfollow) are red (#ed4956)
- [ ] Destructive actions are bold
- [ ] Borders between options (#363636)
- [ ] Smooth animations (fade-in, zoom-in)
- [ ] Backdrop blur effect

#### Test 6.2: Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768px width)
- [ ] Test on mobile (375px width)
- [ ] **Expected**: Menu adapts to screen size
- [ ] **Expected**: Always centered and readable

#### Test 6.3: Accessibility
- [ ] Tab through menu options
- [ ] **Expected**: Focus visible on each option
- [ ] Press Enter on focused option
- [ ] **Expected**: Action triggers
- [ ] Press ESC
- [ ] **Expected**: Menu closes

---

### 7. Database Verification

#### Test 7.1: Post Deletion
- [ ] Delete a post via UI
- [ ] Check `posts` table in database
- [ ] **Expected**: Post record deleted
- [ ] Check `likes` table
- [ ] **Expected**: Associated likes deleted
- [ ] Check `comments` table
- [ ] **Expected**: Associated comments deleted
- [ ] Check `saved_posts` table
- [ ] **Expected**: Associated saves deleted

#### Test 7.2: Post Edit
- [ ] Edit a post caption
- [ ] Check `posts` table
- [ ] **Expected**: Caption updated in database

#### Test 7.3: Hide Likes Toggle
- [ ] Toggle hide likes
- [ ] Check `posts` table
- [ ] **Expected**: `hideLikes` column updated (true/false)

#### Test 7.4: Comments Toggle
- [ ] Toggle comments
- [ ] Check `posts` table
- [ ] **Expected**: `commentsDisabled` column updated (true/false)

#### Test 7.5: Report Submission
- [ ] Report a post
- [ ] Check `reports` table
- [ ] **Expected**: New report record created
- [ ] **Verify**: `postId` matches
- [ ] **Verify**: `reportedBy` matches current user
- [ ] **Verify**: `reason` is valid enum value
- [ ] **Verify**: `status` is 'pending'

---

## 📊 Test Results Summary

### Pass/Fail Tracking

| Category | Tests | Passed | Failed | Notes |
|----------|-------|--------|--------|-------|
| Menu Display | 3 | | | |
| Owner Actions | 8 | | | |
| Viewer Actions | 5 | | | |
| Edge Cases | 5 | | | |
| Consistency | 5 | | | |
| UI/UX | 3 | | | |
| Database | 5 | | | |
| **TOTAL** | **34** | | | |

---

## 🐛 Issues Found

| Issue # | Description | Severity | Status | Notes |
|---------|-------------|----------|--------|-------|
| | | | | |

---

## ✅ Sign-Off

- [ ] All critical tests passed
- [ ] All edge cases handled
- [ ] Database integrity verified
- [ ] UI/UX meets requirements
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Ready for production

**Tested By**: _________________  
**Date**: _________________  
**Version**: _________________  

---

**Notes**:
- Run tests in order for best results
- Use different browsers (Chrome, Firefox, Safari)
- Test with different user roles
- Document any issues found
- Retest after fixes
