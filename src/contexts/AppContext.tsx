import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { loadState, saveState } from '../services/storage';
import { AppState, Action } from '../types';
import { initialData } from '../services/mockData';

const initialState: AppState = loadState() || initialData;

const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'INITIALIZE':
            return { ...action.payload, isLoading: false };
        case 'SET_USER':
            return { ...state, currentUser: action.payload };
        case 'ADD_VENDOR':
            return {
                ...state,
                vendors: [
                    ...state.vendors,
                    {
                        ...action.payload,
                        documents: [],
                        status: 'active',
                        createdAt: new Date().toISOString(),
                    },
                ],
            };
        case 'UPDATE_PERMISSIONS':
            return {
                ...state,
                vendors: state.vendors.map(v =>
                    v.id === action.payload.vendorId ? { ...v, permissions: action.payload.permissions } : v
                ),
            };
        case 'TOGGLE_VENDOR_STATUS':
            return {
                ...state,
                vendors: state.vendors.map(v =>
                    v.id === action.payload
                        ? { ...v, status: v.status === 'active' ? 'disabled' : 'active' }
                        : v
                ),
            };
        case 'ADD_DRIVER':
            return {
                ...state,
                drivers: [
                    ...state.drivers,
                    {
                        ...action.payload,
                        documents: action.payload.documents || [],
                        assignedVendor:
                            action.payload.assignedVendor ?? (state.currentUser ? state.currentUser.id : null),
                    },
                ],
            };
        case 'UPDATE_DOCUMENT':
            return {
                ...state,
                drivers: state.drivers.map(driver =>
                    driver.id === action.payload.driverId
                        ? {
                            ...driver,
                            documents: driver.documents.map(doc =>
                                doc.type === action.payload.docType ? { ...doc, ...action.payload.update } : doc
                            ),
                        }
                        : driver
                ),
            };
        case 'ADD_VEHICLE':
            return {
                ...state,
                vehicles: [
                    ...state.vehicles,
                    {
                        ...action.payload,
                    },
                ],
            };
        default:
            return state;
    }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, { ...initialState, isLoading: true });

    useEffect(() => {
        const savedState = loadState();
        dispatch({ type: 'INITIALIZE', payload: savedState || initialState });
    }, []);

    useEffect(() => {
        if (!state.isLoading) {
            saveState(state);
        }
    }, [state]);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
