import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import styles from './Contacto.module.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (enviado) setEnviado(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
    });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.titulo}>Contacto</h2>
        <p className={styles.subtitulo}>
          Completá tus datos y escribinos tu consulta.
        </p>

        {enviado && (
          <div className={styles.alertaExito}>
            <CheckCircle2 size={18} />
            <span>¡Listo! Tu mensaje fue enviado correctamente.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <div className={styles.grupoCampo}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className={styles.campo}
              placeholder="Tu nombre"
            />
          </div>

          <div className={styles.grupoCampo}>
            <label htmlFor="email" className={styles.label}>
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={styles.campo}
              placeholder="tu@correo.com"
            />
          </div>

          <div className={styles.grupoCampo}>
            <label htmlFor="asunto" className={styles.label}>
              Asunto
            </label>
            <input
              id="asunto"
              type="text"
              name="asunto"
              required
              value={formData.asunto}
              onChange={handleChange}
              className={styles.campo}
              placeholder="Ej: Consulta por un componente"
            />
          </div>

          <div className={styles.grupoCampo}>
            <label htmlFor="mensaje" className={styles.label}>
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              value={formData.mensaje}
              onChange={handleChange}
              className={`${styles.campo} ${styles.textarea}`}
              placeholder="Escribí tu mensaje acá..."
            />
          </div>

          <button type="submit" className={styles.botonEnviar}>
            <Send size={17} />
            <span>Enviar mensaje</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contacto;