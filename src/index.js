import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import authRouter from "./auth/auth.router.js";
import exampleRouter from "./example.js";

//Db setup
mongoose
  .connect(
    "mongodb+srv://whoami:9czUeRboz1fgOBJJ@node-auth-server.luevm.mongodb.net/auth?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.warn("Error while trying to connect to database");
    console.warn("Application will be closed");
    process.exit(1);
  });

// App (express instance) setup
const app = express();
app.use(morgan("combined"));
app.use(express.json({ type: "*/*" }));
app.use(passport.initialize());
app.use("/auth", authRouter);
app.use("/example", exampleRouter);

// Server setup (listening on port)
const port = process.env.PORT || 6900;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
