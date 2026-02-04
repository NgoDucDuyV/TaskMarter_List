import React, { useEffect, useRef, useState } from 'react'
import { ImageCarousel } from '../../components/Auth/ImageCarousel'
import { Toaster, toast } from 'sonner'
import { SocialSignIn } from '../../components/SocialSignIn'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Mail } from 'lucide-react'
import { Input } from '../../components/ui/input'
import { useZodValidation } from '@/hooks/useZodValidation'
import { signin } from '@/schemas'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

export interface FormData {
    email: string;
    password: string;
}

interface TErrorStepOne {
    email?: string,
    password?: string,
}

export const SignInFlow = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    const shownRef = useRef(false);

    useEffect(() => {
        if (shownRef.current) return;

        toast.info("Nhập thông tin để đăng nhập", {
            position: "top-right",
            className: "bg-indigo-400 text-white",
        });
        
        shownRef.current = true;
    }, []);
    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const [error, setErrors] = useState<TErrorStepOne>({});
    const navigate = useNavigate();
    const validate = useZodValidation(signin);
    const { SignIn, isSign } = useAuthStore();
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        const { success, errors } = validate(formData);

        if (!success) {
            setErrors(errors); // errors.email, errors.username
            return;
        }

        const { email, password } = formData;
        await SignIn(email, password)
        
        if (isSign) return
        navigate("/")
    };
    return (
        <>
            <Toaster richColors />
            <div className="flex h-screen overflow-hidden ">
                {/* Left Panel - Visual Storytelling */}
                <ImageCarousel valueAuthType="signin" />
                {/* Right Panel - Sign Up Form */}
                <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto bg-white animate-fade-in-left">
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1">
                                    <h1 className="text-3xl">Create your account</h1>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-6">
                                <p className="text-gray-600">
                                    Let's start with your email address
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => {
                                                updateFormData({ email: e.target.value });
                                            }}
                                            className="pl-11"
                                            placeholder="ngoducduy"
                                            autoFocus
                                            aria-invalid={!!error.email}
                                        />
                                    </div>
                                    {error.email && (
                                        <p className="text-sm text-red-600">{error.email}</p>
                                    )}
                                </div>
                                {/* password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">password address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        <Input
                                            id="password"
                                            type="text"
                                            value={formData.password}
                                            onChange={(e) => {
                                                updateFormData({ password: e.target.value });
                                            }}
                                            className="pl-11"
                                            placeholder="you@example.com"
                                            autoFocus
                                            aria-invalid={!!error.email}
                                        />
                                    </div>
                                    {error.password && (
                                        <p className="text-sm text-red-600">{error.password}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    size="lg"
                                >
                                    Sign In
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
                        {/* Footer */}
                        <div className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to={'/signup'} className="text-blue-600 hover:text-blue-700">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInFlow
