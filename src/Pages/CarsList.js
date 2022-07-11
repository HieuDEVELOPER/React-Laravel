import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Create from "./AddCars";
import EditCar from "./EditCars";

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

  const [editmodal, setEditModal] = useState(false);

  const [editCarData, setEditCarData] = useState({
    id: "",
    model: "",
    make: "",
    produced_on: "",
    manufacturer: "",
    image: "",
  }); //editCarData là 1 mảng các đối tượng lưu dữ liệu đối tượng Car được edit
  //hàm này nhận biến car ở sự kiện onClick() của nút Sửa
  const toggleEditModal = (car) => {
    setEditModal(!editmodal);
    if (editmodal === false) setEditCarData(car); //phải có kiểm tra điều kiện form edit được mở thì mới cập nhật không thì sẽ lỗi không nhận ra editCarData.manufacturer.id khi đóng form
    console.log(editCarData);
  };

  useEffect(() => {
    getCars();
  }, []);

  const deleteCar = (id) => {
    axios
      .delete("http://localhost:8000/api/cars/" + id) //tham số truyền vào là id
      .then((res) => {
        console.log("Car removed deleted");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        window.location.reload();
      });
  };
  return (
    <div>
      <h2>Danh sách xe</h2>
      <Create />
      <table className="table">
        <EditCar
          cars={cars}
          setCars={setCars}
          getCars={getCars}
          toggleEditModal={toggleEditModal}
          editmodal={editmodal}
          editCarData={editCarData}
          setEditCarData={setEditCarData}
        />

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Products_on</th>
            <th>Image</th>
            <th>Action</th>
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
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => toggleEditModal(cars)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm("Bạn có chắc chắn xóa?"))
                        deleteCar(cars.id);
                    }}
                  >
                    Delete
                  </button>
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
