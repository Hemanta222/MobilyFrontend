import React from "react";
import Helmet from "react-helmet";

const Title = ({ title, children }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

export default Title;
