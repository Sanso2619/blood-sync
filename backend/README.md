# BloodSync Backend

Demo-ready backend for BloodSync blood donation management system.

## Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register/donor` - Register a new donor
  - Body: `{ phone, pincode, password }`
  
- `POST /api/auth/register/hospital` - Register a new hospital
  - Body: `{ name, email, address, password }`
  
- `POST /api/auth/register/blood-bank` - Register a new blood bank
  - Body: `{ name, email, address, password }`
  
- `POST /api/auth/login` - Login
  - Body: `{ role, identifier, password }`
  - Role: `'donor'`, `'hospital'`, or `'blood-bank'`
  - Identifier: phone (for donor) or email/ID (for hospital/blood-bank)

### Donation Drives

- `POST /api/blood-bank/drives` - Create a new drive
  - Body: `{ bloodBankId, title, date, location?, time? }`
  
- `GET /api/drives/upcoming` - Get all upcoming drives
  
- `POST /api/drives/:id/register` - Register for a drive
  - Body: `{ donorId }`

## Data Storage

All data is stored in `data.json` in the backend directory. The file structure is:

```json
{
  "donors": [],
  "hospitals": [],
  "bloodBanks": [],
  "drives": [],
  "driveRegistrations": []
}
```

## Notes

- Passwords are stored as plain text (acceptable for demo only)
- No JWT authentication (session-based using localStorage in frontend)
- Pincode lookup uses https://api.postalpincode.in/pincode/{pincode}
- All data persists in data.json file

## Testing

1. Start the backend server
2. Start the frontend (from root directory: `npm run dev`)
3. Register users for each role
4. Login and test the features
