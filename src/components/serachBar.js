import React, { useState } from "react";
import Suggestions from "./sugestions";
import { getResults } from "../services/dataServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [fromQuery, setFromQuery] = useState("Banglore");
  const [toQuery, setToQuery] = useState("Chennai");
  const [fromResults, setFromResult] = useState([]);
  const [toResults, setToResult] = useState([]);
  const [date, setDate] = useState(new Date());
  const history = useHistory();

  const setFromCity = city => {
    console.log("city", city);
    setFromQuery(city);
    setFromResult([]);
  };
  const setToCity = city => {
    console.log("city", city);
    setToQuery(city);
    setToResult([]);
  };
  const handleFromChange = () => {
    if (fromQuery && fromQuery.length >= 1) {
      if (fromQuery.length % 2 === 0) {
        getResults(fromQuery)
          .then(data => {
            setFromResult(data);
          })
          .catch(err => {
            alert("error");
          });
      }
    }
  };
  const handleToChange = () => {
    console.log("toquery", toQuery);
    if (toQuery && toQuery.length >= 1) {
      getResults(toQuery)
        .then(data => {
          console.log(toQuery, data);
          setToResult(data);
        })
        .catch(err => {
          alert("error");
        });
    }
  };
  const handleSubmit = () => {
    history.push("/search");
  };
  return (
    <div className="search-container">
      <div class="screen-home__location">
        <div class="input-wrap">
          <div class="inside-wrap">
            <div class="rotate-btn">
              <figure>
                <img src="https://i.ibb.co/HPBrQkn/rotate-btn.png" />
              </figure>
            </div>
            <div class="from">
              <span class="inside-lable">From</span>
              <input
                type="Text"
                className="input"
                aria-describedby="Enter City"
                id="from"
                placeholder="From City"
                autoComplete="off"
                // onBlur={() => {
                //   setFromResult([]);
                // }}
                value={fromQuery}
                onChange={e => {
                  setFromQuery(e.target.value);
                  handleFromChange();
                }}
              />
              {fromResults.length > 0 && (
                <Suggestions results={fromResults} clickCity={setFromCity} />
              )}
            </div>
            <div class="to">
              <span class="inside-lable">To</span>
              <input
                autoComplete="off"
                type="Text"
                className="input"
                aria-describedby="Enter City"
                id="to"
                placeholder="To City"
                value={toQuery}
                onChange={e => {
                  setToQuery(e.target.value);
                  handleToChange();
                }}
              />
              {toResults.length > 0 && (
                <Suggestions results={toResults} clickCity={setToCity} />
              )}
            </div>
          </div>
        </div>
        <div class="date-warp">
          <div className="inside-wrap date">
            <DatePicker
              className="input"
              selected={date}
              onChange={date => setDate(date)}
              minDate={new Date()}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mr-auto"
          onClick={handleSubmit}
        >
          Find Bus
        </button>
      </div>
    </div>
  );
};

export default Search;
