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
  Label,
} from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import adminStyles from '../assets/css/admin.css';

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import userApi from "api/userApi";

function User() {

  let { id } = useParams();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");

  useEffect(() => {
    if (id) getUserById();
  }, [])

  const getUserById = () => {
    userApi.getById(id)
      .then(res => {
        let user = res.data.data
        setUsername(user.username);
        setEmail(user.email);
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setPassword(user.password);
        setRole(user.role);
      })
      .catch(() => alert("Erreur"))
  }

  const onChangeUsername = e => setUsername(e.target.value);
  const onChangeEmail = e => setEmail(e.target.value);
  const onChangeFirstname = e => setFirstname(e.target.value);
  const onChangeLastname = e => setLastname(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);
  const onChangeRole = e => setRole(e.target.value);

  const onSend = () => {
    if (id) {
      userApi.update({ id, username, email, firstname, lastname })
        .then(() => alert("Succes"))
        .catch(() => alert("Fail"))
    }
    else {
      userApi.register({ username, email, firstname, lastname, password, role })
        .then(res => history.push(`${res.data.data._id}`))
        .catch(() => alert("Fail"))
    }
  }

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="3" />
          <Col md="6">
            <Card >
              <CardHeader>
                {id ? <h5 className="title">Editer l'utilisateur</h5> : <h5 className="title">Ajouter un utilisateur</h5>}
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
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Mot de passe</label>
                        <Input
                          placeholder="Mot de passe"
                          type="password"
                          value={password}
                          onChange={onChangePassword}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <Label for="role">Role</Label>
                        <Input type="select" name="role" id="role" value={role} onChange={onChangeRole}>
                          <option value="Employee">Employée</option>
                          <option value="Admin">Administrateur</option>
                          <option value="SuperAdmin">Super Administrateur</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="12" id="btn_user_edit">
                      <Button color="info" className="btn-round" onClick={onSend} disabled={!email}>{id ? "Modifier" : "Ajouter"}</Button>
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

export default User;
