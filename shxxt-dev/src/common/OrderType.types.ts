import { CSSObject } from "styled-components";

// 범위를 지정할 때 사용할 타입
export interface RangeType {
  // column 혹은 row단위로 range를 지정하고 싶다면 시작선과 끝선을 선택해서 여러개의 column과 row를 한번에 선택해 디자인을 지정할 수 있게 해준다.
  columns: [begin: number, end: number][];
  rows: [begin: number, end: number][];

  // 셀단위로 range로 지정하고 싶다면 직사각형 모양으로 왼쪽 위와 오른쪽 아래를 골라서 직사각형 내부의 모든셀을 한번에 선택해 디자인을 지정할 수 있게 해준다.
  general: [
    lu: [luRow: number, luCol: number],
    rd: [rdRow: number, rdCol: number]
  ][];
}

interface LineSelectSettingType {
  LeftBorderLine?: boolean;
  RightborderLine?: boolean;
  TopBorderLine?: boolean;
  BottomBorderLine?: boolean;
  InnerHLine?: boolean;
  InnerVLine?: boolean;
}

function constructorForLSST(
  l: boolean,
  r: boolean,
  t: boolean,
  b: boolean,
  h: boolean,
  v: boolean
): LineSelectSettingType {
  return {
    LeftBorderLine: l,
    RightborderLine: r,
    TopBorderLine: t,
    BottomBorderLine: b,
    InnerHLine: h,
    InnerVLine: v,
  };
}

const LineSelectModes: { [key: string]: LineSelectSettingType } = {
  OnlyOutLines: constructorForLSST(true, true, true, true, false, false),
  AllLines: constructorForLSST(true, true, true, true, true, true),
};

export interface OrderType {
  // 타입을 지정할 범위와 스타일을 하나의 명령으로 사용한다.
  range: RangeType;
  style: CSSObject;
  lineSelectSetting: LineSelectSettingType;
}

// 명령으로 이루어진 리스트형 타입
type StyleOrders = OrderType[];

export default StyleOrders;
