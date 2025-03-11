import React from "react";
import { Card, Text } from "@fluentui/react-components";
import { useStyles } from "./styles";

interface ErrorDisplayProps {
  errorMessage: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <div style={{ padding: "20px", color: "#d13438" }}>
        <Text
          style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "8px", display: "block" }}
        >
          Error
        </Text>
        <Text>{errorMessage}</Text>
      </div>
    </Card>
  );
};
