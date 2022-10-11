import Footer from './Footer';
import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <div className='min-h-screen mx-6 md:max-w-2xl md:mx-auto font-poppins flex flex-col justify-between'>
      <NavBar />
      <main className='container m-auto mt-4'>{children}</main>
      <Footer />
    </div>
  );
}
export default Layout;
