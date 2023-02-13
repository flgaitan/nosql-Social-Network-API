const express = require('express');
const { connect, connection } = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkAPI';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Db CONNECTION SUCESSFUL 🎉')
}).catch((err) => {
  console.log(err);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT 3001`);
});


