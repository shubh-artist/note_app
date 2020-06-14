// const http = require("http");
const app = require("./app");

const port = process.env.PORT || 8080;

// const server = http.createServer(app);

app.listen(port, () => {
  console.log(`Server is listening in port: ${port}`);
}); //the server object listens on port 8080
