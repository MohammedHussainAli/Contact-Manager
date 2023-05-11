import "./charts.css";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale } from "chart.js";
Chart.register(CategoryScale);
const Charts = () => {
  const [casesData, setCasesData] = useState(null);
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const casesResponse = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      const casesData = await casesResponse.json();
      setCasesData(casesData);

      const countriesResponse = await fetch(
        "https://disease.sh/v3/covid-19/countries"
      );
      const countriesData = await countriesResponse.json();
      setCountriesData(countriesData);
    };

    fetchData();
  }, []);

  const data = {
    labels: Object.keys(casesData?.cases || {}),
    datasets: [
      {
        label: "Cases",
        data: Object.values(casesData?.cases || {}),
        fill: false,
        borderColor: "rgba(255, 99, 132, 0.2)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Line data={data} />
      </div>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countriesData.map((country) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <p>Active: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Charts;
