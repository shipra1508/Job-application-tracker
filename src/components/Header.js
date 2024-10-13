import React, { useState } from "react";
import { Carousel, Button, Container } from "react-bootstrap";

const Header = ({ categories, selectedCategory, setSelectedCategory }) => {
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container fluid className="w-100 pt-5 px-0">
      <Carousel>
        <Carousel.Item>
          <img
            className=""
            src="https://via.placeholder.com/1150x200"
            alt="Hiring banner 1"
          />
          <Carousel.Caption>
            <h3>We Are Hiring</h3>
            <p>Join our team for exciting opportunities!</p>
            <Button variant="primary" size="lg">
              Apply Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=""
            src="https://via.placeholder.com/1150x200"
            alt="Hiring banner 2"
          />
          <Carousel.Caption>
            <h3>Join Our Team</h3>
            <p>We are looking for skilled professionals!</p>
            <Button variant="primary" size="lg">
              Apply Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
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
