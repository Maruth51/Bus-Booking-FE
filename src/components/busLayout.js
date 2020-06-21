import React, { Fragment, useState } from "react";

const BusLayout = () => {
  const occupency = [
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false
  ];
  const seatGen = [];
  const [selectedSeat, setSelected] = useState([]);
  const handleSelectSeat = seatNo => {
    let index = selectedSeat.indexOf(seatNo);

    if (index === -1) {
      setSelected(selectedSeat.concat(seatNo));
    } else {
      setSelected(selectedSeat.filter((ele, ind) => index !== ind));
    }
    console.log(selectedSeat, index);
  };
  let i = 1;
  while (i < occupency.length) {
    seatGen.push(
      <SeatLayout
        key={i}
        start={i}
        occupency={occupency}
        onSeatSelect={handleSelectSeat}
      />
    );
    i = i + 4;
  }
  return (
    <div className="layout-container">
      <div className="bus-layout">
        <div className="graph">
          {" "}
          <div className="graph-elem">
            <div className="red" />
            <span>Booked</span>
          </div>
          <div className="graph-elem">
            <div className="blue" />
            <span>Available</span>
          </div>
          <div className="graph-elem">
            <div className="green" />
            <span>Selected</span>
          </div>
        </div>
        <p className="front"> Front </p>
        <div className="seat-warp">{seatGen}</div>
        <div className="footer">
          <div>
            <span>Seats: </span>
            <span> {selectedSeat.join(",")}</span>
            <p>Total fare :{selectedSeat.length * 100}</p>
          </div>
          <div>
            <button className="btn btn-primary btn-sm">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SeatLayout = ({ start, occupency, onSeatSelect }) => {
  return (
    <div className="seat-row-warp">
      <div className="seat-row-left">
        <Seat
          no={start}
          isBooked={occupency[start]}
          onSeatSelect={onSeatSelect}
        />
        <Seat
          no={start + 1}
          isBooked={occupency[start + 1]}
          onSeatSelect={onSeatSelect}
        />
      </div>
      <div className="seat-row-right">
        <Seat
          no={start + 2}
          isBooked={occupency[start + 2]}
          onSeatSelect={onSeatSelect}
        />
        <Seat
          no={start + 3}
          isBooked={occupency[start + 3]}
          onSeatSelect={onSeatSelect}
        />
      </div>
    </div>
  );
};

const Seat = ({ no, isBooked, onSeatSelect }) => {
  const [isSelected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected(!isSelected);
    onSeatSelect(no);
  };
  return (
    <button
      className="seat"
      style={{
        backgroundColor: isBooked ? "red" : isSelected ? "green" : "blue"
      }}
      onClick={handleClick}
      disabled={isBooked}
    >
      {" "}
      {no}{" "}
    </button>
  );
};
export default BusLayout;
