import ColumnHeaderItem from "./ColumnHeaderItem";
import HSeg from "./HSeg";
import Intersection from "./Intersection";
import VSeg from "./VSeg";


export default function Header({headerData}:any) {
    console.log(headerData);
    return <>
        <div style={{display: "flex"}}>
            <Intersection key={-1} shxxtName={""} style={{}} row={-1} col={-1}/>
            <HSeg key={-1} shxxtName={""} style={{}} row={-1} col={-1}/>
            <Intersection key={-1} shxxtName={""} style={{}} row={-1} col={-1}/>
            <HSeg key={-1} shxxtName={""} style={{}} row={-1} col={-1}/>
            <Intersection key={-1} shxxtName={""} style={{}} row={-1} col={-1}/>
            <HSeg key={-1} shxxtName={""} style={{}} row={-1} col={-1}/>
            <Intersection key={-1} shxxtName={""} style={{}} row={-1} col={-1}/>
            <HSeg key={-1} shxxtName={""} style={{}} row={-1} col={-1}/>
            <Intersection key={-1} shxxtName={""} style={{}} row={-1} col={-1}/>
        </div>
        <div style={{display: "flex"}}>
            <VSeg key={-1} shxxtName={""} style={{height: "2rem"}} row={-1} col={-1}/>
            <ColumnHeaderItem/>
            <VSeg key={-1} shxxtName={""} style={{height: "2rem"}} row={-1} col={-1}/>
            <ColumnHeaderItem/>
            <VSeg key={-1} shxxtName={""} style={{height: "2rem"}} row={-1} col={-1}/>
            <ColumnHeaderItem/>
            <VSeg key={-1} shxxtName={""} style={{height: "2rem"}} row={-1} col={-1}/>
            <ColumnHeaderItem/>
            <VSeg key={-1} shxxtName={""} style={{height: "2rem"}} row={-1} col={-1}/>
        </div>
    </>;
}