// import axios from 'axios';
// import React, { useState } from 'react';

// const AddSpecialite = () => {
//   const [nomspecialite, setNomSpecialite] = useState(''); // To store the new specialité name

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent form submission default behavior

//     // Check if the input field is not empty
//     if (nomspecialite.trim() === '') {
//       alert('Please enter a valid name for the specialité');
//       return;
//     }

//     // Send POST request to add the specialité
//     await axios
//       .post('http://localhost:8000/api/specialite/', {
//         nomspecialite: nomspecialite,
//       })
//       .then((res) => {
//         alert('Specialité added successfully');
//         setNomSpecialite(''); // Reset the input field
//       })
//       .catch((error) => {
//         console.log(error);
//         alert('Error adding specialité');
//       });
//   };

//   return (
//     <div>
//       <h2>Add New Specialité</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="nomspecialite">Nom Specialité</label>
//           <input
//             type="text"
//             id="nomspecialite"
//             className="form-control"
//             value={nomspecialite}
//             onChange={(e) => setNomSpecialite(e.target.value)}
//             placeholder="Enter specialité name"
//           />
//         </div>
//         <button type="submit" className="btn btn-success mt-3">
//           Add Specialité
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddSpecialite;