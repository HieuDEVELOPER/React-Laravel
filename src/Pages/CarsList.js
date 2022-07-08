import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Create from "./AddCars";

function CarList() {
  const [cars, setCars] = useState([]);
  const getCars = () => {
    axios
      .get("http://127.0.0.1:8000/api/cars")
      .then(function (response) {
        console.log(response.data.data);
        setCars(response.data.data);
      })
      .catch(function (error) {
        // handle error
      })
      .then(function () {});
  };
  useEffect(() => {
    getCars();
  }, []);
  return (
    <div>
      <h2>Danh sách xe</h2>
      <Create />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Products_on</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {!!cars ? (
            cars.map((cars, index) => (
              <tr key={index}>
                <td scope="row">{cars.id}</td>
                <td>{cars.model}</td>
                <td>{cars.make}</td>
                <td>{cars.produced_on}</td>
                <td>
                  <img
                    src={`http://localhost:8000/image/${cars.image}`}
                    style={{ width: "200px" }}
                  ></img>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Data in API</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default CarList;
