import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast.error('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success('Appointment request submitted successfully. We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        preferredDate: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact us - Shree Smiles Dental Care</title>
        <meta name="description" content="Book your dental appointment or get in touch with our team. We're here to help with all your dental care needs." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <section className="py-20 bg-muted">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Get in touch
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Schedule your appointment or reach out with any questions. We're here to help.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-2"
                >
                  <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Book an appointment</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-foreground">
                            Full name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            className="text-foreground placeholder:text-muted-foreground"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-foreground">
                            Email address <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                            className="text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-foreground">
                            Phone number <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                            className="text-foreground placeholder:text-muted-foreground"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service" className="text-foreground">
                            Service type <span className="text-destructive">*</span>
                          </Label>
                          <Select value={formData.service} onValueChange={handleServiceChange} required>
                            <SelectTrigger id="service" className="text-foreground">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General dentistry</SelectItem>
                              <SelectItem value="cosmetic">Cosmetic dentistry</SelectItem>
                              <SelectItem value="orthodontics">Orthodontics</SelectItem>
                              <SelectItem value="implants">Dental implants</SelectItem>
                              <SelectItem value="root-canal">Root canal treatment</SelectItem>
                              <SelectItem value="whitening">Teeth whitening</SelectItem>
                              <SelectItem value="preventive">Preventive care</SelectItem>
                              <SelectItem value="emergency">Emergency care</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredDate" className="text-foreground">
                          Preferred date and time
                        </Label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          type="datetime-local"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="text-foreground"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">
                          Additional message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your dental concerns or any specific requirements..."
                          rows={4}
                          className="text-foreground placeholder:text-muted-foreground"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          'Submitting...'
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit appointment request
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-primary text-primary-foreground rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-6">Contact information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium mb-1">Phone</p>
                          <p className="text-primary-foreground/90">+91 98765 43210</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium mb-1">Email</p>
                          <p className="text-primary-foreground/90">info@shreesmiles.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium mb-1">Address</p>
                          <p className="text-primary-foreground/90">
                            123 Dental Street<br />
                            Mumbai, Maharashtra<br />
                            400001, India
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-3 text-foreground">Business hours</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Monday - Friday</span>
                            <span className="font-medium text-foreground">9:00 AM - 7:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday</span>
                            <span className="font-medium text-foreground">9:00 AM - 5:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span className="font-medium text-foreground">Closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-2xl p-6">
                    <h3 className="font-semibold mb-3 text-foreground">Emergency care</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      For dental emergencies outside business hours, please call our emergency line at <span className="font-medium text-foreground">+91 98765 43211</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ContactPage;