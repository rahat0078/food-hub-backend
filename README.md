# 🍱 FoodHub Backend API

FoodHub is a **RESTful backend service** for a meal ordering platform where customers can browse meals, place orders, and track delivery status while providers manage menus and orders.

This backend is built using **Node.js, Express, PostgreSQL, Prisma ORM, and Better Auth** .

---

## 📌 Project Overview

FoodHub supports three main user roles:

#### 👤 Customer

Customers can:

* Browse meals
* Filter meals by category
* Place orders
* Track order status
* Leave reviews

#### 🍳 Provider

Providers (restaurants/vendors) can:

* Add and manage meals
* View incoming orders
* Update order status

#### 🛠 Admin

Admins manage the platform by:

* Managing users
* Managing food categories
* Viewing platform statistics

---

## 🛠 Tech Stack

| Technology                  | Purpose               |
| --------------------------- | --------------------- |
| **Node.js**                 | Backend runtime       |
| **Express.js**              | REST API framework    |
| **PostgreSQL**              | Relational database   |
| **Prisma ORM**              | Database ORM          |
| **Better Auth**             | Authentication system |
| **TypeScript** | Backend language      |

---

## Architecture

This project follows a **Modular Architecture Pattern**, where each feature is separated into its own module containing controllers, services, and routes.

Benefits:

* Better scalability
* Easier maintenance
* Clear separation of concerns
* Feature-based organization


## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```
DATABASE_URL="postgresql://user:pass@localhost:5432/food-hub?schema=public"
PORT=5000
BETTER_AUTH_SECRET=betterauthSecret
BETTER_AUTH_URL=http://localhost:4000
APP_URL=frontend_url  
APP_USER=user_email
APP_PASS=app_pass
ADMIN_EMAIL=admin@foodhub.com
ADMIN_PASSWORD=12345678
```

---

## 🚀 Installation

#### Clone Repository

```
git clone https://github.com/your-username/foodhub-backend.git
cd foodhub-backend
```

#### Install Dependencies

```
npm install
```

#### Setup Database

Run migrations:

```
npx prisma migrate dev
```

Generate Prisma client:

```
npx prisma generate
```

---

## ▶ Run Server

Development mode:

```
npm run dev
```

Production:

```
npm start
```

Server runs at:

```
http://localhost:5000
```

---

## 🔐 Authentication

Authentication is handled using **Better Auth**.

```
app.all("/api/auth/*splat", toNodeHandler(auth));
```

This manages:

* User registration
* Login
* Logout
* Session management

---

## 📡 API Endpoints

### Provider Routes

Base Route:

```
/api/providers
```

| Method | Endpoint      | Description                   |
| ------ | ------------- | ----------------------------- |
| GET    | `/`           | Get all providers             |
| GET    | `/:id`        | Get provider details          |
| GET    | `/meals`      | Get meals created by provider |
| POST   | `/meals`      | Create meal                   |
| PUT    | `/meals/:id`  | Update meal                   |
| DELETE | `/meals/:id`  | Delete meal                   |
| PATCH  | `/orders/:id` | Update order status           |

Protected routes require:

```
auth(UserRole.PROVIDER)
```

---

### 🍽 Meals Routes

Base Route:

```
/api/meals
```

| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| GET    | `/`         | Get all meals      |
| GET    | `/category` | Get all categories |
| GET    | `/:id`      | Get meal details   |
| POST   | `/reviews`  | Create review      |

Creating reviews requires authentication.

```
auth()
```

---

### 📦 Orders Routes

Base Route:

```
/api/orders
```

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| POST   | `/`      | Create new order  |
| GET    | `/`      | Get user orders   |
| GET    | `/:id`   | Get order details |

All order routes require authentication.

---

### 🛠 Admin Routes

Base Route:

```
/api/admin
```

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| POST   | `/category`     | Create category    |
| DELETE | `/category/:id` | Delete category    |
| GET    | `/users`        | Get all users      |
| PATCH  | `/users/:id`    | Update user status |

Admin routes require:

```
auth(UserRole.ADMIN)
```

---

### 📊 Stats Routes

Base Route:

```
/api/stats
```

| Method | Endpoint | Description                |
| ------ | -------- | -------------------------- |
| GET    | `/`      | Public statistics          |
| GET    | `/admin` | Admin dashboard statistics |

Admin statistics require admin authentication.

---

### 👑 Default Admin Credentials

The application seeds a default admin account.

```
Email: admin@foodhub.com
Password: 12345678
```



## 🧪 API Testing

Recommended tools:

* Postman

---

### 📄 License

This project was developed for learning purposes.
