import { initialData } from './mockData';
import { AppState } from '../types';

export const loadState = (): AppState | null => {
    try {
        const serialized = localStorage.getItem('appState');
        return serialized ? JSON.parse(serialized) : initialData;
    } catch {
        return initialData;
    }
};

export const saveState = (state: AppState): void => {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem('appState', serialized);
    } catch (error) {
        console.error('State save failed:', error);
    }
};
