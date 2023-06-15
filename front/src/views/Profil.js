/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Voltron (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Voltron

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useAuth } from "../contexts/auth";
import adminStyles from '../assets/css/admin.css';

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import userApi from "api/userApi";

function Profil() {

  const { user } = useAuth();
  console.log(user)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setFirstname(user.firstname);
    setLastname(user.lastname);
  }, [])

  const onChangeUsername = e => setUsername(e.target.value);
  const onChangeEmail = e => setEmail(e.target.value);
  const onChangeFirstname = e => setFirstname(e.target.value);
  const onChangeLastname = e => setLastname(e.target.value);

  const onUpdateProfile = () => {
    userApi.update({ id: user._id, username, email, firstname, lastname })
      .then(() => alert("Succes"))
      .catch(() => alert("Fail"))
  }

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="3" />
          <Col md="6">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={require("assets/img/bg5.jpg").default} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src="https://fakeface.rest/face/view"
                    />
                    <h5 className="title">{user.username}</h5>
                  </a>
                </div>
                <p className="description text-center">
                  {user.firstname && user.lastname && `Nom prénom: ${user.lastname} ${user.firstname}`}
                  Email: {user.email}<br />
                  Role: {user.role}<br />
                  Id: {user._id}
                </p>
              </CardBody>

            </Card>
          </Col>
          <Col md="3" />
        </Row>
        <Row>
          <Col md="3" />
          <Col md="6">
            <Card >
              <CardHeader>
                <h5 className="title">Editer mon profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          placeholder="Username"
                          type="text"
                          value={username}
                          onChange={onChangeUsername}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Input placeholder="Email"
                          type="email"
                          value={email}
                          onChange={onChangeEmail} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Nom</label>
                        <Input
                          placeholder="Nom"
                          type="text"
                          value={lastname}
                          onChange={onChangeLastname}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Prénom</label>
                        <Input
                          placeholder="Prénom"
                          type="text"
                          value={firstname}
                          onChange={onChangeFirstname}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="12" id="btn_user_edit">
                      <Button color="info" className="btn-round" onClick={onUpdateProfile} disabled={!username || !email}>Modifier</Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="3" />
        </Row>
      </div>
    </>
  );
}

export default Profil;
