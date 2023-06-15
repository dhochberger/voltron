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
import Dashboard from "views/Dashboard.js";
import Users from "views/Users.js";
import Profil from "views/Profil.js";
import User from "views/User";
import Data from "views/Data";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/profil",
    name: "Profil",
    icon: "users_single-02",
    component: Profil,
    layout: "/admin",
  },
  {
    path: "/users/add",
    name: "Ajouter un utilisateur",
    icon: "ui-2_settings-90",
    component: User,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/users/:id",
    name: "Modifier un utilisateur",
    icon: "ui-2_settings-90",
    component: User,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/users",
    name: "Users",
    icon: "ui-2_settings-90",
    component: Users,
    layout: "/admin",
  },
];
export default dashRoutes;
