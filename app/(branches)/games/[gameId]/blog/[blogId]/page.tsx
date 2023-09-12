'use client';

import React, { useState, useEffect } from 'react';


interface BlogPost {
  title: string;
  content: string;
  imageLink: string;
  videoLink: string;
}

const BlogPostDetails = () => {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  // Fetch the blog post data based on [blogId] from the URL
  const blogId = window.location.pathname.split('/').pop();

  const getBlogPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api-v1/post/${blogId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      const data = await response.json();
      setBlogPost(data.post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    }
  };

  useEffect(() => {
    getBlogPost();
  }, [blogId]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  const pathSegments = window.location.pathname.split('/');
  const game = pathSegments[2];

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
      {blogPost.imageLink && (
        <img src={blogPost.imageLink} alt={blogPost.title} />
      )}
      {blogPost.videoLink && (
        <iframe src={blogPost.videoLink} title={blogPost.title} />
      )}
      <button onClick={() => { window.location.href = `/games/${game}/blog/`; }}>
        Back to Posts
      </button>
      <button onClick={() => { window.location.href = `/games/${game}`; }}>
        Back to Game
      </button>
    </div>
  );
};

export default BlogPostDetails;
