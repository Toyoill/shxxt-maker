import React, { useEffect } from "react";
import styled from "styled-components";
import Row, { RowPropsType } from "./Row";

const ShxxtStyle = styled.div({
  dispaly: "flex",
});

export interface ShxxtPropsType {
  rowPropsList: RowPropsType[];
}

export default function Shxxt(props: ShxxtPropsType) {
  useEffect(() => {
    for (let row = 0; row < props.rowPropsList.length; row++) {
      props.rowPropsList[row].row = row;
    }
  });

  return (
    <ShxxtStyle>
      {props.rowPropsList.map((rowProps) => (
        <Row {...rowProps} />
      ))}
    </ShxxtStyle>
  );
}
