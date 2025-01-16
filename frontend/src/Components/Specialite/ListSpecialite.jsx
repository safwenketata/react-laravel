import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ListSpecialite = () => {
  const [specialites, setSpecialites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSpecialite, setCurrentSpecialite] = useState({ id: null, nomspecialite: '' });

  // Fetch specialties
  const getSpecialites = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/specialite/');
      setSpecialites(response.data);
    } catch (error) {
      console.error('Error fetching specialites:', error);
    }
  };

  useEffect(() => {
    getSpecialites();
  }, []);

  // Handle opening the modal for adding a specialty
  const handleAdd = () => {
    setCurrentSpecialite({ id: null, nomspecialite: '' });
    setIsEditMode(false);
    setShowModal(true);
  };

  // Handle opening the modal for editing a specialty
  const handleEdit = (id) => {
    const specialiteToEdit = specialites.find((specialite) => specialite.id === id);
    setCurrentSpecialite(specialiteToEdit);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Handle deleting a specialty
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this specialité?')) {
      try {
        await axios.delete(`http://localhost:8000/api/specialite/${id}`);
        alert('Specialité deleted successfully.');
        setSpecialites(specialites.filter((specialite) => specialite.id !== id));
      } catch (error) {
        console.error('Error deleting specialité:', error);
        alert('Failed to delete the specialité.');
      }
    }
  };

  // Handle form submission (both add and edit)
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // Update specialty
        await axios.put(`http://localhost:8000/api/specialite/${currentSpecialite.id}`, {
          nomspecialite: currentSpecialite.nomspecialite,
        });
        alert('Specialité updated successfully.');
      } else {
        // Add new specialty
        await axios.post('http://localhost:8000/api/specialite/', {
          nomspecialite: currentSpecialite.nomspecialite,
        });
        alert('Specialité added successfully.');
      }

      setShowModal(false);
      getSpecialites(); // Refresh the list
    } catch (error) {
      console.error('Error saving specialité:', error);
      alert('Failed to save the specialité.');
    }
  };

  return (
    <div>
      <h2>Liste des spécialités</h2>
      <Button onClick={handleAdd} variant="success" className="mb-3">
        Add Specialité
      </Button>

      <table className="table table-striped">
        <thead>
          <tr>
            <td>Nom spécialité</td>
            <td>Update</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {specialites &&
            specialites.map((specialite) => (
              <tr key={specialite.id}>
                <td>{specialite.nomspecialite}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(specialite.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(specialite.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Specialité */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? 'Edit Specialité' : 'Add Specialité'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom spécialité</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter specialité name"
                value={currentSpecialite.nomspecialite}
                onChange={(e) =>
                  setCurrentSpecialite({
                    ...currentSpecialite,
                    nomspecialite: e.target.value,
                  })
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

export default ListSpecialite;
