import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Calendar, Clock, Activity, Trash2 } from 'lucide-react';

function UserProfilePage() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const records = await pb.collection('appointments').getFullList({
        filter: `patientId = "${currentUser.id}"`,
        sort: '-appointment_date',
        $autoCancel: false
      });
      setAppointments(records);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchAppointments();
    }
  }, [currentUser]);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await pb.collection('appointments').delete(id, { $autoCancel: false });
        toast.success('Appointment cancelled successfully');
        setAppointments(appointments.filter(app => app.id !== id));
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        toast.error('Failed to cancel appointment');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning/20 text-warning border-warning/30';
      case 'approved': return 'bg-success/20 text-success border-success/30';
      case 'completed': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <>
      <Helmet>
        <title>My Profile - Shree Smiles Dental Care</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Profile Header */}
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                {currentUser?.name?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{currentUser?.name || 'Patient'}</h1>
                <p className="text-muted-foreground">{currentUser?.email}</p>
              </div>
            </div>

            {/* Appointments List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">My Appointments</h2>
              
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading appointments...</div>
              ) : appointments.length === 0 ? (
                <div className="bg-card p-12 rounded-2xl border border-border text-center shadow-sm">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No appointments found</h3>
                  <p className="text-muted-foreground mb-6">You don't have any upcoming or past appointments.</p>
                  <Button asChild>
                    <a href="/book-appointment">Book an Appointment</a>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)} capitalize`}>
                            {appointment.status}
                          </span>
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <Activity className="w-4 h-4 text-primary" />
                            {appointment.service_type}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(appointment.appointment_date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.appointment_time}
                          </span>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground italic">"{appointment.notes}"</p>
                        )}
                      </div>
                      
                      {appointment.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleCancel(appointment.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default UserProfilePage;