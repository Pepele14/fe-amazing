// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const NoteDetail = () => {
//   const { id } = useParams();
//   const [note, setNote] = useState(null);

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const response = await fetch(`/auth/public/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch note");
//         }
//         const data = await response.json();
//         setNote(data);
//       } catch (error) {
//         console.error("Error fetching note:", error);
//       }
//     };

//     fetchNote();
//   }, [id]);

//   if (!note) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Note Detail</h1>
//       <p>{note.content}</p>
//       <p>Date: {new Date(note.createdAt).toLocaleDateString()}</p>
//     </div>
//   );
// };

// export default NoteDetail;
