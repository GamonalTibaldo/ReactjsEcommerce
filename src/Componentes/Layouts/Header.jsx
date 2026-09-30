
import Style from './Header.module.css';

const Header = () => {
  return (
    <div className={Style.header}>
      <div>
        <img src="https://i.ibb.co/PsxkCq6R/logo.png" alt="TEOFOREVER COMPUTERS" height="80" 
          className="d-inline-block align-text-top me-2" />
          
      </div>
   
    </div>
    
  );
};

export default Header;