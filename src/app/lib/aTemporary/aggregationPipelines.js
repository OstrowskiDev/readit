// find how many active users has db:
// $count counts the number of documents and yields a number as a value of property that name is specified, in this example: 'activeUsers'
Users.aggregate([
  {
    $match: {
      isActive: true,
    },
  },
  {
    $count: 'activeUsers',
  },
])

// find what is the average age of all users:
// $avg gives average value of specified property
// group passed with _id null groups all documents to one document
// than operations can be done on that document
// in this exampe im getting document with prop averageAge and its value
Users.aggregate([
  {
    $group: {
      _id: null,
      averageAge: {
        $avg: '$age',
      },
    },
  },
])

// list the top 5 most common users favorite fruits
Users.aggregate([
  {
    $group: {
      _id: '$favoriteFruit',
      //create count prop:
      count: {
        //and add one if you find match:
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      //sort in descending order (-1) the count prop:
      count: -1,
    },
  },
  {
    $limit: 5,
  },
])

// find the total number of males and females
Users.aggregate([
  {
    $group: {
      _id: '$gender',
      genderCount: {
        $sum: 1,
      },
    },
  },
])

// find which country has the highest number of registered users
Users.aggregate([
  {
    $group: {
      _id: '$company.location.country',
      userCount: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      userCount: -1,
    },
  },
])

// list all unique eye colors present in the users collection
Users.aggregate([
  {
    $group: {
      _id: '$eyeColor',
    },
  },
])

// what is the average number of tags per user
Users.aggregate([
  {
    $unwind: '$tags',
  },
  {
    $group: {
      _id: '$_id',
      numberOfTags: { $sum: 1 },
    },
  },
  {
    $group: {
      _id: null,
      averageNumberOfTags: { $avg: '$numberOfTags' },
    },
  },
])

// the same as above but using $addFields:
Users.aggregate([
  {
    $addFields: {
      numberOfTags: {
        //handle scenario here therre is no tags prop, or its empty
        $size: { $ifNull: ['$tags', []] },
      },
    },
  },
  {
    $group: {
      _id: null,
      averageNumberOfTags: { $avg: '$numberOfTags' },
    },
  },
])

// how many users have 'enim' as one of their tags:
Users.aggregate([
  {
    $match: {
      tags: 'enim',
    },
  },
  //now count all documents, and give this prop a name:
  {
    $count: 'usersWithEnimTag',
  },
])

// find the names and age of users who are inactive and have 'velit' as tag:
Users.aggregate([
  {
    $match: {
      isActive: false,
      tags: 'velit',
    },
  },
  {
    // display only specified props of document, 1 stands for current value, you can also create new props with new values
    project: {
      name: 1,
      age: 1,
    },
  },
])
