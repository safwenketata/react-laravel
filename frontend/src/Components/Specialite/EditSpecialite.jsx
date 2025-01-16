// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const ListSpecialites = () => {
//   const [specialites, setSpecialites] = useState([]);
//   const [selectedSpecialite, setSelectedSpecialite] = useState(null); // To store the selected specialité for editing
//   const [newName, setNewName] = useState(''); // To store the updated name for the selected specialité

//   const getSpecialites = async () => {
//     await axios
//       .get('http://localhost:8000/api/specialite/')
//       .then((res) => {
//         setSpecialites(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     getSpecialites();
//   }, []);

//   const handleEdit = (specialite) => {
//     setSelectedSpecialite(specialite); // Set the selected specialité for editing
//     setNewName(specialite.nomspecialite); // Pre-fill the name for editing
//   };

//   const handleUpdate = async () => {
//     if (selectedSpecialite && newName) {
//       await axios
//         .put(`http://localhost:8000/api/specialite/${selectedSpecialite.id}`, {
//           nomspecialite: newName,
//         })
//         .then((res) => {
//           alert('Specialité updated successfully');
//           setSelectedSpecialite(null); // Close the modal
//           setNewName(''); // Reset the name field
//           getSpecialites(); // Refresh the specialité list
//         })
//         .catch((error) => {
//           console.log(error);
//           alert('Error updating specialité');
//         });
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this specialité?')) {
//       await axios
//         .delete(`http://localhost:8000/api/specialite/${id}`)
//         .then((res) => {
//           alert('Specialité deleted successfully');
//           getSpecialites(); // Refresh the specialité list
//         })
//         .catch((error) => {
//           console.log(error);
//           alert('Error deleting specialité');
//         });
//     }
//   };

//   return (
//     <div>
//       <h2>Liste des spécialités</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <td>Nom spécialité</td>
//             <td>Update</td>
//             <td>Delete</td>
//           </tr>
//         </thead>
//         <tbody>
//           {specialites &&
//             specialites.map((specialite, index) => (
//               <tr key={index}>
//                 <td>{specialite.nomspecialite}</td>
//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm"
//                     onClick={() => handleEdit(specialite)}
//                   >
//                     Update
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(specialite.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       {/* Modal for editing specialité */}
//       {selectedSpecialite && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Edit Specialité</h3>
//             <input
//               type="text"
//               value={newName}
//               onChange={(e) => setNewName(e.target.value)}
//               placeholder="Enter new specialité name"
//             />
//             <button onClick={handleUpdate} className="btn btn-primary">
//               Save Changes
//             </button>
//             <button
//               onClick={() => setSelectedSpecialite(null)}
//               className="btn btn-secondary"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListSpecialites;
