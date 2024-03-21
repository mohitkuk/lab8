const { TwitterApi } = require("twitter-api-v2");

class TwitterModel {
  constructor() {
    this.client = new TwitterApi({
      appKey: "O8hFD1hjpe3SigMn7de6sq1ze",
      appSecret: "z25XqeWHjUo6xnpAF2iptdQceXckjCfdLqUBdyXkA1Qd8GswaG",
      accessToken: "1770848440915779584-RcheUESxsFZc9dRgUQ4psDO1N0hYOo",
      accessSecret: "TmejQTUngciIcL1qbpBiZ3FEg8K1gIjOPPhZ9AqeQx1n3",
      bearerToken: "AAAAAAAAAAAAAAAAAAAAALW5swEAAAAAEiCjTB%2FQuMF0XMZ8cN6HPRKgTGE%3DiHJGErUwj8sRT05pKravUJvO2SGyNmjrXmdnpkZSk9lbaAHYR0",
    });
  
    this.rwClient = this.client.readWrite;
    this.createdTweets = new Set(); // Set to store unique tweet content
  }

  async tweet(text) {
    try {
      // Check if the tweet content already exists
      if (this.createdTweets.has(text)) {
        return "Tweet with duplicate content cannot be created";
      }
      
      // If not, create the tweet
      await this.rwClient.v2.tweet(text);
      
      // Add the tweet content to the set
      this.createdTweets.add(text);
      
      return "Tweet created successfully";
    } catch (error) {
      console.error("Error creating tweet:", error);
      throw error;
    }
  }
}

module.exports = TwitterModel;