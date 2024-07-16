import React from 'react';
import PropTypes from 'prop-types';
import './Cambios.css';

/**
 * Componente funcional que representa el componente de filtros.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {function} props.handleFilter - Función para manejar el filtrado de productos.
 */
const Filtros = ({ busqueda, setBusqueda }) => {
  return (
    <div className="filtros-container">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
};

Filtros.propTypes = {
  handleFilter: PropTypes.func.isRequired
};

export default Filtros;


