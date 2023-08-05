import  { useState } from 'react';

const ReadMoreButton = ({ content }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const displayContent = showFullContent ? content : content.slice(0, 50);

  return (
    <div>
      <p>{displayContent}</p>
      {content.length > 50 && (
        <button onClick={handleToggleContent}>
          {showFullContent ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default ReadMoreButton;


