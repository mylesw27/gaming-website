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

  const handlelinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={handleDescriptionChange} required />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={handleCategoryChange} required>
            <option value="">Select a category</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Strategy">Strategy</option>
            <option value="RPG">RPG</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Simulation">Simulation</option>
            <option value="Sports">Sports</option>
            <option value="Racing">Racing</option>
            <option value="Card & Board">Card & Board</option>
            <option value="Casual">Casual</option>
            <option value="MMO">MMO</option>
            <option value="Arcade">Arcade</option>
          </select>
        </div>
        <div>
          <label>Techstack:</label>
          <input type="text" value={techstack} onChange={handleTechstackChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="text" value={image} onChange={handleImageChange} required />
        </div>
        <div>
          <label>Github:</label>
          <input type="text" value={github} onChange={handleGithubChange} required />
        </div>
        <div>
          <label>Link:</label>
          <input type="text" value={link} onChange={handlelinkChange} required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
