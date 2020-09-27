import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NotFound from "../ui/NotFound";
import Loading from "../ui/Loading";

const DePlaneViewLazy = (delay = 5000) =>
  lazy(() =>
    Promise.all([
      import("../views/DePlaneView"),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports)
  );

const DePlaneView = DePlaneViewLazy(0);

// const DePlaneView = lazy(() => import('../views/DePlaneView'));

const AllView = lazy(() => import("../views/AllView"));
const DebugView = lazy(() => import("../views/DebugView"));
const DeView = lazy(() => import("../views/DeView"));

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
});

const MchViewPort = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let id = null;

  const asInt = (name) => {
    const parsed = parseInt(searchParams.get(name), 10);
    if (Number.isNaN(parsed)) {
      return null;
    }
    return parsed;
  };

  if (searchParams.has("deid")) {
    id = {
      deid: asInt("deid"),
    };
  }
  if (searchParams.has("bending")) {
    id = {
      ...id,
      bending: searchParams.get("bending") === "true",
    };
  }
  if (searchParams.has("deid") && searchParams.has("dsid")) {
    id = {
      ...id,
      dsid: asInt("dsid"),
    };
  }
  const classes = useStyles();
  return (
    <Suspense fallback={<Loading />}>
      <div className={classes.root}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/deplane?deid=500&bending=false" />}
          />
          <Route path="/deplane" render={() => <DePlaneView id={id} />} />
          <Route exact path="/de" render={() => <DeView id={id} />} />
          <Route exact path="/all/:a/:b" component={AllView} />
          <Route exact path="/debug" render={() => <DebugView />} />
          <Route exact path="/debug2" render={() => <DebugView id={id} />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Suspense>
  );
};

export default MchViewPort;
