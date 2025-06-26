# 🟢 Sprint 1: Authentication Setup (Backend)

## 🎯 Goal:
Implement secure user authentication with register and login endpoints.

## 🧑‍💻 User Story:
"As a user, I want to register and log in securely so I can access my inventory."

---

## ✅ Tasks:

### 1. Create User Model
- Fields: name, email, password
- Hash password before saving using bcrypt

### 2. Create Auth Routes
- **POST /api/auth/register** - Register new user
- **POST /api/auth/login** - Login and receive JWT

### 3. Generate JWT Token
- Use `jsonwebtoken`
- Sign token with user ID and secret key

### 4. Middleware
- Create `authMiddleware.js` to protect routes by verifying JWT

### 5. Test
- Use Postman to test register and login routes
- Confirm JWT is returned and can be verified

---

## 🛠 Dependencies Needed:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- nodemon (dev)

---

## 🔚 Deliverables:
- User model with hashed password
- Working auth routes (register, login)
- JWT token on successful login
- Auth middleware for route protection

---

## ⏭ Next Sprint:
- Materials CRUD
- User Story: "As a user, I want to manage materials so I can keep track of inventory items."
