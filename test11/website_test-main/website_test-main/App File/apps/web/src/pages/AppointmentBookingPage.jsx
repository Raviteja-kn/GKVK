import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function AppointmentBookingPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    service_type: '',
    appointment_date: '',
    appointment_time: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({ ...prev, service_type: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service_type || !formData.appointment_date || !formData.appointment_time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // Format date to ensure it's valid for PocketBase (YYYY-MM-DD 12:00:00.000Z)
      const dateObj = new Date(formData.appointment_date);
      const formattedDate = dateObj.toISOString().replace('T', ' ').substring(0, 19) + 'Z';

      await pb.collection('appointments').create({
        patientId: currentUser.id,
        service_type: formData.service_type,
        appointment_date: formattedDate,
        appointment_time: formData.appointment_time,
        notes: formData.notes,
        status: 'pending'
      }, { $autoCancel: false });

      toast.success('Appointment booked successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Book Appointment - Shree Smiles Dental Care</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-2xl mx-auto bg-card p-8 rounded-2xl shadow-lg border border-border">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Book an Appointment</h1>
              <p className="mt-2 text-muted-foreground">
                Fill out the form below to request an appointment. We will confirm your booking shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service_type">Service Type <span className="text-destructive">*</span></Label>
                <Select value={formData.service_type} onValueChange={handleServiceChange} required>
                  <SelectTrigger id="service_type" className="text-foreground">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Filling">Filling</SelectItem>
                    <SelectItem value="Root Canal">Root Canal</SelectItem>
                    <SelectItem value="Whitening">Whitening</SelectItem>
                    <SelectItem value="Checkup">Checkup</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="appointment_date">Preferred Date <span className="text-destructive">*</span></Label>
                  <Input
                    id="appointment_date"
                    name="appointment_date"
                    type="date"
                    required
                    value={formData.appointment_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment_time">Preferred Time <span className="text-destructive">*</span></Label>
                  <Input
                    id="appointment_time"
                    name="appointment_time"
                    type="time"
                    required
                    value={formData.appointment_time}
                    onChange={handleChange}
                    className="text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific concerns or requirements?"
                  rows={4}
                  className="text-foreground"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Confirm Booking Request'}
                </Button>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default AppointmentBookingPage;