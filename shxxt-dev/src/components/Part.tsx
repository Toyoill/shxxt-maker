import { ReactElement } from "react";
import { CSSObject } from "styled-components";
import Cell from "./Cell";
import VSeg from "./VSeg";
import HSeg from "./HSeg";
import Intersection from "./Intersection";
import ColumnHeaderItem from "./ColumnHeaderItem";


export interface PartPropType {
  shxxtName: string;
  col: number;
  row: number;
  style: CSSObject;
}

export default function Part({
  shxxtName,
  row,
  col,
  style,
}: PartPropType): ReactElement {

  // 인덱스에 따라 어떤 스타일을 적용할지 정해주는 함수 (styled를 안쓰는 직접적인 이유)
  function selectComponent(row: number, col: number): ReactElement {
    if (row % 2) {
      if (col % 2) {
        if (row === 1)
          return (
            <ColumnHeaderItem
              shxxtName={shxxtName}
              row={row}
              col={col}
              style={style}
            />
          );

        return (
          <Cell
            shxxtName={shxxtName}
            row={row}
            col={col}
            style={style}
          />
        );
      } else
        return (
          <VSeg
            shxxtName={shxxtName}
            row={row}
            col={col}
            style={style}
          />
        );
    } else {
      if (col % 2)
        return (
          <HSeg
            shxxtName={shxxtName}
            row={row}
            col={col}
            style={style}
          />
        );
      else
        return (
          <Intersection
            shxxtName={shxxtName}
            row={row}
            col={col}
            style={style}
          />
        );
    }
  }

  return selectComponent(row, col);
}
