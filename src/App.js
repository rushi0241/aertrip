import React, { useState, useEffect } from "react";
import Header from "./Component/Header";
import data from "./API/api-data.json";
import Card from "./Component/Card";

function App() {
  const [themeColor, setThemeColor] = useState();
  const [loadingData, setLoadingData] = useState();
  const [fligths, setFlights] = useState();
  const [array1, setArray1] = useState([]);
  const data2 = data[0].data[0].flights[0].results.j;
  const theme = (data) => {
    setThemeColor(data);
  };
  const loading = (data) => {
    setLoadingData(data);
  };

  function checkfileter(array) {
    let b = data2.filter((item) => {
      return item.ap.join("") == array.join("");
    });
    setFlights(b);
  }
  const highPrice = () => {
    const flightMap = fligths
      .map((item) => item)
      .sort((a, b) => b.farepr - a.farepr);
    setFlights(flightMap);
  };
  const lowPrice = () => {
    const flightMap = fligths
      .map((item) => item)
      .sort((a, b) => a.farepr - b.farepr);
    setFlights(flightMap);
  };
  useEffect(() => {
    checkfileter(array1);
  }, [array1, data2]);
  return (
    <div
      className={themeColor ? "dark" : ""}
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        theme={theme}
        loading={loading}
        filterfy={(value) => {
          setArray1(value);
        }}
      />
      <div style={{ height: "100%", overflowY: "auto", padding: "0 20px" }}>
        <div
          className="search-inner"
          style={{
            display: "flex",
            rowGap: "15px",
            padding: "15px 0",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={lowPrice} className="search-btn button">
              Low Price
            </button>
            <button onClick={highPrice} className="search-btn button">
              High Price
            </button>
          </div>
          {loadingData ? (
            <div
              style={{
                fontWeight: "bold",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: "100%",
              }}
            >
              Data is Fetching...
            </div>
          ) : fligths?.length > 0 ? (
            fligths.map((item, index) => {
              return (
                <>
                  <Card data={item} />
                </>
              );
            })
          ) : (
            <div
              style={{
                fontWeight: "bold",
                flexDirection: "column",
                display: "flex",
                height: "100%",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>Data Not Found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
