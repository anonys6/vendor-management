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

const vehicleSchema = z.object({
    registrationNumber: z.string().min(1, 'Registration number is required'),
    model: z.string().min(1, 'Model is required'),
    seatingCapacity: z.string().optional(),
    fuelType: z.string().optional(),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

export const Vehicles: React.FC = () => {
    const { state, dispatch } = useApp();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
    });

    const onSubmit = (data: VehicleFormData) => {
        dispatch({
            type: 'ADD_VEHICLE',
            payload: {
                id: Date.now(),
                ...data,
                status: 'active',
            },
        });
        reset();
        setOpen(false);
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Vehicles</CardTitle>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>Add Vehicle</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Add New Vehicle</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium">Registration Number</label>
                                    <Input {...register('registrationNumber')} />
                                    {errors.registrationNumber && (
                                        <p className="text-red-600 text-sm">{errors.registrationNumber.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Model</label>
                                    <Input {...register('model')} />
                                    {errors.model && (
                                        <p className="text-red-600 text-sm">{errors.model.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Seating Capacity</label>
                                    <Input {...register('seatingCapacity')} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Fuel Type</label>
                                    <Input {...register('fuelType')} />
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
                        {state.vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="p-4 border rounded">
                                <p>
                                    <strong>Reg:</strong> {vehicle.registrationNumber}
                                </p>
                                <p>
                                    <strong>Model:</strong> {vehicle.model}
                                </p>
                                <p>
                                    <strong>Status:</strong> {vehicle.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Vehicles;
