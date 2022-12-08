import React from "react";
import styled, { CSSObject } from "styled-components";

const CellStyle = styled.div((props) => ({
  width: "5rem",
  height: "2rem",
  borderBottom: "1px #333 solid",
  borderRight: "1px #333 solid",
}));

CellStyle.defaultProps = {};

export interface CellPropsType {
  cellStyle?: CSSObject;
  col?: number;
  row?: number;
  content?: string | number;
}

export default function Cell(props: CellPropsType) {
  return (
    <CellStyle
      style={{
        ...props.cellStyle,
        borderLeft: props.col === 0 ? "1px #333 solid" : "0px",
        borderTop: props.row === 0 ? "1px #333 solid" : "0px",
      }}
    >
      {props.content}
    </CellStyle>
  );
}
