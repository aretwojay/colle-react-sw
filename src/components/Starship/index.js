import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import "./style.css";

const Starship = () => {

    const [starship, setStarship] = useState();
    const [pilots, setPilots] = useState([]);
    const { search } = useLocation();
    const [id, setId] = useState(search.match(/\d+/)[0]);

    useEffect(() => {
        fetch(`https://swapi.dev/api/starships/${id}`)
            .then(response => response.json())
            .then(data => checkStarship(pilots, data));

    }, []);

    const checkStarship = (pilots, data) => {
        setStarship(data);
        if (data.pilots.length === 0) {
            setPilots(["none"]);
        }
        else {
            data.pilots.map((pilot) => {
                fetch(`https://swapi.dev/api/people/${parseInt(pilot.match(/\d+/))}`)
                    .then(response => response.json())
                    .then(data => setPilots(pilots =>
                        [...pilots, data]
                    ));

            })
        }

    }

    console.log(pilots);

    return (
        <div className="row bg-secondary vh-100 text-light">
            {pilots.length > 0 ?
                <div>
                    <div className="loader-wrapper hide">
                        <div className="loader" />
                    </div>
                    <div>
                        <h2>About {starship.name}</h2>
                        <h6>Created the {
                            new Date(starship.created).toLocaleDateString()
                        } and edited the {
                                new Date(starship.edited).toLocaleDateString()
                            }
                        </h6>
                        <p>Name : {starship.name}</p>
                        <p>Model : {starship.model}</p>
                        <p>Manufacturer : {starship.manufacturer}</p>
                        <div className="d-flex">Pilots : {pilots[0] === "none" ? "none" : pilots.map((pilot) => {
                            return (
                                <a href={"./character?=" + parseInt(pilot.url.match(/\d+/))}
                                    className="text-decoration-none btn btn-secondary"
                                >{pilot.name}
                                </a>
                            )
                        })}</div>

                    </div>
                </div> :
                <div className="loader-wrapper">
                    <div className="loader" />
                </div>
            }
        </div>
    )
};

export default Starship;