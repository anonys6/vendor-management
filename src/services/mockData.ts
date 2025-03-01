import { AppState } from '../types';

export const initialData: AppState = {
    isLoading: false,
    currentUser: null,
    vendors: [
        {
            id: 1,
            name: 'Global Fleet',
            email: 'global@fleet.com',
            role: 'super-vendor',
            parentId: null,
            permissions: {
                manageAll: true,
                canManageVendors: true,
                canManageVehicles: true,
                canManageDrivers: true,
                canProcessPayments: true,
            },
            hierarchyLevel: 1,
            documents: [],
            status: 'active',
            createdAt: new Date().toISOString(),
        },
        {
            id: 2,
            name: 'Regional East',
            email: 'east@fleet.com',
            role: 'sub-vendor',
            parentId: 1,
            permissions: {
                canManageVendors: false,
                canManageVehicles: true,
                canManageDrivers: true,
                canProcessPayments: false,
            },
            hierarchyLevel: 2,
            documents: [],
            status: 'active',
            createdAt: new Date().toISOString(),
        },
        {
            id: 3,
            name: 'City Vendor A',
            email: 'cityA@fleet.com',
            role: 'sub-vendor',
            parentId: 2,
            permissions: {
                canManageVendors: false,
                canManageVehicles: true,
                canManageDrivers: true,
                canProcessPayments: false,
            },
            hierarchyLevel: 3,
            documents: [],
            status: 'active',
            createdAt: new Date().toISOString(),
        },
        {
            id: 4,
            name: 'Regional West',
            email: 'west@fleet.com',
            role: 'sub-vendor',
            parentId: 1,
            permissions: {
                canManageVendors: true,
                canManageVehicles: true,
                canManageDrivers: true,
                canProcessPayments: false,
            },
            hierarchyLevel: 2,
            documents: [],
            status: 'active',
            createdAt: new Date().toISOString(),
        },
        {
            id: 5,
            name: 'City Vendor B',
            email: 'cityB@fleet.com',
            role: 'sub-vendor',
            parentId: 4,
            permissions: {
                canManageVendors: false,
                canManageVehicles: true,
                canManageDrivers: true,
                canProcessPayments: true,
            },
            hierarchyLevel: 3,
            documents: [],
            status: 'active',
            createdAt: new Date().toISOString(),
        },
        {
            id: 6,
            name: 'City Vendor C',
            email: 'cityC@fleet.com',
            role: 'sub-vendor',
            parentId: 4,
            permissions: {
                canManageVendors: false,
                canManageVehicles: true,
                canManageDrivers: true,
                canProcessPayments: true,
            },
            hierarchyLevel: 3,
            documents: [],
            status: 'active',
            createdAt: new Date().toISOString(),
        },
    ],
    drivers: [
        {
            id: 101,
            name: 'John Driver',
            licenseNumber: 'ABC12345',
            licenseExpiry: '2024-01-10',
            status: 'active',
            documents: [],
            assignedVendor: 2,
        },
        {
            id: 102,
            name: 'Mary Wheels',
            licenseNumber: 'XYZ54321',
            licenseExpiry: '2023-10-01', // soon to expire
            status: 'pending',
            documents: [],
            assignedVendor: 4,
        },
        {
            id: 103,
            name: 'Tom Expired',
            licenseNumber: 'TOM-EXPD',
            licenseExpiry: '2022-12-01', // expired
            status: 'active',
            documents: [],
            assignedVendor: 5,
        },
        {
            id: 104,
            name: 'Dana Ree',
            licenseNumber: 'NAQ-8864',
            licenseExpiry: '2025-09-15', // not expired
            status: 'active',
            documents: [],
            assignedVendor: 3,
        },
    ],
    vehicles: [
        {
            id: 201,
            registrationNumber: 'AB-1111',
            model: 'Toyota Innova',
            seatingCapacity: '7',
            fuelType: 'Diesel',
            status: 'active',
        },
        {
            id: 202,
            registrationNumber: 'CD-2222',
            model: 'Honda City',
            seatingCapacity: '4',
            fuelType: 'Petrol',
            status: 'active',
        },
        {
            id: 203,
            registrationNumber: 'EF-3333',
            model: 'Maruti Swift',
            seatingCapacity: '4',
            fuelType: 'Petrol',
            status: 'disabled',
        },
        {
            id: 204,
            registrationNumber: 'GH-4444',
            model: 'Mahindra Scorpio',
            seatingCapacity: '7',
            fuelType: 'Diesel',
            status: 'active',
        },
    ],
};
