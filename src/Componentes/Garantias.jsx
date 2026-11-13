import React from 'react';
import { Link } from 'react-router-dom';
import Style from './InfoPages.module.css';

const Garantias = () => {
  return (
    <section className={Style.pageContainer}>
      <header className={Style.header}>
        <h1 className={Style.title}>Política de Garantías y Devoluciones</h1>
        <p className={Style.subtitle}>
          En <strong>TEOFOREVER COMPUTERS</strong> trabajamos con productos originales y verificados para asegurar el máximo rendimiento de tu equipo.
        </p>
      </header>

      <article className={Style.articleBlock}>
        <h2 className={Style.sectionTitle}>1. Derecho de Arrepentimiento (Compras Online)</h2>
        <p>
          De acuerdo con la Ley de Defensa del Consumidor (Ley N.º 24.240), tenés derecho a revocar tu compra dentro de los <strong>10 días corridos</strong> contados a partir de la fecha en que recibís el producto.
        </p>
        <ul className={Style.list}>
          <li>El producto debe encontrarse sin uso, en perfecto estado estético y funcional.</li>
          <li>Debe devolverse en su embalaje original completo (cajas, blísteres, manuales, cables, accesorios y protectores) junto con el comprobante de compra.</li>
          <li>En caso de arrepentimiento sin falla técnica, los costos de envío de devolución corren por cuenta del comprador.</li>
        </ul>
      </article>

      <article className={Style.articleBlock}>
        <h2 className={Style.sectionTitle}>2. Garantía por Fallas de Fabricación</h2>
        <ul className={Style.list}>
          <li>
            <strong>Hardware, componentes y periféricos:</strong> Cobertura oficial de <strong>6 a 36 meses</strong> según el fabricante y la categoría del producto.
          </li>
          <li>
            <strong>Equipos armados a medida (PC completas):</strong> Cuentan con <strong>12 meses de garantía</strong> sobre el armado y diagnóstico integral en nuestro taller, además de la garantía individual de cada componente.
          </li>
        </ul>
      </article>

      <article className={Style.articleBlock}>
        <h2 className={Style.sectionTitle}>3. Exclusiones de la Garantía</h2>
        <ul className={Style.list}>
          <li>Daños físicos evidentes: golpes, caídas, pines doblados o quebrados, pistas cortadas o componentes quemados.</li>
          <li>Contacto con líquidos, humedad excesiva, sulfatación o suciedad extrema.</li>
          <li>Daños ocasionados por descargas eléctricas, picos de tensión o uso de fuentes inadecuadas.</li>
          <li>Alteración, rotura o remoción de las fajas de seguridad, etiquetas de serie (S/N) o sellos del fabricante.</li>
          <li>Uso indebido, overclocking extremo fuera de especificaciones o intervención técnica ajena a <strong>TEOFOREVER COMPUTERS</strong>.</li>
        </ul>
      </article>

      <article className={Style.articleBlock}>
        <h2 className={Style.sectionTitle}>4. Procedimiento para Gestionar un Cambio o Garantía</h2>
        <ol className={Style.list}>
          <li>
            <strong>Contacto inicial:</strong> Comunicate a través de nuestra sección de{' '}
            <Link to="/contacto" className={Style.inlineLink}>Contacto</Link>{' '}
            indicando tu número de pedido, el producto y una breve descripción del problema.
          </li>
          <li>
            <strong>Evaluación técnica:</strong> Realizaremos el diagnóstico en nuestro soporte técnico dentro de un plazo de <strong>48 a 72 horas hábiles</strong>.
          </li>
          <li>
            <strong>Resolución:</strong> Confirmada la falla de fábrica, se procederá al cambio directo, entrega de un producto equivalente o emisión de nota de crédito.
          </li>
        </ol>
      </article>
    </section>
  );
};

export default Garantias;