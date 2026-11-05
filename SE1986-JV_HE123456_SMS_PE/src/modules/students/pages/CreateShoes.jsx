import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";


const validateForm = (values) => {
  const errors = {};
  const shoesName = (values.shoesName || "").trim();
  //   const email = (values.email || "").trim();
  //   const phoneNumber = (values.phoneNumber || "").trim();
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const phonePattern = /^[0-9+\-\s()]{8,15}$/;
  const datePattern = /^\d{2}-\d{2}-\d{4}$/; // DD-MM-YYYY format
  const today = new Date().toISOString().split("T")[0];

  const productionDate = values.productionDate;
  const importDate = values.importDate;

  if (!productionDate) {
    errors.productionDate = "Production date is required.";
  } else if (!datePattern.test(productionDate)) {
    errors.productionDate = "Please enter a valid production date (DD-MM-YYYY).";
  }

  if (!importDate) {
    errors.importDate = "Import date is required.";
  } else if (!datePattern.test(importDate)) {
    errors.importDate = "Please enter a valid import date (DD-MM-YYYY).";
  }

  return errors;
};

const CreateShoes = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    "shoesName": "",
    "price": "",
    "manufacturer": "",
    "productionDate": "",
    "importDate": "",
    "category": "", 
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check duplicate shoes name logic here (if needed)

    // Check form validation

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Handle form submission logic here
  };
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={9} xl={8}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-1">Create New Shoes</h1>
              <p className="text-muted mb-0">
                Enter the shoes&apos;s basic information below.
              </p>
            </div>
            <Button as={Link} to="/" variant="outline-secondary">
              Back to list
            </Button>
          </div>

          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="shoesName">
                      <Form.Label>Shoes name</Form.Label>
                      <Form.Control
                        name="shoesName"
                        type="text"
                        placeholder="Enter shoes name"
                        value={formData.shoesName}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.shoesName)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.shoesName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        name="price"
                        type="number"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.price)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="manufacturer">
                      <Form.Label>Manufacturer</Form.Label>
                      <Form.Control
                        name="manufacturer"
                        type="text"
                        placeholder="Enter manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.manufacturer)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.manufacturer}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="productionDate">
                      <Form.Label>Production date</Form.Label>
                      <Form.Control
                        name="productionDate"
                        type="text"
                        value={formData.productionDate}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.productionDate)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.productionDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="importDate">
                      <Form.Label>Import date</Form.Label>
                      <Form.Control
                        name="importDate"
                        type="text"
                        value={formData.importDate}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.importDate)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.importDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.category)}
                      >
                        <option value="">Select category</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button type="submit" variant="primary">
                    Create shoes
                  </Button>

                  <Button as={Link} to="/" variant="light">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateShoes;
