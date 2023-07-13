import React, { useState } from "react";
import { TextField, Snackbar, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../api";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const GetSong = () => {
  const [title, setTitle] = useState("");
  // const [song, setSong] = useState({});
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title);
    const { data } = await api.routes.getSongbyTitle(title);
    console.log(data);
    if(data){
        setRows(data)
        setMessage(data.message)
        setOpen(true)
    }
  };

  const changeRating = async (title, value) => {
    const { data } = await api.routes.postRating(title, value);
    // console.log(data);
    setRows(data)
    setMessage("Song rated successfully");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const columns = [
    { field: "id", headerName: "ID", width: 190 },
    { field: "title", headerName: "Title", width: 170 },
    { field: "danceability", headerName: "Dance Ability", width: 100 },
    { field: "energy", headerName: "Energy", type: "number", width: 80 },
    { field: "mode", headerName: "Mode", type: "number", width: 80 },
    {
      field: "acousticness",
      headerName: "Acousticness",
      type: "number",
      width: 100,
    },
    {
      field: "tempo",
      headerName: "Tempo",
      type: "number",
      width: 100,
    },
    {
      field: "duration_ms",
      headerName: "Duration-ms",
      type: "number",
      width: 120,
    },
    {
      field: "num_sections",
      headerName: "Num-sections",
      type: "number",
      width: 80,
    },
    {
      field: "num_segments",
      headerName: "num_segments",
      type: "number",
      width: 80,
    },
    {
      field: "star_rating",
      headerName: "Ratings",
      // type: "number",
      width: 127,
      // disableClickEventBubbling: true,
      renderCell: ({ row }) => (
        <div>
          <TextField
            type="number"
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => changeRating(row.title, e.target.value)}
            value={row.star_rating}
            InputProps={{ inputProps: { min: 0, max: 5 } }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <h1 className="title">FIND A SONG BY TITLE</h1>
      <div>
        <Link to="/">
          <Button style={{ position: "absolute", top: "25px", left: "20px" }}>
            Go Back
          </Button>
        </Link>
        <form onSubmit={handleSubmit} className="findForm">
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Button variant="contained" type="submit" className="formButton">
            Get Song
          </Button>
        </form>
      </div>
      {message ? (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    action={action}
                />
                ) : (
                    ""
                  )}
      <section>
        {rows ? (
          <div
            style={{
              height: 200,
              width: "80%",
              position: "absolute",
              top: "40%",
              marginLeft: "130px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 1 },
                },
              }}
              
            />
          </div>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default GetSong;
