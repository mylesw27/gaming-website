import { useState } from 'react';
import { Button, Card, Container, Image } from 'react-bootstrap';
import { AiFillHeart, AiFillEye } from 'react-icons/ai';
import exampleImage1 from '../assets/example1.png';
import exampleImage2 from '../assets/example2.png';
import exampleImage3 from '../assets/example3.png';
import exampleImage from '../assets/example.png';
import "./Project.css"

// need to put ID as a prop
const Project = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [watchCount, setWatchCount] = useState(0);

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };

  const handleWatchClick = () => {
    setWatchCount(watchCount + 1);
  };

  const images = [exampleImage,exampleImage1, exampleImage2, exampleImage3]; // Array of image URLs

  return (
    <Container className="individual-project-container">
      <Card className="individual-project-card">
        <div className="image-container">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Project $}`}
              roundedCircle
              className="project-image"
            />
          ))}
        </div>
        <div className="text-container">
          <h3 className="design-title">Design Title</h3>
          <p className="designer">by Designer Name</p>
          <p className="description">
            <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium
            faucibus fermentum. Morbi luctus ex nec nulla consequat, sed posuere odio interdum.
          </p>
          <p className="tech-stack">
            <strong>TechStack:</strong> React, Chakra UI, JavaScript
          </p>
          <p className="github">
            <strong>Github Link:</strong> <a href="https://github.com">https://github.com</a>
          </p>
            <Button variant="outline-info" size="sm" className="like-button" onClick={handleLikeClick}>
              <AiFillHeart /> {likeCount}
            </Button>
            <Button variant="outline-primary" size="sm" className="watch-button" onClick={handleWatchClick}>
              <AiFillEye /> {watchCount}
            </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Project;
