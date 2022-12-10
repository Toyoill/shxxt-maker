import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addPropsList, StyledDataType } from "../common/store/propsReducer";
import Part from "./Part";

// 가로줄 하나를 위한 컴포넌트 (grid말고 flex를 쓰기에 필요했다.)
const Row = styled.div({
  display: "flex",
  flexDirection: "row",
  heigth: "2rem",
  width: "100%",
});

// 전체 컴포넌트
const ShxxtStyle = styled.div({
  dispaly: "flex",
  flexDirection: "column",
  width: "2000px",
  height: "2000px",
});

export interface ShxxtPropsType extends StyledDataType {}

export default function Shxxt(props: ShxxtPropsType) {
  const { colNum, rowNum, shxxtName } = props;
  const dispatch = useDispatch();

  dispatch(addPropsList(props));

  const rowList: ReactElement[][] = [];

  // part의 prop들로 part를 만들어놓는 코드
  for (let row = 0; row < 2 * rowNum + 1; row++) {
    const partList: ReactElement[] = [];
    for (let col = 0; col < 2 * colNum + 1; col++) {
      partList.push(
        <Part key={col} shxxtName={shxxtName} row={row} col={col} />
      );
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
