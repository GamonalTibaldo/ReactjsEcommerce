import Style from './Footer.module.css';

const Footer = () =>{

return(
  <footer className={Style.footer}>
  
 <div className={Style['footer-container']}>
    <div className={Style['footer-col-left']}>
  <p className={Style['footer-subtitle']}>Información</p>
  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
    <li><a href="#garantia">Garantía y Devoluciones</a></li>
    <li><a href="#medios-pago">Medios de Pago</a></li>
    <li><a href="#preguntas-frecuentes">Preguntas Frecuentes</a></li>
  </ul>
</div>
    
    <div className={Style['footer-col-center']}>
  <p className={Style['footer-text']}>Nuestras Redes</p>
  
  <a href="https://www.instagram.com/teoforevercomputers" target="_blank" rel="noopener noreferrer">
  <img src="https://i.ibb.co/KpNcQXsv/instagram.png" alt="Instagram" height="40" class="redes"/>
  </a>
  
  
  <a href="https://www.facebook.com/teoforevercomputers" target="_blank" rel="noopener noreferrer">
  <img src="https://i.ibb.co/ynXjm6RP/facebook.png" alt="Instagram" height="40" class="redes"/>
  </a>
  
  <a href="https://wa.me/+5491136940693" target="_blank" rel="noopener noreferrer">
  <img src="https://i.ibb.co/PvmmDLVg/whatsapp.png" alt="Instagram" height="40" class="redes"/>
  </a>
</div>
    
<div className={Style['footer-col-right']}>
      <p className={Style['footer-text']}>  
        Contactanos por WhatSaap</p>
       <img src="https://i.ibb.co/CK8CfBx0/qr.jpg" alt="QR" height="80" class="qr-code"/>
</div>

</div>
    <p className={Style['footer-text']}>
        © 2026 Tienda Online - Todos los derechos reservados
    </p>
  <p className={Style['footer-text']}>
        Talento Tech - Proyecto de Desarrollo Web para Talento Tech
    </p>
  </footer>
);

};

export default Footer;