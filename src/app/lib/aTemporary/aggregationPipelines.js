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
