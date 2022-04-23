import { css } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, CircularProgress } from "@mui/material";
import Input from "@mui/material/Input";
import React from "react";
import { useState } from "react";
import { blue } from "@mui/material/colors";

const ariaLabel = css`
    'aria-label': 'description' 
`;

const searchForm = css`
  border-style: solid;
  padding: ;
`;

const progressBar = css`
  margin-left: 5px;
  margin-top: 10px;
`;

export default function SearchField(props) {
  const [gameId, setGameId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setGameId(event.target.value);
  };

  const handleSubmit = () => {
    setSuccess(false);
    setLoading(true);

    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 2000);
  };

  const suggestionsListComponent = () => {
    return (
      <ul>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
      </ul>
    );
  };

  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };

  return (
    <>
      <div>
        <Input
          placeholder="Select game"
          inputProps={ariaLabel}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: blue[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>

        {/* {suggestionsListComponent} */}
      </div>
    </>
  );
}
