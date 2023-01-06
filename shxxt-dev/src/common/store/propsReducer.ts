import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CSSObject } from "styled-components";
import { RangeType } from "../OrderType.types";

interface DataInfoType {
  data: (number | string)[][]; // sheet data
  header: (string)[]; // sheet header content
  colNum: number;              // sheet column size 
  rowNum: number;              // sheet row size    
  shxxtName: string;           // sheet name (key of sheet)
}

interface DataStyle {
  styles: CSSObject[][];       // part style 2d array => 각 파트의 스타일 정보를 저장하는 배열
}

interface SelectedCellInfo {
  selectedRow: number;
  selectedColumn: number;
  shxxtName: string;
}

export interface StyledDataType extends DataInfoType, DataStyle {} // Sheet Props

export interface PropsType {
  content?: number | string;
  header?: string;
  col: number;
  row: number;
  style: CSSObject;
}

export interface PropsListType {
  propsList: PropsType[][];
  colNum: number;
  rowNum: number;
  isDragMode: boolean;
  range: RangeType;
}

const initialState: { [key: string]: PropsListType } = {};

function dataToProps({ // 객체 하나를 입력 받음.
  data,
  header,
  colNum,
  rowNum,
  styles,
}: StyledDataType): PropsListType {
  const propsList: PropsType[][] = [];

  const convRowNum = 2 * rowNum + 3;
  const convColNum = 2 * colNum + 1;

  for (let row = 0; row < convRowNum; row++) {
    const propsRow: PropsType[] = [];
    for (let col = 0; col < convColNum; col++) {
      if (row % 2 && col % 2) {
        propsRow.push({
          col,
          row,
          content: row > 1 ? data[Math.floor((row-2) / 2)][Math.floor((col) / 2)] : undefined,
          header: row === 1 ? header[Math.floor((col) / 2)] : undefined,
          style: styles[row][col],
        } as PropsType);
      } else {
        propsRow.push({ col, row, style: styles[row][col] } as PropsType);
      }
    }
    propsList.push(propsRow);
  }

  return {
    propsList, 
    colNum: convColNum, 
    rowNum: convRowNum, 
    isDragMode: false,
    range: {
      columns: [],
      rows: [],
      general: []
    },
  };
}

const PropsListSlice = createSlice({
  name: "propsList",
  initialState,
  reducers: {
    addPropsList(state, action: PayloadAction<StyledDataType>) {
      const nextState = { ...dataToProps(action.payload) };
      state[action.payload.shxxtName] = nextState;
    },
    changeCellRange(state, action: PayloadAction<SelectedCellInfo>) {
      const { shxxtName, selectedRow, selectedColumn } = action.payload;
      const [startCellRow, startCellColumn] = state[shxxtName].range.general.pop()![0];
      state[shxxtName].range.general.push([[startCellRow, startCellColumn], [selectedRow, selectedColumn]]);
    },
    startToSetCellRange(state, action:PayloadAction<SelectedCellInfo>) {
      const { shxxtName, selectedRow, selectedColumn } = action.payload;
      state[shxxtName].isDragMode = true;
      state[shxxtName].range.general = [];
      state[shxxtName].range.general.push([[selectedRow, selectedColumn], [selectedRow, selectedColumn]]);
    },
    endToSetCellRange(state, action:PayloadAction<SelectedCellInfo>) {
      const { shxxtName, selectedRow, selectedColumn } = action.payload;
      const [startCellRow, startCellColumn] = state[shxxtName].range.general.pop()![0];
      state[shxxtName].range.general.push([[startCellRow, startCellColumn], [selectedRow, selectedColumn]]);
      state[shxxtName].isDragMode = false;
    },
  },
});

export const { addPropsList, changeCellRange, startToSetCellRange, endToSetCellRange } = PropsListSlice.actions;
export default PropsListSlice.reducer;
