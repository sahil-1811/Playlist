import React, { useState, useEffect } from "react";
import { api } from "../api";
import { DataGrid } from "@mui/x-data-grid";

const Home = () =>{
    const [page,setPage] = useState(1)
    const [rows,setRows] = useState([])

    useEffect(()=>{
        const fetchSongs = async () =>{
            try{
                const {data} = await api.routes.getAllSongs(page)
                console.log(data)

                setRows(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchSongs()
    },[page])

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "title", headerName: "Title", width: 80 },
        { field: "danceability", headerName: "Dance Ability", width: 130 },
        { field: "energy", headerName: "Energy", type: "number", width: 90 },
        { field: "mode", headerName: "Mode", type: "number", width: 90 },
        {
        field: "acousticness",
        headerName: "Acousticness",
        type: "number",
        width: 90,
        },
        {
        field: "tempo",
        headerName: "Tempo",
        type: "number",
        width: 90,
        },
        {
        field: "duration_ms",
        headerName: "Duration-ms",
        type: "number",
        width: 90,
        },
        {
        field: "num_sections",
        headerName: "Num-sections",
        type: "number",
        width: 90,
        },
        {
        field: "num_segments",
        headerName: "num_segments",
        type: "number",
        width: 90,
        },
        {
        field: "ratings",
        headerName: "Ratings",
        type: "number",
        width: 90,
        },
        ]
    if (rows) {
        return (
          <div style={{ height: 400, width: "100%", marginTop: "50px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
            //   pageSizeOptions={[5, 10]}
            />
          </div>
        );
      }
    };
    
    export default Home;
    