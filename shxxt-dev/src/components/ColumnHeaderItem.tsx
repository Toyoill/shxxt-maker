import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { PartPropType } from "./Part";
import { RootState } from "../common/store/store";

const ColumnHeaderContainer = styled.div({
    display: "flex",
    width: "5rem",
    height: "2rem",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
});

export default function ColumnHeaderItem({
    row,
    col,
    style,
    shxxtName,
}:PartPropType) {
    const header = useSelector((state: RootState) => {
        console.log(row, col);
        return state.PropsListReducer[shxxtName].propsList[row][col].header;
      });

    return (
        <ColumnHeaderContainer onClick={(e) => {}}>
            {header}
        </ColumnHeaderContainer>
    );
}