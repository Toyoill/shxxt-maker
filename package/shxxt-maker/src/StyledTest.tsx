import React from "react";
import styled from "styled-components";
import { Styles } from "./Shxxt/type";

const boxStyle: Styles = {
  border: "1px solid black",
};

const NewDiv = styled.div({
  ...boxStyle,
  width: "100px",
  height: "100px",
});

export default function StyledTest() {
  return <NewDiv>Hello World!</NewDiv>;
}
