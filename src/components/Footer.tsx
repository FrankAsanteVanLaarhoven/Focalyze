
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-adhd-dark text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-adhd-primary mb-2">Focalyze</h2>
            <p className="text-gray-400">ADHD management, reimagined.</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              &copy; {currentYear} Focalyze. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end mt-2 space-x-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
