import React from "react";

const Sugestions = ({ results, clickCity }) => {
  const options = results.map((elem, index) => {
    const selectCity = () => {
      console.log(elem);
      clickCity(elem);
    };
    return (
      <li key={index} className="li-city" onClick={selectCity}>
        {" "}
        {elem}
      </li>
    );
  });
  return (
    <div className="sug-box">
      <ul>{options}</ul>
    </div>
  );
};

export default Sugestions;
