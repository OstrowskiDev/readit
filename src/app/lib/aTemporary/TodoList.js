// - change favorites icon to star
// - create user profile page, that will be displayed after clicking on user name in InfoBox component, currently route redirects to empty page
// - !!!! test user experience for non logged users
// - !!!! add edit post functionality similar to edit comment (atm it still navigates to edit post page)
// - move thanks to spinner creators from credits comment to credits post
// - add password client side validation:
//     - it will work for both creating account and changing password
//     - add account creation
//     - captcha for account creation?
//     - add email confirmation for account creation
//     - add password reset
// - dark mode could be nice
// - maybe using html and emotes in posts?
// - add ARIA for accessibility

// - link to github repo
//
// - Adding karma could be fun.
// - Fix responsive design for mobile devices!
// - add validation for "about" post ID, so only user with admin role can perform CUD operations on it.
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
