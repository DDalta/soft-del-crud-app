import React from "react";

import Logout from "../Logout";

const Header = ({ setIsAdding, setIsAuthenticated, setIsViewingHistory }) => {
  return (
    <header>
      <h1>Employee Management Software</h1>
      <div style={{ marginTop: "30px", marginBottom: "18px" }}>
        <button onClick={() => setIsAdding(true)}>Add Employee</button>
        <button
          onClick={() => setIsViewingHistory(true)}
          style={{ marginLeft: "12px" }}
        >
          View History
        </button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
