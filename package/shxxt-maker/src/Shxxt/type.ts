export interface Border {
  border?: string;
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: string;

  // Top
  topBorder?: string;
  topBorderColor?: string;
  topBorderStyle?: string;
  topBorerWidth?: string;

  // Bottom
  bottomBorder?: string;
  bottomBorderColor?: string;
  bottomBorderStyle?: string;
  bottomBorerWidth?: string;

  // Left
  leftBorder?: string;
  leftBorderColor?: string;
  leftBorderStyle?: string;
  leftBorerWidth?: string;

  // Right
  rightBorder?: string;
  rightBorderColor?: string;
  rightBorderStyle?: string;
  rightBorerWidth?: string;
}

export interface Font {
  font?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: string;
  fontSize?: string;
  lineHeight?: string;
  fontFamily?: string;
}

export interface Styles extends Border, Font {}
