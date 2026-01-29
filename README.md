<div align="center">

# 🔗 Discord URL Shortener Bot

### **Hybrid Discord Bot & URL Shortening Service**

[![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-v14-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[Live Demo](#) • [Documentation](#-table-of-contents) • [Report Bug](https://github.com/dharamdan01/discord-url-shortener/issues) • [Request Feature](https://github.com/dharamdan01/discord-url-shortener/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Commands Reference](#-commands-reference)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

A **full-stack hybrid application** that seamlessly combines a Discord Bot with an Express.js web server to provide URL shortening capabilities directly within Discord servers. Users can generate shortened URLs through simple Discord commands, with all mappings stored in MongoDB and accessible via HTTP redirections.

### **Why This Project?**

- ✅ Demonstrates **microservices architecture** (Bot + Web Server)
- ✅ Showcases **RESTful API design** and **database integration**
- ✅ Implements **Discord.js v14** slash commands and event handling
- ✅ Features **real-time command processing** with validation
- ✅ Production-ready with **environment configuration** and **error handling**

---

## ✨ Key Features

### **Discord Bot Capabilities**

- 🤖 **Slash Commands** - Modern Discord interactions with `/ping` command
- 💬 **Message Listeners** - Automatic URL detection with `create` prefix
- ⚡ **Real-time Processing** - Instant shortened link generation
- ✅ **Input Validation** - Ensures only valid HTTP/HTTPS URLs are processed
- 🎯 **User-Friendly Responses** - Clear feedback with embedded messages

### **URL Shortening Service**

- 🔗 **Unique ID Generation** - Compact, collision-resistant IDs using nanoid
- 📊 **Visit Tracking** - Comprehensive analytics with timestamp logging
- 🗄️ **Persistent Storage** - MongoDB database for reliable data retention
- 🔄 **Automatic Redirection** - Seamless HTTP 302 redirects to original URLs
- 🌐 **Production Ready** - Railway deployment support with environment detection

### **Web Server Features**

- 🚀 **Express.js Backend** - Fast, minimal web framework
- 🔀 **Dynamic Routing** - Handles `/url/:shortId` patterns
- 📈 **Analytics Integration** - Tracks and stores visit history
- 🛡️ **Error Handling** - Graceful 404 responses for invalid links
- ⚙️ **EJS Templating** - Ready for custom landing pages

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime:** Node.js (v16.9.0+)
- **Web Framework:** Express.js v4
- **Bot Library:** Discord.js v14
- **Database:** MongoDB with Mongoose ODM
- **ID Generation:** Nanoid

### **Development Tools**
- **Process Manager:** Nodemon
- **Environment Management:** Dotenv
- **Template Engine:** EJS
- **Version Control:** Git

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Discord Platform                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  User Commands                                       │  │
│  │  • /ping                                             │  │
│  │  • create <url>                                      │  │
│  │  • hello                                             │  │
│  └───────────────────┬──────────────────────────────────┘  │
└─────────────────────┼──────────────────────────────────────┘
                      │
                      │ Discord Gateway (WebSocket)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Discord.js Bot Client                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Event Handlers                                      │  │
│  │  • messageCreate                                     │  │
│  │  • interactionCreate                                 │  │
│  │  • ready                                             │  │
│  └───────────────────┬──────────────────────────────────┘  │
│                      │                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Command Processing                                  │  │
│  │  • URL Validation                                    │  │
│  │  • Nanoid Generation                                 │  │
│  │  • Database Storage                                  │  │
│  └───────────────────┬──────────────────────────────────┘  │
└─────────────────────┼──────────────────────────────────────┘
                      │
                      ├──────────────────┐
                      ▼                  ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│   Express.js Server      │  │     MongoDB Database         │
│  ┌──────────────────┐   │  │  ┌───────────────────────┐  │
│  │  Routes          │   │  │  │  URL Collection       │  │
│  │  /url/:shortId   │◄──┼──┼─►│  • shortId            │  │
│  └──────────────────┘   │  │  │  • redirectURL        │  │
│                          │  │  │  • visitHistory[]     │  │
│  ┌──────────────────┐   │  │  └───────────────────────┘  │
│  │  Redirection     │   │  │                              │
│  │  HTTP 302        │   │  │                              │
│  └──────────────────┘   │  │                              │
└──────────────────────────┘  └──────────────────────────────┘
          │
          │ HTTP Response
          ▼
┌─────────────────────────────────────────────────────────────┐
│                       End User                               │
│               (Redirected to Original URL)                   │
└─────────────────────────────────────────────────────────────┘
```

### **Project Structure**

```
discord-url-shortener/
│
├── bot/
│   ├── commands/
│   │   └── ping.js              # Slash command logic
│   └── index.js                 # Bot event handlers
│
├── config/
│   └── connect.js               # MongoDB connection
│
├── models/
│   └── url.js                   # Mongoose URL schema
│
├── routes/
│   └── url.js                   # Express redirection routes
│
├── .env.example                 # Environment template
├── .gitignore                   # Git exclusions
├── index.js                     # Application entry point
├── package.json                 # Dependencies & scripts
└── README.md                    # Documentation
```

---

## 🚀 Getting Started

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v16.9.0 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Discord Bot Account** - [Create here](https://discord.com/developers/applications)

### **Discord Bot Setup**

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Navigate to the "Bot" tab and click "Add Bot"
4. Under "Privileged Gateway Intents", enable:
   - `MESSAGE CONTENT INTENT`
   - `GUILD MESSAGES`
   - `GUILDS`
5. Copy your **Bot Token** (you'll need this for `.env`)
6. Go to "OAuth2" → "General" and copy your **Client ID**
7. Invite the bot to your server:
   ```
   https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2048&scope=bot%20applications.commands
   ```

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/dharamdan01/bot-lnkeen-generator.git
   cd bot-lnkeen-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5001
   NODE_ENV=development
   
   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/shorturl
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/shorturl
   
   # Discord Bot Credentials
   DISCORD_BOT_TOKEN=your_discord_bot_token_here
   DISCORD_BOT_CLIENT_ID=your_discord_client_id_here
   ```

4. **Start the application**
   
   **Development mode** (with auto-reload):
   ```bash
   npm run dev
   ```
   
   **Production mode**:
   ```bash
   npm start
   ```

5. **Verify the setup**
   
   You should see console output indicating:
   ```
   ✅ MongoDB connected successfully
   ✅ Discord bot logged in as YourBotName#1234
   ✅ Server listening on port 5001
   ✅ Slash commands registered
   ```

---

## 📖 Usage Guide

### **Creating Shortened URLs**

**Method 1: Message Command**
```
create https://www.example.com
```
The bot will respond with:
```
✅ Short URL created!
🔗 http://localhost:5001/url/abc123xyz
```

**Method 2: Direct Message**
Simply type any message starting with `create` followed by a valid URL.

### **Testing Bot Status**

Use the slash command:
```
/ping
```
The bot will respond with:
```
🏓 Pong! Latency: 45ms
```

### **Greeting**

Type:
```
hello
```
The bot will greet you back!

### **Accessing Short Links**

Click or visit the generated URL:
- **Local:** `http://localhost:5001/url/abc123xyz`
- **Production:** `https://your-app.railway.app/url/abc123xyz`

The server will:
1. Look up the original URL in the database
2. Record the visit timestamp
3. Redirect you to the original destination

---

## 📡 API Documentation

### **Redirect Endpoint**

**Endpoint:** `GET /url/:shortId`

**Description:** Redirects to the original URL and logs the visit

**Parameters:**
- `shortId` (path parameter) - The unique identifier for the shortened URL

**Response:**
- **302 Found** - Redirects to original URL
- **404 Not Found** - If shortId doesn't exist

**Example:**
```bash
curl -L http://localhost:5001/url/abc123xyz
# Redirects to original URL
```

**Database Update:**
```javascript
{
  "shortId": "abc123xyz",
  "redirectURL": "https://www.example.com",
  "visitHistory": [
    { "timestamp": "2026-01-29T10:30:00.000Z" },
    { "timestamp": "2026-01-29T11:15:00.000Z" }
  ]
}
```

---

## 🎮 Commands Reference

| Command | Type | Usage | Description |
|---------|------|-------|-------------|
| `create <url>` | Message | `create https://google.com` | Generates a shortened URL |
| `/ping` | Slash | `/ping` | Checks bot latency and status |
| `hello` | Message | `hello` | Bot responds with a greeting |

### **URL Validation Rules**

✅ **Valid URLs:**
- `https://www.example.com`
- `http://example.com`
- `https://subdomain.example.com/path?query=value`

❌ **Invalid URLs:**
- `example.com` (missing protocol)
- `ftp://example.com` (unsupported protocol)
- `javascript:alert('xss')` (security risk)

---

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/bot-demo.png" alt="Discord URL Shortener Bot Demo" width="800"/>
  <p><i>Discord bot creating and sharing shortened URLs in real-time</i></p>
</div>

---

## 🚀 Deployment

### **Railway Deployment**

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project** and connect your GitHub repository

3. **Add environment variables** in Railway dashboard:
   ```
   MONGO_URI=your_mongodb_atlas_uri
   DISCORD_BOT_TOKEN=your_bot_token
   DISCORD_BOT_CLIENT_ID=your_client_id
   PORT=5001
   ```

4. **Deploy** - Railway will automatically detect and deploy your app

5. **Update bot logic** - The bot automatically detects production environment

### **Heroku Deployment**

```bash
heroku create your-app-name
heroku config:set DISCORD_BOT_TOKEN=your_token
heroku config:set DISCORD_BOT_CLIENT_ID=your_client_id
heroku config:set MONGO_URI=your_mongodb_uri
git push heroku main
```

---

## 🗺️ Roadmap

- [ ] **Analytics Dashboard** - Web interface for URL statistics
- [ ] **Custom Short IDs** - Allow users to specify custom aliases
- [ ] **Expiration Dates** - Auto-delete URLs after specified time
- [ ] **QR Code Generation** - Generate QR codes for shortened URLs
- [ ] **Link Preview** - Show metadata before redirecting
- [ ] **Rate Limiting** - Prevent spam and abuse
- [ ] **User Authentication** - Track URLs by Discord user
- [ ] **Bulk URL Creation** - Process multiple URLs at once
- [ ] **Click Analytics** - Geographic and device tracking
- [ ] **API Endpoints** - RESTful API for programmatic access

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


## 📧 Contact

**Dharam Dan**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dharam-dan-2584bb258/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dharamdan01)

**Project Link:** [https://github.com/dharamdan01/discord-url-shortener](https://github.com/dharamdan01/bot-lnkeen-generator)

---

<div align="center">

### ⭐ If you found this helpful, please consider giving it a star!

**Built with ❤️ using Node.js, Discord.js, and MongoDB**

</div>
