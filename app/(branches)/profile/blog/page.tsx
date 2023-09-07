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
    <div>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          defaultValue=""
          onChange={(e) => setSelectedGameId(e.target.value)}
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
        <input
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        <input
          type="url"
          placeholder="Video Link URL"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <button type="submit">Create Post</button>
        <button type="button" onClick={() => setShowPreview(!showPreview)}>
          Preview Post
        </button>
      </form>
      <div className="py-5">
        {showPreview && (
          <div>
            <h2>{title}</h2>
            <p>{content}</p>
            {imageLink && <img src={imageLink} alt={`Image for ${title}`} />}
            {videoLink && (
              <iframe src={videoLink} title={`Video for ${title}`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostForm;
