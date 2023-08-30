'use client'
import React, { useState } from 'react';

interface PostData {
  title: string;
  content: string;
  image: string;
  videoLink: string;
}

interface BlogFormProps {
  onSubmit: (newPost: PostData) => void;
}

const BlogPostForm: React.FC<BlogFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [showPreview, setShowPreview] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, image, videoLink });
    setTitle('');
    setContent('');
    setImage('');
    setVideoLink('');
    setShowPreview(false); 
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="url"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="url"
        placeholder="Video Link URL"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
      />
      <button type="submit">Create Post</button>
      <button type="button" onClick={() => setShowPreview(!showPreview)}>Preview Post</button>
    </form>
    <div className='py-5'>
      {/* Preview section */}
      {showPreview && (
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
          {image && <img src={image} alt={`Image for ${title}`} />}
          {videoLink && <iframe src={videoLink} title={`Video for ${title}`} />}
        </div>
      )}
      </div>
      </div>
  );
};

export default BlogPostForm;
