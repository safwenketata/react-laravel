import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ListLivre = () => {
  const [livres, setLivres] = useState([]);
  const [auteurs, setAuteurs] = useState([]);
  const [editeurs, setEditeurs] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [currentLivre, setCurrentLivre] = useState({
    id: null,
    titre: '',
    annedition: '',
    prix: '',
    qtestock: '',
    couverture: '',
    auteur: '',
    editeur: '',
    specialite: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [livresRes, auteursRes, editeursRes, specialitesRes] = await Promise.all([
          axios.get('http://localhost:8000/api/livres/'),
          axios.get('http://localhost:8000/api/auteurs/'),
          axios.get('http://localhost:8000/api/editeurs/'),
          axios.get('http://localhost:8000/api/specialite/'),
        ]);

        setLivres(livresRes.data);
        setAuteurs(auteursRes.data);
        setEditeurs(editeursRes.data);
        setSpecialites(specialitesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const payload = {
        titre: currentLivre.titre,
        annedition: currentLivre.annedition,
        prix: currentLivre.prix,
        qtestock: currentLivre.qtestock,
        couverture: currentLivre.couverture,
        auteur_id: currentLivre.auteur,
        editeur_id: currentLivre.editeur,
        specialite_id: currentLivre.specialite,
      };

      if (isEditMode) {
        await axios.put(`http://localhost:8000/api/livres/${currentLivre.id}/`, payload);
        alert('Livre updated successfully.');
      } else {
        await axios.post('http://localhost:8000/api/livres/', payload);
        alert('Livre added successfully.');
      }

      setShowModal(false);
      const response = await axios.get('http://localhost:8000/api/livres/');
      setLivres(response.data);
    } catch (error) {
      console.error('Error saving livre:', error.response || error.message);
      alert('Failed to save the livre. Please try again.');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/livres/${id}/`);
      alert('Livre deleted successfully.');
      setLivres((prevLivres) => prevLivres.filter((livre) => livre.id !== id));
    } catch (error) {
      console.error('Error deleting livre:', error);
      alert('Failed to delete the livre.');
    }
  };

  return (
    <div>
      <h2>Liste des Livres</h2>
      <Button onClick={() => { setIsEditMode(false); setCurrentLivre({}); setShowModal(true); }} variant="success" className="mb-3">
        Add Livre
      </Button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Editeur</th>
            <th>Spécialité</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {livres.map((livre) => (
            <tr key={livre.id}>
              <td>{livre.titre}</td>
              <td>{livre.auteur?.nomauteur || 'N/A'}</td>
              <td>{livre.editeur?.maisonedit || 'N/A'}</td>
              <td>{livre.specialite?.nomspecialite || 'N/A'}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setIsEditMode(true);
                    setCurrentLivre({
                      ...livre,
                      auteur: livre.auteur?.id,
                      editeur: livre.editeur?.id,
                      specialite: livre.specialite?.id,
                    });
                    setShowModal(true);
                  }}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(livre.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Livre' : 'Add Livre'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                value={currentLivre.titre}
                onChange={(e) => setCurrentLivre({ ...currentLivre, titre: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Année d'édition</Form.Label>
              <Form.Control
                type="text"
                value={currentLivre.annedition}
                onChange={(e) => setCurrentLivre({ ...currentLivre, annedition: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="text"
                value={currentLivre.prix}
                onChange={(e) => setCurrentLivre({ ...currentLivre, prix: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantité en stock</Form.Label>
              <Form.Control
                type="text"
                value={currentLivre.qtestock}
                onChange={(e) => setCurrentLivre({ ...currentLivre, qtestock: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Couverture</Form.Label>
              <Form.Control
                type="text"
                value={currentLivre.couverture}
                onChange={(e) => setCurrentLivre({ ...currentLivre, couverture: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Auteur</Form.Label>
              <Form.Control
                as="select"
                value={currentLivre.auteur}
                onChange={(e) => setCurrentLivre({ ...currentLivre, auteur: e.target.value })}
              >
                <option value="">Select Auteur</option>
                {auteurs.map((auteur) => (
                  <option key={auteur.id} value={auteur.id}>
                    {auteur.nomauteur}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Editeur</Form.Label>
              <Form.Control
                as="select"
                value={currentLivre.editeur}
                onChange={(e) => setCurrentLivre({ ...currentLivre, editeur: e.target.value })}
              >
                <option value="">Select Editeur</option>
                {editeurs.map((editeur) => (
                  <option key={editeur.id} value={editeur.id}>
                    {editeur.maisonedit}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Specialité</Form.Label>
              <Form.Control
                as="select"
                value={currentLivre.specialite}
                onChange={(e) => setCurrentLivre({ ...currentLivre, specialite: e.target.value })}
              >
                <option value="">Select Specialité</option>
                {specialites.map((specialite) => (
                  <option key={specialite.id} value={specialite.id}>
                    {specialite.nomspecialite}
                  </option>
                ))}
              </Form.Control>
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

export default ListLivre;
