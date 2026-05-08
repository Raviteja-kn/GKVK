import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, formData.passwordConfirm, formData.name);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Shree Smiles Dental Care</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl shadow-lg border border-border">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">Create an account</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Join us to manage your dental appointments
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordConfirm">Confirm Password</Label>
                  <Input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="text-foreground"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </Button>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default SignupPage;