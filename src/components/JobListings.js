import React, { useState } from "react";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";

const JobListing = ({ loadMoreJobs, hasMore, jobs }) => {
  return (
    <Container className="w-100 h-75 px-0">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreJobs}
        hasMore={hasMore}
        loader={
          <div className="text-center" key={0}>
            <Spinner animation="border" />
          </div>
        }
      >
        {jobs.map((job, index) => (
          <Card className="mb-4" key={index}>
            <Card.Body>
              <Card.Title>
                {job.title} - {job.company}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {job.location}
              </Card.Subtitle>
              <Card.Text>{job.description}</Card.Text>
              <Button variant="primary">Apply</Button>
            </Card.Body>
          </Card>
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default JobListing;
