import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { state, dispatch } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("********");
    const navigate = useNavigate();


    const handleLogin = () => {
        const vendor = state.vendors.find((v) => v.email === email);
        if (vendor) {
            dispatch({ type: 'SET_USER', payload: vendor });
            navigate('/');
        } else {
            alert('Vendor not found. Please use a valid email.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Vendor Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            placeholder="Enter vendor email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Enter vendor password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button className="w-full" onClick={handleLogin}>
                            Sign In
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
