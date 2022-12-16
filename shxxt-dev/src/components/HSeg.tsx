import React from "react";
import styled from "styled-components";
import { ExPartPropType } from "./Cell";

const HSegStyle = styled.div({
  width: "5rem",
  height: "3px",
  backgroundColor: "#333",
});

export default function HSeg({ style, row, col }: ExPartPropType) {
  return <HSegStyle style={style} />;
}
