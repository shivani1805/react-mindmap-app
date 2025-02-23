const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define the Schema for the mind map
const hackSchema = new mongoose.Schema({
  topic: String,
  mind_map: {
    topic: String,
    subtopics: [
      {
        name: String,
        children: [String],
      },
    ],
  },
});

// Create a Model for the `Hack` collection
const Hack = mongoose.model("Hack", hackSchema, "Hack"); // Explicitly specify collection name

// API Endpoint to Fetch Mind Map Data
// API Endpoint to Fetch Mind Map Data by Topic
app.get("/api/mindmap", async (req, res) => {
    try {
      console.log("🔍 Fetching mind map data from MongoDB...");
  
      const topic = req.query.topic; // Get the topic from query parameters
      if (!topic) {
        return res.status(400).json({ error: "Topic parameter is required" });
      }
  
      const mindmap = await Hack.findOne({ topic: topic });
  
      if (!mindmap) {
        console.log(`⚠️ No mind map found for topic: ${topic}`);
        return res.status(404).json({ error: "No mind map data found for this topic" });
      }
  
      console.log(`✅ Found mind map for topic: ${topic}`);
      res.json(mindmap); // Return the full document, not just mind_map
    } catch (error) {
      console.error("❌ Error fetching mind map data:", error);
      res.status(500).json({ error: "Failed to fetch mind map data" });
    }
  });
  

// Default route to check if API is running
app.get("/", (req, res) => {
  res.send("🌍 Mind Map API is running!");
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
