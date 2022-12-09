import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createPropsList, StyledDataType } from "../common/store/propsReducer";
import Part from "./Part";

const Row = styled.div({
  display: "flex",
  flexDirection: "row",
  heigth: "2rem",
  width: "100%",
});

const ShxxtStyle = styled.div({
  dispaly: "flex",
  flexDirection: "column",
  width: "2000px",
  height: "2000px",
});

export interface ShxxtPropsType extends StyledDataType {}

export default function Shxxt(props: ShxxtPropsType) {
  const { colNum, rowNum } = props;
  const dispatch = useDispatch();

  dispatch(createPropsList(props));

  const rowList: ReactElement[][] = [];

  for (let row = 0; row < 2 * rowNum + 1; row++) {
    const partList: ReactElement[] = [];
    for (let col = 0; col < 2 * colNum + 1; col++) {
      partList.push(<Part key={col} row={row} col={col} />);
    }
    rowList.push(partList);
  }

  return (
    <ShxxtStyle>
      {rowList.map((row, idx) => (
        <Row key={idx}>{row.map((part) => part)}</Row>
      ))}
    </ShxxtStyle>
  );
}
