import React, { useContext, useState } from 'react'
import TableContext from '../../contexts/TableContext';
import './Home.css';
import listData from '../Table/ListData';
const Home = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const context = useContext(TableContext);
    const { getData } = context;

    //Function executed to fetch the data when the start and end dates are selected
    const handlerClick = () => {
        localStorage.setItem("columnsList",JSON.stringify(listData));
        if(!startDate || !endDate){
            alert("Enter Start and End Date!");
            return;
        }
        localStorage.setItem("columnsList",JSON.stringify(listData));
        
        getData(startDate, endDate);
        
    }

    return (
        <div>
            <h1>Analytics Page</h1>

            {/* Date Picker */}
            <div>
                <h3>Select a Date</h3>
                <div className="dates">
                    <div className='startDiv'>
                        <h4 className="items" >Start Date: </h4>
                        <input type="date" className="items date" id="startDate" onChange={e => setStartDate(e.target.value)} />
                    </div>

                    <div className='endDiv'>
                        <h4 className='items'>End Date: </h4>
                        <input type="date" className="items date" id="endDate" onChange={e => setEndDate(e.target.value)} />
                    </div>
                </div>


                <button className="fetchBtn" onClick={handlerClick}> <i className="fa-solid fa-database icons"></i> Fetch Data</button>

                <hr className='hrLine'/>
            </div>

        </div>
    )
}

export default Home