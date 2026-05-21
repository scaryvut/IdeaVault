```markdown
# IdeaVault 🚀

![IdeaVault Banner](https://via.placeholder.com/1200x400?text=IdeaVault)

A modern full-stack startup idea sharing platform where users can create, explore, like, view, and comment on startup ideas. Built with a scalable MERN-style architecture using Next.js and Express + MongoDB.

---

## 📌 Live Demo

> Coming soon / Add your deployed link here

---

## ⚡ Features

- 🧠 Create and share startup ideas
- 🔥 Trending ideas (latest 6)
- ❤️ Like system
- 👀 View tracking
- 💬 Comment system (CRUD)
- 👤 User-based interaction tracking
- 📄 Idea detail page with full discussion
- ⚡ Fast client-side updates

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- React Icons
- React Toastify
- Auth Session Client

### Backend
- Node.js
- Express.js
- MongoDB (Native Driver)
- CORS

---

## 📁 Project Structure

```

IdeaVault/
│
├── backend/
│   ├── server.js
│   ├── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/

````

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/your-username/ideavault.git
cd ideavault
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGODB_URI=your_mongodb_uri
PORT=5000
```

Run backend:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Ideas

* POST /ideas → Create idea
* GET /ideas → Get all ideas
* GET /ideas/limit → Trending ideas
* GET /ideas/:id → Idea details
* PATCH /ideas/:id → Update idea
* DELETE /ideas/:id → Delete idea
* PATCH /ideas/:id/like → Like idea
* PATCH /ideas/:id/view → Increase views

### Comments

* POST /comments → Add comment
* GET /comments/:ideaId → Get comments
* PATCH /comments/:id → Update comment
* DELETE /comments/:id → Delete comment

---

## 📊 Data Models

### Idea

* title
* shortDescription
* detailedDescription
* image
* likes
* views
* userEmail
* createdAt

### Comment

* ideaId
* text
* userEmail
* createdAt

---

## ⚠️ Known Issues

* No strict authentication (JWT removed)
* Email-based identity can be spoofed
* No relational joins (manual enrichment needed)

---

## 🚀 Future Improvements

* Add secure authentication (NextAuth / JWT cookies)
* Normalize database schema
* Real-time comments (WebSockets)
* Pagination system
* Admin moderation dashboard

---

## 👨‍💻 Author

Built with 💡 by Arafatullah Arshad

---

## 📜 License

This project is licensed under the MIT License.

---

⭐ If you like this project, give it a star on GitHub!

```
```
