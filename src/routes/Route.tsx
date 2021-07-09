import React from "react";
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from "react-router-dom";
import { routes } from ".";

import { useAuth } from "../hooks/auth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={(props) => {
        const crumbs = routes
          .filter(({ path, name }) => !!name && props.match.path.includes(path))
          .map(({ path, ...rest }) => ({
            path: Object.keys(props.match.params).length
              ? Object.keys(props.match.params).reduce(
                  (path, param) =>
                    path
                      .replace(`:${param}`, props.match.params[param] ?? "")
                      .replace("?", ""),
                  path
                )
              : path,
            ...rest,
          }));
        localStorage.setItem("@HavanLabs:crumbs", JSON.stringify(crumbs));

        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
