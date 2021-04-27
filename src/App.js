import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
   const { user } = useAuthListener();

   return (
      <UserContext.Provider value={{ user }}>
         <Router>
            <Suspense fallback={<p>Loading...</p>}>
               <Switch>
                  <Route path={ROUTES.LOGIN} component={Login} />
                  <Route path={ROUTES.SIGN_UP} component={SignUp} />
                  <Route path={ROUTES.DASHBOARD} component={Dashboard} />

                  <Route component={NotFound} />
               </Switch>
            </Suspense>
         </Router>
      </UserContext.Provider>
   );
}

export default App;
