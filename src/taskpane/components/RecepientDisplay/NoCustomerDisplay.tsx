import  React from "react";
import { Card, Text } from "@fluentui/react-components";
import { MailRegular } from "@fluentui/react-icons";
import { useStyles } from "./styles";

interface NoCustomerDisplayProps {
  email: string;
}

export const NoCustomerDisplay: React.FC<NoCustomerDisplayProps> = ({ email }) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <div className={styles.noCustomerContainer}>
        <Text className={styles.title}>Tokio kliento duomenų bazėje nėra</Text>

        <Text className={styles.message}>Nepavyko rasti kliento su šiuo el. pašto adresu</Text>

        <div className={styles.email}>
          <MailRegular />
          <Text>{email}</Text>
        </div>
      </div>
    </Card>
  );
};
