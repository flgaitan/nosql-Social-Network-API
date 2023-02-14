const { connect, connection } = require('mongoose');
//const mongoose = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkAPI';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Db CONNECTION SUCESSFUL 🎉');
// }).catch((err) => {
//   console.log(err);
});


// Export connection
module.exports = connection;
// module.exports = mongoose.connection;