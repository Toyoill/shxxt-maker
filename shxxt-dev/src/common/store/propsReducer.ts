import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CSSObject } from "styled-components";

interface DataInfoType {
  data: (number | string)[][]; // sheet data
  colNum: number;              // sheet column size => 나중에 변하는 값인가?
  rowNum: number;              // sheet row size    => 얘도 나중에 변하는 값인가?
  shxxtName: string;           // sheet name (key of sheet) => 이건 키값이니까 불변이긴 한데
}

interface DataStyle {
  styles: CSSObject[][];       // part style 2d array => 각 파트의 스타일 정보를 저장하는 배열 => '파트'라고 하는 걸로 퉁친게 조금 불편함.
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
      state[action.payload.shxxtName].selectedRow = action.payload.selectedRow;
      state[action.payload.shxxtName].selectedColumn = action.payload.selectedColumn;
      state[action.payload.shxxtName].propsList[action.payload.selectedRow][action.payload.selectedColumn].isSelected = true;
    },
  },
});

export const { addPropsList, changeSelectedCell } = PropsListSlice.actions;
export default PropsListSlice.reducer;
