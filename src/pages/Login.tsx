import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const { state, dispatch } = useApp();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const navigate = useNavigate();


    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        const { email } = data;
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const vendor = state.vendors.find((v) => v.email === email);
        if (vendor) {
            dispatch({ type: 'SET_USER', payload: vendor });
            navigate('/');
        } else {
            alert('Vendor not found. Please use a valid email.');
        }

        reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Vendor Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input
                                {...register('email')}
                                placeholder="Enter vendor email"
                                defaultValue="global@fleet.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs text-left m-2">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Input
                                {...register('password')}
                                placeholder="Enter vendor password"
                                defaultValue="********"
                            />
                            {errors.password && <p className="text-red-500 text-xs text-left m-2">{errors.password.message}</p>}
                        </div>
                        <Button className="w-full">
                            {isSubmitting ? 'Loading...' : 'Login'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
