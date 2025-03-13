import * as React from "react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Body1,
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  makeStyles,
  shorthands,
  tokens,
  Text,
  Divider,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components";
import {
  ArrowReplyRegular,
  ShareRegular,
  BoxFilled,
  PersonFilled,
  MoneyFilled,
  CalendarRegular,
  LocationFilled,
  WalletFilled,
  SearchRegular,
  MailRegular,
  PersonRegular,
} from "@fluentui/react-icons";
import customerApi, { Customer } from "../../services/api/customerApi";

const useStyles = makeStyles({
  card: {
    padding: "10px",
    margin: "8px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  noCustomerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 20px",
    textAlign: "center",
  },
  icon: {
    fontSize: "40px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: tokens.colorNeutralForeground1,
  },
  message: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "20px",
  },
  email: {
    fontStyle: "italic",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  cardStats: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    marginTop: "10px",
    gap: "10px",
  },
  infoSection: {
    backgroundColor: "#f0f8ff",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "5px 0 5px 5px",
    color: "#333",
  },
  accordionHeader: {
    fontWeight: "normal",
  },
  accordionItem: {
    margin: "8px 0",
    border: "1px solid #e0e0e0",
    borderRadius: "6px",
    overflow: "hidden",
  },
  orderDetails: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    padding: "10px 0",
  },
  orderDetail: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },
  productList: {
    marginTop: "10px",
    paddingLeft: "20px",
    fontSize: "14px",
  },
  productItem: {
    margin: "5px 0",
  },
  divider: {
    margin: "5px 0",
  },
  orderPanel: {
    backgroundColor: "#fafafa",
    padding: "10px",
  },
  skeletonContainer: {
    padding: "10px",
  },
  skeletonLine: {
    height: "20px",
    marginBottom: "10px",
    borderRadius: "4px",
  },
  skeletonCircle: {
    height: "36px",
    width: "36px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  skeletonItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },
  skeletonRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  skeletonAccordion: {
    height: "40px",
    borderRadius: "6px",
    marginBottom: "8px",
    border: "1px solid #e0e0e0",
  },
});

interface RecipientInfo {
  emailAddress: string;
  displayName?: string;
}

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

const LoadingSkeleton = () => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <div className={styles.infoSection}>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonRow}>
            <Skeleton>
              <SkeletonItem shape="circle" size={32} />
            </Skeleton>
            <Skeleton style={{ width: "70%" }}>
              <SkeletonItem shape="rectangle" size={16} />
            </Skeleton>
          </div>

          <div className={styles.skeletonRow}>
            <Skeleton>
              <SkeletonItem shape="circle" size={32} />
            </Skeleton>
            <Skeleton style={{ width: "60%" }}>
              <SkeletonItem shape="rectangle" size={16} />
            </Skeleton>
          </div>

          <div className={styles.skeletonRow}>
            <Skeleton>
              <SkeletonItem shape="circle" size={32} />
            </Skeleton>
            <Skeleton style={{ width: "50%" }}>
              <SkeletonItem shape="rectangle" size={16} />
            </Skeleton>
          </div>

          <div className={styles.skeletonRow}>
            <Skeleton>
              <SkeletonItem shape="circle" size={32} />
            </Skeleton>
            <Skeleton style={{ width: "55%" }}>
              <SkeletonItem shape="rectangle" size={16} />
            </Skeleton>
          </div>
        </div>
      </div>

      <Divider className={styles.divider} />

      <Skeleton style={{ width: "40%", margin: "10px 5px" }}>
        <SkeletonItem shape="rectangle" size={16} />
      </Skeleton>

      <div className={styles.skeletonContainer}>
        <Skeleton className={styles.skeletonAccordion}>
          <SkeletonItem shape="rectangle" />
        </Skeleton>

        <Skeleton className={styles.skeletonAccordion}>
          <SkeletonItem shape="rectangle" />
        </Skeleton>

        <Skeleton className={styles.skeletonAccordion}>
          <SkeletonItem shape="rectangle" />
        </Skeleton>
      </div>

      <CardFooter>
        <Skeleton style={{ width: "100px", marginRight: "10px" }}>
          <SkeletonItem shape="rectangle" size={32} />
        </Skeleton>
        <Skeleton style={{ width: "100px" }}>
          <SkeletonItem shape="rectangle" size={32} />
        </Skeleton>
      </CardFooter>
    </Card>
  );
};

const NoCustomerDisplay: React.FC<{ email: string }> = ({ email }) => {
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

const RecipientDisplay: React.FC = () => {
  const styles = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<RecipientInfo | null>(null);
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [errorCustomerInfo, setErrorCustomerInfo] = useState<string | null>(null);
  const [noCustomerFound, setNoCustomerFound] = useState<boolean>(false);
  const [searchedEmail, setSearchedEmail] = useState<string>("");

  const getRecipientInfo = () => {
    try {
      // Don't set loading=true here, we'll manage loading in the customerInfo effect
      setError(null);
      if (!Office || !Office.context || !Office.context.mailbox) {
        throw new Error("Office API not available");
      }

      const item = Office.context.mailbox.item;

      item.to.getAsync((asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
          const recipients = asyncResult.value;

          if (recipients && recipients.length > 0) {
            setRecipient({
              emailAddress: recipients[0].emailAddress,
              displayName: recipients[0].displayName || recipients[0].emailAddress,
            });
          } else {
            setError("No recipients found");
          }
        } else {
          setError(`Failed to get recipients: ${asyncResult.error.message}`);
        }
      });
    } catch (err) {
      setError(err.message || "Failed to get recipient information");
      console.error("Error getting recipient info:", err);
      setLoading(false); // Only set loading=false on error
    }
  };

  const [initialized, setInitialized] = useState(false);

  // Combined initialization effect
  useEffect(() => {
    // Set loading state once at component mount
    setLoading(true);

    Office.onReady(() => {
      // Setup event handlers
      getRecipientInfo();
      Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, () => {
        console.log("Email item changed, updating recipient...");
        setLoading(true);
        getRecipientInfo();
      });

      // For first load, if we can't get recipient info, load with default email
      if (!initialized) {
        setInitialized(true);
        // Use a fallback email if recipient can't be determined
        const fallbackEmail = "kuliesaeduardas@gmail.com";
        loadCustomerData(fallbackEmail);
      }
    });

    return () => {
      if (Office && Office.context && Office.context.mailbox) {
        Office.context.mailbox.removeHandlerAsync(Office.EventType.ItemChanged, (result) => {
          console.log("Event handler removed:", result.status);
        });
      }
    };
  }, []);

  // Function to load customer data
  const loadCustomerData = async (email: string) => {
    console.log("Loading customer data for:", email);
    setSearchedEmail(email);
    setNoCustomerFound(false);

    try {
      const responseData = await customerApi.getCustomerInfo(email);

      if (responseData.success && responseData.data) {
        setCustomerInfo(responseData.data as Customer);
        setErrorCustomerInfo(null);
        setNoCustomerFound(false);
      } else {
        setCustomerInfo(null);

        // Check if the error is "customer not found"
        if (
          responseData.errorType === "CUSTOMER_NOT_FOUND" ||
          responseData.message?.includes("Tokio kliento") ||
          responseData.statusCode === 404
        ) {
          setNoCustomerFound(true);
        } else {
          setErrorCustomerInfo(responseData.message || "Unknown error");
          setNoCustomerFound(false);
        }
      }
    } catch (error) {
      setCustomerInfo(null);
      setErrorCustomerInfo("Unhandled exception in component");
      setNoCustomerFound(false);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load customer data when recipient changes
  useEffect(() => {
    if (recipient?.emailAddress) {
      loadCustomerData(recipient.emailAddress);
    }
  }, [recipient]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("lt-LT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div className={styles.card}>Error: {error}</div>;
  }

  if (noCustomerFound) {
    return <NoCustomerDisplay email={searchedEmail} />;
  }

  if (errorCustomerInfo) {
    return <div className={styles.card}>Error: {errorCustomerInfo}</div>;
  }

  if (!customerInfo) {
    return <div className={styles.card}>No customer information found</div>;
  }

  return (
    <Card className={styles.card}>
      <div className={styles.infoSection}>
        <CardHeader
          header={
            <Body1>
              <div className={styles.cardStats}>
                <PersonFilled />
                <b>{customerInfo.fullName}</b>
              </div>

              <div className={styles.cardStats}>
                <LocationFilled />
                <b>
                  {customerInfo.orders[0]?.city},{customerInfo.orders[0]?.country}
                </b>
              </div>

              <div className={styles.cardStats}>
                <BoxFilled /> <b>Viso užsakymų</b>: {customerInfo.totalOrders}
              </div>
              <div className={styles.cardStats}>
                <MoneyFilled />
                <b>Viso išleistą</b>: {customerInfo.totalSpend}€
              </div>
            </Body1>
          }
        />
      </div>

      <Divider className={styles.divider} />

      <div className={styles.sectionTitle}>Paskutiniai 3 užsakymai</div>

      <CardPreview>
        <Accordion collapsible>
          {customerInfo.orders?.map((order) => (
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

      <CardFooter>
        <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
        <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
      </CardFooter>
    </Card>
  );
};

export default RecipientDisplay;
