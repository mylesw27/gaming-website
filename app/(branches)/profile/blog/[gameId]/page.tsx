'use client';
import React, { useState, useEffect } from 'react';
import jwt, {JwtPayload} from 'jsonwebtoken';

// Interfaces
interface Post {
  title: string;
  content: string;
  gameId: number;
  imageLink: string;
  videoLink: string;
}

interface Game {
  _id: string;
  title: string;
  userName: string;
  userId: number;
  category: string;
  image: string;
  description: string;
}

interface BlogFormProps {
  onSubmit: (newPost: Post) => void;
}

const BlogPostForm: React.FC<BlogFormProps> = ({ onSubmit }) => {
  // State Hooks
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  // Effect Hook for Initialization
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Token validation
    if (!token) {
      console.log('Token not found.');
      return;
    }

    const decodedToken = jwt.decode(token);

    if (!decodedToken || typeof decodedToken !== 'object') {
      console.log('Decoded token not found or invalid.');
      return;
    }

    // Fetch games related to user
    const getUserGames = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api-v1/game/user/${decodedToken.id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        setGames(data.games);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    getUserGames();
  }, []);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGameId) {
      console.log('No game selected');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      console.log('Token not found.');
      return;
    }

    const decodedToken = jwt.decode(token) as JwtPayload | null;
    const gameId = selectedGameId;
    console.log('gameId', gameId)

    try {
      const response = await fetch(
        `http://localhost:8000/api-v1/post/${selectedGameId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
          body: JSON.stringify({
            userName: decodedToken ? decodedToken.userName : '',
            title,
            content,
            gameId,
            imageLink,
            videoLink,
          }),
        }
        
      );

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      console.log(data);
      onSubmit(data.newBlogPost);

      // Clear form fields after successful submission
      setTitle('');
      setContent('');
      setImageLink('');
      setVideoLink('');
      setSelectedGameId(null);
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle and display the error to the user
    }
  };
  
return (
  <div className="form-container p-8">
    <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-semibold">
        Title
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block font-semibold">
        Game
        <select
          value={selectedGameId || ""}
          onChange={(e) => setSelectedGameId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select a game
          </option>
          {games.map((game) => (
            <option key={game._id} value={game._id}>
              {game.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block font-semibold">
        Content
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block font-semibold">
        Image URL
        <input
          type="url"
          placeholder="Image URL"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block font-semibold">
        Video Link URL
        <input
          type="url"
          placeholder="Video Link URL"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>
      <div className="form-actions mt-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700">Create Post</button>
        <button type="button" onClick={() => setShowPreview(!showPreview)} className="ml-4 px-4 py-2 bg-gray-400 text-white font-bold rounded cursor-pointer hover:bg-gray-500">
          Preview Post
        </button>
      </div>
    </form>
    <div className="preview-section mt-8">
      {showPreview && (
        <div className="preview-content border p-4 rounded">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-4">{content}</p>
          {imageLink && <img src={imageLink} alt={`Image for ${title}`} className="mt-4 rounded" />}
          {videoLink && (
            <iframe src={videoLink} title={`Video for ${title}`} className="mt-4 w-full h-56 rounded" />
          )}
        </div>
      )}
    </div>
  </div>
);
}

export default BlogPostForm;
