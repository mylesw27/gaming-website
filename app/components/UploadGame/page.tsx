import React, { useState, ChangeEvent, FormEvent } from 'react';
import jwt from 'jsonwebtoken';

interface GameData {
  userName: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  techstack: string;
  image: string;
  github: string;
  link: string;
}

const Upload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [techstack, setTechstack] = useState('');
  const [image, setImage] = useState('');
  const [github, setGithub] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleTechstackChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTechstack(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  const handleGithubChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGithub(event.target.value);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    message && setMessage('');

    const token = localStorage.getItem('token');

    // if (!link.startsWith('http://') && !link.startsWith('https://')) {
    //   setMessage('Invalid URL - Link must start with http:// or https://');
    //   return;
    // }

    if (token) {
      const { userName } = jwt.decode(token) as { userName: string }; 
      const { userId } = jwt.decode(token) as { userId: string };

      const gameData: GameData = {
        userName,
        userId,
        title,
        description,
        category,
        techstack,
        image,
        github,
        link,
      };

      try {
        const response = await fetch('http://localhost:8000/api-v1/game/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(gameData),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', token);
          const game = jwt.decode(token);
          console.log('Game uploaded successfully:', game);
          console.log('Game Data uploaded successfully:', data);
          window.location.href = '/';
        } else {
          if (response.status === 422) {
            response.json().then((message) => setMessage(message.msg));
          }
          console.error('Error uploading game:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading game:', error);
      }
    } else {
      console.error('Token not found.');
    }
  };

  return (
    <div className="p-8">
       <h2 className="text-2xl font-bold mb-4">Upload Game</h2>
      {message && <p className='text-red-500'>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold">Description:</label>
          <input type="text" value={description} onChange={handleDescriptionChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold">Category:</label>
          <select value={category} onChange={handleCategoryChange} required className="w-full p-2 border rounded">
            <option value="">Select a category</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Strategy">Strategy</option>
            <option value="RPG">RPG</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Simulation">Simulation</option>
            <option value="Sports">Sports</option>
            <option value="Racing">Racing</option>
            <option value="CardandBoard">Card & Board</option>
            <option value="Casual">Casual</option>
            <option value="MMO">MMO</option>
            <option value="Arcade">Arcade</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Techstack:</label>
          <input type="text" value={techstack} onChange={handleTechstackChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold">Image:</label>
          <input type="text" value={image} onChange={handleImageChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold">Github:</label>
          <input type="text" value={github} onChange={handleGithubChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold">Link:</label>
          <input type="text" value={link} onChange={handleLinkChange} required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
