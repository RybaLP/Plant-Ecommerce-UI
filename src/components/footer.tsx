
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-4 md:px-8 lg:px-16 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-3">
            <h2 className="font-bold text-lg mb-2">Pomoc</h2>
            <ul className="space-y-1">
              <li><a href="/faq" className="hover:text-black transition-colors">FAQ</a></li>
              <li><a href="/kontakt" className="hover:text-black transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-3">
            <h2 className="font-bold text-lg mb-2">Sociale</h2>
            <ul className="space-y-1">
              <li><a href="https://instagram.com" className="hover:text-black transition-colors">Instagram</a></li>
              <li><a href="https://facebook.com" className="hover:text-black transition-colors">Facebook</a></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-3">
            <h2 className="font-bold text-lg mb-2">Polityki</h2>
            <ul className="space-y-1">
              <li><a href="/polityka-prywatnosci" className="hover:text-black transition-colors">Polityka prywatności</a></li>
              <li><a href="/regulamin" className="hover:text-black transition-colors">Warunki świadczenia usług</a></li>
              <li><a href="/polityka-zwrotow" className="hover:text-black transition-colors">Polityka zwrotów</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© 2025. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;