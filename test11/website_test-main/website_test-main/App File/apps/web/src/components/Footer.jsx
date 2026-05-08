import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-2xl text-primary-foreground font-bold">S</span>
              </div>
              <div>
                <span className="text-lg font-bold text-primary leading-none block">Shree Smiles</span>
                <span className="text-xs leading-none block mt-0.5">Dental Care</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted partner for comprehensive dental care with a focus on patient comfort and advanced treatments.
            </p>
          </div>

          <div>
            <span className="font-semibold text-foreground block mb-4">Contact us</span>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-sm">info@shreesmiles.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-sm">123 Dental Street, Mumbai, Maharashtra 400001</span>
              </div>
            </div>
          </div>

          <div>
            <span className="font-semibold text-foreground block mb-4">Business hours</span>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p>Sat: 9:00 AM - 5:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="font-semibold text-foreground block mb-4">Follow us</span>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 2026 Shree Smiles Dental Care. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;