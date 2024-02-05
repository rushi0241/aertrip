import React from "react";

const Card = (props) => {
  return (
    <>
      {props.data && (
        <>
          <div className="card">
            <p>{props.data.al}</p>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  gap: "15px",
                }}
              >
                <p>{props.data.dt}</p>
                <p>{props.data.leg[0].flights[0].ft}</p>
                <p>{props.data.at}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  gap: "15px",
                }}
              >
                <p>{props.data.leg[0].flights[0].fr}</p>
                <p style={{ width: "100%" }} className="border"></p>
                <p>{props.data.leg[0].flights[0].to}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                color: "#00cc99",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Rs. {props.data.farepr}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Card;
