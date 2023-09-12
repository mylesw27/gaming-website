'use client';
import React, { useState, useEffect } from 'react';

// Interfaces
interface Post {
  title: string;
  content: string;
  gameId: number;
  imageLink: string;
  videoLink: string;
  _id: string;
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

const BlogPostDisplay = () => {
  const gameID = window.location.pathname.split('/')[2];

  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [game, setGame] = useState<Game | null>(null);

  // Get all blog posts for the game
  const getBlogPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api-v1/post/all/${gameID}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      setBlogPosts(data.posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    getBlogPosts();
  }, [gameID]);

  return (
    <div>
      {blogPosts.map((post, index) => (
        <div key={index}>
          <a
            href={`/games/${gameID}/blog/${post._id}/`}
          >
            <h3>Title: {post.title}</h3>
            <p>Content: {post.content}</p>
            {post.imageLink && <img src={post.imageLink} alt={post.title} />}
            {post.videoLink && (
              <iframe src={post.videoLink} title={post.title} />
            )}
          </a>
        </div>
      ))}
       <button onClick={() => { window.location.href = `/games/${gameID}/`; }}>
        Back to GameInfo
      </button>
    </div>
  );
};

export default BlogPostDisplay;
