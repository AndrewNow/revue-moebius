import React from "react";

const ConvertDateToString = ({ data }) => {
  const d = new Date(`${data}`);

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  return (
    <span>
      {date} {month}, {year}
    </span>
  );
};

export default ConvertDateToString;
