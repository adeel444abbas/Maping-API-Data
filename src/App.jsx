import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [input, setInput] = useState("");
  const [noData, setNodata] = useState(false);

  const handleClick = () => {
    if (!(input > 20)) {
      setNodata(false);
      setData(data);
      setIsloading(true);
      setTimeout(() => {
        let newData = data.filter((ele) => ele.id == input);
        console.log("newData: ", newData);
        setIsloading(false);
        setData(newData);
      }, 2000);
    } else {
      setNodata(true);
    }
  };

  // useEffect to handle side-Effects operations like fetching data
  useEffect(() => {
    setIsloading(true);
    setTimeout(() => {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => setData(response.data), setIsloading(false))
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  }, []);

  return (
    <>
      <h2>Wait while the Data is Loading</h2>
      <div className="form">
        <input
          type="number"
          placeholder="Enter id from 1-20"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        {input && (
          <button className="btn1" onClick={handleClick}>
            Get Single Product
          </button>
        )}
      </div>
      <span className="loader">
        {isloading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
      </span>
      <table className="product-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {noData ? (
            <tr>
              {" "}
              <td>No Data present against this id: {input}</td>
            </tr>
          ) : (
            data.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
