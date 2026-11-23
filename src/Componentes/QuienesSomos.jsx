import { Users, Wrench, Cpu, ShieldCheck } from 'lucide-react';
import styles from './QuienesSomos.module.css';

const QuienesSomos = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.cardPrincipal}>
        <header className={styles.header}>
          <div className={styles.iconoHeader}>
            <Users size={26} />
          </div>
          <div>
            <span className={styles.eyebrow}>TEOFOREVER COMPUTERS</span>
            <h2 className={styles.titulo}>Sobre Nosotros</h2>
          </div>
        </header>

        <p className={styles.textoCuerpo}>
          Sabemos que hoy en día la tecnología es el motor de todo lo que hacemos.
          Por eso, en{' '}
          <span className={styles.marcaDestacada}>TEOFOREVER COMPUTERS</span>{' '}
          nacimos con un propósito claro: simplificar el mundo informático y
          ofrecer respuestas rápidas y efectivas a cada uno de tus problemas
          tecnológicos.
        </p>

        <p className={styles.textoCuerpo}>
          Nos especializamos en brindar soporte técnico personalizado,
          mantenimiento preventivo y provisión de insumos y equipamiento de alta
          calidad. Ya sea que necesites optimizar los equipos de tu hogar o
          estructurar la red informática de tu empresa, abordamos cada desafío
          con el mismo compromiso: excelencia, transparencia y rapidez.
        </p>

        <div className={styles.cierreDestacado}>
          En TEOFOREVER COMPUTERS, tu tranquilidad digital es nuestra prioridad.
        </div>

        <div className={styles.pilaresGrid}>
          <article className={styles.pilarCard}>
            <span className={styles.pilarIcono}>
              <Wrench size={20} />
            </span>
            <h3 className={styles.pilarTitulo}>Soporte y Mantenimiento</h3>
            <p className={styles.pilarTexto}>
              Diagnóstico preciso, mantenimiento preventivo y puesta a punto de
              PCs y notebooks.
            </p>
          </article>

          <article className={styles.pilarCard}>
            <span className={styles.pilarIcono}>
              <Cpu size={20} />
            </span>
            <h3 className={styles.pilarTitulo}>Hardware e Insumos</h3>
            <p className={styles.pilarTexto}>
              Componentes, periféricos y equipamiento seleccionados para rendir
              sin cuellos de botella.
            </p>
          </article>

          <article className={styles.pilarCard}>
            <span className={styles.pilarIcono}>
              <ShieldCheck size={20} />
            </span>
            <h3 className={styles.pilarTitulo}>Hogar y Empresas</h3>
            <p className={styles.pilarTexto}>
              Soluciones a medida, orden de red y atención cercana con trato
              directo.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;