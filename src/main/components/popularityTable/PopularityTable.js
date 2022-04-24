import React, {useEffect, useState} from 'react';
import shuffle from 'lodash/shuffle';
import FlipMove from 'react-flip-move';
import Game from "./Game";
import axios from "axios";
import loader from "../../../assets/images/loader.svg";

function generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

export default function PopularityTable({endpoint, top, openDetail, color}) {

    const [games, setGames] = useState([]);


    useEffect(() => {

        axios.get(endpoint).then(r => {
            setGames(r.data);
            console.log(r.data);

        });


    }, []);

    const reload = () => {
        axios.get(endpoint).then(r => {
            setGames(r.data);
        });
    }

    useEffect(() => {

        const ListenerInterval = setInterval(() => {
            reload();
        }, generateRandom(3000, 7000));
        return () => {
            clearInterval(ListenerInterval);
        };
    }, []);


    return (
        <>


            <FlipMove
                staggerDurationBy="30"
                duration={500}
                typeName="ol">
                {
                    games.length !== 0 ? games.map((game, i) => {
                            return <Game
                                openDetail={openDetail}
                                key={game.id}
                                index={i}
                                game={game}
                                color={color}
                                top={top}
                            />
                        }) :
                        <div className="d-flex align-items-center justify-content-center">
                            <img className="img-fluid" src={loader}
                                 style={{margin: 'auto', width: '100%', maxWidth: 200}} alt="loading"/>
                        </div>
                }

            </FlipMove>
        </>
    );
}
