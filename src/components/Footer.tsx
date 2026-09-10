import React, { useState } from 'react';
import FocalyzeLogo from '@/components/FocalyzeLogo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ModalType = 'privacy' | 'terms' | 'cookies' | null;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  return (
    <footer className="bg-adhd-dark text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <FocalyzeLogo
              size={28}
              textClassName="text-xl font-bold text-white"
              className="mb-2"
            />
            <p className="text-gray-400">ADHD management, reimagined.</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              &copy; {currentYear} Focalyze. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end mt-2 space-x-4 text-sm">
              <button
                type="button"
                onClick={() => setActiveModal('privacy')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('terms')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('cookies')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Dialog open={activeModal === 'privacy'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-adhd-dark">Privacy Policy</DialogTitle>
            <DialogDescription className="text-gray-500">Last updated: September 2026</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed py-2">
            <p>
              At Focalyze, we prioritize the confidentiality and protection of personal and clinical neurodivergent health data.
            </p>
            <h4 className="font-semibold text-adhd-dark">1. Data Storage & Encryption</h4>
            <p>
              All personal observations, medication records, and clinical handover assessments are encrypted at rest using AES-256 and transmitted exclusively via TLS 1.3 encryption.
            </p>
            <h4 className="font-semibold text-adhd-dark">2. GDPR & UK Data Protection</h4>
            <p>
              We comply strictly with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018. Your clinical entries remain your private property and are never monetized or sold to third parties.
            </p>
            <h4 className="font-semibold text-adhd-dark">3. Right to Erasure</h4>
            <p>
              You have the unconditional right to export your clinical transition logs or delete your account at any time directly through your profile settings.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <Dialog open={activeModal === 'terms'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-adhd-dark">Terms of Service</DialogTitle>
            <DialogDescription className="text-gray-500">Effective Date: September 2026</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed py-2">
            <h4 className="font-semibold text-adhd-dark">1. Clinical Disclaimer</h4>
            <p>
              Focalyze is a supportive management and transition bridge application designed to assist neurodivergent individuals and their clinical care team. It is not an automated diagnostic system or a replacement for emergency psychiatric intervention.
            </p>
            <h4 className="font-semibold text-adhd-dark">2. Crisis Protocols</h4>
            <p>
              If you or someone you know is experiencing acute psychiatric distress or thoughts of harm, please immediately contact emergency services (999 in the UK) or call the Samaritans at 116 123.
            </p>
            <h4 className="font-semibold text-adhd-dark">3. Account Integrity</h4>
            <p>
              Users are responsible for safeguarding login credentials and ensuring permissions granted to mentors or clinicians are authorized.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cookie Policy Modal */}
      <Dialog open={activeModal === 'cookies'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-adhd-dark">Cookie Policy</DialogTitle>
            <DialogDescription className="text-gray-500">How we use essential cookies</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed py-2">
            <p>
              Focalyze uses only strictly necessary functional cookies and local storage items required to maintain secure user sessions and preserve offline state (Redux Persist).
            </p>
            <h4 className="font-semibold text-adhd-dark">Essential Authentication Tokens</h4>
            <p>
              Used to remember your active authenticated session and maintain dark/light preference settings. We do not use third-party tracking or advertising cookies.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
