import { useState, useEffect } from 'react';
import styles from './Carrusel.module.css';

// Podés importar tus imágenes locales o usar rutas relativas/placeholders
const slides = [
  {
    id: 1,
    url: 'https://placehold.co/1200x400/0f172a/38bdf8?text=Componentes+de+PC+de+Última+Generación',
    alt: '1'
  },
  {
    id: 2,
    url: 'https://placehold.co/1200x400/1e1b4b/818cf8?text=Servicio+Técnico+Especializado',
    alt: ''
  },  {
    id: 3,
    url: 'https://placehold.co/1200x400/064e3b/34d399?text=Accesorios+Gamer+y+Periféricos',
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