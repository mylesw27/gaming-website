'use client'
import React, { useState } from 'react';
import Navigation from "../../components/Navigation/page";
import UploadGame from "../../components/UploadGame/page";

const Upload = () => {
  return (
    <div>
      <Navigation />
      <h2>Upload</h2>
      <UploadGame />
    </div>
  );
};


export default Upload;
