import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='header'>
        <Link href="/"><a><Image src="https://1213f06464.nxcli.net/wp-content/uploads/2022/08/itsadoclife-logo.png" width={256} height={78}  className='logo'/></a></Link>
        <nav>
            <ul className="main-navigation">
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog"><a>blogs</a></Link></li>
            <li><Link href="/menu"><a>Menu</a></Link></li>
            </ul>
        </nav>
        {/*<Mainnavigation/>*/}
    </div>
  );
}

export default Header;
