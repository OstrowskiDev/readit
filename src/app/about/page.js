export default function About() {
  // !!!! this page and route should be deleted
  // !!!! its functionality was moved to: /posts/post/about
  // add link to github repo
  // add info how to contact the author
  //
  // - Adding karma could be fun.
  // - Add favorites functionality: adding and removing posts to favorites.
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

  return (
    <div className="main-container flex justify-center items-center mx-auto mt-8 px-4 w-[800px]">
      <div className="profile-container bg-white px-6 pt-3 pb-6 rounded-lg shadow-center-sm grow">
        <h1 className="text-2xl font-bold text-center mt-4 mb-8">
          Welcome to the RedditClone app!
        </h1>
        <p className="text-lg text-left mt-4">
          This app clones Reddit's subreddit functionalities. Is built with
          latest Next.js 14, uses MongoDB and Mongoose to connect with DB, and
          aggregation pipelines to process and fetch data. Users experience is
          enhanced by optimistic UI updates, loaders, shimmers and toast
          messages.
        </p>
        <p className="text-lg text-left mt-4">
          Posts page has extensive filtering and sorting options, so you can
          easily find the posts you are interested in. You can filter posts by
          their title, content and authors name. Also sort them by date
          popularity and activity. You can also save posts to favorites and view
          them later.
        </p>
        <p className="text-lg text-left mt-4">
          Fell free to create your user account, select avatar from the
          collection, and start posting and commenting. You can also upvote and
          downvote posts and comments, add them to favorites, and perform all
          CRUD operations on them.
        </p>
        <p className="text-lg text-left mt-4">
          Enjoy your stay and feel free to share your suggestions and feedback
          here!
        </p>
      </div>
    </div>
  )
}
