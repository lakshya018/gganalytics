import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import TableContext from '../../contexts/TableContext';
import './Table.css';
import listData from './ListData';


const reorder = (list, startIndex, endIndex) => {
    if (list.length === 0) return;

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;

}

const Table = () => {
    // const context = useContext(TableContext);
    // const { allData, getData } = context;


    let data = localStorage.getItem('allColumnsData');
    let allData;
    data != null ? allData = JSON.parse(data) : allData = [];

    let start = localStorage.getItem("startDate");
    let startDate;
    start != null ? startDate = start : startDate = "";

    let end = localStorage.getItem("endDate");
    let endDate;
    end != null ? endDate = end : endDate = "";

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [columns, setColumns] = useState([]);

   


    useEffect(() => {
        setColumns(listData);

    }, [])


    // Function to display data after changing Settings
    const displayAppliedData = () => {
        document.getElementById("tableAfterChange").innerHTML = "";
       
        let html = "";
        let displayCols = [];
        html += `<table class='styled-table'>
                <thead>
                <tr>`;

        columns.forEach((col) => {
            if (col.bg === "yellow") {
                displayCols.push(col.name);
                col.name === "Date" ? html += `<th><i class="fa-solid fa-calendar-days icons"></i>Date</th>`
                    : col.name === "App Name" ? html += `<th><i class="fa-solid fa-gamepad icons"></i> App Name</th>`
                        : col.name === "Ad Request" ? html += `<th> <i class="fa-solid fa-code-pull-request icons"></i>Ad Request</th>`
                            : col.name === "Ad Response" ? html += `<th><i class="fa-solid fa-reply icons"></i>Ad Response</th>`
                                : col.name === "Impression" ? html += `<th><i class="fa-solid fa-heart icons"></i>Impression</th>`
                                    : col.name === "Clicks" ? html += `<th><i class="fa-solid fa-computer-mouse icons"></i>Clicks</th>`
                                        : col.name === "Revenue" ? html += `<th><i class="fa-solid fa-money-bill icons"></i>Revenue</th>`
                                            : col.name === "Fill Rate" ? html += `<th><i class="fa-solid fa-heart-pulse icons"></i>Fill Rate</th>`
                                                : html += `<th><i class="fa-solid fa-computer-mouse icons"></i>CTR</th>`
            }
        });

        html += `</tr></thead>`;
        html += `<tbody>`;
        allData.forEach((elem) => {
            html += `<tr>`
            displayCols.forEach((col) => {
                    if (col === "Date") {
                        html += `<td>${elem.date.substr(8, 2)} ${months[Number(elem.date.substr(5, 2)) - 1]} ${elem.date.substr(0, 4)}</td>`;
                    }
                    if (col === "App Name") {
                        html += `<td>${elem.app_id === "123456" ? "Panda Draw"
                            : elem.app_id === "789652" ? "Number Ninja"
                                : elem.app_id === "741553" ? "Word Crush"
                                    : elem.app_id === "986321" ? "Brain Quiz"
                                        : "Age Calculator"}</td>`;
                    }

                    if (col === "Ad Request") {
                        html += `<td>${elem.requests}</td>`;
                    }
                    if (col === "Ad Response") {
                        html += `<td>${elem.responses}</td>`;
                    }
                    if (col === "Impression") {
                        html += `<td>${elem.impressions}</td>`;
                    }
                    if (col === "Clicks") {
                        html += `<td>${elem.clicks}</td>`;
                    }
                    if (col === "Revenue") {
                        html += `<td>${elem.revenue}</td>`;
                    }
                    if (col === "Fill Rate") {
                        html += `<td>${(elem.requests * 100) / (elem.responses)}</td>`;
                    }
                    if (col === "CTR") {
                        html += `<td>${(elem.clicks * 100) / (elem.impressions)}</td>`;
                    }
                })
            html += `</tr>`;
        })

        html += `</tbody></table>`;

        document.getElementById("tableAfterChange").innerHTML = html;

    }


    //Function executed when the column is dragged and dropped at other position 
    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = reorder(columns, result.source.index, result.destination.index);

        localStorage.setItem("columnsList", JSON.stringify(reorderedItems));
        setColumns(reorderedItems);


    }

    //Function to enable or disable the view of any column
    const handleClick = (e, index) => {

        if (document.getElementById(e.target.id).style.borderLeftColor === "rgba(128, 128, 128, 0.61)") {
            document.getElementById(e.target.id).style.borderLeftColor = "#00ADB5";
            document.getElementById(e.target.id).style.borderLeftWidth = "10px";
            columns[index].bg = "yellow";
        }
        else {
            document.getElementById(e.target.id).style.borderLeftColor = "rgba(128, 128, 128, 0.61)";
            document.getElementById(e.target.id).style.borderLeftWidth = "1px";
            columns[index].bg = "none";
        }
        localStorage.setItem("columnsList", JSON.stringify(columns));
    }


    //Function to open/close settings
    const handleSettings = () => {
        if (document.getElementById("settings").style.display === "none") {
            document.getElementById("settings").style.display = "block";
        }
        else {
            document.getElementById("settings").style.display = "none";
        }
    }



    return (
        <div>


            {

                allData.length === 0 ?
                    <div >
                        <h1>No data to display</h1>
                    </div>
                    :

                    (<div>
                        <div>
                            <h4>Selected Date range is from {startDate.substr(8, 2)} {months[Number(startDate.substr(5, 2)) - 1]} {startDate.substr(0, 4)} to {endDate.substr(8, 2)} {months[Number(endDate.substr(5, 2)) - 1]} {endDate.substr(0, 4)}</h4>
                        </div>
                        <button onClick={handleSettings} className='settingBtn'><i class="fa-solid fa-sliders"></i> Settings</button>
                        <div id='settings'>

                            {/* Drag and Drop settings */}
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId='droppable' direction="horizontal">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="colItems" >
                                            {
                                                columns.map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={index} >
                                                            {(provided) => (
                                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} id={`col-${item.id}`} className='columnItem' onClick={e => handleClick(e, index)}>{item.name}</div>
                                                            )}

                                                        </Draggable>

                                                    );
                                                })

                                            }
                                            {provided.placeholder}
                                        </div>

                                    )}

                                </Droppable>
                            </DragDropContext>


                            {/* Apply Changes and Close Settings Buttons */}
                            <div className='settingBtns'>
                                <button onClick={displayAppliedData} className="applyBtn">Apply Changes</button>
                                <button className='cancelBtn' onClick={() => {
                                    document.getElementById("settings").style.display = "none";
                                }}>Close</button>
                            </div>

                        </div>


                        {/* Main Table Where the data is Displayed */}
                        
                        <div id="tableAfterChange">
                        <table className='styled-table'>
                            <thead>
                                <tr>
                                    <th><i class="fa-solid fa-calendar-days icons"></i>Date</th>
                                    <th><i class="fa-solid fa-gamepad icons"></i> App Name</th>
                                    <th><i class="fa-solid fa-code-pull-request icons"></i>Ad Request</th>
                                    <th><i class="fa-solid fa-reply icons"></i>Ad Response</th>
                                    <th><i class="fa-solid fa-heart icons"></i>Impression</th>
                                    <th><i class="fa-solid fa-computer-mouse icons"></i>Clicks</th>
                                    <th><i class="fa-solid fa-money-bill icons"></i>Revenue</th>
                                    <th><i class="fa-solid fa-heart-pulse icons"></i>Fill Rate</th>
                                    <th><i class="fa-solid fa-computer-mouse icons"></i>CTR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allData.map((elem) => {
                                        return (
                                            <tr>
                                                <td>{elem.date.substr(8, 2)} {months[Number(elem.date.substr(5, 2)) - 1]} {elem.date.substr(0, 4)}</td>
                                                <td>{elem.app_id === "123456" ? "Panda Draw"
                                                    : elem.app_id === "789652" ? "Number Ninja"
                                                        : elem.app_id === "741553" ? "Word Crush"
                                                            : elem.app_id === "986321" ? "Brain Quiz"
                                                                : "Age Calculator"}</td>
                                                <td>{elem.requests}</td>
                                                <td>{elem.responses}</td>
                                                <td>{elem.impressions}</td>
                                                <td>{elem.clicks}</td>
                                                <td>{elem.revenue}</td>
                                                <td>{(elem.requests * 100) / (elem.responses)}</td>
                                                <td>{(elem.clicks * 100) / (elem.impressions)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>

                    )

            }
        </div>
    )
}

export default Table