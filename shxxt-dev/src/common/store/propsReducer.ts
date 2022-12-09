import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CSSObject } from "styled-components";

interface DataInfoType {
  data: (number | string)[][];
  colNum: number;
  rowNum: number;
}

interface DataStyle {
  styles: CSSObject[][];
}

export interface StyledDataType extends DataInfoType, DataStyle {}

export interface PropsType {
  content?: number | string;
  col: number;
  row: number;
  style: CSSObject;
}

export interface PropsListType {
  propsList: PropsType[][];
  colNum: number;
  rowNum: number;
}

const initialState: PropsListType = {
  propsList: [],
  colNum: 0,
  rowNum: 0,
};

function dataToProps({
  data,
  colNum,
  rowNum,
  styles,
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
    createPropsList(state, action: PayloadAction<StyledDataType>) {
      const nextState = { ...dataToProps(action.payload) };
      state.colNum = nextState.colNum;
      state.propsList = nextState.propsList;
      state.rowNum = nextState.rowNum;
    },
  },
});

export const { createPropsList } = PropsListSlice.actions;
export default PropsListSlice.reducer;
