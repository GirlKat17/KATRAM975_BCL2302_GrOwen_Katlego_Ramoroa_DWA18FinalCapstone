// import {FaSearch} from "react-icons"
// import  { useState } from 'react';

// const Sort = () => {
  

//   const [items, setItems] = useState();
  
//   const [sortOrder, setSortOrder] = useState("asc");

 

//   const handleSort = () => {
//     // Sort the items based on the sortOrder state (asc or desc)
//     const sortedItems =
//       sortOrder === "asc"
//         ? items.slice().sort((a, b) => a.localeCompare(b))
//         : items.slice().sort((a, b) => b.localeCompare(a));

//     setItems(sortedItems);
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   };

//   return (
//     <div>
     
//       <button onClick={handleSort}>
//         Sort {sortOrder === "asc" ? "Z to A" : "A to Z"}
//       </button>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sort;
