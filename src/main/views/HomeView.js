import React, {useEffect, useState} from 'react';
import {useSystem} from "../../core/System";

export default function HomeView() {

    const System = useSystem();

    return (
        <>

            <div className="row">
                <div className="col-12 text-center pt-3">
                    <h1 className="fonts_size_2rem">React PWA Template</h1>
                </div>
            </div>


            <div className="row mt-4">
                <div className="col-12 text-center"><small>Version: {System.version}</small></div>
            </div>

        </>
    );

}

