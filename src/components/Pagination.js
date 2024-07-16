import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

/**
 * Componente funcional que representa la paginación de productos.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {number} props.currentPage - Página actual de la paginación.
 * @param {number} props.totalPages - Total de páginas disponibles.
 * @param {function} props.handlePageChange - Función para manejar el cambio de página.
 */
const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
 // Calcular números de página según productos por página y total de productos
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number} 
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
