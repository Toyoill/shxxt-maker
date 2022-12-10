import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { CSSObject } from "styled-components";
import { PropsType } from "../common/store/propsReducer";
import { RootState } from "../common/store/store";

export interface PartPropsType extends PropsType {}

// 이건 직접 객체에 넣어놓기 위해서 styled를 안쓰고 CSSObject로 직접 만들어놓은 사실상 css 코드
const CellStyle: CSSObject = {
  width: "5rem",
  height: "5rem",
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
  backgroundColor: "#333",
};

interface PartPropType {
  col: number;
  row: number;
  shxxtName: string;
}

export default function Part({
  row,
  col,
  shxxtName,
}: PartPropType): ReactElement {
  const { style, content } = useSelector((state: RootState) => {
    return state.PropsListReducer[shxxtName].propsList[row][col];
  });

  // 인덱스에 따라 어떤 스타일을 적용할지 정해주는 함수 (styled를 안쓰는 직접적인 이유)
  function getStyle(row: number, col: number): CSSObject {
    if (row % 2) {
      if (col % 2) return CellStyle;
      else return VSegStyle;
    } else {
      if (col % 2) return HSegStyle;
      else return IntersecionStyle;
    }
  }

  return (
    <div style={{ ...getStyle(row, col), ...style }}>
      {content ? content : ""}
    </div>
  );
}
