import React, { useEffect, useState } from "react"
import { Table, Container, Row, Col, Button, ButtonGroup, Form, Navbar, FormGroup } from "react-bootstrap";
import axios from "axios";


const api = "http://localhost:3006/posts";
const initialState = {
  name: "",
  email: "",
  contact: "",
  address: ""
}
const App = () => {
  const [state, setState] = useState(initialState)
  const [data, setData] = useState([])
  const { name, email, contact, address } = state
  const [userId, setUserId] = useState(null);
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const response = await axios.get(api)
    setData(response.data)
  }

  const handleDelete = async (id) => {
    axios.delete(`${api}/${id}`);
    loadUsers()

  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !address) {
      alert("Please fill all input fields")
    } else {
      if (!edit) {
        axios.post(api, state)
        alert("Added Successfully")
        setState({ name: "", email: "", contact: "", address: "" })
        loadUsers()
      } else {
        axios.put(`${api}/${userId}`, state)
        alert("Updated Successfully")
        setState({ name: "", email: "", contact: "", address: "" })
        loadUsers();
        userId(null);
        setEdit(false);
      }
    }

  }
  const handleUpdate = (id) => {
    const singleUser = data.find((item) => item.id === id)
    setState({ ...singleUser })
    setUserId(id)
    setEdit(true);
  }
  return (
    <div>
      <Navbar bg="primary" className="text-white text-right">
        This is React App
      </Navbar>
      <Container style={{ marginTop: "50px" }}>
        <Row>
          <Col md="4">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" name="name" onChange={handleChange} value={name} />
              </Form.Group>
              <FormGroup>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email" name="email" value={email} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Form.Label>Contact</Form.Label>
                <Form.Control type="text" placeholder="Contact" name="contact" value={contact} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address" name="address" value={address} onChange={handleChange} />
              </FormGroup>
              <div className="d-grid gap-2 mt-2">
                <Button type="submit" varient="primary" size="lg">Submit</Button>
              </div>
            </Form>
          </Col>
          <Col md="8">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data && data.map((item, index) => (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.address}</td>
                    <td>
                      <ButtonGroup>
                        <Button variant="primary" style={{ marginRight: "5px" }} onClick={() => handleUpdate(item.id)}>Update</Button>
                        <Button variant="danger" style={{ marginLeft: "5px" }} onClick={() => handleDelete(item.id)}>Delete</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App
