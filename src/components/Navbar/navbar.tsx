import DesktopNavbar from './desktop/navbar';
import MobileNavbar from './mobile/navbar';

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-lg">
      <div className="hidden md:block">
        <DesktopNavbar/>
      </div>

      <div className="block md:hidden">
        <MobileNavbar/>
      </div>
    </header>
  );
};

export default Navbar;