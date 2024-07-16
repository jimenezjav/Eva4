import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';


/**
 * Componente funcional que representa el modal de actualización de producto.
 * Utiliza Reactstrap para la estructura del modal y la gestión de estados.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {function} props.toggle - Función para abrir o cerrar el modal.
 * @param {function} props.handleUpdate - Función para manejar la actualización del producto.
 * @param {Object} props.product - Objeto que contiene los datos del producto a actualizar.
 */

const ActualizarProducto = ({ isOpen, cerrarModalActualizar, productoAEditar, editarProducto }) => {
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    imagenUrl: ''
  });

  useEffect(() => {
    if (productoAEditar) {
      setForm(productoAEditar);
    }
  }, [productoAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editarProducto(form);
    cerrarModalActualizar();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div>
          <h3>Editar Producto</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>ID:</label>
          <input className="form-control" readOnly type="text" value={form.id} />
        </FormGroup>

        <FormGroup>
          <label>Nombre:</label>
          <input
            className="form-control"
            name="nombre"
            type="text"
            onChange={handleChange}
            value={form.nombre}
            required
            pattern="^[A-Z][a-zA-Z0-9]*"
            title="Debe comenzar con mayúscula y puede contener mayúsculas, minúsculas y números"
          />
        </FormGroup>

        <FormGroup>
          <label>Categoría:</label>
          <input
            className="form-control"
            name="categoria"
            type="text"
            onChange={handleChange}
            value={form.categoria}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Precio:</label>
          <input
            className="form-control"
            name="precio"
            type="text"
            onChange={handleChange}
            value={form.precio}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Descripción:</label>
          <textarea
            className="form-control"
            name="descripcion"
            onChange={handleChange}
            value={form.descripcion}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>URL de Imagen:</label>
          <input
            className="form-control"
            name="imagenUrl"
            type="url"
            onChange={handleChange}
            value={form.imagenUrl}
            required
          />
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
        <Button color="danger" onClick={cerrarModalActualizar}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
ActualizarProducto.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};
export default ActualizarProducto;
