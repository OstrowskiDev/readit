// - add shimmer and loader for UserProfile page. Currently only PostsPage component has loader there and it is triggered after userData is set.
// - custom page for 404 error
// - fix userInfobox getting closed when hovering over its root div (or generally outer div-s)
// - move thanks to spinner creators from credits comment to credits post
// - add password client side validation:
//     - it will work for both creating account and changing password
//     - add account creation
//     - captcha for account creation?
//     - add email confirmation for account creation
//     - add password reset
// - add ARIA for accessibility
// - test responsiveness on different devices (!!!!
// - adding creation date for user accounts would be nice
// - dark mode -> later if I got extra time
// - using html and emotes in posts -> only after everything else is done

// - add validation for "about" and "credits" post ID, so only user with admin role can perform update/delete operations on it. Is it actually needed? Only creator of the post can edit it, so it should be fine.
// - add validation for passwords before they are hashed. Previous schema below:
// password: {
//   type: String,
//   required: true,
//   minlength: 8,
//   maxlength: 128,
//   match:
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,128}$/,
// },
//
