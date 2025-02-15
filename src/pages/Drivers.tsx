import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../components/ui/input';

const driverSchema = z.object({
    name: z.string().min(1, 'Driver name is required'),
    licenseNumber: z.string().min(1, 'License number is required'),
    licenseExpiry: z.string().optional(),
});

type DriverFormData = z.infer<typeof driverSchema>;

export const Drivers: React.FC = () => {
    const { state, dispatch } = useApp();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DriverFormData>({
        resolver: zodResolver(driverSchema),
    });

    const onSubmit = (data: DriverFormData) => {
        dispatch({
            type: 'ADD_DRIVER',
            payload: {
                id: Date.now(),
                name: data.name,
                licenseNumber: data.licenseNumber,
                licenseExpiry: data.licenseExpiry,
                status: 'active',
                documents: [],
                assignedVendor: state.currentUser ? state.currentUser.id : null,
            },
        });
        reset();
        setOpen(false);
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Drivers</CardTitle>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>Add Driver</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Add New Driver</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium">Name</label>
                                    <Input {...register('name')} />
                                    {errors.name && (
                                        <p className="text-red-600 text-sm">{errors.name.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">License Number</label>
                                    <Input {...register('licenseNumber')} />
                                    {errors.licenseNumber && (
                                        <p className="text-red-600 text-sm">{errors.licenseNumber.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">License Expiry</label>
                                    <Input type="date" {...register('licenseExpiry')} />
                                </div>
                                <div className="flex justify-end mt-6">
                                    <Button variant="outline" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="ml-2">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 grid-cols-2">
                        {state.drivers.map((driver) => (
                            <div key={driver.id} className="p-4 border rounded">
                                <p>
                                    <strong>Name:</strong> {driver.name}
                                </p>
                                <p>
                                    <strong>License:</strong> {driver.licenseNumber}
                                </p>
                                <p>
                                    <strong>Status:</strong> {driver.status}
                                </p>
                                <p>
                                    <strong>Vendor:</strong> {driver.assignedVendor}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Drivers;
