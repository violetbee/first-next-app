import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from './Footer';
import NavBar from './NavBar';

function Layout({ children }) {
  const router = useRouter();

  const firstCase =
    router.pathname.slice(1).split('')[0] === undefined
      ? 'Home'
      : router.pathname.slice(1).split('')[0].toUpperCase();
  const remain = router.pathname.slice(2);
  const routeName = firstCase + remain;

  return (
    <div className='min-h-screen mx-6 md:max-w-2xl md:mx-auto font-poppins flex flex-col justify-between'>
      <Head>
        <title>{!routeName ? 'Home' : routeName} | Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavBar />
      <main className='container m-auto mt-4'>{children}</main>
      <Footer />
    </div>
  );
}
export default Layout;
