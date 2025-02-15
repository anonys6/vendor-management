/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const PERMISSION_KEYS = [
    'canManageVendors',
    'canManageDrivers',
    'canManageVehicles',
    'canProcessPayments',
] as const;

type PermissionKey = typeof PERMISSION_KEYS[number];

const defaultPermissions: Record<PermissionKey, boolean> = {
    canManageVendors: false,
    canManageDrivers: false,
    canManageVehicles: false,
    canProcessPayments: false,
};

const vendorSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    parentId: z.number(),
    permissions: z.object({
        canManageVendors: z.boolean(),
        canManageDrivers: z.boolean(),
        canManageVehicles: z.boolean(),
        canProcessPayments: z.boolean(),
    }),
});

type VendorFormData = z.infer<typeof vendorSchema>;

const Vendors: React.FC = () => {
    const { state, dispatch } = useApp();
    const form = useForm<VendorFormData>({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            parentId: state.currentUser ? state.currentUser.id : 0,
            permissions: defaultPermissions,
        },
    });

    const handleCreateVendor = (data: VendorFormData) => {
        dispatch({
            type: 'ADD_VENDOR',
            payload: {
                id: Date.now(),
                role: 'sub-vendor',
                parentId: state.currentUser ? state.currentUser.id : 0,
                hierarchyLevel: state.currentUser ? state.currentUser.hierarchyLevel + 1 : 1,
                name: data.name,
                email: data.email,
                permissions: data.permissions,
                documents: [],
                status: 'active',
                createdAt: new Date().toISOString(),
            },
        });
        form.reset();
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Manage Existing Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {state.vendors
                            .filter((v) => state.currentUser && v.parentId === state.currentUser.id)
                            .map((vendor) => (
                                <div
                                    key={vendor.id}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div>
                                        <h3 className="font-medium">{vendor.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {vendor.email} • {vendor.status}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm">
                                                    {vendor.status === 'active' ? 'Disable' : 'Enable'}
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Confirm{' '}
                                                        {vendor.status === 'active' ? 'Disable' : 'Enable'} Vendor
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action will{' '}
                                                        {vendor.status === 'active'
                                                            ? 'prevent this vendor from accessing the system'
                                                            : 'restore access for this vendor'}
                                                        .
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            dispatch({ type: 'TOGGLE_VENDOR_STATUS', payload: vendor.id })
                                                        }
                                                    >
                                                        Confirm
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>Create New Sub-Vendor</CardTitle>
                </CardHeader>
                <CardContent className='w-[800px] mx-auto'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateVendor)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vendor Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2">
                                <FormLabel>Permissions</FormLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    {PERMISSION_KEYS.map((permission) => (
                                        <FormField
                                            key={permission}
                                            control={form.control}
                                            name={`permissions.${permission}` as const}
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <input
                                                            type="checkbox"
                                                            checked={!!field.value}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                            className="form-checkbox"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {permission.replace(/^can/, '').replace(/([A-Z])/g, ' $1')}
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <Button type="submit">Create Vendor</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Vendors;
