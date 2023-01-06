import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CSSObject } from "styled-components";
import store from "./common/store/store";
import Shxxt from "./components/Shxxt";
import reportWebVitals from "./reportWebVitals";

const headerDataArray:string[] = ["data1","data2","data3","data4"];

const dataArray = [
  [2, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
];

/*const newDataArray = [
  [2, 1, 1, 1],
  [1, 2, 1, 1],
  [1, 1, 2, 1],
  [1, 1, 1, 2],
];*/

const stylesArray: CSSObject[][] = [
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
];

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <div style={{ display: "flex" }}>
      <Shxxt
        shxxtName={"oneSheet"}
        data={dataArray}
        styles={stylesArray}
        colNum={4}
        rowNum={4}
        header={headerDataArray}
        includeHeader={false}
      />
      {/*
      <div style={{width:300, height:200, backgroundColor:"yellow"}}>hiii</div>
      <Shxxt
        shxxtName={"twoSheet"}
        data={newDataArray}
        styles={stylesArray}
        colNum={4}
        rowNum={4}
      />
      */}
    </div>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
