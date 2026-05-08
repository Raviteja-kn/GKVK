import React from 'react';
import { Star } from 'lucide-react';

function TestimonialCard({ image, quote, name, rating, className = '' }) {
  return (
    <div className={`bg-card rounded-2xl p-6 shadow-md border border-border break-inside-avoid mb-6 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? 'fill-accent text-accent'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <blockquote className="text-muted-foreground leading-relaxed italic">
        "{quote}"
      </blockquote>
    </div>
  );
}

export default TestimonialCard;