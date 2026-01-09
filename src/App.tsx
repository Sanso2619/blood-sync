import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { DonorRegister } from './components/DonorRegister';
import { HospitalRegister } from './components/HospitalRegister';
import { BloodBankRegister } from './components/BloodBankRegister';

export type UserRole = 'donor' | 'blood-bank' | 'hospital' | null;

export default function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setIsLoggedIn(false);
    setIsRegistering(false);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setIsLoggedIn(false);
    setIsRegistering(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setSelectedRole(null);
    setIsLoggedIn(false);
    setIsRegistering(false);
  };

  const handleShowRegister = () => {
    setIsRegistering(true);
  };

  const handleRegisterBack = () => {
    setIsRegistering(false);
  };

  // Show Dashboard if logged in
  if (isLoggedIn && selectedRole) {
    return <Dashboard role={selectedRole} onLogout={handleLogout} />;
  }

  // Show Register Screen if registering
  if (selectedRole && isRegistering) {
    const commonProps = {
      onBack: handleRegisterBack,
      onRegisterSuccess: handleRegisterBack,
    };

    if (selectedRole === 'donor') {
      return <DonorRegister {...commonProps} />;
    }
    if (selectedRole === 'hospital') {
      return <HospitalRegister {...commonProps} />;
    }
    if (selectedRole === 'blood-bank') {
      return <BloodBankRegister {...commonProps} />;
    }
  }

  // Show Login Screen if role selected but not logged in
  if (selectedRole && !isLoggedIn) {
    return (
      <LoginScreen 
        role={selectedRole} 
        onBack={handleBack}
        onLoginSuccess={handleLoginSuccess}
        onShowRegister={handleShowRegister}
      />
    );
  }

  // Show Landing Page by default
  return <LandingPage onRoleSelect={handleRoleSelect} />;
}