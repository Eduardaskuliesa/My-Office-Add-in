import React from "react";
import { Body1, CardHeader } from "@fluentui/react-components";
import { PersonFilled, LocationFilled, BoxFilled, MoneyFilled } from "@fluentui/react-icons";
import { useStyles } from "./styles";
import { Customer } from "../../../services/api/customerApi";

interface CustomerInfoCardProps {
  customer: Customer;
}

export const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({ customer }) => {
  const styles = useStyles();

  return (
    <div className={styles.infoSection}>
      <CardHeader
        header={
          <Body1>
            <div className={styles.cardStats}>
              <PersonFilled />
              <b>{customer.fullName}</b>
            </div>

            {customer.orders && customer.orders.length > 0 && (
              <div className={styles.cardStats}>
                <LocationFilled />
                <b>
                  {customer.orders[0]?.city}, {customer.orders[0]?.country}
                </b>
              </div>
            )}

            <div className={styles.cardStats}>
              <BoxFilled /> <b>Viso užsakymų</b>: {customer.totalOrders}
            </div>
            <div className={styles.cardStats}>
              <MoneyFilled />
              <b>Viso išleistą</b>: {customer.totalSpend}€
            </div>
          </Body1>
        }
      />
    </div>
  );
};
