import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function ServiceCard({ icon: Icon, title, description, onLearnMore }) {
  return (
    <div className="group relative bg-card rounded-2xl border-2 border-primary/20 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent rounded-t-2xl" />
      
      <div className="flex flex-col h-full">
        <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
          <Icon className="w-7 h-7" />
        </div>
        
        <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
          {description}
        </p>
        
        <div className="mt-auto">
          <Button
            variant="ghost"
            className="group/btn p-0 h-auto font-medium text-primary hover:text-primary/80 hover:bg-transparent transition-all duration-200"
            onClick={onLearnMore}
          >
            Learn more
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;