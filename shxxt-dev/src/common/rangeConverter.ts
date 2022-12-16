import { RangeType } from "./OrderType.types";
import {
  ColumnsType,
  DividedRangeType,
  GeneralRangeType,
  LinePartsType,
  PartsType,
  RowsType,
} from "./PartType.types";

export const HLinePartsList: LinePartsType[] = [
  "TopBorderLine",
  "InnerHLine",
  "BottomBorderLine",
];

export const VLinePartsList: LinePartsType[] = [
  "LeftBorderLine",
  "RightBorderLine",
  "InnerVLine",
];

export const LinePartsList: LinePartsType[] = [
  ...HLinePartsList,
  ...VLinePartsList,
];

export const PartsList: PartsType[] = [...LinePartsList, "Cells"];

const defaultDividedRangeType: DividedRangeType = {
  TopBorderLine: [],
  LeftBorderLine: [],
  RightBorderLine: [],
  BottomBorderLine: [],
  InnerHLine: [],
  InnerVLine: [],
  Cells: [],
};

function generalConverter(general: GeneralRangeType): DividedRangeType {
  const {
    Cells,
    LeftBorderLine,
    RightBorderLine,
    InnerHLine,
    InnerVLine,
    TopBorderLine,
    BottomBorderLine,
  }: DividedRangeType = defaultDividedRangeType;

  const [[luRow, luCol], [rdRow, rdCol]] = general;
  const convBeginRow = luRow * 2;
  const convEndRow = rdRow * 2 + 2;
  const convBeginCol = luCol * 2;
  const convEndCol = rdCol * 2 + 2;

  for (let row = convBeginRow; row <= convEndRow; row++)
    for (let col = convBeginCol; col <= convEndCol; col++) {
      if (row === convBeginRow) TopBorderLine.push([row, col]);
      if (col === convBeginCol) LeftBorderLine.push([row, col]);
      if (row === convEndRow) BottomBorderLine.push([row, col]);
      if (col === convEndCol) RightBorderLine.push([row, col]);
      if (
        row > convBeginRow &&
        row < convEndRow &&
        col > convBeginCol &&
        col < convEndCol
      ) {
        if (col % 2 && row % 2) Cells.push([row, col]);
        else {
          if (col % 2) InnerVLine.push([row, col]);
          if (row % 2) InnerHLine.push([row, col]);
        }
      }
    }

  return {
    Cells,
    TopBorderLine,
    BottomBorderLine,
    LeftBorderLine,
    RightBorderLine,
    InnerHLine,
    InnerVLine,
  };
}

function rowConverter(row: RowsType, shxxtWidth: number): DividedRangeType {
  const [begin, end] = row;
  return generalConverter([
    [begin, 0],
    [end, shxxtWidth],
  ]);
}

function columnConverter(
  column: ColumnsType,
  shxxtHeight: number
): DividedRangeType {
  const [begin, end] = column;
  return generalConverter([
    [0, begin],
    [shxxtHeight, end],
  ]);
}

function mergeRange(
  range1: DividedRangeType,
  range2: DividedRangeType
): DividedRangeType {
  return {
    Cells: [...range1.Cells, ...range2.Cells],
    BottomBorderLine: [...range1.BottomBorderLine, ...range2.BottomBorderLine],
    TopBorderLine: [...range1.TopBorderLine, ...range2.TopBorderLine],
    LeftBorderLine: [...range1.LeftBorderLine, ...range2.LeftBorderLine],
    RightBorderLine: [...range1.RightBorderLine, ...range2.RightBorderLine],
    InnerHLine: [...range1.InnerHLine, ...range2.InnerHLine],
    InnerVLine: [...range1.InnerVLine, ...range2.InnerVLine],
  };
}

// 결과적으로 range 객체에 있는 모든 범위들을 처리하는 코드, 모든 인덱스들을 모아서 겹치는 부분을 제외해줌
function rangeConverter(
  range: RangeType,
  shxxtHeight: number,
  shxxtWidth: number
): DividedRangeType {
  const convRange: DividedRangeType = defaultDividedRangeType;
  if (range.columns)
    range.columns.map((col) =>
      mergeRange(convRange, columnConverter(col, shxxtHeight))
    );
  if (range.rows)
    range.rows.map((row) =>
      mergeRange(convRange, rowConverter(row, shxxtWidth))
    );
  if (range.general)
    range.general.map((gen) => mergeRange(convRange, generalConverter(gen)));

  return convRange;
}

// 셀단위 row, col을 part 컴포넌트 단위의 row, col로 바꿔주는 코드
export function getCellCord(
  cord: [row: number, col: number]
): [row: number, col: number] {
  return [2 * cord[0] + 1, 2 * cord[1] + 1];
}

export default rangeConverter;
