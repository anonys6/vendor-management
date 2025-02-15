import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit } from 'lucide-react';

interface UserCardProps {
  user: User;
  onMoveClick: (user: User) => void;
}

export function UserCard({ user, onMoveClick }: UserCardProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-600';
      case 'site-admin':
        return 'bg-red-600';
      case 'group-vendor':
        return 'bg-teal-600';
      case 'sub-vendor':
        return 'bg-pink-600';
      case 'deployment-associate':
        return 'bg-rose-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getRoleColor(user.role)}`}>
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onMoveClick(user)}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        {user.role !== 'admin' && user.role !== 'site-admin' && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => onMoveClick(user)}
          >
            Move Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
}