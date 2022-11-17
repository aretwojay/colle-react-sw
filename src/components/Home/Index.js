import React, { useState, useEffect } from "react";

const Home = () => {

    const [characters, setCharacters] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        for (let i = 1; i <= 9; i++) {
            fetch(`https://swapi.dev/api/people/?page=${i}`)
                .then(response => response.json())
                .then(data => setCharacters(characters => [...characters, ...data.results]));
        }
        setIsLoaded(true);

    }, []);

    console.log(characters);


    return (
        <div className="row bg-secondary h-100 text-light">
            <div className="h-100">
                <input
                    type="text"
                    className="form-control"
                    placeholder="search"
                    onChange={handleChange}
                    style={{ width: "200px", height: "30px" }}
                />
            </div>

            {isLoaded === true ? characters.map((character, i) => {
                if (inputValue === "" | character.name.toLowerCase().startsWith(inputValue.toLowerCase()))
                    return (
                        <div className="col" key={i}>

                            <a className="card text-light bg-dark p-2 m-2 text-decoration-none"
                                style={{ width: "15rem", height: "5rem" }}
                                href={"./character?=" + parseInt(character.url.match(/\d+/))}
                            >
                                {character.name}
                            </a>
                        </div>
                    )
            }) :
                <p>Loading...</p>}
        </div >
    )
};

export default Home;