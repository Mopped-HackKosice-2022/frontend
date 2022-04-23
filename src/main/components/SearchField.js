import {css} from "@emotion/react";
import {Box, Button, CircularProgress, LinearProgress} from "@mui/material";
import React from "react";
import {useState} from "react";


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


export default function SearchField(props) {

    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {
      setLoading(true);

      setTimeout(()=>{

        setLoading(false);

      },2000);
    };

    return (
        <>
            <input
                css={search_field_style}
                placeholder="Select game"
                onChange={handleChange}
            />
            <LinearProgress hidden={!loading}/>


        </>
    );
}
