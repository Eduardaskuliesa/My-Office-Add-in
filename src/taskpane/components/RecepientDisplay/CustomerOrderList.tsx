import * as React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  CardPreview,
  Divider,
  Text,
} from "@fluentui/react-components";
import {
  BoxFilled,
  MoneyFilled,
  WalletFilled,
  CalendarRegular,
  LocationFilled,
} from "@fluentui/react-icons";
import { useStyles } from "./styles";
import { formatDate } from "../../../utils/dateFormatter";
interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  paymentStatus: string;
  paymentMethodName: string;
  city: string;
  country: string;
  productNames: string[];
}

interface CustomerOrderListProps {
  orders: Order[];
}

export const CustomerOrderList: React.FC<CustomerOrderListProps> = ({ orders }) => {
  const styles = useStyles();

  if (!orders || orders.length === 0) {
    return (
      <div style={{ padding: "10px", textAlign: "center" }}>
        <Text>Nėra užsakymų</Text>
      </div>
    );
  }

  return (
    <>
      <div className={styles.sectionTitle}>Paskutiniai 3 užsakymai</div>

      <CardPreview>
        <Accordion collapsible>
          {orders.map((order) => (
            <AccordionItem
              key={order.id}
              value={order.id.toString()}
              className={styles.accordionItem}
            >
              <AccordionHeader icon={<BoxFilled />} className={styles.accordionHeader}>
                Užsakymas #{order.orderNumber} - {formatDate(order.orderDate)}
              </AccordionHeader>
              <AccordionPanel className={styles.orderPanel}>
                <div className={styles.orderDetails}>
                  <div className={styles.orderDetail}>
                    <MoneyFilled />
                    <span>
                      <b>Suma:</b> {order.totalAmount.toFixed(2)}€
                    </span>
                  </div>
                  <div className={styles.orderDetail}>
                    <WalletFilled />
                    <span>
                      <b>Statusas:</b> {order.paymentStatus}
                    </span>
                  </div>
                  <div className={styles.orderDetail}>
                    <CalendarRegular />
                    <span>
                      <b>Data:</b> {formatDate(order.orderDate)}
                    </span>
                  </div>
                  <div className={styles.orderDetail}>
                    <LocationFilled />
                    <span>
                      <b>Vieta:</b> {order.city}, {order.country}
                    </span>
                  </div>
                </div>

                <Divider />

                <div style={{ marginTop: "10px" }}>
                  <Text size={200}>
                    <b>Mokėjimo būdas:</b> {order.paymentMethodName}
                  </Text>
                </div>

                <div style={{ marginTop: "10px" }}>
                  <Text size={300}>
                    <b>Produktai:</b>
                  </Text>
                  <ul className={styles.productList}>
                    {order.productNames.map((product, index) => (
                      <li key={index} className={styles.productItem}>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </CardPreview>
    </>
  );
};
