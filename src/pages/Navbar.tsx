import React from 'react';
import { useApp } from '../contexts/AppContext';
import { ModeToggle } from '@/components/ModeToggle';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { state } = useApp();

    return (
        <header className="border-b flex justify-center">
            <div className="flex h-16 items-center px-6 w-[1280px]">
                <nav className="flex w-full">
                    <div className='flex items-center space-x-6 w-full'>
                        <NavLink to="/" className="font-medium">
                            Dashboard
                        </NavLink>
                        {state.currentUser?.permissions.canManageVendors && (
                            <NavLink to="/vendors" className="font-medium">
                                Vendors
                            </NavLink>
                        )}
                        {state.currentUser?.permissions.canManageVehicles && (
                            <NavLink to="/vehicles" className="font-medium">
                                Vehicles
                            </NavLink>
                        )}
                        {state.currentUser?.permissions.canManageDrivers && (
                            <NavLink to="/drivers" className="font-medium">
                                Drivers
                            </NavLink>
                        )}
                    </div>
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
