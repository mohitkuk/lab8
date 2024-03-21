const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser middleware
const TwitterController = require("./Controller/twitterController");

const app = express();
const PORT = 3000;

const twitterController = new TwitterController();

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route handler for the root path
app.get("/", (req, res) => {
  res.send("Welcome to my Twitter API application!"); // Send a welcome message for the root path
});

// Route handler for serving the page to create a tweet
// Serve a basic HTML page with a form for creating tweets
app.get("/createTweet", (req, res) => {
  const createTweetForm = `
    <html>
    <head>
      <title>Create Tweet</title>
    </head>
    <body>
      <h1>Create Tweet</h1>
      <form action="/tweet" method="post">
        <textarea name="tweetContent" rows="4" cols="50" placeholder="Enter your tweet content"></textarea><br>
        <input type="submit" value="Create Tweet">
      </form>
    </body>
    </html>
  `;
  res.send(createTweetForm);
});

// Handle the route for submitting the tweet creation form
app.post("/tweet", async (req, res) => {
  try {
    const tweetContent = req.body.tweetContent; // Assuming you have a form field named 'tweetContent' for the tweet content
    const tweetResult = await twitterController.createTweet(tweetContent);
    res.send(tweetResult);
  } catch (error) {
    res.status(500).send("Error creating tweet");
  }
});

// Start your server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
