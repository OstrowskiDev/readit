// - change edit post button so it triggers edit form to appear below the post, or update post edit page
// - change behavior of edit and reply buttons for posts on PostsPage and FavoritesPage
// - add functionality to PostMenu that handles situation where user clicks outside of the menu
// - add rendering options for MyPosts and Favorites pages in case no MyPosts or Favorites were found
// - change favorites icon to star
// - create the profile page of users, that will be displayed after clicking on user name in InfoBox component, currently route redirects to empty page
// - !!!! test user experience for non logged users
// - !!!! add edit post functionality similar to edit comment (atm it still navigates to edit post page)
// - move thanks to spinner creators from credits comment to credits post
// - add password client side validation:
//     - it will work for both creating account and changing password
//     - add account creation
//     - chapta for account creation?
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
