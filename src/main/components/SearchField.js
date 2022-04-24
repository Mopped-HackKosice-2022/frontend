import {css} from "@emotion/react";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import React from "react";
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


export default function SearchField({openDetail}) {

    const [loading, setLoading] = useState(false);

    const [results,setResults] = useState([]);


    const handleChange = (event) => {
        if (event.target.value.length > 2){
            setLoading(true);

            axios.post("/createPrediction",{gameId: event.target.value}).then(r=>{
                console.log(r.data);
                setLoading(false);
                setResults(
                    r.data
                );

            })

        }else{
            setLoading(false);
            setResults([]);
        }

    };

    return (
        <div style={{position:'relative'}}>

            <input
                css={search_field_style}
                placeholder="Select game"
                onChange={handleChange}
            />

            <LinearProgress hidden={!loading} css={progress}/>


            <div hidden={!results.length>0} css={results_style}>
                <ul>
                    {
                        results.map((game,i)=>
                        {
                            return <Game
                                openDetail={openDetail}
                                key={game.id}
                                index={i}
                                game={game}
                            />
                        })
                    }
                </ul>
            </div>


        </div>
    );
}
