import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BenefitCard from '@/components/BenefitCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import { Award, Heart, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';

function HomePage() {
  const { isAuthenticated } = useAuth();

  const benefits = [
    {
      icon: Award,
      title: 'Experienced dentists',
      description: 'Our team of highly qualified dentists brings over 15 years of combined expertise in comprehensive dental care.',
      variant: 'elevated'
    },
    {
      icon: Sparkles,
      title: 'Advanced technology',
      description: 'We use state-of-the-art equipment and modern techniques to ensure precise, comfortable treatments.',
      variant: 'default'
    },
    {
      icon: Heart,
      title: 'Patient comfort',
      description: 'Your comfort is our priority. We create a welcoming environment with gentle care and personalized attention.',
      variant: 'default'
    },
    {
      icon: Shield,
      title: 'Affordable care',
      description: 'Quality dental care should be accessible. We offer transparent pricing and flexible payment options.',
      variant: 'muted'
    }
  ];

  const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1679136287096-cb864ebf9b10',
      quote: 'The team at Shree Smiles made my dental implant procedure completely stress-free. Their attention to detail and patient care is exceptional.',
      name: 'Priya Sharma',
      rating: 5
    },
    {
      image: 'https://images.unsplash.com/photo-1660732205495-f65510d8180e',
      quote: 'I was nervous about getting braces, but Dr. Kumar explained everything clearly. The results exceeded my expectations and the process was smooth.',
      name: 'Rajesh Patel',
      rating: 5
    },
    {
      image: 'https://images.unsplash.com/photo-1679136287096-cb864ebf9b10',
      quote: 'Best dental clinic in the area. Professional staff, modern equipment, and they genuinely care about their patients. Highly recommend for families.',
      name: 'Anita Desai',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Shree Smiles Dental Care - Your smile, our priority</title>
        <meta name="description" content="Professional dental care with experienced dentists, advanced technology, and patient-focused service. Book your appointment today." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1616391182219-e080b4d1043a"
                alt="Modern dental clinic interior with professional equipment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
            </div>

            <div className="container relative z-10">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                    Your smile, our priority
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                    Experience compassionate dental care with a team you can trust. We combine expertise, advanced technology, and genuine care to give you the healthy smile you deserve.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 transition-all duration-200 active:scale-[0.98]"
                    >
                      <Link to={isAuthenticated ? "/book-appointment" : "/login"}>
                        Book appointment
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 border-2 transition-all duration-200 active:scale-[0.98]"
                    >
                      <Link to="/services">
                        View services
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Why choose Shree Smiles
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We're committed to providing exceptional dental care that puts your needs first
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="md:col-span-2"
                >
                  <BenefitCard {...benefits[0]} />
                </motion.div>
                {benefits.slice(1).map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 2) }}
                  >
                    <BenefitCard {...benefit} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  What our patients say
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Real experiences from real patients who trust us with their dental care
                </p>
              </motion.div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <TestimonialCard {...testimonial} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to transform your smile?
                </h2>
                <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
                  Schedule your appointment today and take the first step towards a healthier, more confident smile.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 transition-all duration-200 active:scale-[0.98]"
                >
                  <Link to={isAuthenticated ? "/book-appointment" : "/login"}>
                    Book your appointment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;