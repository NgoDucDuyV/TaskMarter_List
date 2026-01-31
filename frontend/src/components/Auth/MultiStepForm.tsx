import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { StepOne } from '../steps/StepOne';
import { StepTwo } from '../steps/StepTwo';
import { StepThree } from '../steps/StepThree';
import { ProgressIndicator } from './ProgressIndicator';
import { Button } from '../ui/button';
import { Link, useNavigate } from "react-router-dom"
import { Toaster } from 'sonner';
import { useAuthStore } from '@/stores/useAuthStore';
export interface FormData {
  // Step 1
  username: string;
  email: string;
  // Step 2
  lastName: string,
  firstName: string,
  dateOfBirth:string,
  // Step 3
  password: string;
  confirmPassword: string;
}

const TOTAL_STEPS = 3;
export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',

    username: '',
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    
    password: '',
    confirmPassword: ''
  });
//Partial -> Utility Type
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const navigate = useNavigate()
  const { signUp } = useAuthStore()
  const handleSubmit = async () => {
    console.log('Form submitted:', formData);

    const { username, email, lastName, firstName, dateOfBirth, password } = formData;
    
    await signUp(username, email, lastName, firstName, dateOfBirth, password)
    
    navigate('/signin')
  };

  return (
    <>
    <Toaster richColors/>
    <div className="w-full ">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          {currentStep > 1 && (
            <Button
              onClick={prevStep}
              variant="ghost"
              size="icon"
              className="-ml-2"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="flex-1">
            <h1 className="text-3xl">Create your account</h1>
            <p className="text-gray-600 mt-1">
              Step {currentStep} of {TOTAL_STEPS}
            </p>
          </div>
        </div>
        
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && ( 
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepOne
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
            />
          </motion.div>
        )}
        
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepTwo
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
            />
          </motion.div>
        )}
        
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepThree
              formData={formData}
              updateFormData={updateFormData}
              onSubmit={handleSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to={'/signin'} className="text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
      </div>
    </div>
    </>
  );
}