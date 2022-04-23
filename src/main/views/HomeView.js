import React, {useEffect, useState} from 'react';
import {useSystem} from "../../core/System";
import PopularityTable from "../components/popularityTable/PopularityTable";
import SearchField from "../components/SearchField";


export default function HomeView() {

    const System = useSystem();

    return (
        <>

            <div className="container">

                <div className="row mt-5">
                    <div className="col-12">
                        <h1 className="fonts_Montserrat text-uppercase text-center font-weight-bold">Best Recommendations</h1>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-10 mx-auto">
                        <SearchField/>
                    </div>

                </div>
                <div className="row" style={{marginTop:100}}>
                    <div className="col-md-6">
                        <h2>Top Recommendations</h2>
                        <PopularityTable/>
                    </div>
                    <div className="col-md-6">
                        <h2>Worst</h2>
                        <PopularityTable/>
                    </div>
                </div>


                <div className="row mt-4">
                    <div className="col-12 text-center"><small>Version: {System.version}</small></div>
                </div>

            </div>


        </>
    );

}

