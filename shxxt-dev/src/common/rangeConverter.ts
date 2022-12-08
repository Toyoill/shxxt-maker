import { RangeType } from "./OrderType.types";

// 추후에 범위를 벗어남에 따라 에러 반환하는 부분 추가할 것!!!!

function columnConverter(
  column: [number, number],
  shxxtHeight: number
): [row: number, col: number][] {
  const [begin, end] = column;
  const convBegin = begin * 2;
  const convEnd = end * 2 + 2;
  const convHeight = shxxtHeight * 2 + 2;

  const convRange: [row: number, col: number][] = [];

  for (let row = 0; row <= convHeight; row++)
    for (let col = convBegin; col <= convEnd; col++) convRange.push([row, col]);

  return convRange;
}

function rowConverter(
  row: [number, number],
  shxxtWidth: number
): [row: number, col: number][] {
  const [begin, end] = row;
  const convBegin = begin * 2;
  const convEnd = end * 2 + 2;
  const convWidth = shxxtWidth * 2 + 2;

  const convRange: [row: number, col: number][] = [];

  for (let row = convBegin; row <= convEnd; row++)
    for (let col = 0; col <= convWidth; col++) convRange.push([row, col]);

  return convRange;
}

function generalConverter(
  general: [[number, number], [number, number]]
): [row: number, col: number][] {
  const [[luRow, luCol], [rdRow, rdCol]] = general;
  const convBeginRow = luRow * 2;
  const convEndRow = rdRow * 2 + 2;
  const convBeginCol = luCol * 2;
  const convEndCol = rdCol * 2 + 2;

  const convRange: [row: number, col: number][] = [];

  for (let row = convBeginRow; row <= convEndRow; row++)
    for (let col = convBeginCol; col <= convEndCol; col++)
      convRange.push([row, col]);

  return convRange;
}

function rangeConverter(
  range: RangeType,
  shxxtHeight: number,
  shxxtWidth: number
): [row: number, col: number][] {
  const convRange: [row: number, col: number][] = [];
  if (range.columns)
    range.columns.map((col) =>
      convRange.concat(columnConverter(col, shxxtHeight))
    );
  if (range.rows)
    range.rows.map((row) => convRange.concat(rowConverter(row, shxxtWidth)));
  if (range.general)
    range.general.map((gen) => convRange.concat(generalConverter(gen)));

  convRange.sort();

  return convRange.filter((e, idx) => idx === 0 || convRange[idx - 1] !== e);
}

export function getCellCord(
  cord: [row: number, col: number]
): [row: number, col: number] {
  return [2 * cord[0] + 1, 2 * cord[1] + 1];
}

export default rangeConverter;
