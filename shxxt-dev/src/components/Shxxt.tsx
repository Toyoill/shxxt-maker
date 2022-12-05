import React from "react";
import styled from "styled-components";
import Row, { RowPropsType } from "./Row";

const ShxxtStyle = styled.div({
  dispaly: "flex",
});

export interface ShxxtPropsType {
  rowPropsList: RowPropsType[];
}

export default function Shxxt(props: ShxxtPropsType) {
  props.rowPropsList[0].isTop = true;

  return (
    <ShxxtStyle>
      {props.rowPropsList.map((rowProps) => (
        <Row {...rowProps} />
      ))}
    </ShxxtStyle>
  );
}
