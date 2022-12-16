export type ColumnsType = [number, number];
export type RowsType = [number, number];
export type GeneralRangeType = [lu: [number, number], rd: [number, number]];
export type ConvRangeType = [row: number, col: number][];

export interface DividedRangeType {
  TopBorderLine: ConvRangeType;
  LeftBorderLine: ConvRangeType;
  RightBorderLine: ConvRangeType;
  BottomBorderLine: ConvRangeType;
  InnerHLine: ConvRangeType;
  InnerVLine: ConvRangeType;
  Cells: ConvRangeType;
}

export type HLinePartsType =
  | "TopBorderLine"
  | "BottomBorderLine"
  | "InnerHLine";
export type VLinePartsType =
  | "LeftBorderLine"
  | "RightBorderLine"
  | "InnerVLine";
export type LinePartsType = HLinePartsType | VLinePartsType;
export type PartsType = LinePartsType | "Cells";
