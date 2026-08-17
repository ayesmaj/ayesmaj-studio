import React from 'react';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';

export function ContactCard({
  title = 'Contact With Us',
  description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        'relative grid h-full w-full md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
      style={{
        background: 'rgba(10,20,12,0.85)',
        border: '1px solid rgba(200,164,78,0.18)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 0 80px rgba(200,164,78,0.06), 0 32px 64px rgba(0,0,0,0.4)',
      }}
      {...props}
    >
      {/* Corner plus icons in gold */}
      <PlusIcon className="absolute -top-3 -left-3 h-5 w-5" style={{ color: '#C8A44E', opacity: 0.6 }} />
      <PlusIcon className="absolute -top-3 -right-3 h-5 w-5" style={{ color: '#C8A44E', opacity: 0.6 }} />
      <PlusIcon className="absolute -bottom-3 -left-3 h-5 w-5" style={{ color: '#C8A44E', opacity: 0.6 }} />
      <PlusIcon className="absolute -right-3 -bottom-3 h-5 w-5" style={{ color: '#C8A44E', opacity: 0.6 }} />

      {/* Left info panel */}
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-6 px-8 py-10 md:p-10">
          <p className="text-xs tracking-[0.5em] uppercase" style={{ color: '#C8A44E', fontFamily: 'DM Sans, sans-serif' }}>
            GET IN TOUCH
          </p>
          <h1
            className="text-3xl font-black md:text-4xl lg:text-5xl leading-tight"
            style={{ color: '#F2EDE4', fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.03em' }}
          >
            {title}
          </h1>
          <p
            className="max-w-xl text-sm md:text-base"
            style={{ color: 'rgba(242,237,228,0.5)', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.7 }}
          >
            {description}
          </p>

          {contactInfo && (
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 pt-2">
              {contactInfo.map((info, index) => (
                <ContactInfoItem key={index} {...info} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right form panel */}
      <div
        className={cn(
          'flex h-full w-full items-start border-t p-6 md:col-span-1 md:border-t-0 md:border-l',
          formSectionClassName,
        )}
        style={{
          borderColor: 'rgba(200,164,78,0.12)',
          background: 'rgba(7,16,10,0.6)',
          borderRadius: '0 24px 24px 0',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfoItem({ icon: Icon, label, value, className, ...props }) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)} {...props}>
      <div
        className="rounded-lg p-2.5 flex-shrink-0"
        style={{ background: 'rgba(200,164,78,0.08)', border: '1px solid rgba(200,164,78,0.15)' }}
      >
        <Icon className="h-4 w-4" style={{ color: '#C8A44E' }} />
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#C8A44E', fontFamily: 'DM Sans, sans-serif' }}>
          {label}
        </p>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(242,237,228,0.65)', fontFamily: 'DM Sans, sans-serif' }}>
          {value}
        </p>
      </div>
    </div>
  );
}
