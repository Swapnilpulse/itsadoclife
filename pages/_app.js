import '../styles/globals.css';
import Link from 'next/link';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <div className="container">
      <Header/>     
    </div>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
