import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../common/store/store";
import styled, { CSSObject } from "styled-components";
import { changeCellRange, startToSetCellRange, endToSetCellRange } from "../common/store/propsReducer";
import { PartPropType } from "./Part";
import { ChanRangeCellType } from "../common/OrderType.types";

const DefaultCellStyle: CSSObject = {
  width: "5rem",
  height: "5rem",
};

const SelectedCellStyle: CSSObject = {
  width: "5rem",
  height: "5rem",
  backgroundColor: "yellow",
};

let CellContainer = styled.div(DefaultCellStyle);

/*export interface CellPropType extends PartPropType {
  content?: string | number;
}*/

/* 
ExPartPropType 을 작성한 이유를 고민해봤는데
content 라는 속성은 cell 말곤 사용하지 않는 속성인데 모든 Part 소속? 컴포넌트들 (퉁쳐서 Part 라고 할게)
이 이 속성을 갖는게 이상하다고 생각했고, 어차피 모든 Part 가 style 속성을 갖는데
PartPropType 이 아니라 이걸 상속받는 하위 ExPartPropType 에서 style을 갖는게 이상하다고 생각했어

그래서 PartPropType 에 style 속성을 넣고, ExPartPropType 에는 content만 남겼는데,
그러면 더 이상 ExPartPropType 이라는 이름이 기능을 못하니까 CellPropType 으로 이름을 바꿨어

이렇게 했더니 Shxxt 컴포넌트에서 Part 컴포넌트를 넣을 때 useSelect로 store 에서 값을 가져올 때 여전히 content 를 다 가져와야 되더라

이렇게 하면 useSelect 를 쓰는 단계가 Shxxt 로 올라가버려서 일부의 스타일을 바꿔도 전체 시트 디자인을 바꿔버리게 되려나?


*/ 

export default function Cell({
  style,
  row,
  col,
  shxxtName,
//  content,
}: PartPropType) {

  const { isDragMode, rangeStartCell, rangeEndCell } = useSelector((state: RootState) => {
    return state.PropsListReducer[shxxtName];
  });

  const content = useSelector((state: RootState) => {
    return state.PropsListReducer[shxxtName].propsList[row][col].content;
  });

  const isSelected2 = isInRange(rangeStartCell, rangeEndCell);
  

  console.log(isSelected2, row, col, rangeStartCell, rangeEndCell);

  //const CellContainer = styled.div(isSelected ? SelectedCellStyle : DefaultCellStyle);
  // 콘솔에서 경고가 너무 많이 나와서 일단 주석처리함.

  const dispatch = useDispatch();

  function onMouseDownOnCell(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    console.log("mouse down", row, col);
    dispatch(startToSetCellRange({
      selectedRow: row,
      selectedColumn: col,
      shxxtName: shxxtName,
    }));
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
    dispatch(endToSetCellRange({
      selectedRow: row,
      selectedColumn: col,
      shxxtName: shxxtName,
    }));
  }

  function isInRange(rangeStartCell: ChanRangeCellType|null, rangeEndCell: ChanRangeCellType|null): boolean {
    if (rangeStartCell === null || rangeEndCell === null) return false;
    return ((
        (rangeStartCell.row <= row && row <= rangeEndCell.row) ||
        (rangeEndCell.row <= row && row <= rangeStartCell.row)
      ) && (
        (rangeStartCell.col <= col && col <= rangeEndCell.col) ||
        (rangeEndCell.col <= col && col <= rangeStartCell.col)
      )
    );
  }

  return (
    <CellContainer
      style={isSelected2 ? SelectedCellStyle : style} // TODO : 이렇게 되면 선택된 셀의 스타일이 교체되서 사용자 지정 스타일 적용이 안됨. 컨테이너 단에서 디자인 수정을 해야함.
      onMouseDown={(e) => onMouseDownOnCell(e)}
      onMouseEnter={(e) => onMouseEnterInCell(e)}
      onMouseUp={(e) => onMouseUpOnCell(e)}
    >
      {content}
    </CellContainer>
  );
}
