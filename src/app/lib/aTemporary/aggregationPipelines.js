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
