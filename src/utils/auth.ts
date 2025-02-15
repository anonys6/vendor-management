import { User } from '../types';

export const checkPermissions = (
    user: User,
    requiredPermissions: Record<string, boolean>
): boolean => {
    // If user is super-vendor, allow everything.
    if (user.role === 'super-vendor') return true;
    return Object.entries(requiredPermissions).every(
        ([key, value]) => user.permissions && user.permissions[key] === value
    );
};
