import * as React from "react";
import { makeStyles } from "@fluentui/react-components";
import RecipientDisplay from "./RecepientDisplay";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <RecipientDisplay />
    </div>
  );
};

export default App;
