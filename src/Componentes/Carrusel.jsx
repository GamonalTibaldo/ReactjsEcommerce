import { useState, useEffect } from 'react';
import styles from './Carrusel.module.css';

// Podés importar tus imágenes locales o usar rutas relativas/placeholders
const slides = [
  {
    id: 1,
    url: 'https://i.ibb.co/PvcDm4Cq/1.jpg',
    alt: ''
  },
  {
    id: 2,
    url: 'https://i.ibb.co/tp6Wm3y5/2.jpg',
    alt: ''
  },  {
    id: 3,
    url: 'https://i.ibb.co/Jw8jLsJb/3.jpg',
    alt: ''
  }
];

const Carrusel = () => {
  const [indiceActual, setIndiceActual] = useState(0);

  // Auto-play cada 4 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      siguiente();
    }, 4000);

    return () => clearInterval(intervalo);
  }, [indiceActual]);

  const siguiente = () => {
    setIndiceActual((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const anterior = () => {
    setIndiceActual((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className={styles.contenedor}>
      {/* Diapositivas */}
      <div className={styles.slide}>
        <img
          src={slides[indiceActual].url}
          alt={slides[indiceActual].alt}
          className={styles.imagen}
        />
      </div>

     
      <div className={styles.indicadores}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.punto} ${index === indiceActual ? styles.activo : ''}`}
            onClick={() => setIndiceActual(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carrusel;