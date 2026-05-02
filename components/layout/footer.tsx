export function Footer() {
  return (
    <footer className="w-full py-4 px-6 border-t border-slate-200 bg-white/50 backdrop-blur-sm text-center flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 mt-auto">
      <p>© {new Date().getFullYear()} Udaan Group of Companies. All rights reserved.</p>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="#" className="hover:text-blue-600 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-blue-600 transition-colors">
          Terms of Service
        </a>
        <a href="#" className="hover:text-blue-600 transition-colors">
          Support
        </a>
      </div>
    </footer>
  );
}
