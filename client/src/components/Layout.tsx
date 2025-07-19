
import Navbar from './Navbar';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
 

 

  return (
   <>
      <Navbar  />
      <main className="container max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

   </>
  );
};

export default Layout;