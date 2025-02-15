import React from 'react';
import { Badge, BadgeProps } from './ui/badge';

interface Document {
    name: string;
    expiry: string;
}

interface DocumentStatusProps {
    documents: Document[];
}

function statusToBadgeVariant(status: 'expired' | 'warning' | 'valid'): BadgeProps['variant'] {
    switch (status) {
        case 'expired':
            return 'destructive';
        case 'warning':
            return 'secondary';
        case 'valid':
            return 'default';
        default:
            return 'default';
    }
}

export const DocumentStatus: React.FC<DocumentStatusProps> = ({ documents }) => {
    const getStatus = (expiry: string): 'expired' | 'warning' | 'valid' => {
        const today = new Date();
        const expDate = new Date(expiry);
        const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return 'expired';
        if (diffDays <= 30) return 'warning';
        return 'valid';
    };

    return (
        <div className="space-y-2">
            {documents.map((doc) => {
                const status = getStatus(doc.expiry);
                return (
                    <div key={doc.name} className="flex items-center gap-4">
                        <span className="text-sm font-medium">{doc.name}</span>
                        <Badge variant={statusToBadgeVariant(status)}>
                            {status.toUpperCase()}
                        </Badge>
                    </div>
                );
            })}
        </div>
    );
};
