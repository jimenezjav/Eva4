import React, { useState, useEffect } from 'react';
import './Cambios.css';
import PropTypes from 'prop-types';


/**
 * Componente funcional que representa el formulario de ingreso de productos.
 * Utiliza React para el manejo de estados y validación de datos.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {function} props.handleSubmit - Función para manejar el envío del formulario.
 */

const Formulario = ({ agregarProducto, productoAEditar, setProductoAEditar, editarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [errores, setErrores] = useState({});

  // Cargar datos del producto a editar al formulario si existe uno seleccionado
  useEffect(() => {
    if (productoAEditar) {
      setNombre(productoAEditar.nombre);
      setCategoria(productoAEditar.categoria);
      setPrecio(productoAEditar.precio);
      setDescripcion(productoAEditar.descripcion);
      setImagenUrl(productoAEditar.imagenUrl);
    }
  }, [productoAEditar]);

   // Validar el formulario antes de enviar los datos
  const validateForm = () => {
    const nombrePattern = /^[A-Z][a-zA-Z0-9\s]*$/;
    const categoriaPattern = /^[A-Z][a-zA-Z\s]*$/;
    const precioPattern = /^\$\d{1,3}(\.\d{3})*CLP$/;
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    const newErrores = {};

    if (!nombrePattern.test(nombre)) {
      newErrores.nombre = 'El nombre debe comenzar con una letra mayúscula y no puede estar vacío.';
    }
    if (!categoriaPattern.test(categoria)) {
      newErrores.categoria = 'La categoría debe comenzar con una letra mayúscula y no puede estar vacía.';
    }
    if (!precioPattern.test(precio)) {
      newErrores.precio = 'El precio debe tener el formato correcto de pesos chilenos (ejemplo: $12.500CLP).';
    }
    if (!descripcion.trim()) {
      newErrores.descripcion = 'La descripción no puede estar vacía.';
    }
    if (!urlPattern.test(imagenUrl)) {
      newErrores.imagenUrl = 'La URL de la imagen no es válida.';
    }

    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  };
// Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const producto = {
        id: productoAEditar ? productoAEditar.id : Date.now(),
        nombre,
        categoria,
        precio,
        descripcion,
        imagenUrl
      };
      if (productoAEditar) {
        editarProducto(producto);
      } else {
        agregarProducto(producto);
      }
      // Limpiar campos y errores después de enviar
      setNombre('');
      setCategoria('');
      setPrecio('');
      setDescripcion('');
      setImagenUrl('');
      setErrores({});
      setProductoAEditar(null);
    }
  };

  return (
    <div className="formulario-container">
      <div className="formulario-wrapper">
        <h2>{productoAEditar ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Producto:</label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>
          <div className="form-group">
            <label>Categoría:</label>
            <input
              type="text"
              className={`form-control ${errores.categoria ? 'is-invalid' : ''}`}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            />
            {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="text"
              className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
            {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
            {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
          </div>
          <div className="form-group">
            <label>URL de la Imagen:</label>
            <input
              type="text"
              className={`form-control ${errores.imagenUrl ? 'is-invalid' : ''}`}
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              required
            />
            {errores.imagenUrl && <div className="invalid-feedback">{errores.imagenUrl}</div>}
          </div>
          <button type="submit" className="btn btn-primary">{productoAEditar ? 'Guardar Cambios' : 'Agregar Producto'}</button>
        </form>
      </div>
    </div>
  );
};

Formulario.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default Formulario;
