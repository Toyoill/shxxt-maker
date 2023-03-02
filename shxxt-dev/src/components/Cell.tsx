import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../common/store/store";
import styled, { CSSObject } from "styled-components";
import {
  changeCellRange,
  startToSetCellRange,
  endToSetCellRange,
} from "../common/store/propsReducer";
import { PartPropType } from "./Part";
import { RangeType } from "../common/OrderType.types";

const DefaultCellStyle: CSSObject = {
  display: "flex",
  width: "5rem",
  height: "5rem",
  fontSize: "24px",
  alignItems: "center",
  justifyContent: "center",
};

const SelectedCellStyle: CSSObject = {
  display: "flex",
  width: "5rem",
  height: "5rem",
  fontSize: "24px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "yellow",
};

const DefaultCellContainer = styled.div(DefaultCellStyle);
const SelectedCellContainer = styled.div(SelectedCellStyle);

export interface CellPropType extends PartPropType {
  content?: string | number;
}

export default function Cell({
  style,
  row,
  col,
  shxxtName,
}: //content,
CellPropType) {
  const { isDragMode, range } = useSelector((state: RootState) => {
    return state.PropsListReducer[shxxtName];
  });

  const content = useSelector((state: RootState) => {
    //console.log(row, col);
    return state.PropsListReducer[shxxtName].propsList[row][col].content;
  });

  const dispatch = useDispatch();

  function onMouseDownOnCell(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    console.log("mouse down", row, col);
    dispatch(
      startToSetCellRange({
        selectedRow: row,
        selectedColumn: col,
        shxxtName: shxxtName,
      })
    );
  }

  function onMouseEnterInCell(e: React.MouseEvent<HTMLDivElement>) {
    if (isDragMode) {
      console.log("mouse enter", row, col);
      dispatch(
        changeCellRange({
          selectedRow: row,
          selectedColumn: col,
          shxxtName: shxxtName,
        })
      );
    }
  }

  function onMouseUpOnCell(e: React.MouseEvent<HTMLDivElement>) {
    console.log("mouse up", row, col);
    dispatch(
      endToSetCellRange({
        selectedRow: row,
        selectedColumn: col,
        shxxtName: shxxtName,
      })
    );
  }

  function isInRange(range: RangeType): boolean {
    if (
      range.rows.length === 0 &&
      range.columns.length === 0 &&
      range.general.length === 0
    )
      return false;

    // 일단 배열에 원소가 하나만 있는 상황을 가정. 여러개면 진짜 복잡할듯 ㅋㅋ
    // 근데 코드 쓰다보니까 인덱스로 접근하는 것보다 객체 속성 이름으로 접근하는게 유지보수하기 더 좋을 것 같다는 생각이 들었는데
    // 구조 분해로 작성하면 상관 없을 것 같기도 하고... 어렵네...
    if (range.general.length > 0) {
      const [startCell, endCell] = range.general[0];
      const [startCellRow, endCellRow] =
        startCell[0] <= endCell[0]
          ? [startCell[0], endCell[0]]
          : [endCell[0], startCell[0]];
      const [startCellCol, endCellCol] =
        startCell[1] <= endCell[1]
          ? [startCell[1], endCell[1]]
          : [endCell[1], startCell[1]];
      if (
        startCellRow <= row &&
        row <= endCellRow &&
        startCellCol <= col &&
        col <= endCellCol
      )
        return true;
    } else if (range.columns.length > 0) {
      // TODO : row col 영역 선택 시 general 에 들어있던 배열은 초기화를 해줘야 할 듯.
      const [start, end] = range.columns[0];
      const [startCol, endCol] = start <= end ? [start, end] : [end, start];
      if (startCol <= col && col <= endCol) return true;
    }
    return false;
  }

  const isSelected = isInRange(range);
  //console.log(isSelected, row, col, range);

  return isSelected ? (
    <SelectedCellContainer
      style={style} // TODO : 이렇게 되면 선택된 셀의 스타일이 교체되서 사용자 지정 스타일 적용이 안됨. 컨테이너 단에서 디자인 수정을 해야함.
      onMouseDown={(e) => onMouseDownOnCell(e)}
      onMouseEnter={(e) => onMouseEnterInCell(e)}
      onMouseUp={(e) => onMouseUpOnCell(e)}
    >
      {content}
    </SelectedCellContainer>
  ) : (
    <DefaultCellContainer
      style={style} // TODO : 이렇게 되면 선택된 셀의 스타일이 교체되서 사용자 지정 스타일 적용이 안됨. 컨테이너 단에서 디자인 수정을 해야함.
      onMouseDown={(e) => onMouseDownOnCell(e)}
      onMouseEnter={(e) => onMouseEnterInCell(e)}
      onMouseUp={(e) => onMouseUpOnCell(e)}
    >
      {content}
    </DefaultCellContainer>
  );
}
