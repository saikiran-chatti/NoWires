import React from "react";
import ContentLoader from "react-content-loader";

const FileSkeletonSmall = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={1200}
      height={350}
      viewBox="0 0 1200 350"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="35" y="14" rx="4" ry="4" width="21" height="21" />
      <rect x="75" y="14" rx="8" ry="8" width="200" height="20" />
      <rect x="382" y="14" rx="8" ry="8" width="100" height="20" />
      <rect x="622" y="14" rx="8" ry="8" width="60" height="20" />

      <rect x="35" y="73" rx="4" ry="4" width="21" height="21" />
      <rect x="75" y="73" rx="8" ry="8" width="200" height="20" />
      <rect x="382" y="73" rx="8" ry="8" width="100" height="20" />
      <rect x="622" y="73" rx="8" ry="8" width="60" height="20" />

      <rect x="35" y="132" rx="4" ry="4" width="21" height="21" />
      <rect x="75" y="132" rx="8" ry="8" width="200" height="20" />
      <rect x="382" y="132" rx="8" ry="8" width="100" height="20" />
      <rect x="622" y="131" rx="8" ry="8" width="60" height="20" />

      <rect x="35" y="191" rx="4" ry="4" width="21" height="21" />
      <rect x="75" y="191" rx="8" ry="8" width="200" height="20" />
      <rect x="382" y="191" rx="8" ry="8" width="100" height="20" />
      <rect x="622" y="191" rx="8" ry="8" width="60" height="20" />

      <rect x="35" y="250" rx="4" ry="4" width="21" height="21" />
      <rect x="75" y="250" rx="8" ry="8" width="200" height="20" />
      <rect x="382" y="250" rx="8" ry="8" width="100" height="20" />
      <rect x="622" y="250" rx="8" ry="8" width="60" height="20" />

      <rect x="35" y="309" rx="4" ry="4" width="21" height="21" />
      <rect x="75" y="309" rx="8" ry="8" width="200" height="20" />
      <rect x="382" y="309" rx="8" ry="8" width="100" height="20" />
      <rect x="622" y="309" rx="8" ry="8" width="60" height="20" />

    </ContentLoader>
  );
};
export default FileSkeletonSmall;
