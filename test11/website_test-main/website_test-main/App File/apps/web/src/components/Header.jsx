import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-2xl text-primary-foreground font-bold">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary leading-none">Shree Smiles</h1>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">Dental Care</p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 relative ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-[1.35rem] left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Link to="/admin/dashboard">
                        <Shield className="w-4 h-4 mr-2" />
                        Admin
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Link to="/profile">
                      <User className="w-4 h-4 mr-2" />
                      {currentUser?.name || 'Profile'}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 active:scale-[0.98]">
                    <Link to="/book-appointment">
                      <Phone className="w-4 h-4 mr-2" />
                      Book appointment
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 active:scale-[0.98]">
                    <Link to="/login">
                      <Phone className="w-4 h-4 mr-2" />
                      Book appointment
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        isActive(link.path)
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  <div className="h-px bg-border my-2" />
                  
                  {isAuthenticated ? (
                    <>
                      {isAdmin && (
                        <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary flex items-center">
                          <Shield className="w-5 h-5 mr-3" /> Admin Dashboard
                        </Link>
                      )}
                      <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary flex items-center">
                        <User className="w-5 h-5 mr-3" /> Profile
                      </Link>
                      <button onClick={handleLogout} className="text-lg font-medium text-destructive hover:text-destructive/80 flex items-center text-left">
                        <LogOut className="w-5 h-5 mr-3" /> Logout
                      </button>
                      <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link to="/book-appointment" onClick={() => setIsOpen(false)}>
                          <Phone className="w-4 h-4 mr-2" />
                          Book appointment
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary">
                        Login
                      </Link>
                      <Link to="/signup" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary">
                        Sign Up
                      </Link>
                      <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Phone className="w-4 h-4 mr-2" />
                          Book appointment
                        </Link>
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;