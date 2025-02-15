export interface Document {
  name: string;
  type: string;
  size: number;
  content: string;
  uploadedAt: string;
  expiryDate: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  parentId: number | null;
  permissions: Record<string, boolean>;
  hierarchyLevel: number;
  documents: Document[];
  status: 'active' | 'disabled';
  createdAt: string;
}

export interface Driver {
  id: number;
  name: string;
  licenseNumber: string;
  licenseExpiry?: string;
  status: 'active' | 'pending' | 'disabled';
  documents: Document[];
  assignedVendor: number | null;
}

export interface Vehicle {
  id: number;
  registrationNumber: string;
  model: string;
  seatingCapacity?: string;
  fuelType?: string;
  status: 'active' | 'disabled';
}

export interface AppState {
  isLoading: boolean;
  currentUser: User | null;
  vendors: User[];
  drivers: Driver[];
  vehicles: Vehicle[];
}

export type Action =
  | { type: 'INITIALIZE'; payload: AppState }
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_VENDOR'; payload: User }
  | {
    type: 'UPDATE_PERMISSIONS';
    payload: { vendorId: number; permissions: Record<string, boolean> };
  }
  | { type: 'TOGGLE_VENDOR_STATUS'; payload: number }
  | { type: 'ADD_DRIVER'; payload: Driver }
  | { type: 'UPDATE_DOCUMENT'; payload: { driverId: number; docType: string; update: Partial<Document> } }
  | { type: 'ADD_VEHICLE'; payload: Vehicle };


export interface MoveUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onMove: (userId: number, newParentId: number) => void;
}