import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  icon: "CLEAR_DAY",
  color: "black",
  size: 100,
  animate: true
};

const Day = ({ currentTemp, dayOfWeek, currentIcon, summary }) => {
  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date;
    return time + " " + month + " " + year;
  }

  return (
    <div>
      {
        <div className="current-weather">
          <h4>
            {" "}
            Right Now : {Math.round((currentTemp - 32) * (5 / 9))}°C
            <br />
          </h4>
          <ReactAnimatedWeather
            icon={currentIcon.toUpperCase().replace(/-/g, "_")}
            color={defaults.color}
            size={180}
            animate={defaults.animate}
          />
          <div className="current-summary">{summary}</div>
        </div>
      }
      <div className="parent-weather">
        {dayOfWeek.slice(1, 7).map(day => (
          <div className="child-weather">
            <li>
              {timeConverter(day.time)} <br></br>
              High: {Math.round((day.apparentTemperatureHigh - 32) * (5 / 9))}°C
              Low: {Math.round((day.apparentTemperatureLow - 32) * (5 / 9))}°C
              <br></br>
              <ReactAnimatedWeather
                icon={day.icon.toUpperCase().replace(/-/g, "_")}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
