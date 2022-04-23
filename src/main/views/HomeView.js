import React, {useEffect, useState} from 'react';
import {useSystem} from "../../core/System";
import PopularityTable from "../components/popularityTable/PopularityTable";
import SearchField from "../components/SearchField";
import {Button, Card, CardActions, CardContent, NativeSelect, Typography} from "@mui/material";
import loader from "../../assets/images/loader.svg";
import {css} from "@emotion/react";
import OverLayer from "../components/OverLayer";


const glob = css`
    ol{
        padding:0;
        margin:0;
        list-style:none;
    }
`;


export default function HomeView() {

    const [hottest, setHottest] = useState(2);
    const [coldest, setColdest] = useState(2);

    const [show,setShow] = useState(false);
    const [show_data,setShowData] = useState(null);

    const openDetail = data=>{
        setShowData(data);
        setShow(true);
    }

    const System = useSystem();

    return (
        <>

            <div className="container" css={glob}>

                <div className="row mt-5">
                    <div className="col-12">
                        <h1 className="fonts_Montserrat text-uppercase text-center font-weight-bold">Best
                            Recommendations</h1>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-10 mx-auto">
                        <SearchField/>
                    </div>

                </div>
                <div className="row" style={{marginTop: 100}}>
                    <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-between">
                            <h2>Hottest &#128293;</h2>
                            <NativeSelect
                                onChange={event => setHottest(event.target.value)}
                                value={hottest}
                            >
                                <option value={1}>Hottest by Users</option>
                                <option value={2}>Hottest Recommended</option>
                            </NativeSelect>
                        </div>
                        <PopularityTable option={hottest} endpoint={"/dummy"} openDetail={openDetail}/>
                    </div>
                    <div className="col-md-6" >
                        <div className="d-flex align-items-center justify-content-between">

                            <h2>Coldest <span style={{color: '#00c3ff'}}>&#10052;</span></h2>
                            <NativeSelect
                                onChange={event => setColdest(event.target.value)}
                                value={coldest}
                            >
                                <option value={1}>Coldest by Users</option>
                                <option value={2}>Coldest Recommended</option>
                            </NativeSelect>
                        </div>
                        <PopularityTable endpoint={"dummy"} option={coldest} openDetail={openDetail}/>
                    </div>
                </div>


                <div className="row mt-4">
                    <div className="col-12 text-center"><small>Version: {System.version}</small></div>
                </div>

            </div>

            <OverLayer click_dissmiss setShow={setShow} show={show}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 17 }} color="text.primary" gutterBottom>
                            ID: {show_data?.id}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Category: {show_data?.category}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Sub Category: {show_data?.subCategory}
                        </Typography>
                        <Typography sx={{ mb: 1.5,fontSize:20,textAlign:'right' }} color="text.secondary">
                            {show_data?.price ?? 0}€
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="error" onClick={()=>setShow(false)}>Close</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </OverLayer>


        </>
    );

}

