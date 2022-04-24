import React, {useEffect, useState} from 'react';
import {useSystem} from "../../core/System";
import PopularityTable from "../components/popularityTable/PopularityTable";
import SearchField from "../components/SearchField";
import {Box, Button, Card, CardActions, CardContent, NativeSelect, Typography} from "@mui/material";
import loader from "../../assets/images/loader.svg";
import {css} from "@emotion/react";
import OverLayer from "../components/OverLayer";
import {calcPercentage} from "../../core/helpers/Helper";
import PopularityCategoryTable from "../components/popularityTable/PopularityCategoryTable";
import LineChart from "../components/LineChart";
import axios from "axios";


const glob = css`
    ol{
        padding:0;
        margin:0;
        list-style:none;
    }
`;


export default function HomeView() {

    const [show,setShow] = useState(false);
    const [show_data,setShowData] = useState(null);
    const [chart,setChart] = useState(<img src={loader}/>);

    const openDetail = (data,top)=>{

        setShowData({...data,percentage:calcPercentage(data.rank,data.bought,data.viewed)});
        setShow(true);
        axios.post("/getData",{gameId: data.gameId}).then(r=>{

            setChart(<LineChart data={r.data} dataKey={"price"}/>);

        })
    }

    const closeDetail = ()=>{setChart(<img alt="loader" src={loader}/>);setShow(false);}

    const System = useSystem();

    return (
        <>

            <div className="container" css={glob}>

                <div className="row mt-5">
                    <div className="col-12">
                        <h1 className="fonts_Montserrat text-uppercase text-center font-weight-bold">
                           Stockerize
                        </h1>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-10 mx-auto">
                        <SearchField openDetail={openDetail}/>
                    </div>

                </div>
                <div className="row" style={{marginTop: 100}}>
                    <div className="col-md-6">
                            <h2 className="text-center fonts_size_2_5rem">Hottest &#128293;</h2>
                       <PopularityTable top={true} fontcolor="255,67,0" color="255,67,0" endpoint={"/getGlobalDataTop"} openDetail={openDetail}/>
                    </div>
                    <div className="col-md-6">
                            <h2 className="text-center fonts_size_2_5rem">Coldest <span style={{color: '#00c3ff'}}>&#10052;</span></h2>
                        <PopularityTable top={false} fontcolor="164,255,0" color="164,255,0" endpoint={"/getGlobalDataBottom"} openDetail={openDetail}/>
                    </div>
                </div>

                <div className="row" style={{marginTop: 100}}>
                    <div className="col-md-4 mx-auto">
                        <h2 className="text-center fonts_size_2_5rem">Top Categories</h2>
                        <PopularityCategoryTable color="123,34,234" endpoint={"/getGlobalCategory"}/>
                    </div>
                    <div className="col-md-4 mx-auto">
                        <h2 className="text-center fonts_size_2_5rem">Top SubCategories</h2>
                        <PopularityCategoryTable color="123,34,234" endpoint={"/getGlobalSubCategory"}/>
                    </div>
                </div>


                <div className="row mt-4">
                    <div className="col-12 text-center"><small>Version: {System.version}</small></div>
                </div>

            </div>

            <OverLayer setShow={setShow} show={show}>
                <Card sx={{ minWidth: 275,background:'#202020',color:'#ffffff' }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 17 }} gutterBottom>
                            ID: {show_data?.gameId}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} >
                            Category: {show_data?.category}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                            Sub Category: {show_data?.subCategory}
                        </Typography>
                        <Typography sx={{ mb: 1.5,fontSize:28,textAlign:'right' }} >
                            {show_data?.price ?? 0}€
                            <span style={{paddingLeft: 5,fontSize:24,fontWeight: 'bold',color:(show_data?.percentage<=0?'green':'red')}}>{show_data?.percentage>0?'+':null}{show_data?.percentage.toFixed(2)}%</span>
                        </Typography>

                        <div>
                            <Box sx={{height:'200px',width: '700px', paddingTop:'10px',textAlign:'center'}}>
                                {chart}
                            </Box>
                        </div>

                    </CardContent>
                    <CardActions>
                        <Button size="small" color="error" onClick={()=>closeDetail()}>Close</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </OverLayer>


        </>
    );

}

