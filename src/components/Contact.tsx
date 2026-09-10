
import ContactForm from './ContactForm';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@focalyze.app'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Innovation Way, San Francisco, CA 94103'
    }
  ];

  const socialLinks = [
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Instagram, url: '#', label: 'Instagram' }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Interested in learning more about Focalyze?</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          
          <div className="space-y-8 animate-fade-in">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="p-3 bg-adhd-light rounded-full text-adhd-primary mr-4">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-adhd-dark mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </div>
            ))}
            
            <div className="pt-6">
              <h3 className="text-xl font-bold text-adhd-dark mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="p-3 bg-adhd-light rounded-full text-adhd-primary hover:bg-adhd-primary hover:text-white transition-colors duration-300"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
