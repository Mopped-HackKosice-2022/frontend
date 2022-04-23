import React, {useEffect, useState} from 'react';
import shuffle from 'lodash/shuffle';
import FlipMove from 'react-flip-move';
import Game from "./Game";

function generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor( rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

const articles = [
    { id: '0001c1dd-462e-453c-bac8-2fcdc0b0bc8d', category: 'A', subCategory: 0,price:264.61 },
    { id: '0002278b-67e3-406e-bfc2-63c48c195e2b ', category: 'B', subCategory: 3,price:24.30 },
    { id: '0002c59e-df87-47a8-a27d-26b34340bee5 ', category: 'A', subCategory: 4,price:4.30 },
]

export default function PopularityTable(){

    const [games,setGames] = useState(articles);

    useEffect(() => {

        const ListenerInterval = setInterval(() => {
            //TODO: refresh data
            setGames(games=>shuffle(games));
        }, generateRandom(1500,5000));
        return () => {
            clearInterval(ListenerInterval);
        };
    }, []);


    return (
        <FlipMove
            staggerDurationBy="30"
            duration={500}
            typeName="ul">
            {
                games.map((game,i)=>{
                    return <Game
                        key={game.id}
                        index={i}
                        {...game}
                    />
                })
            }

        </FlipMove>
    );
}
