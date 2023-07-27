// import  { useState } from "react";

// const ReadMoreLess = ({ limit, shownRead }) => {
//   const text = shownRead;
//   const [isReadMoreShown, setReadMoreShown] = useState(false);

//   const toggleBtn = () => {
//     setReadMoreShown((prevState) => !prevState);
//   };

//   return (
//     <div>
//       {isReadMoreShown ? text : text.substr(0, limit)}
//       {text.length > limit && (
//         <button onClick={toggleBtn}>
//           {isReadMoreShown ? "Read Less" : "Read More"}
//         </button>
//       )}
//     </div>
//   );
// };

// ReadMoreLess.defaultProps = {
//   limit: 100, // Set your desired default value for 'limit' here
//   shownRead: "", // Set your desired default value for 'shownRead' here
// };

// export default ReadMoreLess;

