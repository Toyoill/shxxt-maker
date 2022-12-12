import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../common/store/store";
import Cell from "./Cell";
import VSeg from "./VSeg";
import HSeg from "./HSeg";
import Intersection from "./Intersection";

export interface PartPropType {
  col: number;
  row: number;
  shxxtName: string;
  content?: string | number;
}

export default function Part({
  row,
  col,
  shxxtName,
}: PartPropType): ReactElement {
  const { style, content, isSelected } = useSelector((state: RootState) => {
    return state.PropsListReducer[shxxtName].propsList[row][col];
  });

  // 인덱스에 따라 어떤 스타일을 적용할지 정해주는 함수 (styled를 안쓰는 직접적인 이유)
  function selectComponent(row: number, col: number): ReactElement {
    if (row % 2) {
      if (col % 2) {
        return (
          <Cell
            style={style}
            row={row}
            col={col}
            content={content}
            isSelected={isSelected}
            shxxtName={shxxtName}
          />
        );
      } else
        return (
          <VSeg
            style={style}
            row={row}
            col={col}
            shxxtName={shxxtName}
            isSelected={isSelected}
          />
        );
    } else {
      if (col % 2)
        return (
          <HSeg
            style={style}
            row={row}
            col={col}
            shxxtName={shxxtName}
            isSelected={isSelected}
          />
        );
      else
        return (
          <Intersection
            style={style}
            row={row}
            col={col}
            shxxtName={shxxtName}
            isSelected={isSelected}
          />
        );
    }
  }

  return selectComponent(row, col);
}
