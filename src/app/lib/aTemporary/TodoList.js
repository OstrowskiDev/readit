// - test responsiveness on different devices !!!!
// - double check server side validation and authentication
// - move thanks to spinner creators from credits comment to credits post
// - prevent comments nesting deeper than lvl 5
// - add password client side validation:
//     - it will work for both creating account and changing password
//     - add account creation
//     - captcha for account creation?
//     - add email confirmation for account creation
//     - add password reset
// - add ARIA for accessibility
// - dark mode -> later if I got extra time
// - using html and emotes in posts -> only after everything else is done

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
