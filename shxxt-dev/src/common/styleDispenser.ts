import { CSSObject } from "styled-components";
import { OrderType } from "./OrderType.types";
import { LinePartsType, DividedRangeType } from "./PartType.types";
import rangeConverter, {
  HLinePartsList,
  LinePartsList,
  VLinePartsList,
} from "./rangeConverter";

export function orderedStyleDispenser(
  order: OrderType,
  colNum: number,
  rowNum: number
): CSSObject[][] {
  const styles: CSSObject[][] = Array<CSSObject[]>(rowNum).fill(
    Array<CSSObject>(colNum)
  );

  const { lineSelectSetting, style, range }: OrderType = order;
  const dividedRange: DividedRangeType = rangeConverter(range, rowNum, colNum);

  LinePartsList.forEach((partType: LinePartsType) => {
    if (lineSelectSetting[partType]) {
      dividedRange[partType].forEach(([row, col]) => {
        if (row % 2 && col % 2) {
          styles[row][col].width = style.borderWidth;
          styles[row][col].height = style.borderWidth;
        } else {
          if (HLinePartsList.includes(partType)) {
            styles[row][col].width = style.width;
            styles[row][col].height = style.borderWidth;
          }
          if (VLinePartsList.includes(partType)) {
            styles[row][col].height = style.height;
            styles[row][col].width = style.borderWidth;
          }
        }
        styles[row][col].backgroundColor = style.borderColor;
      });
    }
  });

  dividedRange.Cells.forEach(([row, col]) => {
    styles[row][col].backgroundColor = style.backgroundColor;
    styles[row][col].color = style.color;
    styles[row][col].font = style.font;
    styles[row][col].fontFamily = style.fontFamily;
    styles[row][col].fontWeight = style.fontWeight;
  });

  return styles;
}
