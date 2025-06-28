# 📝 Bloggify — Full-Stack Blogging Platform

**Bloggify** is a full-featured blogging application built using Node.js, Express.js, MongoDB, and EJS. It allows users to register, create, edit, and delete blog posts, as well as comment on others’ blogs. The platform includes authentication, session management, and form validation for a complete full-stack experience.

---

## 🚀 Features

- 👤 User Registration and Login
- ✍️ Create, Edit, and Delete Blog Posts
- 💬 Commenting System
- 🔒 Authorization: Only authors can edit or delete their own content
- 🌐 Responsive frontend using EJS and CSS
- 🗃️ MongoDB for database with Mongoose ODM
- ✅ Form validation and error handling

---

## 🛠️ Tech Stack

| Category       | Tech                                      |
|----------------|-------------------------------------------|
| Backend        | Node.js, Express.js                       |
| Frontend       | EJS, HTML, CSS                            |
| Database       | MongoDB, Mongoose                         |
| Other Tools    | dotenv        |

---

## 📁 Folder Structure

Bloggify/
├── middleware/
├── models/
├── node_modules/
├── public/
├── routes/
├── services/
├── views/
├── .env
├── index.js
├── package.json
└── README.md


## ⚙️ Installation & Setup

1. **Clone the repository**


git clone https://github.com/yourusername/bloggify.git
cd bloggify
Install dependencies

npm install
Configure environment variables

Create a .env file in the root folder:

- PORT=3000
- MONGO_URI=your_mongodb_connection_string
- Run the application

- npm start
- Visit http://localhost:3000 in your browser.

---

# 🧑‍💻 Author
Rushi Dingankar
📫 Email: rushikd9122004@gmail.com

---

📄 License
This project is open-source and available under the MIT License.
