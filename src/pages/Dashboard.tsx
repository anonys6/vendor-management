import React from 'react';
import { useApp } from '../contexts/AppContext';
import { VendorTree } from '../components/VendorTree';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CarFront, PersonStanding, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { state } = useApp();
    const totalSubVendors = state.vendors.length > 0 ? state.vendors.length - 1 : 0;
    const totalDriverCount = state.drivers.length > 0 ? state.drivers.length : 0;
    const totalVehicleCount = state.vehicles.length > 0 ? state.vehicles.length : 0;

    return (
        <div className="p-6 grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Vendor Hierarchy</CardTitle>
                </CardHeader>
                <CardContent>
                    <VendorTree vendors={state.vendors} />
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Total Sub-vendors</CardTitle>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalSubVendors}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
                        <PersonStanding className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalDriverCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                        <CarFront className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalVehicleCount}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
