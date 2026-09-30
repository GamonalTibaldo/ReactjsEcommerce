import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <div><Header /></div>
      <div><Nav/></div>
      <main>
        {children}
      </main>
      <div><Footer /></div>
    </>
  );
};

export default Layout;