import React from 'react';
import { Link } from 'react-router-dom';
import Style from './InfoPages.module.css';

const PreguntasFrecuentes = () => {
  const faqs = [
    {
      id: 'faq1',
      pregunta: '¿Cómo realizo una compra en la tienda?',
      respuesta:
        'Navegá por nuestras categorías de productos, agregá los componentes o periféricos que necesites al carrito y completá tus datos de envío o retiro. Una vez confirmado el pago, recibirás el comprobante y el detalle de seguimiento por correo electrónico o WhatsApp.'
    },
    {
      id: 'faq2',
      pregunta: '¿Arman PC a medida según mi presupuesto?',
      respuesta:
        'Sí. Si comprás todos los componentes en TEOFOREVER COMPUTERS (procesador, placa madre, memoria RAM, almacenamiento, fuente y gabinete), realizamos el ensamblado profesional, gestión de cables, actualización de BIOS e instalación de sistema operativo de prueba sin cargo adicional.'
    },
    {
      id: 'faq3',
      pregunta: '¿Qué hago si no sé si un componente es compatible con mi PC actual?',
      respuesta:
        'Antes de ofertar, escribinos a través de nuestra sección de Contacto o por WhatsApp indicándonos el modelo exacto de tu placa madre, procesador y fuente de alimentación. Nuestro equipo técnico verifica la compatibilidad sin compromiso.'
    },
    {
      id: 'faq4',
      pregunta: '¿Cuáles son las opciones y demoras de envío?',
      respuesta:
        'Realizamos envíos a todo el país mediante correo y mensajería privada en AMBA (CABA y Gran Buenos Aires). Los despachos se realizan dentro de las 24 a 48 horas hábiles posteriores a la acreditación del pago.'
    },
    {
      id: 'faq5',
      pregunta: '¿Puedo retirar mi pedido personalmente?',
      respuesta:
        'Sí, podés coordinar el retiro sin costo por nuestro punto de entrega en Zona Oeste (Buenos Aires) una vez que te confirmemos que el pedido está listo para retirar.'
    },
    {
      id: 'faq6',
      pregunta: '¿Los productos son nuevos y tienen garantía?',
      respuesta:
        'Todos nuestros componentes y periféricos son 100% nuevos, originales y se entregan en caja cerrada con garantía oficial. Podés consultar los plazos y condiciones detalladas en nuestra sección de Garantía y Devoluciones.'
    },
    {
      id: 'faq7',
      pregunta: '¿Realizan servicio técnico, limpieza o actualización de equipos?',
      respuesta:
        'Sí, además de la venta de hardware brindamos servicio de mantenimiento preventivo, cambio de pasta térmica, diagnóstico de fallas, instalación de software y upgrades de memoria o discos SSD.'
    }
  ];

  return (
    <section className={Style.pageContainer}>
      <header className={Style.header}>
        <h1 className={Style.title}>Preguntas Frecuentes</h1>
        <p className={Style.subtitle}>
          Resolvemos tus principales dudas sobre compras, envíos, armado de equipos y soporte técnico en{' '}
          <strong>TEOFOREVER COMPUTERS</strong>.
        </p>
      </header>

      <div className="accordion" id="accordionFAQ">
        {faqs.map((item, index) => (
          <div className={`accordion-item ${Style.faqItem}`} key={item.id}>
            <h2 className="accordion-header" id={`heading-${item.id}`}>
              <button
                className={`accordion-button ${index !== 0 ? 'collapsed' : ''} ${Style.faqButton}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${item.id}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={`collapse-${item.id}`}
              >
                {item.pregunta}
              </button>
            </h2>
            <div
              id={`collapse-${item.id}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              aria-labelledby={`heading-${item.id}`}
              data-bs-parent="#accordionFAQ"
            >
              <div className={`accordion-body ${Style.faqBody}`}>
                {item.respuesta}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={Style.ctaBox}>
        <p className="mb-0">
          ¿Tenés otra consulta técnica o necesitás asesoramiento personalizado?
        </p>
        <Link to="/contacto" className={Style.ctaButton}>
          Ir a Contacto
        </Link>
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;