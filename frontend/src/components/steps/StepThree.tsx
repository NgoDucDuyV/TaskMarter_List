import { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';
import { type FormData } from '@/components/Auth/MultiStepForm';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useZodValidation } from '@/hooks/useZodValidation';
import { signupStepThree } from '@/schemas';
interface StepThreeProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onSubmit: () => void;
}
export interface SignupStepThreeProps {
  password?: string;
  confirmPassword?: string
}
export function StepThree({ formData, updateFormData, onSubmit }: StepThreeProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setErrors] = useState<SignupStepThreeProps>({});

  const passwordRequirements = [
    { label: 'Mật khẩu phải có ít nhất 8 ký tự', test: (pw: string) => pw.length >= 8 },
    { label: 'Mật khẩu phải chứa ít nhất một chữ số', test: (pw: string) => /\d/.test(pw) },
    { label: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa', test: (pw: string) => /[A-Z]/.test(pw) },
    { label: 'Mật khẩu phải chứa ít nhất một chữ cái thường', test: (pw: string) => /[a-z]/.test(pw) },
    { label: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt', test: (pw: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw) },
  ];

  const validate = useZodValidation(signupStepThree)

  const { success, errors } = validate(formData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!success) {
      setErrors({...errors});
      return
    } 

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu của bạn.';
      setErrors(errors);
      return
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu không khớp';
      setErrors(errors);
      return
    }

    console.log(errors);
    
    setErrors({});
    onSubmit();
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Create a secure password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => {
                updateFormData({ password: e.target.value });
                setErrors(prev => ({ ...prev, password: undefined }));
              }}
              className="pl-11 pr-12"
              placeholder="Enter your password"
              autoFocus
              aria-invalid={!!error.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {error.password && (
            <p className="text-sm text-red-600">{error.password}</p>
          )}
          
          {/* Password Requirements */}
          <div className="mt-3 space-y-2">
            {passwordRequirements.map((req, index) => {
              const isMet = formData.password && req.test(formData.password);
              return (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {isMet ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                  <span className={isMet ? 'text-green-600' : 'text-gray-500'}>
                    {req.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => {
                updateFormData({ confirmPassword: e.target.value });
                setErrors(prev => ({ ...prev, confirmPassword: undefined }));
              }}
              className="pl-11 pr-12"
              placeholder="Confirm your password"
              aria-invalid={!!error.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {error.confirmPassword && (
            <p className="text-sm text-red-600">{error.confirmPassword}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="lg"
        >
          Create Account
        </Button>
      </form>

      <p className="mt-4 text-xs text-gray-500 text-center">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
}