/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { MoveUserDialogProps } from '@/types';

const siteAdmins = ['site-admin', 'Megha', 'DCO Trial acc', 'Newsiteadmin', 'Newsite admin 2'];

export function MoveUserDialog({ isOpen, onClose, user, onMove }: MoveUserDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [moveType, setMoveType] = useState<'parent' | 'role'>('parent');

  const filteredAdmins = siteAdmins.filter((admin) =>
    admin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMove = () => {
    if (user && selectedAdmin) {
      onMove(user.id, 999);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Move {user?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <RadioGroup value={moveType} onValueChange={(val) => setMoveType(val as any)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="parent" id="parent" />
              <Label htmlFor="parent">Change Parent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="role" id="role" />
              <Label htmlFor="role">Change Role</Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label>{moveType === 'parent' ? 'Select Parent' : 'Select New Role'}</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-2 mt-2">
              {filteredAdmins.map((admin) => (
                <div
                  key={admin}
                  className={`p-2 rounded cursor-pointer ${selectedAdmin === admin ? 'bg-gray-100' : ''
                    }`}
                  onClick={() => setSelectedAdmin(admin)}
                >
                  {admin}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleMove} disabled={!selectedAdmin}>
              Move
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
