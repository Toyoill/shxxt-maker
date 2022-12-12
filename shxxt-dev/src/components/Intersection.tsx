import React from "react";
import styled from "styled-components";
import { ExPartPropType } from "./Cell";

const IntersecionStyle = styled.div({
  height: "3px",
  width: "3px",
  backgroundColor: "#333",
});

export default function Intersection({ style, row, col }: ExPartPropType) {
  return <IntersecionStyle style={style} />;
}
