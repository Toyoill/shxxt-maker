import { RangeType } from "./OrderType.types";

// 추후에 범위를 벗어남에 따라 에러 반환하는 부분 추가할 것!!!!

// range에 column이 있다면 그 부분을 우리가 필요한 index들로 바꿔서 저장하는 코드
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

// range에 row가 있는 경우에 대해 ~~
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

// range에 general이 있는 경우에 대해 ~~
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

// 결과적으로 range 객체에 있는 모든 범위들을 처리하는 코드, 모든 인덱스들을 모아서 겹치는 부분을 제외해줌
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

// 셀단위 row, col을 part 컴포넌트 단위의 row, col로 바꿔주는 코드
export function getCellCord(
  cord: [row: number, col: number]
): [row: number, col: number] {
  return [2 * cord[0] + 1, 2 * cord[1] + 1];
}

export default rangeConverter;
