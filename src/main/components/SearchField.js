import {css} from "@emotion/react";
import LinearProgress  from '@mui/material/LinearProgress';

import React, {useRef} from "react";
import {useState} from "react";
import Game from "./popularityTable/Game";
import axios from "axios";


const search_field_style = css`
    width:100%;
    padding: 20px 30px;
    font-size: 1.8rem;
    box-shadow: 2px 5px 10px rgba(0,0,0,.3);
    border: none;
    border-radius: 20px;
    &:focus{
        box-shadow: 2px 5px 10px rgba(0,0,0,.3);
        border:none;
        outline:none;
        
    }
`;

const results_style = css`
    z-index: 1001;
    position:absolute;
    width: 100%;
    margin: -16px 0 0 0;
    padding: 10px;
    background-color: white;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    ul{
        padding: 0;
        margin: 0;
        li{transition: all .3s}
        li:hover{
            transform: scale(1.01);
        }
    }
`;

const progress = css`
    width: calc(100% - 27px);
    left: 50%;
    transform: translateX(-50%);
    top:70px;
    z-index: 1002;
    height:4px;
    border-radius: 10px;
    position:absolute;
`;


const gameIdSuggestion_style = css`
    padding: 1rem;
    font-size:1.5rem;
    color:black;
    cursor: pointer;
`;

const clear_style = css`
        position:absolute;
        right:30px;
        top:26px;
        font-size:2rem;
        color:black;
        cursor:pointer;
`;

export default function SearchField({openDetail}) {

    const [loading, setLoading] = useState(false);

    const [results,setResults] = useState(null);

    const input_ref = useRef();


    const handleChange = (event) => {
        if (event.target.value.length >= 2){

            setLoading(true);
            axios.post("/getSuggestion",{search: event.target.value}).then(r=>{

                setLoading(false);
                setResults(
                    r.data.map(game=>{
                        return <div css={gameIdSuggestion_style} key={game.gameId} onClick={()=>LoadPredictions(game.gameId)}>Game: <strong>{game.gameId}</strong></div>
                    })
                );

            })
        }else{
            setLoading(false);
            setResults(null);
        }

    };

    const clearSearch = ()=>{
        input_ref.current.value = '';
        setResults(null);
    }

    const LoadPredictions = (gameId)=>{


        input_ref.current.value = gameId;
        setLoading(true);

        axios.post("/createPrediction",{gameId: gameId}).then(r=>{

            setLoading(false);
            setResults(
                r.data.map((game,i)=>{
                    return  <Game
                        openDetail={openDetail}
                        key={game.id}
                        index={i}
                        game={game}
                        color={"32,32,32"}
                        fontcolor={"164,255,0"}
                        top={true}
                    />
                })
            );
        })
    }

    return (
        <div style={{position:'relative'}}>

            <input
                ref={input_ref}
                css={search_field_style}
                placeholder="Select game"
                onChange={handleChange}
            />

            <i hidden={results === null} className="fas fa-times" onClick={clearSearch} css={clear_style}/>

            <LinearProgress hidden={!loading} css={progress}/>


            <div hidden={results === null} css={results_style}>
                <ul>
                    {
                        results
                    }
                </ul>
            </div>


        </div>
    );
}
