import { useState } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface DriveEligibilityCheckProps {
  isOpen: boolean;
  onClose: () => void;
  onEligible: () => void;
}

export function DriveEligibilityCheck({ isOpen, onClose, onEligible }: DriveEligibilityCheckProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    alcohol: '',
    piercing: '',
    bloodDonation: '',
    plateletDonation: '',
    pregnant: '',
    breastfeeding: '',
  });

  const questions = [
    {
      id: 'age',
      label: 'What is your age?',
      type: 'number',
      placeholder: 'Enter your age',
      validate: (value: string) => {
        const age = parseInt(value);
        return age >= 18 && age <= 65;
      },
      errorMessage: 'You must be between 18 and 65 years old to donate',
    },
    {
      id: 'weight',
      label: 'What is your weight (in kg)?',
      type: 'number',
      placeholder: 'Enter your weight in kg',
      validate: (value: string) => {
        const weight = parseFloat(value);
        return weight > 50;
      },
      errorMessage: 'You must weigh more than 50 kg to donate',
    },
    {
      id: 'alcohol',
      label: 'Have you consumed alcohol in the last 24 hours?',
      type: 'radio',
      options: ['Yes', 'No'],
      validate: (value: string) => value === 'No',
      errorMessage: 'You cannot donate if you have consumed alcohol in the last 24 hours',
    },
    {
      id: 'piercing',
      label: 'Have you gotten a piercing or tattoo in the last 12 months?',
      type: 'radio',
      options: ['Yes', 'No'],
      validate: (value: string) => value === 'No',
      errorMessage: 'You cannot donate if you have gotten a piercing or tattoo in the last 12 months',
    },
    {
      id: 'bloodDonation',
      label: 'Have you donated blood in the last 3 months?',
      type: 'radio',
      options: ['Yes', 'No'],
      validate: (value: string) => value === 'No',
      errorMessage: 'You cannot donate if you have donated blood in the last 3 months',
    },
    {
      id: 'plateletDonation',
      label: 'Have you donated platelets in the last 7 days?',
      type: 'radio',
      options: ['Yes', 'No'],
      validate: (value: string) => value === 'No',
      errorMessage: 'You cannot donate if you have donated platelets in the last 7 days',
    },
    {
      id: 'pregnant',
      label: 'Are you currently pregnant or have you been pregnant in the last 6 months?',
      type: 'radio',
      options: ['Yes', 'No'],
      validate: (value: string) => value === 'No',
      errorMessage: 'You cannot donate if you are currently pregnant or have been pregnant in the last 6 months',
    },
    {
      id: 'breastfeeding',
      label: 'Are you currently breastfeeding?',
      type: 'radio',
      options: ['Yes', 'No'],
      validate: (value: string) => value === 'No',
      errorMessage: 'You cannot donate if you are currently breastfeeding',
    },
  ];

  const handleInputChange = (value: string) => {
    const question = questions[currentStep];
    setFormData({ ...formData, [question.id]: value });
  };

  const handleNext = () => {
    const question = questions[currentStep];
    const value = formData[question.id as keyof typeof formData];
    
    if (!value) return;

    const isValid = question.validate(value);

    if (!isValid) {
      setIsEligible(false);
      return;
    }

    // If this is the last question and it passed, mark as eligible
    if (currentStep === questions.length - 1) {
      setIsEligible(true);
      setTimeout(() => {
        onEligible();
        handleClose();
      }, 2000);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    setIsEligible(null);
    setFormData({
      age: '',
      weight: '',
      alcohol: '',
      piercing: '',
      bloodDonation: '',
      plateletDonation: '',
      pregnant: '',
      breastfeeding: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  const currentQuestion = questions[currentStep];
  const currentValue = formData[currentQuestion?.id as keyof typeof formData];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#171717] border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-white">Blood Drive Eligibility Check</h2>
            <p className="text-[#a3a3a3] text-sm mt-1">
              Please answer the following questions to verify your eligibility
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#a3a3a3] text-sm">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-[#a3a3a3] text-sm">
              {Math.round(((currentStep + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-[#dc2626] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isEligible === false ? (
            // Not Eligible State
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900/30 border border-red-700 rounded-full mb-4">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-white text-2xl mb-3">Not Eligible</h3>
              <p className="text-red-400 mb-2">{currentQuestion.errorMessage}</p>
              <p className="text-[#a3a3a3] text-sm max-w-md mx-auto">
                Unfortunately, you do not meet the eligibility requirements at this time. 
                Please wait until you meet all the criteria before registering for a blood drive.
              </p>
              <button
                onClick={handleClose}
                className="mt-8 bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : isEligible === true ? (
            // Eligible State
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/30 border border-green-700 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-white text-2xl mb-3">You are Eligible</h3>
              <p className="text-green-400 mb-2">Congratulations! You meet all the requirements.</p>
              <p className="text-[#a3a3a3] text-sm max-w-md mx-auto">
                You can now participate in blood donation drives. Redirecting you back to the dashboard...
              </p>
            </div>
          ) : (
            // Question Form
            <div className="space-y-6">
              <div>
                <label className="text-white block mb-4">{currentQuestion.label}</label>
                
                {currentQuestion.type === 'number' ? (
                  <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#dc2626] transition-colors"
                  />
                ) : (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <label
                        key={option}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          currentValue === option
                            ? 'bg-[#dc2626]/10 border-[#dc2626]'
                            : 'bg-[#0e0e10] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option}
                          checked={currentValue === option}
                          onChange={(e) => handleInputChange(e.target.value)}
                          className="w-4 h-4 accent-[#dc2626]"
                        />
                        <span className="text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!currentValue}
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] disabled:bg-white/10 disabled:text-white/40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
              >
                {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}