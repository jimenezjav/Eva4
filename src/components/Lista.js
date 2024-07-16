import React from 'react';
import PropTypes from 'prop-types';
import './Cambios.css';

/**
 * Componente funcional que representa la lista de productos.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {Array} props.productos - Lista de productos a mostrar.
 * @param {function} props.handleDelete - Función para manejar la eliminación de productos.
 * @param {function} props.handleEdit - Función para manejar la edición de productos.
 */

const Lista = ({ productos, eliminarProducto, editarProducto }) => {
  return (
    <div className="lista-container">
      <h2>Listado de productos</h2>
      {productos.map((producto) => (
        <div key={producto.id} className="producto-card">
          <div className="card-img-wrapper">
            <img src={producto.imagenUrl} alt={producto.nombre} className="card-img" />
          </div>
          <div className="card-body">
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text"><strong>Categoría:</strong> {producto.categoria}</p>
            <p className="card-text"><strong>Precio:</strong> {producto.precio}</p>
            <p className="card-text"><strong>Descripción:</strong> {producto.descripcion}</p>
            <button onClick={() => editarProducto(producto)} className="btn btn-secondary">
              Editar
            </button>
            <button onClick={() => eliminarProducto(producto.id)} className="btn btn-danger">
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

Lista.propTypes = {
  productos: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired
};

export default Lista;





