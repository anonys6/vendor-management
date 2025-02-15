import React from 'react';
import { Button } from './ui/button';
import { User } from '../types';

interface VendorTreeProps {
    vendors: User[];
    parentId?: number | null;
    level?: number;
}

export const VendorTree: React.FC<VendorTreeProps> = ({ vendors, parentId = null, level = 0 }) => {
    const nodes = vendors.filter((v) => v.parentId === parentId);

    return (
        <div className="pl-4">
            {nodes.map((node) => (
                <div key={node.id}>
                    <div className="flex items-center gap-2 py-1">
                        <Button variant="ghost" size="sm">
                            {node.name}
                        </Button>
                        <span className="text-sm text-muted-foreground">({node.role})</span>
                    </div>
                    <VendorTree vendors={vendors} parentId={node.id} level={level + 1} />
                </div>
            ))}
        </div>
    );
};
