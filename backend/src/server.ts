import express from "express";

const app = express();

app.listen(8080, () => {
  console.log("Server started: http://localhost:8080");
});
app.use(express.json());

app.get("/test", (_, res) => {
  res.send({ test: "success" });
});

// use only in production
// app.use(express.static(path.join(__dirname, "../../frontend/build")));
