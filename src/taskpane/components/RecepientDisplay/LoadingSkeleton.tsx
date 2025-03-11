import React from "react";
import { Card, CardFooter, Divider, Skeleton, SkeletonItem } from "@fluentui/react-components";
import { useStyles } from "./styles";

export const LoadingSkeleton: React.FC = () => {
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
