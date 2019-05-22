import React from "react";
import styled from "styled-components";
import AddChild from "./AddChild";
import EditChildren from "./EditChildren";

const ManageAccount = () => {
  return (
    <div>
      <AddChild />
      <EditChildren />
    </div>
  );
};

export default ManageAccount