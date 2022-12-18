import React from "react";
import styled from "styled-components";
import { PartPropType } from "./Part";

const HSegStyle = styled.div({
  width: "5rem",
  height: "3px",
  backgroundColor: "#333",
});

export default function HSeg({ style, row, col }: PartPropType) {
  return <HSegStyle style={style} />;
}
