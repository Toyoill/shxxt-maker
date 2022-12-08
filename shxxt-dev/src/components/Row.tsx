import React, { useEffect } from "react";
import styled, { CSSObject } from "styled-components";
import Cell, { CellPropsType } from "./Cell";

const RowStyle = styled.div({
  display: "flex",
  flexDirection: "row",
});

export interface RowPropsType {
  cellPropsList: CellPropsType[];
  row?: number;
  rowStyle?: CSSObject;
}

export default function Row(props: RowPropsType) {
  useEffect(() => {
    for (let col = 0; col < props.cellPropsList.length; col++) {
      props.cellPropsList[col].col = col;
      props.cellPropsList[col].row = props.row;
    }
  });

  return (
    <RowStyle style={props.rowStyle}>
      {props.cellPropsList.map((cellProps) => (
        <Cell {...cellProps} />
      ))}
    </RowStyle>
  );
}
