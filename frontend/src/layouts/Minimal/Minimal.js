import React from "react";
import PropTypes from "prop-types";

const Minimal = props => {
  const { children } = props;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <main style={{ height: "100%", width: "100%" }}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node
};

export default Minimal;
