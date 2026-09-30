import styles from './QuienesSomos.module.css';

const QuienesSomos = () => {
  return (
    <div className={styles.container}>
        <h2>Sobre Nosotros</h2>
        <p>
            Sabemos que hoy en día la tecnología es el motor de todo lo que hacemos. 
            Por eso, en <strong>Teoforever Computers</strong> nacimos con un propósito claro: 
            simplificar el mundo informático y ofrecer respuestas rápidas y efectivas a cada uno 
            de tus problemas tecnológicos.
            Nos especializamos en brindar soporte técnico personalizado, mantenimiento preventivo 
            y provisión de insumos y equipamiento de alta calidad. Ya sea que necesites optimizar 
            los equipos de tu hogar o estructurar la red informática de tu empresa, abordamos cada 
            desafío con el mismo compromiso: excelencia, transparencia y rapidez.
        </p>
        <p class="about-highlight">
            En Teoforever Computers, tu tranquilidad digital es nuestra prioridad.
        </p>   

    </div>
  );
};

export default QuienesSomos;
