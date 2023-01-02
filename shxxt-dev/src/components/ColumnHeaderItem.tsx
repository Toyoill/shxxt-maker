import React from "react";
import styled from "styled-components";

const ColumnHeaderContainer = styled.div({
    width: "5rem",
    height: "2rem",
    textAlign: "center",
    fontWeight: "bold",
});

export default function ColumnHeaderItem() {
    return (
        <ColumnHeaderContainer
            onClick={(e) => {}}
        >
            Header
        </ColumnHeaderContainer>
    );
}