import React, { useEffect, useState } from "react";
import axios from "axios";
import Joke from "./Joke";

// this endpoint just returns a random joke
const BASE_URL = "https://icanhazdadjoke.com/";

/**
 * A component that allows the user to generate an amount
 * of unique jokes to display on screen.
 * @param {int} numJokes 
 * @returns A button that calls a function to display jokes from
 * the icanhazdadjoke api and a list of joke components that
 * display each joke.
 */
const JokeList = function({numJokes = 5}) {
    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        async function getJokes() {
            let newJokes = [...jokes];
            let seenJokes = new Set();
            try {
                while (newJokes.length < numJokes) {
                    let response = await axios.get(BASE_URL, {
                        headers: {"Accept": "application/json"}
                    });
                    console.log(response.data);
                    let {...joke} = response.data;
    
                    if (!seenJokes.has(joke.id)) {
                        seenJokes.add(joke.id);
                        newJokes.push({...joke, votes: 0});
                    } else {
                        console.log("duplicate found!")
                    }
                    setJokes(newJokes);
                    setIsLoading(false);
                }
            } catch(err) {
                console.error(err);
            }
        }
        
        if (jokes.length === 0) getJokes();
    }, [jokes, numJokes]);

    

    function generateNewJokes() {
        setIsLoading(true);
        setJokes([]);
    }

    function vote(id, delta) {
        setJokes(allJokes =>
            allJokes.map(j => (j.id === id ? {...j, votes: j.votes + delta} : j))
        );
    }
    
    if (isLoading) {
        return (
            <div>
                <div>Loading...</div>
            </div>
        )
    }

    let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

    return (
        <div>
            {sortedJokes.map(({joke, id, votes}) => (
                <Joke 
                    text={joke}
                    key={id}
                    id={id}
                    votes={votes}
                    vote={vote}
                />
            ))}
            <button onClick={generateNewJokes}>Generate 5 Jokes</button>
        </div>
    )
}

export default JokeList;