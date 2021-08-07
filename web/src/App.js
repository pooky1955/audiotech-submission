import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import TitleContent from "./TitleContent";
import Result from "./Result";
import { Loader } from "./Loader";
import { BACKEND } from "./Configuration";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFA114",
    },

    secondary: {
      main: "#FFC267",
    },
  },
  typography: {
    fontFamily: "Raleway",
  },
});

const useStyle = makeStyles({
  app: {
    width: "100vw",
    minHeight: "100vh",
  },
});

function App() {
  //async function handleSubmit(e) {
  //e.preventDefault()
  //const FD = new FormData(e.target)
  //console.log(BACKEND)
  //setVideoFile(FD.get("video"))
  //setLoading(true)
  //const response = await fetch("http://127.0.0.1:5000", {
  //method: "POST",
  //body: FD
  //})
  //debugger

  //console.log(`response sent to ${BACKEND}`)
  //if (response.ok) {
  //const json = await response.json()
  //setData(json)

  //} else {
  //console.log("error happenned")
  //console.log(await response.text())
  //const text = await response.text()
  //setErrorMessage(text)
  //setHasError(true)

  //}
  //setLoading(false)
  //}
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData("hello");
    }, 5000);
  }
  const classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(undefined);
  const [videoFile, setVideoFile] = useState(undefined);

  // const routeName = window.location.pathname
  const shouldRedirect = loading && window.location.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {shouldRedirect && <Redirect from="/" to="/result"></Redirect>}
        <div className={classes.app}>
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <TitleContent handleSubmit={handleSubmit}></TitleContent>
              )}
            />
            <Route
              path="/result"
              component={() => (
                <Loader
                  loading={loading || data === undefined}
                  render={() => {
                    debugger;
                    return hasError ? (
                      `An error happened : ${errorMessage}`
                    ) : (
                      <Result {...data} video={videoFile}></Result>
                    );
                  }}
                ></Loader>
              )}
            />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
