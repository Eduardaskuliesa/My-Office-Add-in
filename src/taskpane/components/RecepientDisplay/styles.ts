import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
  card: {
    padding: "10px",
    margin: "8px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  // No customer styles
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
  // Customer info styles
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
  // Accordion styles
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
  // Skeleton styles
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
