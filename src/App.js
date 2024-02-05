import { useState, useEffect } from "react";
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
          }}
        >
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
              return <Card data={item} />;
            })
          ) : (
            <div
              style={{
                fontWeight: "bold",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: "100%",
              }}
            >
              Data Not Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
