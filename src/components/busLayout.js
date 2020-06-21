import React, { Fragment, useState } from "react";

const BusLayout = () => {
  const occupency = [true, true, false, false, true, true, false, false];
  const seatGen = [];
  let selectedSeat = [];
  const handleSelectSeat = seatNo => {
    let index = selectedSeat.indexOf(seatNo);

    if (index === -1) {
      selectedSeat.push(seatNo);
    } else {
      selectedSeat = selectedSeat.filter((ele, ind) => index !== ind);
    }
    console.log(selectedSeat, index);
  };
  let i = 1;
  while (i < 8) {
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
        <p className="front"> Front </p>
        <div className="seat-warp">{seatGen}</div>
      </div>
      <div className="details" />
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
