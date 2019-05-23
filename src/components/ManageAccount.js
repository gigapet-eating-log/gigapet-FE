import React from "react";
import styled from "styled-components";
import AddChild from "./AddChild";
import EditChildren from "./EditChildren";
import EditAccount from "./EditAccount";

const ManageAccountSC = styled.div`
  display: flex;
  flex-direction: column;
`

const ManageChildrenSC = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

const ManageAccount = () => {
  return (
    <ManageAccountSC>
      <ManageChildrenSC>
        <AddChild />
        <EditChildren />
      </ManageChildrenSC>
      <EditAccount />

    </ManageAccountSC>
  );
};

export default ManageAccount