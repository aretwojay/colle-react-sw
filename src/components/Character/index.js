import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import "./style.css";

const Character = () => {

    const [character, setCharacter] = useState();
    const [starships, setStarships] = useState([]);
    const { search } = useLocation();
    const [id, setId] = useState(search.match(/\d+/)[0]);

    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${id}`)
            .then(response => response.json())
            .then(data => checkCharacter(starships, data));

    }, []);

    const checkCharacter = (starships, data) => {
        setCharacter(data);
        if (data.starships.length === 0) {
            setStarships(["none"]);
        }
        else {
            data.starships.map((starship) => {
                fetch(`https://swapi.dev/api/starships/${parseInt(starship.match(/\d+/))}`)
                    .then(response => response.json())
                    .then(data => setStarships(starships =>
                        [...starships, data]
                    ));

            })
        }

    }

    console.log(starships);

    return (
        <div className="row bg-secondary vh-100 text-light">
            {starships.length > 0 ?
                <div>
                    <div className="loader-wrapper hide">
                        <div className="loader" />
                    </div>
                    <div>
                        <h2>About {character.name}</h2>
                        <h6>Created the {
                            new Date(character.created).toLocaleDateString()
                        } and edited the {
                                new Date(character.edited).toLocaleDateString()
                            }
                        </h6>
                        <p>Name : {character.name}</p>
                        <p>Eye color : {character.eye_color}</p>
                        <p>Birthdate : {character.birth_year}</p>
                        <p>Gender : {character.gender}</p>
                        <div className="d-flex">Starships : {starships[0] === "none" ? "none" : starships.map((starship) => {
                            return (
                                <a href={"./starship?=" + parseInt(starship.url.match(/\d+/))}
                                    className="text-decoration-none btn btn-secondary"
                                >{starship.name}
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

export default Character;