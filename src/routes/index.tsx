import { Redirect, Switch } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { AlterarOrigem } from "../pages/Origem/AlterarOrigem";
import { CadastroOrigem } from "../pages/Origem/CadastroOrigem";
import { ListarOrigem } from "../pages/Origem/ListarOrigem";
import { SignIn } from "../pages/SignIn";
import { Error } from "../pages/Unauthorized";
import Route from "./Route";

export const routes = [
  {
    path: "/origem/cadastroOrigem",
    name: "Cadastro Origem",
    Component: CadastroOrigem,
    isPrivate: true,
  },
  {
    path: "/origem/alterarOrigem/:id",
    name: "Editar Origem",
    Component: AlterarOrigem,
    isPrivate: true,
  },
  {
    path: "/origem",
    name: "Origem",
    Component: ListarOrigem,
    isPrivate: true,
  },
  {
    path: "/error",
    name: "error",
    Component: Error,
    isPrivate: true,
  },
];

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />

      {routes.map(({ path, Component, isPrivate }, key) => (
        <Route
          key={key}
          exact
          path={path}
          component={Component}
          isPrivate={isPrivate}
        />
      ))}

      <Route path="*" component={Dashboard}>
        <Redirect to="/error" />
      </Route>
    </Switch>
  );
};

export default Routes;
