import React from "react";
import { useDispatch } from "react-redux";
import styled, { CSSObject } from "styled-components";
import { changeSelectedCell } from "../common/store/propsReducer";
import { PartPropType } from "./Part";

const CellStyle = styled.div({
  width: "5rem",
  height: "5rem",
});

const SelectedCellStyle: CSSObject = {
  width: "5rem",
  height: "5rem",
  backgroundColor: "yellow",
};

export interface ExPartPropType extends PartPropType {
  style: CSSObject;
  isSelected: boolean;
}

export default function Cell({
  style,
  row,
  col,
  isSelected,
  shxxtName,
  content,
}: ExPartPropType) {
  const dispatch = useDispatch();
  function onClickCell(e: React.MouseEvent<HTMLDivElement>) {
    console.log(row, col, isSelected);
    dispatch(
      changeSelectedCell({
        selectedRow: row,
        selectedColumn: col,
        shxxtName: shxxtName,
      })
    );
  }

  return (
    <CellStyle
      style={isSelected ? SelectedCellStyle : style}
      onClick={(e) => onClickCell(e)}
    >
      {content}
    </CellStyle>
  );
}
