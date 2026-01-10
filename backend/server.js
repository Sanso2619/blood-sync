const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read data.json
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return default structure
    return {
      donors: [],
      hospitals: [],
      bloodBanks: [],
      drives: [],
      driveRegistrations: []
    };
  }
}

// Helper function to write data.json
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Helper function to fetch location from pincode
async function fetchLocationFromPincode(pincode) {
  return new Promise((resolve, reject) => {
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result && result[0] && result[0].Status === 'Success' && result[0].PostOffice && result[0].PostOffice.length > 0) {
            const postOffice = result[0].PostOffice[0];
            resolve({
              city: postOffice.District || postOffice.Name,
              state: postOffice.State,
              location: `${postOffice.Name}, ${postOffice.District}, ${postOffice.State}`
            });
          } else {
            resolve({
              city: 'Unknown',
              state: 'Unknown',
              location: `Pincode ${pincode}`
            });
          }
        } catch (error) {
          resolve({
            city: 'Unknown',
            state: 'Unknown',
            location: `Pincode ${pincode}`
          });
        }
      });
    }).on('error', (error) => {
      // If API fails, return default location
      resolve({
        city: 'Unknown',
        state: 'Unknown',
        location: `Pincode ${pincode}`
      });
    });
  });
}

// ==================== AUTHENTICATION ROUTES ====================

// Register Donor
app.post('/api/auth/register/donor', async (req, res) => {
  try {
    const { phone, pincode, password } = req.body;

    // Validation
    if (!phone || !pincode || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone, pincode, and password are required' 
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number must be 10 digits' 
      });
    }

    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Pincode must be 6 digits' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    const data = await readData();

    // Check if donor already exists
    const existingDonor = data.donors.find(d => d.phone === phone);
    if (existingDonor) {
      return res.status(400).json({ 
        success: false, 
        message: 'Donor with this phone number already exists' 
      });
    }

    // Fetch location from pincode
    const location = await fetchLocationFromPincode(pincode);

    // Create new donor
    const newDonor = {
      id: `donor-${Date.now()}`,
      phone,
      pincode,
      password, // Plain text for demo
      city: location.city,
      state: location.state,
      location: location.location,
      bloodGroup: null, // Can be set later
      createdAt: new Date().toISOString()
    };

    data.donors.push(newDonor);
    await writeData(data);

    res.json({
      success: true,
      message: 'Donor registered successfully',
      userId: newDonor.id
    });
  } catch (error) {
    console.error('Error registering donor:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Register Hospital
app.post('/api/auth/register/hospital', async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    // Validation
    if (!name || !email || !address || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, address, and password are required' 
      });
    }

    if (name.length < 3) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name must be at least 3 characters' 
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    if (address.length < 10) {
      return res.status(400).json({ 
        success: false, 
        message: 'Address must be at least 10 characters' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    const data = await readData();

    // Check if hospital already exists
    const existingHospital = data.hospitals.find(h => h.email === email);
    if (existingHospital) {
      return res.status(400).json({ 
        success: false, 
        message: 'Hospital with this email already exists' 
      });
    }

    // Create new hospital
    const newHospital = {
      id: `hosp-${Date.now()}`,
      name,
      email,
      address,
      password, // Plain text for demo
      createdAt: new Date().toISOString()
    };

    data.hospitals.push(newHospital);
    await writeData(data);

    res.json({
      success: true,
      message: 'Hospital registered successfully',
      hospitalId: newHospital.id
    });
  } catch (error) {
    console.error('Error registering hospital:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Register Blood Bank
app.post('/api/auth/register/blood-bank', async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    // Validation
    if (!name || !email || !address || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, address, and password are required' 
      });
    }

    if (name.length < 3) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name must be at least 3 characters' 
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    if (address.length < 10) {
      return res.status(400).json({ 
        success: false, 
        message: 'Address must be at least 10 characters' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    const data = await readData();

    // Check if blood bank already exists
    const existingBloodBank = data.bloodBanks.find(b => b.email === email);
    if (existingBloodBank) {
      return res.status(400).json({ 
        success: false, 
        message: 'Blood bank with this email already exists' 
      });
    }

    // Create new blood bank
    const newBloodBank = {
      id: `bb-${Date.now()}`,
      name,
      email,
      address,
      password, // Plain text for demo
      createdAt: new Date().toISOString()
    };

    data.bloodBanks.push(newBloodBank);
    await writeData(data);

    res.json({
      success: true,
      message: 'Blood bank registered successfully',
      bloodBankId: newBloodBank.id
    });
  } catch (error) {
    console.error('Error registering blood bank:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { role, identifier, password } = req.body;

    if (!role || !identifier || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Role, identifier, and password are required' 
      });
    }

    const data = await readData();
    let user = null;

    // Find user based on role
    if (role === 'donor') {
      user = data.donors.find(d => d.phone === identifier);
    } else if (role === 'hospital') {
      // Hospital can login with email or ID
      user = data.hospitals.find(h => h.email === identifier || h.id === identifier);
    } else if (role === 'blood-bank') {
      // Blood bank can login with email or ID
      user = data.bloodBanks.find(b => b.email === identifier || b.id === identifier);
    }

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      role
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// ==================== DONATION DRIVE ROUTES ====================

// Create Donation Drive (Blood Bank only)
app.post('/api/blood-bank/drives', async (req, res) => {
  try {
    const { bloodBankId, title, date, location, time } = req.body;

    if (!bloodBankId || !title || !date) {
      return res.status(400).json({ 
        success: false, 
        message: 'Blood bank ID, title, and date are required' 
      });
    }

    const data = await readData();

    // Verify blood bank exists
    const bloodBank = data.bloodBanks.find(b => b.id === bloodBankId);
    if (!bloodBank) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blood bank not found' 
      });
    }

    // Create new drive
    const newDrive = {
      id: `drive-${Date.now()}`,
      title,
      date,
      location: location || bloodBank.address,
      time: time || '9:00 AM - 5:00 PM',
      organizer: bloodBank.name,
      organizerId: bloodBankId,
      status: 'upcoming',
      registrations: 0,
      maxCapacity: 100,
      createdAt: new Date().toISOString()
    };

    data.drives.push(newDrive);
    await writeData(data);

    res.json({
      success: true,
      message: 'Drive created successfully',
      driveId: newDrive.id,
      drive: newDrive
    });
  } catch (error) {
    console.error('Error creating drive:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Get Upcoming Drives
app.get('/api/drives/upcoming', async (req, res) => {
  try {
    const data = await readData();
    
    // Filter upcoming drives (date >= today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingDrives = data.drives
      .filter(drive => {
        const driveDate = new Date(drive.date);
        driveDate.setHours(0, 0, 0, 0);
        return driveDate >= today && drive.status === 'upcoming';
      })
      .map(drive => {
        // Count registrations for this drive
        const registrations = data.driveRegistrations.filter(
          reg => reg.driveId === drive.id
        ).length;
        
        return {
          ...drive,
          registrations
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      success: true,
      drives: upcomingDrives
    });
  } catch (error) {
    console.error('Error fetching upcoming drives:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Register for Drive
app.post('/api/drives/:id/register', async (req, res) => {
  try {
    const driveId = req.params.id;
    const { donorId } = req.body;

    if (!donorId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Donor ID is required' 
      });
    }

    const data = await readData();

    // Verify drive exists
    const drive = data.drives.find(d => d.id === driveId);
    if (!drive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Drive not found' 
      });
    }

    // Verify donor exists
    const donor = data.donors.find(d => d.id === donorId);
    if (!donor) {
      return res.status(404).json({ 
        success: false, 
        message: 'Donor not found' 
      });
    }

    // Check if already registered
    const existingRegistration = data.driveRegistrations.find(
      reg => reg.driveId === driveId && reg.donorId === donorId
    );
    
    if (existingRegistration) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already registered for this drive' 
      });
    }

    // Create registration
    const registration = {
      id: `reg-${Date.now()}`,
      driveId,
      donorId,
      registeredAt: new Date().toISOString()
    };

    data.driveRegistrations.push(registration);
    await writeData(data);

    // Update drive registration count
    const registrations = data.driveRegistrations.filter(
      reg => reg.driveId === driveId
    ).length;

    res.json({
      success: true,
      message: 'Successfully registered for drive',
      registrationId: registration.id,
      registrations
    });
  } catch (error) {
    console.error('Error registering for drive:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`BloodSync Backend running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
