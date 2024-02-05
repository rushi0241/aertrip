import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from "../assets/logo.svg";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import switchImg from "../assets/switch.svg";
import data from "../API/api-data.json";
const Header = ({ theme, loading, ...props }) => {
  const [themes, setThemes] = useState(true);
  const [switchInputs, setSwitchInputs] = useState(false);
  const [results, setResults] = useState();
  const [flights, setFlights] = useState([]);
  props.filterfy(flights);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    errors: {},
    loading: loading,
  });

  const fldata = data[0].data[0].flights;
  const fromDatas = Object.entries(fldata[0].results.apdet);
  const toDatas = Object.entries(fldata[1].results.apdet);
  const result = Object.entries(fldata[1].results.j[1].leg[0].flights);
  const formDB = result.map((item, index) => {
    return item.map((it, inde) => {
      return it;
    });
  });
  function filter(data) {
    let cx = [data.from.slice(0, 3), data.to.slice(0, 3)];
    setFlights(cx);
  }
  const switchColor = () => {
    setThemes(!themes);
    theme(themes);
  };
  const menu = [
    {
      menuName: "Flight",
      active: true,
    },
    {
      menuName: "Hotel",
      active: false,
    },
    {
      menuName: "Visa",
      active: false,
    },
    {
      menuName: "AI Trip",
      active: false,
    },
    {
      menuName: "Group Tour",
      active: false,
    },
  ];
  const menuList = menu.map((item, index) => {
    return (
      <li className={item.active == true ? "active" : ""}>{item.menuName}</li>
    );
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.from) {
      errors.from = "From is required";
    }
    if (!formData.to) {
      errors.to = "To is required";
    }
    setFormData((prevState) => ({ ...prevState, errors }));
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setResults(formDB);
    if (validateForm()) {
      setFormData({
        ...formData,
        loading: loading(true),
      });
      setTimeout(() => {
        setFormData({
          from: "",
          to: "",
          errors: "",
          loading: loading(false),
        });
      }, 2000);
    } else {
    }
  };
  const switchInput = () => {
    setSwitchInputs(!switchInputs);
  };
  return (
    <>
      <div className="header">
        <img src={Logo} />
        <ul>{menuList}</ul>
        <div
          onClick={switchColor}
          style={{ display: "flex", cursor: "pointer" }}
        >
          {themes ? <img src={sun} /> : <img src={moon} />}
        </div>
        <div style={{ textAlign: "center" }}>Trips</div>
        <div style={{ textAlign: "center" }}>Profile</div>
      </div>
      <div className="search-container">
        <div className="search-inner">
          <form onSubmit={handleSubmit}>
            <div style={{ width: "100%" }}>
              <select
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
              >
                <option>From</option>
                {fromDatas.map((item, index) => {
                  return (
                    <option key={index} value={item[0]}>
                      {item[1].c}, {item[1].cn}
                    </option>
                  );
                })}
              </select>
              {formData.errors.from && (
                <p
                  style={{
                    color: "red",
                    padding: "0",
                    margin: "0",
                    fontSize: "10px",
                  }}
                >
                  {formData.errors.from}
                </p>
              )}
            </div>
            <div
              onClick={switchInput}
              className={switchInputs ? "switch-input" : "active"}
            >
              <img src={switchImg} />
            </div>
            <div style={{ width: "100%" }}>
              <select
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
              >
                <option>To</option>
                {toDatas.map((item, index) => {
                  return (
                    <option key={index} value={item[0]}>
                      {item[1].c}, {item[1].cn}
                    </option>
                  );
                })}
              </select>
              {formData.errors.to && (
                <p
                  style={{
                    color: "red",
                    padding: "0",
                    margin: "0",
                    fontSize: "10px",
                  }}
                >
                  {formData.errors.to}
                </p>
              )}
            </div>
            <button onClick={() => filter(formData)} className="search-btn">
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
