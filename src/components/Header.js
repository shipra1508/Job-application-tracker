import React, { useEffect, useState } from "react";
import { Carousel, Button, Container } from "react-bootstrap";

const Header = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  jobs,
  loadJobs,
}) => {
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const getRandomImage = () => {
    const images = [
      "https://foundthejob.com/wp-content/uploads/2024/05/APPLY-LINK-SEEKERAS-2-17-compressed.jpg",
    ];

    // Return a random image from the array
    return images[Math.floor(Math.random() * images.length)];
  };

  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    loadJobs();
    setRandomImage(getRandomImage());
  }, []);

  return (
    <Container fluid className="w-100 pt-5 px-0">
      <Carousel>
        {jobs.slice(0, 3).map((job, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-image-container">
              <img
                className="carousel-image"
                src={randomImage}
                alt={`Hiring banner ${index + 1}`}
              />
              {/* Dark overlay */}
              <div className="dark-overlay"></div>
            </div>
            <Carousel.Caption style={{ color: "#333333 !important" }}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="d-flex justify-content-start my-3">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={
              selectedCategory === category ? "primary" : "outline-primary"
            }
            className={
              selectedCategory === category
                ? "mx-2 not-selected-category"
                : "mx-2 selected-category"
            }
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default Header;
