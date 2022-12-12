import React from "react";
import styled from "styled-components";
import { ExPartPropType } from "./Cell";

const VSegStyle = styled.div({
  height: "5rem",
  width: "3px",
  backgroundColor: "#333",
});

export default function VSeg({ style, row, col }: ExPartPropType) {
  return <VSegStyle style={style} />;
}
