import React from 'react';
import { Link } from 'react-router-dom';
import Style from './InfoPages.module.css';

const MediosPago = () => {
  const medios = [
    {
      titulo: 'Mercado Pago',
      subtitulo: 'Dinero en cuenta, débito y crédito',
      descripcion:
        'Aboná de forma rápida y segura con tu saldo en Mercado Pago, tarjeta de débito o crédito vinculada, o generando un cupón para redes de cobranza.'
    },
    {
      titulo: 'MODO',
      subtitulo: 'Pago con QR y transferencia inmediata',
      descripcion:
        'Pagá directamente desde la app de tu banco o desde MODO escaneando el código QR, aprovechando los reintegros vigentes de tu entidad.'
    },
    {
      titulo: 'Efectivo',
      subtitulo: 'Pago presencial al retirar',
      descripcion:
        'Aboná en efectivo en pesos argentinos al momento de retirar tu compra o equipo armado por nuestro punto de entrega.'
    },
    {
      titulo: 'Tarjetas de Crédito de todos los bancos',
      subtitulo: 'Visa, Mastercard, American Express y Cabal',
      descripcion:
        'Aceptamos tarjetas de crédito emitidas por todos los bancos y entidades financieras del país, con acreditación instantánea.'
    }
  ];

  return (
    <section className={Style.pageContainer}>
      <header className={Style.header}>
        <h1 className={Style.title}>Medios de Pago</h1>
        <p className={Style.subtitle}>
          Elegí la alternativa más cómoda y segura para abonar tus componentes y equipos en <strong>TEOFOREVER COMPUTERS</strong>.
        </p>
      </header>

      <div className={Style.paymentGrid}>
        {medios.map((medio, index) => (
          <div className={Style.paymentCard} key={index}>
            <h2 className={Style.cardTitle}>{medio.titulo}</h2>
            <p className={Style.cardSubtitle}>{medio.subtitulo}</p>
            <p className={Style.cardText}>{medio.descripcion}</p>
          </div>
        ))}
      </div>

      <div className={Style.promoBanner}>
        <h3 className={Style.sectionTitle} style={{ marginBottom: '0.4rem' }}>
          Promociones bancarias y planes de cuotas
        </h3>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          Las cuotas sin interés, topes de reintegro y descuentos especiales se encuentran{' '}
          <strong>sujetos a las promociones vigentes de cada banco y/o billetera virtual</strong>{' '}
          (Mercado Pago / MODO) al momento de realizar la operación. Consultá las condiciones aplicables a tu entidad emisora antes de confirmar el pago.
        </p>
      </div>

      <div className={Style.ctaBox}>
        <span>¿Necesitás presupuesto formal o tenés dudas sobre cómo abonar un armado completo?</span>
        <Link to="/contacto" className={Style.ctaButton}>
          Consultar por Contacto
        </Link>
      </div>
    </section>
  );
};

export default MediosPago;