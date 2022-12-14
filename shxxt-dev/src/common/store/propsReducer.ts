import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CSSObject } from "styled-components";

interface DataInfoType {
  data: (number | string)[][]; // sheet data
  colNum: number;              // sheet column size 
  rowNum: number;              // sheet row size    
  shxxtName: string;           // sheet name (key of sheet)
}

interface DataStyle {
  styles: CSSObject[][];       // part style 2d array => 각 파트의 스타일 정보를 저장하는 배열
}

interface SelectedCellInfoType {
  selectedRow?: number;        // selected cell's row in sheet
  selectedColumn?: number;     // selected cell's column in sheet
}

interface SelectedCellInfo {
  selectedRow: number;
  selectedColumn: number;
  shxxtName: string;
}

export interface StyledDataType extends DataInfoType, DataStyle, SelectedCellInfoType {}

export interface PropsType {
  content?: number | string;
  col: number;
  row: number;
  style: CSSObject;
  isSelected: boolean;
}

export interface PropsListType extends SelectedCellInfoType {
  propsList: PropsType[][];
  colNum: number;
  rowNum: number;
}

const initialState: { [key: string]: PropsListType } = {};

function dataToProps({ // 객체 하나를 입력 받음.
  data,
  colNum,
  rowNum,
  styles,
  selectedRow,
  selectedColumn,
}: StyledDataType): PropsListType {
  const propsList: PropsType[][] = [];

  const convColNum = 2 * colNum + 1;
  const convRowNum = 2 * rowNum + 1;

  for (let row = 0; row < convRowNum; row++) {
    const propsRow: PropsType[] = [];
    for (let col = 0; col < convColNum; col++) {
      if (row % 2 && col % 2) {
        propsRow.push({
          col,
          row,
          content: data[Math.floor(row / 2)][Math.floor(col / 2)],
          style: styles[row][col],
          isSelected: row === selectedRow && col === selectedColumn,
        } as PropsType);
      } else {
        propsRow.push({ col, row, style: styles[row][col] } as PropsType);
      }
    }
    propsList.push(propsRow);
  }

  return { propsList, colNum: convColNum, rowNum: convRowNum };
}

const PropsListSlice = createSlice({
  name: "propsList",
  initialState,
  reducers: {
    addPropsList(state, action: PayloadAction<StyledDataType>) {
      const nextState = { ...dataToProps(action.payload) };
      state[action.payload.shxxtName] = nextState;
    },
    changeSelectedCell(state, action: PayloadAction<SelectedCellInfo>) {
      const { shxxtName, selectedRow, selectedColumn } = action.payload;
      
      // 굳이 이게 없어도 셀의 클릭 상태 변경은 가능.
      // 현재 선택한 셀의 정보를 시트 전역적으로 갖고있는게 좋겠다고 생각해서 넣었었어
      // 디자인 변경할 때 현재 어떤 셀/영역이 선택되어 있는지 정보가 필요하니까?
      //state[shxxtName].selectedRow = selectedRow;
      //state[shxxtName].selectedColumn = selectedColumn; 
      
      const prevState = state[shxxtName].propsList[selectedRow][selectedColumn].isSelected;
      state[shxxtName].propsList[selectedRow][selectedColumn].isSelected = !prevState;
    },
  },
});

export const { addPropsList, changeSelectedCell } = PropsListSlice.actions;
export default PropsListSlice.reducer;
