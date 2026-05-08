import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Search, CheckCircle, CheckSquare, Trash2, Users, Calendar, Clock } from 'lucide-react';

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAppointments = async () => {
    try {
      const records = await pb.collection('appointments').getFullList({
        sort: '-appointment_date',
        expand: 'patientId',
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
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await pb.collection('appointments').update(id, { status: newStatus }, { $autoCancel: false });
      toast.success(`Appointment marked as ${newStatus}`);
      setAppointments(appointments.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update appointment status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
      try {
        await pb.collection('appointments').delete(id, { $autoCancel: false });
        toast.success('Appointment deleted successfully');
        setAppointments(appointments.filter(app => app.id !== id));
      } catch (error) {
        console.error('Error deleting appointment:', error);
        toast.error('Failed to delete appointment');
      }
    }
  };

  // Derived state
  const filteredAppointments = appointments.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const patientName = app.expand?.patientId?.name?.toLowerCase() || '';
    const patientEmail = app.expand?.patientId?.email?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    const matchesSearch = patientName.includes(query) || patientEmail.includes(query);
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    approved: appointments.filter(a => a.status === 'approved').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Shree Smiles Dental Care</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Appointments</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-warning/30 shadow-sm">
                <p className="text-sm font-medium text-warning mb-1">Pending</p>
                <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-success/30 shadow-sm">
                <p className="text-sm font-medium text-success mb-1">Approved</p>
                <p className="text-3xl font-bold text-foreground">{stats.approved}</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-primary/30 shadow-sm">
                <p className="text-sm font-medium text-primary mb-1">Completed</p>
                <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'approved', 'completed'].map(f => (
                  <Button
                    key={f}
                    variant={filter === f ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(f)}
                    className="capitalize"
                  >
                    {f}
                  </Button>
                ))}
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search patient name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-foreground"
                />
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-medium">Patient</th>
                      <th className="px-6 py-4 font-medium">Service</th>
                      <th className="px-6 py-4 font-medium">Date & Time</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">Loading appointments...</td>
                      </tr>
                    ) : filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">No appointments found.</td>
                      </tr>
                    ) : (
                      filteredAppointments.map((app) => (
                        <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-foreground">{app.expand?.patientId?.name || 'Unknown'}</div>
                            <div className="text-muted-foreground text-xs">{app.expand?.patientId?.email}</div>
                          </td>
                          <td className="px-6 py-4 font-medium text-foreground">
                            {app.service_type}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-foreground">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              {new Date(app.appointment_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                              <Clock className="w-3 h-3" />
                              {app.appointment_time}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize
                              ${app.status === 'pending' ? 'bg-warning/10 text-warning border-warning/20' : 
                                app.status === 'approved' ? 'bg-success/10 text-success border-success/20' : 
                                'bg-primary/10 text-primary border-primary/20'}`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            {app.status === 'pending' && (
                              <Button size="sm" variant="outline" className="text-success hover:text-success hover:bg-success/10 border-success/20" onClick={() => handleUpdateStatus(app.id, 'approved')}>
                                <CheckCircle className="w-4 h-4 mr-1" /> Approve
                              </Button>
                            )}
                            {app.status === 'approved' && (
                              <Button size="sm" variant="outline" className="text-primary hover:text-primary hover:bg-primary/10 border-primary/20" onClick={() => handleUpdateStatus(app.id, 'completed')}>
                                <CheckSquare className="w-4 h-4 mr-1" /> Complete
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(app.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default AdminDashboard;