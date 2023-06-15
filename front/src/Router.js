import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import AdminLayout from "layouts/Admin.js";
import Signin from "./views/Signin";
import User from "views/User";

function Rooter() {
    const { user, userLoading } = useAuth();

    return userLoading ? (
        <p>Loading..</p>
    ) : user ? (
        <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Redirect to="/admin/dashboard" />
        </Switch>
    ) : (
        <Switch>
            <Route exact path="/signin">
                <Signin />
            </Route>
            <Route path="/">
                <Redirect to="/signin" />
            </Route>
        </Switch>
    );
}

export default Rooter;
