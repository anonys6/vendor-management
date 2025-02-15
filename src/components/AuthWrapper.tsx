import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { checkPermissions } from '../utils/auth';

interface AuthWrapperProps {
    children: React.ReactNode;
    requiredRole?: string;
    requiredPermissions?: Record<string, boolean>;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, requiredRole, requiredPermissions }) => {
    const { state } = useApp();
    const currentUser = state.currentUser;

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && currentUser.role !== requiredRole) {
        return <Navigate to="/login" />;
    }

    if (requiredPermissions && !checkPermissions(currentUser, requiredPermissions)) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-600">Unauthorized Access: Insufficient permissions.</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthWrapper;
