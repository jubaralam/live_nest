
import Sidebar from './Sidebar';
import Header from './Header';

export const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="flex h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};