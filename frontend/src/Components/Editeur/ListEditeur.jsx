import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ListEditeur = () => {
  const [editeurs, setEditeurs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditeur, setCurrentEditeur] = useState({
    id: null,
    maisonedit: '',
    siteweb: '',
    email: '',
  });

  // Fetch editeurs
  const getEditeurs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/editeurs/');
      setEditeurs(response.data);
    } catch (error) {
      console.error('Error fetching editeurs:', error);
    }
  };

  useEffect(() => {
    getEditeurs();
  }, []);

  // Handle opening the modal for adding an editeur
  const handleAdd = () => {
    setCurrentEditeur({
      id: null,
      maisonedit: '',
      siteweb: '',
      email: '',
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  // Handle opening the modal for editing an editeur
  const handleEdit = (id) => {
    const editeurToEdit = editeurs.find((editeur) => editeur.id === id);
    setCurrentEditeur(editeurToEdit);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Handle deleting an editeur
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this editeur?')) {
      try {
        await axios.delete(`http://localhost:8000/api/editeurs/${id}`);
        alert('Editeur deleted successfully.');
        setEditeurs(editeurs.filter((editeur) => editeur.id !== id));
      } catch (error) {
        console.error('Error deleting editeur:', error);
        alert('Failed to delete the editeur.');
      }
    }
  };

  // Handle form submission (both add and edit)
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // Update editeur
        await axios.put(`http://localhost:8000/api/editeurs/${currentEditeur.id}`, {
          maisonedit: currentEditeur.maisonedit,
          siteweb: currentEditeur.siteweb,
          email: currentEditeur.email,
        });
        alert('Editeur updated successfully.');
      } else {
        // Add new editeur
        await axios.post('http://localhost:8000/api/editeurs/', {
          maisonedit: currentEditeur.maisonedit,
          siteweb: currentEditeur.siteweb,
          email: currentEditeur.email,
        });
        alert('Editeur added successfully.');
      }

      setShowModal(false);
      getEditeurs(); // Refresh the list
    } catch (error) {
      console.error('Error saving editeur:', error);
      alert('Failed to save the editeur.');
    }
  };

  return (
    <div>
      <h2>Liste des Editeurs</h2>
      <Button onClick={handleAdd} variant="success" className="mb-3">
        Add Editeur
      </Button>

      <table className="table table-striped">
        <thead>
          <tr>
            <td>Maison d'édition</td>
            <td>Site Web</td>
            <td>Email</td>
            <td>Update</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {editeurs &&
            editeurs.map((editeur) => (
              <tr key={editeur.id}>
                <td>{editeur.maisonedit}</td>
                <td>{editeur.siteweb}</td>
                <td>{editeur.email}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(editeur.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(editeur.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Editeur */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Editeur' : 'Add Editeur'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Maison d'édition</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter maison d'édition"
                value={currentEditeur.maisonedit}
                onChange={(e) =>
                  setCurrentEditeur({ ...currentEditeur, maisonedit: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Site Web</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter website"
                value={currentEditeur.siteweb}
                onChange={(e) =>
                  setCurrentEditeur({ ...currentEditeur, siteweb: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={currentEditeur.email}
                onChange={(e) =>
                  setCurrentEditeur({ ...currentEditeur, email: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListEditeur;
