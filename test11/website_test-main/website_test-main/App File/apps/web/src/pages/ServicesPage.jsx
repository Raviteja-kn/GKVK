import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import { Smile, Sparkles, Braces, Hammer as Drill, Activity, Zap, Shield, AlertCircle } from 'lucide-react';

function ServicesPage() {
  const services = [
    {
      icon: Smile,
      title: 'General dentistry',
      description: 'Comprehensive oral health care including routine check-ups, cleanings, fillings, and preventive treatments to maintain your dental health.'
    },
    {
      icon: Sparkles,
      title: 'Cosmetic dentistry',
      description: 'Transform your smile with veneers, bonding, and smile makeovers designed to enhance the appearance of your teeth.'
    },
    {
      icon: Braces,
      title: 'Orthodontics',
      description: 'Straighten your teeth with traditional braces or clear aligners. We create personalized treatment plans for all ages.'
    },
    {
      icon: Drill,
      title: 'Dental implants',
      description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth using advanced implant technology.'
    },
    {
      icon: Activity,
      title: 'Root canal treatment',
      description: 'Save infected or damaged teeth with gentle, effective root canal therapy performed with modern techniques for minimal discomfort.'
    },
    {
      icon: Zap,
      title: 'Teeth whitening',
      description: 'Professional whitening treatments that safely brighten your smile by several shades in just one visit.'
    },
    {
      icon: Shield,
      title: 'Preventive care',
      description: 'Protect your teeth with fluoride treatments, sealants, and regular cleanings to prevent cavities and gum disease.'
    },
    {
      icon: AlertCircle,
      title: 'Emergency dental care',
      description: 'Immediate treatment for dental emergencies including severe pain, broken teeth, or knocked-out teeth. We\'re here when you need us.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dental services - Shree Smiles Dental Care</title>
        <meta name="description" content="Comprehensive dental services including general dentistry, cosmetic treatments, orthodontics, implants, and emergency care." />
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
                className="max-w-4xl mx-auto text-center mb-12"
              >
                <img
                  src="https://images.unsplash.com/photo-1694678459294-da579f249296"
                  alt="Professional dentist examining patient with modern dental equipment"
                  className="w-full h-[400px] object-cover rounded-2xl mb-8 shadow-lg"
                />
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Our dental services
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  From routine check-ups to advanced treatments, we offer comprehensive dental care tailored to your unique needs
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <ServiceCard
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                      onLearnMore={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
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
                  Not sure which service you need?
                </h2>
                <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
                  Schedule a consultation and our experienced team will assess your needs and recommend the best treatment plan for you.
                </p>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ServicesPage;