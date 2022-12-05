import React from "react";
import styled, { CSSObject } from "styled-components";
import Cell, { CellPropsType } from "./Cell";

const RowStyle = styled.div({
  display: "flex",
  flexDirection: "row",
});

export interface RowPropsType {
  cellPropsList: CellPropsType[];
  isTop?: boolean;
  rowStyle?: CSSObject;
}

export default function Row(props: RowPropsType) {
  props.cellPropsList[0].isLeft = true;
  if (props.isTop) {
    for (const cellprop of props.cellPropsList) {
      cellprop.isTop = true;
    }
  }
  return (
    <RowStyle style={props.rowStyle}>
      {props.cellPropsList.map((cellProps) => (
        <Cell {...cellProps} />
      ))}
    </RowStyle>
  );
}
