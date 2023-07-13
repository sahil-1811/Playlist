import React, { useState, useEffect } from "react";
import { api } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Snackbar, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";

const Home = () =>{
    const [page,setPage] = useState(1)
    const [rows,setRows] = useState([])
    const [message, setMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const [allData, setAllData] = useState([]);

    useEffect(()=>{
        const fetchSongs = async () =>{
            try{
                const {data} = await api.routes.getAllSongs(page)
                // console.log(typeof data)
                if(typeof data === 'object'){
                  setRows(data)
                }
                const response = await api.routes.getAllData();
                // console.log(typeof response.data);
                setAllData(response.data)                
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchSongs()
    },[page])

    const changeRating = async (title, value) => {
        const { data } = await api.routes.postRating(title, value);
        // console.log(data);
        setRows(data)
        setMessage("Song rated successfully");
        setOpen(true);
      };

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
        width: 127,
        disableClickEventBubbling: true,
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
        ]


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

    const handleNext = (e) => {
      e.preventDefault();
      console.log(page);
      setPage(page+1)
    }

    const handlePrevious = (e) => {
      e.preventDefault();
      setPage(page-1)
    }

    if (rows) {
        return (
            <div>
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
                  <div>
                    <Link to='/findSong'><Button variant="contained" style={{position: "absolute", top: "25px", left: "45%"}}>
                      Find Song
                    </Button></Link>
                  </div>
          <div style={{
            height: 400,
            width: "80%",
            marginTop: "100px",
            marginLeft: "130px",
            backgroundColor: "#FFFFFF",
          }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
            <Button variant="contained" onClick={handlePrevious}>Previous Page</Button>
            <Button variant="contained" onClick={handleNext} style={{marginLeft: "20px"}}>Next Page</Button>
            {allData ? <CSVLink data={allData}><Button variant="contained" style={{marginLeft: "200px"}}>Download Data</Button></CSVLink> : ""}
          </div>
          </div>
        );
      }
    };
    
    export default Home;
    