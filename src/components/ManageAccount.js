import React from "react";
import styled from "styled-components";
import AddChild from "./AddChild";
import EditChildren from "./EditChildren";
import EditAccount from "./EditAccount";

const ManageAccountSC = styled.div`
  display: flex;
  flex-direction: column;
`

const ManageAccount = () => {
  return (
    <ManageAccountSC>
      <EditChildren />
      <AddChild />
      <EditAccount />

    </ManageAccountSC>
  );
};

export default ManageAccount