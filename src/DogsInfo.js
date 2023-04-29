import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DogsInfo.css";
import SubbreedImgModal from "./SubbreedImgModal";
import { useNavigate } from "react-router-dom";

const DogsInfo = () => {
  const navigate = useNavigate();
  const [imgURLs, setImgURLs] = useState([]);
  const [allBreeds, setAllBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState();
  const [selectedImg, setSelectedImg] = useState(null);
  const getRandomImages = async () => {
    try {
      const urls = [];

      for (let i = 0; i < 10; i++) {
        const response = await axios.get(
          selectedBreed
            ? `https://dog.ceo/api/breed/${selectedBreed}/images/random`
            : "https://dog.ceo/api/breeds/image/random"
        );
        urls.push(response.data.message);
      }

      setImgURLs(urls);
    } catch (err) {
      console.log("error fetching images:", err);
    }
  };

  //   console.log(selectedBreed,'::::::::::::::::::::::::');

  const AllBreeds = () => {
    // console.log(allBreeds);

    useEffect(() => {
      axios
        .get("https://dog.ceo/api/breeds/list/all")
        .then((response) => {
          setAllBreeds(Object.keys(response.data.message));
        })
        .catch((err) => {
          console.log("error fetching image");
        });
    }, []);
  };
  AllBreeds();
  const getSelectedBreed = (e) => {
    setSelectedBreed(e.target.value);
  };

  useEffect(() => {
    getRandomImages();
  }, [selectedBreed]);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios(`https://dog.ceo/api/breed/${selectedBreed}/list`).then((res) =>
      setData(res.data.message)
    );
  }, [selectedBreed]);

  const [subbreed, setsubBreed] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    setsubBreed(e.target.value);
  };

  const [subbreedImgurl, setSubbreedUrl] = useState([]);
  //  console.log(subbreedImgurl);

  useEffect(() => {
    axios
      .get(`https://dog.ceo/api/breed/${selectedBreed}/${subbreed}/images`)
      .then((res) => setSubbreedUrl(res.data.message));
  }, [selectedBreed, subbreed]);

  return (
    <div className="main d-flex ">
      <div className="container">
        <div className="breedSelector">
          <select
            className="form-select shadow-lg p-1 mb-1 bg-body rounded"
            aria-label="Default select example"
            onChange={getSelectedBreed}
          >
            <option defaultValue > Select Dogs Breed</option>
            {allBreeds.map((breed, index) => (
              <option key={index + 1} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          {/* <button type="button" className="btn btn-primary p-1 b-1">
          Select Breed
        </button> */}
          <button
            type="button"
            className="btn btn-primary  p-1 mb-1"
            onClick={() => navigate("/location")}
          >
            Click Here For Location
          </button>
        </div>
        <div className="subbreed">
          {data.map((item, index) => (
            <div>
              <button
                className="subbreedbtn"
                data-bs-toggle="modal"
                data-bs-target="#subbreedModal"
                value={item}
                onClick={handleClick}
              >
                {item}
              </button>
              <SubbreedImgModal
                id="subbreedModal"
                subbreedImgurl={subbreedImgurl}
                abc={subbreed}
                breed={selectedBreed}
              />
            </div>
          ))}
        </div>

        <div className="m-3 p-3 ">
          {selectedBreed ? (
            <h2 style={{ marginBottom: "2rem" }}>
              {" "}
              {selectedBreed} Dog Pictures{" "}
            </h2>
          ) : (
            <h2 style={{ marginBottom: "2rem" }}> Random Dog Pictures </h2>
          )}
          <div
            className="randomdogs"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {imgURLs.map((url, index) => (
              <div
                key={index}
                className="card shadow p-3 mb-5 bg-body rounded"
                style={{ borderRadius: "2rem" }}
              >
                <img
                  alt=""
                  src={url}
                  className="card-img-top"
                  style={{
                    width: "200px",
                    height: "250px",
                    borderRadius: "2rem",
                  }}
                  onClick={() => setSelectedImg(url)}
                />
              </div>
            ))}
          </div>

          <p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={getRandomImages}
            >
              Random Images
            </button>
          </p>
        </div>

        {/* Img-Modal */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog ">
            <div class="modal-content shadow-lg p-3 mb-5 bg-body rounded">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Dog
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                {" "}
                <img
                  src={selectedImg}
                  className="img-fluid"
                  alt=""
                  style={{ width: "200px", height: "250px" }}
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogsInfo;
