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
    this.createdTweets = new Set(); 
  }

  async tweet(text) {
    try {
      
      const uniqueText = `${text} - ${new Date().toISOString()}`;
      
      
      await this.rwClient.v2.tweet(uniqueText);
      
      
      this.createdTweets.add(uniqueText);
      
      return "Tweet created successfully";
    } catch (error) {
      console.error("Error creating tweet:", error);
      throw error;
    }
  }
}

module.exports = TwitterModel;

