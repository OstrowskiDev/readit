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
      countUsers: {
        $sum: 1,
      },
    },
  },
])
