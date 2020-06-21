import React, { Fragment, useEffect, useState } from "react";
import { searchBus } from "../services/dataServices";
import { FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { useHistory } from "react-router-dom";
const BusList = () => {
  const [busList, setBusList] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const date = new Date();
  useEffect(() => {
    searchBus("trichy", "cbe", "today")
      .then(res => {
        console.log(res);
        setBusList(res);
        setEmpty(true);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <div className="bus-list">
      {isEmpty &&
        busList.map((bus, index) => {
          return <Bus bus={bus} key={index} />;
        })}
    </div>
  );
};

const Bus = ({ bus }) => {
  const history = useHistory();
  const timeStart = new Date(bus.time.start);
  const timeReach = new Date(bus.time.end);
  const duration = timeConversion(Math.abs(timeReach - timeStart));
  const availableSeat = bus.seat?.filter(ele => !ele);
  console.log(duration, "duration");
  const rating = [];
  for (let i = 0; i < 5; i++) {
    if (i < bus.rating) {
      rating.push(
        <li key={bus.id + i}>
          <figure>
            <FaStar color="red" />
          </figure>
        </li>
      );
    }
  }
  const handleClick = () => {
    history.push(`/bus/layout/${bus.id}`);
  };
  return (
    <Fragment>
      <div className="bus-container col-md-7" onClick={handleClick}>
        <div className="bus-top">
          <div className="bus-name-warp">
            <span className="bus-name">{bus.name}</span>
            <span className="bus-type">{bus.type}</span>
          </div>
          <div className="bus-time-warp">
            <div className="bus-time">
              <div className="bus-start">
                {timeStart.getHours() + ":" + timeStart.getMinutes()}
              </div>
              <div className="arrow">
                <span>
                  {" "}
                  <BsArrowRight />{" "}
                </span>
              </div>
              {timeReach.getHours() + ":" + timeReach.getMinutes()}
              <div className="bus-end" />
            </div>
            <div className="bus-hrs">
              <span>{duration}</span>
            </div>
          </div>
          <div className="bus-seat-wrap">
            <div>
              <span
                className="seat-count"
                style={{ color: "rgb(0, 156, 21)", fontSize: "large" }}
              >
                {availableSeat.length}
              </span>
              Seats Available
            </div>
          </div>
        </div>
        <div className="bus-bottom">
          <div className="bus-rating">
            <ul className="bus-rating-row">{rating}</ul>
          </div>
          <div className="bus-price">
            <span>
              <span>₹</span> {bus.fare}
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
function timeConversion(millisec) {
  var seconds = (millisec / 1000).toFixed(1);

  var minutes = (millisec / (1000 * 60)).toFixed(1);

  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return seconds + " Sec";
  } else if (minutes < 60) {
    return minutes + " Min";
  } else if (hours < 24) {
    return hours + " Hrs";
  } else {
    return days + " Days";
  }
}

export default BusList;
