import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { CSSObject } from "styled-components";
import { PropsType } from "../common/store/propsReducer";
import { RootState } from "../common/store/store";

export interface PartPropsType extends PropsType {}

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
}

export default function Part({ row, col }: PartPropType): ReactElement {
  const { style, content } = useSelector((state: RootState) => {
    return state.PropsListReducer.propsList[row][col];
  });

  function getStyle(row: number, col: number, style: CSSObject): CSSObject {
    if (row % 2) {
      if (col % 2) {
        return { ...CellStyle, ...style };
      } else {
        return { ...VSegStyle, ...style };
      }
    } else {
      if (col % 2) {
        return { ...HSegStyle, ...style };
      } else {
        return { ...IntersecionStyle, ...style };
      }
    }
  }

  return <div style={getStyle(row, col, style)}>{content ? content : ""}</div>;
}
