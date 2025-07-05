import { useState } from 'react';

const ProductCard = ({ name, price }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(prev => !prev);

  return (
    <div>
      <h2>{name}</h2>
      <p>₹{price}</p>
      <button onClick={toggleLike}>
        {liked ? 'Liked ❤️' : 'Like 🤍'}
      </button>
    </div>
  );
};
