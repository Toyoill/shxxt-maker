import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PartPropType } from "./Part";
import { RootState } from "../common/store/store";
import {
  startToSetColRange,
  changeColRange,
  endToSetColRange,
} from "../common/store/propsReducer";

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
}: PartPropType) {
  const header = useSelector((state: RootState) => {
    console.log(row, col);
    return state.PropsListReducer[shxxtName].propsList[row][col].header;
  });

  const isDragMode = useSelector((state: RootState) => {
    return state.PropsListReducer[shxxtName].isDragMode;
  });

  const dispatch = useDispatch();

  const OnMouseEnterColumnHeader = function (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (isDragMode) {
      dispatch(
        changeColRange({
          shxxtName: shxxtName,
          headerIndex: col,
        })
      );
    }
  };

  const OnMouseDownColumnHeader = function (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    e.preventDefault();
    dispatch(
      startToSetColRange({
        shxxtName: shxxtName,
        headerIndex: col,
      })
    );
  };

  const OnMouseUpColumnHeader = function (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    dispatch(
      endToSetColRange({
        shxxtName: shxxtName,
        headerIndex: col,
      })
    );
  };

  return (
    <ColumnHeaderContainer
      onMouseDown={(e) => {
        OnMouseDownColumnHeader(e);
      }}
      onMouseEnter={(e) => {
        OnMouseEnterColumnHeader(e);
      }}
      onMouseUp={(e) => {
        OnMouseUpColumnHeader(e);
      }}
    >
      {header}
    </ColumnHeaderContainer>
  );
}
