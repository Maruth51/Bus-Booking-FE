import React, { useState } from "react";
import Suggestions from "./sugestions";
import { getResults, getBus } from "../services/dataServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
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
    <div className="container-fluid search-container">
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">From</label>
            <input
              type="Text"
              className="form-control"
              aria-describedby="Enter City"
              id="from"
              placeholder="Search for..."
              // onBlur={() => {
              //   setFromResult([]);
              // }}
              value={fromQuery}
              onChange={e => {
                setFromQuery(e.target.value);
                handleFromChange();
              }}
            />
            <div>
              {fromResults.length > 0 && (
                <Suggestions results={fromResults} clickCity={setFromCity} />
              )}
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputPassword1 ">To</label>
            <input
              type="Text"
              className="form-control"
              aria-describedby="Enter City"
              id="to"
              placeholder="Search for..."
              value={toQuery}
              onChange={e => {
                setToQuery(e.target.value);
                handleToChange();
              }}
            />
            <div>
              {toResults.length > 0 && (
                <Suggestions results={toResults} clickCity={setToCity} />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label className="control-label" htmlFor="date">
              Date
            </label>
            <br />
            <DatePicker
              className="form-control"
              selected={date}
              onChange={date => setDate(date)}
              minDate={new Date()}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mr-auto"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
