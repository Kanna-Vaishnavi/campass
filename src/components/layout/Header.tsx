import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Building2, 
  Target,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

const navItems = [
  { path: '/', label: 'Home', icon: GraduationCap },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/practice', label: 'Practice', icon: Target },
  { path: '/resources', label: 'Resources', icon: BookOpen },
  { path: '/companies', label: 'Companies', icon: Building2 },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsAuthenticated, resetAll, profile } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    resetAll();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-primary rounded-lg p-2">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display">PlacePrep</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'gap-2',
                    isActive && 'gradient-primary'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
          <div className="ml-4 pl-4 border-l flex items-center gap-2">
            {profile.fullName && (
              <span className="text-sm text-muted-foreground hidden lg:inline">
                Hi, {profile.fullName.split(' ')[0]}
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t bg-background p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-2',
                    isActive && 'gradient-primary'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-destructive" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </nav>
      )}
    </header>
  );
}
