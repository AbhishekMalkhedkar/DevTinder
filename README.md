# DevTinder Backend 🚀

This is the backend service for [DevTinder](https://github.com/AbhishekMalkhedkar/DevTinder-web), a developer matchmaking platform that connects coders based on their tech stacks and collaboration interests.

## 🔧 Features

* RESTful API using Express.js
* MongoDB integration via Mongoose
* JWT-based Authentication
* Role-based access (admin, user)
* Password hashing with bcrypt
* Developer profiles & matchmaking logic
* Real-time chat using Socket.IO
* CORS & secure middleware handling

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT & bcrypt
* Socket.IO
* dotenv

## 📂 Folder Structure

```
/src
  ├── controllers/    # Route logic
  ├── models/         # MongoDB schemas
  ├── routes/         # API route definitions
  ├── middleware/     # Auth and error handling
  ├── config/         # DB connection and environment setup
  ├── socket/         # Chat socket implementation
  └── index.js       # Entry point
```

## 🚧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AbhishekMalkhedkar/DevTinder.git
cd DevTinder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root with the following:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/devtinder
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 4. Run the Server

```bash
npm run dev
```

Server will be running on [http://localhost:5000](http://localhost:5000)

## ✨ API Endpoints

Basic structure:

* `POST /api/auth/register` - Register user
* `POST /api/auth/login` - Login user
* `GET /api/user/profile` - Fetch user profile
* `PUT /api/user/match` - Match user
* `GET /api/chat/:id` - Get chat history
* `POST /api/message` - Send message

## 🚜 Deployment

* Deployed using **AWS EC2**, with Nginx as reverse proxy
* PM2 used for process management

## 🤝 Contributing

Contributions are welcome! Feel free to fork, raise issues, or open pull requests.

## 📬 Contact

**Abhishek Malkhedkar**
📧 [abhishekmalkhedkar3@gmail.com](mailto:abhishekmalkhedkar3@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/abhishek-malkhedkar-3b9664238)
🐙 [GitHub](https://github.com/AbhishekMalkhedkar)

---

🌟 If you found this useful, consider starring the repo!
