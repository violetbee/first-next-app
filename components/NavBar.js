import Link from 'next/link';

function NavBar() {
  return (
    <nav className='flex justify-between items-center py-5'>
      <Link href='/'>
        <button className='text-lg font-medium'>Creative Minds</button>
      </Link>
      <ul className='flex items-center gap-10'>
        <Link href={'/auth/login'}>
          <a className='py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8'>
            Join now
          </a>
        </Link>
      </ul>
    </nav>
  );
}
export default NavBar;
