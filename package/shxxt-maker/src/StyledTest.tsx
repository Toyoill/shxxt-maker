import React from "react";
import styled from "styled-components";
import { Styles } from "./Shxxt/type";

const defaultStyle: Styles = {
  border: "1px solid black",
  width: "200px",
  height: "200px",
  alignItems: "center",
  justifyContent: "center",
};

const NewDiv = styled.div({
  display: "flex",
  ...defaultStyle,
});

export default function StyledTest() {
  return <NewDiv>Hello World!</NewDiv>;
}
