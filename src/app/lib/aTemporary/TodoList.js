// - add favorites page, lol this will take some srs effort:
//     - figure out how to change comment components to be able to handle buttons, optimistic ui changes and toasts. Currently structure of comments is totally different than posts and doesn't allow to use them separately without parent post.
//     - add functionality to filter button so it can handle favorites page
// - add functionality to posts page for handling favorite clicks, atm it redirects to post
// - add functionality to PostMenu that handles situation where user clicks outside of the menu
// - change favorites icon to star
// - !!!! test user experience for non logged users
// - !!!! add edit post functionality similar to edit comment (atm it still navigates to edit post page)
// - add spinner from credits comment to its post
// - add password client side validation:
//     - it will work for both creating account and changing password
//     - add account creation
//     - chapta for account creation?
//     - add email confirmation for account creation
//     - add password reset
// - add toast notification and optimistic UI for creating post in posts page
// - dark mode could be nice
// - maybe using html and emotes in posts?

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
