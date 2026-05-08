import React from 'react';

function BenefitCard({ icon: Icon, title, description, variant = 'default' }) {
  const variantStyles = {
    default: 'bg-card border-2 border-primary/20 shadow-sm',
    elevated: 'bg-card shadow-lg',
    muted: 'bg-muted border border-border'
  };

  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${variantStyles[variant]}`}>
      <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-primary-foreground">
        <Icon className="w-8 h-8" />
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default BenefitCard;