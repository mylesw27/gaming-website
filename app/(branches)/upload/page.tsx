'use client'
import React, { useState } from 'react';
import Navigation from "../../components/Navigation/page";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e: { target: { files: any[]; }; }) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (file) {
      // Perform upload logic here
      console.log('Uploading file:', file);
      // Reset file state
      setFile(null);
    } else {
      // setError('Please select a file to upload');
    }
  };

  return (
    <div>
      <Navigation />
      <h2>Upload</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select File:</label>
          {/* <input type="file" id="file" onChange={handleFileChange} /> */}
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};


export default Upload;
