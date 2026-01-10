# BloodSync Backend Setup Guide

## Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Start Backend Server

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Start Frontend (in a separate terminal)

From the root directory:
```bash
npm run dev
```

## Features Implemented

### ✅ Authentication
- **Donor Registration**: Phone, pincode, password → Fetches location from pincode API
- **Hospital Registration**: Name, email, address, password
- **Blood Bank Registration**: Name, email, address, password
- **Login**: Validates credentials, fails if password is wrong

### ✅ Donation Drives
- **Create Drive**: Blood banks can create drives with name, date, location, time
- **List Upcoming Drives**: All users can see upcoming drives
- **Register for Drive**: Donors can register after eligibility check

### ✅ Data Sync
- All data stored in `backend/data.json`
- Real-time updates when drives are created or registrations are made
- Registration counts update automatically

## Testing Flow

1. **Register a Donor**:
   - Phone: `9876543210`
   - Pincode: `110021` (will fetch Delhi location)
   - Password: `password123`

2. **Register a Hospital**:
   - Name: `City Hospital`
   - Email: `hospital@example.com`
   - Address: `123 Hospital St, Sector 21, Delhi`
   - Password: `password123`

3. **Register a Blood Bank**:
   - Name: `City Blood Bank`
   - Email: `bloodbank@example.com`
   - Address: `456 Blood St, Sector 21, Delhi`
   - Password: `password123`

4. **Login** with any registered user

5. **Blood Bank**: Create a donation drive

6. **Donor**: View drives, complete eligibility check, register for drive

7. **Blood Bank**: See updated registration count

## API Endpoints

All endpoints are prefixed with `http://localhost:5000/api`

- `POST /auth/register/donor`
- `POST /auth/register/hospital`
- `POST /auth/register/blood-bank`
- `POST /auth/login`
- `POST /blood-bank/drives`
- `GET /drives/upcoming`
- `POST /drives/:id/register`

## Notes

- Passwords stored as plain text (demo only)
- No JWT tokens (uses localStorage in frontend)
- Pincode API: https://api.postalpincode.in/pincode/{pincode}
- Data persists in `backend/data.json`

## Troubleshooting

- **CORS errors**: Backend has CORS enabled, should work automatically
- **Connection refused**: Make sure backend is running on port 5000
- **Pincode lookup fails**: Falls back to "Unknown" location if API is unavailable
