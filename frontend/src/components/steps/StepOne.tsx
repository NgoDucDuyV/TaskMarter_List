import { useState } from 'react';
import { Mail } from 'lucide-react';
import { type FormData } from '@/components/Auth/MultiStepForm';
import { SocialSignIn } from '../SocialSignIn';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { signupStepOne } from "../../schemas/auth/signup.schema";
import { useZodValidation } from '@/hooks/useZodValidation';

interface StepOneProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export interface TErrorStepOne {
  username?: string,
  email?: string,
}

export function StepOne({ formData, updateFormData, onNext }: StepOneProps) {
  const [error, setErrors] = useState<TErrorStepOne>({});

  const validate = useZodValidation(signupStepOne);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { success, errors } = validate(formData);

    if (!success) {
      setErrors(errors); // errors.email, errors.username
      return;
    }
    
    setErrors({});    
    onNext();
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Let's start with your email address
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* username */}
        <div className="space-y-2">
          <Label htmlFor="email">Username</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => {
                updateFormData({ username: e.target.value });
              }}
              className="pl-11"
              placeholder="ngoducduy"
              autoFocus
              aria-invalid={!!error.username}
            />
          </div>
          {error.username && (
            <p className="text-sm text-red-600">{error.username}</p>
          )}
        </div>
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Input
              id="email"
              type="text"
              value={formData.email}
              onChange={(e) => {
                updateFormData({ email: e.target.value });
              }}
              className="pl-11"
              placeholder="you@example.com"
              autoFocus
              aria-invalid={!!error.email}
            />
          </div>
          {error.email && (
            <p className="text-sm text-red-600">{error.email}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="lg"
        >
          Continue
        </Button>
      </form>

      <div className="my-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <SocialSignIn />
    </div>
  );
}