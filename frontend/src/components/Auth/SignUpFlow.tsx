import { useEffect, useRef } from 'react';
import { ImageCarousel } from '@/components/Auth/ImageCarousel';
import { MultiStepForm } from './MultiStepForm';
import { Toaster, toast } from 'sonner';

export function SignUpFlow() {

  const shownRef = useRef(false);

  useEffect(() => {
  if (shownRef.current) return;

  toast.info("Nhập thông tin để đăng ký", {
  position: "top-right",
  className: "bg-indigo-400 text-white",
});


  shownRef.current = true;
}, []);
  return (
    <>
      <Toaster richColors />
      <div className="flex h-screen overflow-hidden">
        {/* Left Panel - Visual Storytelling */}
        <ImageCarousel valueAuthType="signup" />

        {/* Right Panel - Sign Up Form */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto bg-white animate-fade-in-left">
          <div className="w-full max-w-md">
            <MultiStepForm />
          </div>
        </div>
      </div>
    </>
  );
}
