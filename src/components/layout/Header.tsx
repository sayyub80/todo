
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Taskly</h1>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user.name}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => dispatch(logout())}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
