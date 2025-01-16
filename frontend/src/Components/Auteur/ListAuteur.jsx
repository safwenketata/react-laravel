import  { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ListAuteur = () => {
  const [auteurs, setAuteurs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAuteur, setCurrentAuteur] = useState({
    id: null,
    nomauteur: '',
    email: '',
    numtel: '',
  });

  // Fetch auteurs
  const getAuteurs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auteurs/');
      setAuteurs(response.data);
    } catch (error) {
      console.error('Error fetching auteurs:', error);
    }
  };

  useEffect(() => {
    getAuteurs();
  }, []);

  // Handle opening the modal for adding an auteur
  const handleAdd = () => {
    setCurrentAuteur({
      id: null,
      nomauteur: '',
      email: '',
      numtel: '',
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  // Handle opening the modal for editing an auteur
  const handleEdit = (id) => {
    const auteurToEdit = auteurs.find((auteur) => auteur.id === id);
    setCurrentAuteur(auteurToEdit);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Handle deleting an auteur
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this auteur?')) {
      try {
        await axios.delete(`http://localhost:8000/api/auteurs/${id}`);
        alert('Auteur deleted successfully.');
        setAuteurs(auteurs.filter((auteur) => auteur.id !== id));
      } catch (error) {
        console.error('Error deleting auteur:', error);
        alert('Failed to delete the auteur.');
      }
    }
  };

  // Handle form submission (both add and edit)
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // Update auteur
        await axios.put(`http://localhost:8000/api/auteurs/${currentAuteur.id}`, {
          nomauteur: currentAuteur.nomauteur,
          email: currentAuteur.email,
          numtel: currentAuteur.numtel,
        });
        alert('Auteur updated successfully.');
      } else {
        // Add new auteur
        await axios.post('http://localhost:8000/api/auteurs/', {
          nomauteur: currentAuteur.nomauteur,
          email: currentAuteur.email,
          numtel: currentAuteur.numtel,
        });
        alert('Auteur added successfully.');
      }

      setShowModal(false);
      getAuteurs(); // Refresh the list
    } catch (error) {
      console.error('Error saving auteur:', error);
      alert('Failed to save the auteur.');
    }
  };

  return (
    <div>
      <h2>Liste des Auteurs</h2>
      <Button onClick={handleAdd} variant="success" className="mb-3">
        Add Auteur
      </Button>

      <table className="table table-striped">
        <thead>
          <tr>
            <td>Nom de Auteur</td>
            <td>Email</td>
            <td>Numéro de téléphone</td>
            <td>Update</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {auteurs &&
            auteurs.map((auteur) => (
              <tr key={auteur.id}>
                <td>{auteur.nomauteur}</td>
                <td>{auteur.email}</td>
                <td>{auteur.numtel}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(auteur.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(auteur.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Auteur */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Auteur' : 'Add Auteur'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom de  Auteur</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter auteur name"
                value={currentAuteur.nomauteur}
                onChange={(e) =>
                  setCurrentAuteur({ ...currentAuteur, nomauteur: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={currentAuteur.email}
                onChange={(e) =>
                  setCurrentAuteur({ ...currentAuteur, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={currentAuteur.numtel}
                onChange={(e) =>
                  setCurrentAuteur({ ...currentAuteur, numtel: e.target.value })
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

export default ListAuteur;
