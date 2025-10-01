# Ride Booking API

## 📌 Project Overview
The **Ride Booking API** provides a backend service for managing a ride-sharing platform. It supports **drivers**, **riders**, **trips**, **locations**, and **admin operations**. The API enables functionalities such as driver/rider registration and login, trip requests and management, availability tracking, earnings history, and administrative oversight for user management.

---

## ⚙️ Setup & Environment Instructions

### Prerequisites
- **Node.js** (>= 16.x recommended)  
- **MongoDB** (local or cloud instance)  
- **npm** or **yarn** package manager  

### Environment Variables
Create a `.env` file at the root of the project with the following keys:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/ride-booking
JWT_SECRET=your-secret-key
```

### Installation & Running
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build and run in production
npm run build && npm start
```

The API will be available at:  
```
http://localhost:5000/api/v1
```

---

## 📖 API Endpoints Summary

### 🚖 Driver Endpoints

#### Register Driver
```http
POST /driver/register
```
**Request Body**
```json
{
  "name": "Driver 002",
  "email": "driver_002@example.com",
  "password": "Qazwsx@321",
  "drivingLicense": "DL-2025-123456",
  "vehicleInfo": {
    "type": "CAR",
    "numberPlate": "DHA-15-1234"
  }
}
```
**Response**
```json
{
  "success": true,
  "message": "Driver registered successfully",
  "data": {
    "id": "68da4b6e067e960a5209dece",
    "name": "Driver 002",
    "email": "driver_002@example.com"
  }
}
```

#### Login Driver
```http
POST /driver/login
```
**Request Body**
```json
{
  "email": "driver_001@example.com",
  "password": "Qazwsx@321"
}
```
**Response**
```json
{
  "token": "jwt-token-here",
  "driver": {
    "id": "68da4ff83cc023c47b7dad6a",
    "name": "Driver 001"
  }
}
```

#### Update Availability
```http
POST /driver/availability
Authorization: Bearer <jwt-token>
```
**Request Body**
```json
{ "status": "ONLINE" }
```
**Response**
```json
{
  "success": true,
  "message": "Driver status updated to ONLINE"
}
```

#### Earnings History
```http
GET /driver/earnings/history
Authorization: Bearer <jwt-token>
```
**Response**
```json
{
  "earnings": [
    { "tripId": "abc123", "amount": 250, "date": "2025-09-30" }
  ]
}
```

---

### 🧑‍🤝‍🧑 Rider Endpoints

#### Register Rider
```http
POST /rider/register
```
**Request Body**
```json
{
  "name": "Rider 002",
  "email": "rider_002@example.com",
  "password": "Qazwsx@321"
}
```
**Response**
```json
{
  "success": true,
  "message": "Rider registered successfully"
}
```

#### Rider Login
```http
POST /rider/login
```
**Request Body**
```json
{
  "email": "rider_001@example.com",
  "password": "Qazwsx@321"
}
```

#### Rider History
```http
GET /rider/history
Authorization: Bearer <jwt-token>
```

---

### 🚘 Trip Endpoints

#### Request Trip
```http
POST /trip/request
Authorization: Bearer <jwt-rider-token>
```
**Request Body**
```json
{
  "pickup": "Gulshan",
  "destination": "Mirpur"
}
```
**Response**
```json
{
  "tripId": "68da4ff83cc023c47b7dad6a",
  "status": "REQUESTED",
  "pickup": "Gulshan",
  "destination": "Mirpur"
}
```

#### Accept Trip
```http
POST /trip/:tripId/accept
Authorization: Bearer <jwt-driver-token>
```

#### Start Trip
```http
POST /trip/:tripId/start
Authorization: Bearer <jwt-driver-token>
```

#### Complete Trip
```http
POST /trip/:tripId/complete
Authorization: Bearer <jwt-driver-token>
```

#### Cancel Trip
```http
POST /trip/:tripId/cancel
Authorization: Bearer <jwt-driver-token>
```

---

### 🌍 Location Endpoints

#### Seed Locations
```http
POST /location/seed
```
**Response**
```json
{ "success": true, "message": "Locations seeded" }
```

---

### 👨‍💼 Admin Endpoints

#### Admin Login
```http
POST /admin/login
```
**Request Body**
```json
{
  "email": "super@gmail.com",
  "password": "Admin@123"
}
```

#### Get Drivers
```http
GET /admin/drivers
Authorization: Bearer <jwt-super-token>
```

#### Approve Driver
```http
PATCH /admin/drivers/:id/approve
Authorization: Bearer <jwt-super-token>
```

#### Block User
```http
PATCH /admin/users/:id/block
Authorization: Bearer <jwt-super-token>
```
**Request Body**
```json
{ "role": "RIDER" }
```

---

## 🔑 Authentication
- Most endpoints require **JWT Bearer Token** authentication.  
- Include in headers:  
```http
Authorization: Bearer <jwt-token>
```

---

## 📂 Postman Collection
You can import the provided Postman collection (`ph2-a5.postman_collection.json`) into [Postman](https://drive.google.com/file/d/1eDyw33Fif7XxYPC4WiVnn-2Hf21ywod0/view?usp=sharing) to test all endpoints.