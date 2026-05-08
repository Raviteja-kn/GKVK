import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Award, Heart, Lightbulb, Users } from 'lucide-react';

function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Trust',
      description: 'We build lasting relationships with our patients through honest communication and reliable care.'
    },
    {
      icon: Users,
      title: 'Care',
      description: 'Every patient receives personalized attention and compassionate treatment tailored to their needs.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in dental care through continuous learning and quality practices.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace modern technology and techniques to provide the most effective treatments available.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About us - Shree Smiles Dental Care</title>
        <meta name="description" content="Learn about our mission, values, and experienced dental team committed to providing exceptional patient care." />
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
                  About Shree Smiles
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Your trusted partner in comprehensive dental care
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                    Our story
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Founded in 2011, Shree Smiles Dental Care has been serving the community with dedication and expertise for over 15 years. What started as a small practice has grown into a comprehensive dental care center, but our core mission remains unchanged: to provide exceptional dental care in a comfortable, welcoming environment.
                    </p>
                    <p>
                      We believe that quality dental care should be accessible to everyone. That's why we've invested in state-of-the-art technology and continuous training for our team, ensuring that every patient receives the best possible treatment.
                    </p>
                    <p>
                      Our practice is built on the foundation of trust, transparency, and genuine care for our patients. We take the time to listen to your concerns, explain your treatment options, and work with you to achieve your dental health goals.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary/10 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-semibold mb-6 text-foreground">Our mission</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    To deliver comprehensive, patient-centered dental care that combines clinical excellence with compassionate service, helping our patients achieve and maintain optimal oral health throughout their lives.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-3xl font-bold text-primary mb-1">2,847</p>
                      <p className="text-sm text-muted-foreground">Happy patients</p>
                    </div>
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-3xl font-bold text-primary mb-1">15+</p>
                      <p className="text-sm text-muted-foreground">Years experience</p>
                    </div>
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-3xl font-bold text-primary mb-1">4.8/5</p>
                      <p className="text-sm text-muted-foreground">Patient rating</p>
                    </div>
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-3xl font-bold text-primary mb-1">8</p>
                      <p className="text-sm text-muted-foreground">Services offered</p>
                    </div>
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
                  Our values
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide everything we do
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-primary-foreground mb-4">
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
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
                  Our expertise
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our team brings together diverse specializations and years of experience
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-6 border-2 border-primary/20"
                >
                  <div className="w-20 h-20 rounded-xl bg-muted mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">DK</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Dr. Vikram Kumar</h3>
                  <p className="text-sm text-primary font-medium mb-3">BDS, MDS (Prosthodontics)</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Specializes in cosmetic dentistry and dental implants with 12 years of experience in smile transformations.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-2xl p-6 border-2 border-primary/20"
                >
                  <div className="w-20 h-20 rounded-xl bg-muted mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">SM</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Dr. Sneha Mehta</h3>
                  <p className="text-sm text-primary font-medium mb-3">BDS, MDS (Orthodontics)</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Expert in orthodontic treatments including braces and clear aligners, helping patients achieve perfectly aligned smiles.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 border-2 border-primary/20"
                >
                  <div className="w-20 h-20 rounded-xl bg-muted mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">AR</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Dr. Amit Reddy</h3>
                  <p className="text-sm text-primary font-medium mb-3">BDS, MDS (Endodontics)</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Specializes in root canal treatments and endodontic procedures, saving teeth with gentle, effective care.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 bg-muted rounded-2xl p-8"
              >
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Credentials & certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Indian Dental Association (IDA) certified</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>ISO 9001:2015 certified clinic</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Advanced implantology certification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Invisalign certified provider</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default AboutPage;