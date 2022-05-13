import * as React from "react";
import * as ReactDOM from "react-dom";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppLoading } from "./app/common/components/ui-no-interact/AppLoading";

import "./style.scss";

const AppBootstrap = React.lazy(
  () => import("./app/features/app-bootstrap/app-bootstrap.component")
);

ReactDOM.render(
  <Suspense fallback={<AppLoading />}>
    <Router>
      <AppBootstrap />
    </Router>
  </Suspense>,
  document.getElementById("root")
);
