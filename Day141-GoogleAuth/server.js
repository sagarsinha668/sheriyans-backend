import { config } from "dotenv";
import express from "express";
import passport from "passport";
import morgan from "morgan";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

config();

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Google Authentication");
});

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (_, __, profile, done) => {
      return done(null, profile);
    },
  ),
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    console.log("User Profile:", req.user);
    res.send("Google Authentication Successful");
  },
);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
