import { useState } from 'react';
import { User, UserCircle, Calendar } from 'lucide-react';
import { type FormData } from '@/components/Auth/MultiStepForm';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
  signupStepTowSchema
} from '@/schemas/auth/signup.schema';
import { useZodValidation } from '@/hooks/useZodValidation';
interface StepTwoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export interface TErrorStepTwo {
  lastName?: string;
  firstName?: string;
  dateOfBirth?:string,
} 
export function StepTwo({ formData, updateFormData, onNext }: StepTwoProps) {
  const [errors, setErrors] = useState<TErrorStepTwo>({});
  const validate = useZodValidation(signupStepTowSchema);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { success, errors } = validate(formData);
    if (!success) {
      console.log('====================================');
      console.log(success);
      console.log(errors);
      console.log('====================================');
      setErrors(errors)
      return
    }
    setErrors({});
    onNext();
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Tell us a bit about yourself
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* LastName */}
        <div className="space-y-2">
          <Label htmlFor="LastName">Last Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Input
              id="LastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => {
                updateFormData({ lastName: e.target.value });
                setErrors((prev) => ({ ...prev, lastName: undefined }));
              }}
              className="pl-11"
              placeholder="Ngô Đức"
              autoFocus
              aria-invalid={!!errors.lastName}
            />
          </div>
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        {/* FirstName */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => {
                updateFormData({ firstName: e.target.value });
                setErrors((prev) => ({ ...prev, firstName: undefined }));
              }}
              className="pl-11"
              placeholder="Duy"
              aria-invalid={!!errors.firstName}
            />
          </div>
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => {
                updateFormData({ dateOfBirth: e.target.value });
                setErrors((prev) => ({ ...prev, dateOfBirth: undefined }));
              }}
              className="pl-11"
              placeholder="0974179187"
              aria-invalid={!!errors.dateOfBirth}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-sm text-red-600">{errors.dateOfBirth}</p>
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
    </div>
  );
}