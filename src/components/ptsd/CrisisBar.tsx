
import React from 'react';
import { Phone, MessageSquare, Globe } from 'lucide-react';

const CrisisBar: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-teal-900 text-white text-sm print:hidden">
    <div className="container mx-auto px-4 py-2 flex flex-wrap gap-4 items-center justify-between">
      <span className="font-semibold text-teal-300 text-xs uppercase tracking-wider">If you need support right now:</span>
      <div className="flex flex-wrap gap-4 items-center">
        <a href="tel:116123" className="flex items-center gap-1.5 hover:text-teal-200 transition-colors">
          <Phone size={14} />
          <span>Samaritans <strong>116 123</strong></span>
        </a>
        <a href="sms:85258" className="flex items-center gap-1.5 hover:text-teal-200 transition-colors">
          <MessageSquare size={14} />
          <span>Shout — text <strong>85258</strong></span>
        </a>
        <a href="https://www.mind.org.uk/need-urgent-help/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-200 transition-colors">
          <Globe size={14} />
          <span>MIND helpline</span>
        </a>
        <a href="https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/help-for-suicidal-thoughts/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-200 transition-colors">
          <Globe size={14} />
          <span>NHS urgent help</span>
        </a>
      </div>
    </div>
  </div>
);

export default CrisisBar;
