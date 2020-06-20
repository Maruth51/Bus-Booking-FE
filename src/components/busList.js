import React, { Fragment, useEffect, useState } from "react";
import { searchBus } from "../services/dataServices";
import { FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
const BusList = () => {
  const [busList, setBusList] = useState([]);
  const date = new Date();
  useEffect(() => {
    searchBus("trichy", "cbe", "today")
      .then(res => {
        console.log(res);
        setBusList(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <div className="bus-list">
      {busList.map((bus, index) => {
        return <Bus bus={bus} key={index} />;
      })}
    </div>
  );
};

const Bus = ({ bus }) => {
  const timeStart = new Date(bus.time.start);
  const timeReach = new Date(bus.time.end);
  const rating = [];
  for (let i = 0; i < 5; i++) {
    if (i < bus.rating) {
      rating.push(
        <li>
          <figure>
            <FaStar color="red" />
          </figure>
        </li>
      );
    }
  }
  return (
    <Fragment>
      <div className="bus-container col-md-8">
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
              <span>3 hrs</span>
            </div>
          </div>
          <div className="bus-seat-wrap">
            <div>
              <span className="seat-count">20</span>
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

export default BusList;
