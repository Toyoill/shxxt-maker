import React, { ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSObject } from "styled-components";
import { PropsType } from "../common/store/propsReducer";
import { RootState } from "../common/store/store";
import { changeSelectedCell, StyledDataType } from "../common/store/propsReducer";

export interface PartPropsType extends PropsType {}

// 이건 직접 객체에 넣어놓기 위해서 styled를 안쓰고 CSSObject로 직접 만들어놓은 사실상 css 코드
const CellStyle: CSSObject = {
  width: "5rem",
  height: "5rem",
};

const SelectedCellStyle: CSSObject = {
  width: "5rem",
  height: "5rem",
  backgroundColor: "yellow",
};

const VSegStyle: CSSObject = {
  height: "5rem",
  width: "3px",
  backgroundColor: "#333",
};

const HSegStyle: CSSObject = {
  width: "5rem",
  height: "3px",
  backgroundColor: "#333",
};

const IntersecionStyle: CSSObject = {
  height: "3px",
  width: "3px",
  //backgroundColor: "#333",
  backgroundColor: "yellow",
};

interface PartPropType {
  col: number;
  row: number;
  isSelected: boolean;
  shxxtName: string;
}

export default function Part({
  row,
  col,
  shxxtName,
}: PartPropType): ReactElement {
  const { style, content, isSelected } = useSelector((state: RootState) => {
    return state.PropsListReducer[shxxtName].propsList[row][col];
  });

  const dispatch = useDispatch();

  // 인덱스에 따라 어떤 스타일을 적용할지 정해주는 함수 (styled를 안쓰는 직접적인 이유)
  function getStyle(row: number, col: number): CSSObject {
    if (row % 2) {
      if (col % 2) {
        if (isSelected) return SelectedCellStyle;
        else return CellStyle;
      }
      else return VSegStyle;
    } else {
      if (col % 2) return HSegStyle;
      else return IntersecionStyle;
    }
  }

  function onClickCell(e: React.MouseEvent<HTMLDivElement>) {
    console.log(row, col, isSelected);
    dispatch(changeSelectedCell({
      selectedRow: row, 
      selectedColumn: col,
      shxxtName: shxxtName,
    }));
  }

  return (
    <div style={{ ...getStyle(row, col), ...style }} onClick={onClickCell}>
      {content ? content : ""}
    </div>
  );
}
