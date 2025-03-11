import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardFooter, Button, Divider } from "@fluentui/react-components";
import { ArrowReplyRegular, ShareRegular } from "@fluentui/react-icons";
import { useStyles } from "./styles";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { NoCustomerDisplay } from "./NoCustomerDisplay";
import { ErrorDisplay } from "./ErrorDisplay";
import { CustomerInfoCard } from "./CustomerInfoCard";
import { CustomerOrderList } from "./CustomerOrderList";
import customerApi, { Customer } from "../../../services/api/customerApi";

interface RecipientInfo {
  emailAddress: string;
  displayName?: string;
}

const RecipientDisplay: React.FC = () => {
  const styles = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<RecipientInfo | null>(null);
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [errorCustomerInfo, setErrorCustomerInfo] = useState<string | null>(null);
  const [noCustomerFound, setNoCustomerFound] = useState<boolean>(false);
  const [searchedEmail, setSearchedEmail] = useState<string>("");
  const [initialized, setInitialized] = useState(false);

  const getRecipientInfo = () => {
    try {
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
      setLoading(false);
    }
  };

  // Combined initialization effect
  useEffect(() => {
    setLoading(true);

    Office.onReady(() => {
      getRecipientInfo();
      Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, () => {
        console.log("Email item changed, updating recipient...");
        setLoading(true);
        getRecipientInfo();
      });

      if (!initialized) {
        setInitialized(true);
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
        if (responseData.errorType === "CUSTOMER_NOT_FOUND" || responseData.statusCode === 404) {
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

  useEffect(() => {
    if (recipient?.emailAddress) {
      loadCustomerData(recipient.emailAddress);
    }
  }, [recipient]);

  // Render loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Render error state
  if (error) {
    return <ErrorDisplay errorMessage={error} />;
  }

  // Render no customer found state
  if (noCustomerFound) {
    return <NoCustomerDisplay email={searchedEmail} />;
  }

  // Render customer API error state
  if (errorCustomerInfo) {
    return <ErrorDisplay errorMessage={errorCustomerInfo} />;
  }

  // Render no customer data state
  if (!customerInfo) {
    return <ErrorDisplay errorMessage="No customer information found" />;
  }

  // Render customer data
  return (
    <Card className={styles.card}>
      <CustomerInfoCard customer={customerInfo} />

      <Divider className={styles.divider} />

      <CustomerOrderList orders={customerInfo.orders || []} />

      <CardFooter>
        <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
        <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
      </CardFooter>
    </Card>
  );
};

export default RecipientDisplay;
