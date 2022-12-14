import React, { useState } from 'react'
import TableContext from './TableContext';
// import listData from '../comp/Table/ListData';

const TableState = (props) => {

    const [allData, setallData] = useState([]);
    const [startDate,setStart] = useState("");
    const [endDate,setEnd] = useState("");

    //Function to fetch data from the provided api
    const getData = async (start , end) => {
        const res = await fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${start}&endDate=${end}`);
        const resData = await res.json();

        localStorage.setItem("allColumnsData",JSON.stringify(resData.data));
        localStorage.setItem("startDate",start);
        localStorage.setItem("endDate",end);
        setallData(resData.data);
        setEnd(end);
        setStart(start);

        window.location.reload();
    }


  return (
    <TableContext.Provider value={{allData,startDate, endDate, getData}}>
        {props.children}
    </TableContext.Provider>
  )
}

export default TableState;