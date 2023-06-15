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
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import { useHistory } from "react-router-dom";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import userApi from "api/userApi";
import { useAuth } from "contexts/auth";

function Users() {
  const history = useHistory();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => getUsers(), []);

  const getUsers = () => {
    setLoading(true)
    userApi.getAll()
      .then(res => {
        setLoading(false);
        setUsers(res.data.data);
      })
      .catch(() => {
        setLoading(false);
        alert('Fail');
      })
  }

  const removeUser = (id) => {
    userApi.remove(id)
      .then(() => getUsers())
      .catch(() => alert("Erreur"))
  }

  const addUser = () => {
    history.push("users/add")
  }

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Utilisateurs {user.role != "Employee" && <Button color="info" size="sm" className="btn-round ml-5" onClick={addUser}>Ajouter un utilisateur</Button>}</CardTitle>
              </CardHeader>
              <CardBody>
                {loading ? "Chargement..." : <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Prénom</th>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Role</th>
                      {user.role != "Employee" && <th className="text-center">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((_user, key) => {
                      return (
                        <tr key={key}>
                          <td>{_user.firstname}</td>
                          <td>{_user.lastname}</td>
                          <td>{_user.email}</td>
                          <td>{_user.role}</td>
                          {user.role != "Employee" && <td className="text-center">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              type="button"
                              onClick={() => history.push(`users/${_user._id}`)}
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              type="button"
                              onClick={() => removeUser(_user._id)}
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                          </td>
                          }
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Users;
