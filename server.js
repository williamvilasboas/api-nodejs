const { app, port, name } = require('./src/app');

app.listen(port, (err) => {
  if (!err) {
    console.log(`App ${name} running in port ${port}`);
  }
});

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
