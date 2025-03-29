
import { Home, Bell, Users, CreditCard, Camera } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: Home, active: false },
    { icon: Bell, active: false },
    { icon: Users, active: false },
    { icon: CreditCard, active: false },
    { icon: Camera, active: true },
    { icon: Home, active: false },
  ];

  return (
    <div className="hidden md:flex flex-col items-center w-16 bg-gray-800 py-4 space-y-6">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`${
            item.active ? 'text-white bg-blue-600' : 'text-gray-400'
          } p-2 rounded`}
        >
          <item.icon className="w-6 h-6" />
        </div>
      ))}
    </div>
  );
};

export default Sidebar