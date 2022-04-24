import React, {useEffect, useState} from 'react';
import shuffle from 'lodash/shuffle';
import FlipMove from 'react-flip-move';
import Game from "./Game";
import axios from "axios";
import loader from "../../../assets/images/loader.svg";
import Category from "./Category";


export default function PopularityCategoryTable({endpoint, color}) {

    const [categories, setCategories] = useState([]);


    useEffect(() => {

        axios.get(endpoint).then(r => {
            setCategories(r.data);
        });


    }, []);

    const reload = () => {
        axios.get(endpoint).then(r => {
            setCategories(r.data);
        });
    }

    useEffect(() => {

        const ListenerInterval = setInterval(() => {
            reload();
        }, 3000);
        return () => {
            clearInterval(ListenerInterval);
        };
    }, []);


    return (
        <>


            <FlipMove
                staggerDurationBy="30"
                duration={500}
                typeName="ol">
                {
                    categories.length !== 0 ? categories.map((cat, i) => {
                            return <Category index={i} key={cat.id} category={cat} color={color}/>

                        }) :
                        <div className="d-flex align-items-center justify-content-center">
                            <img className="img-fluid" src={loader}
                                 style={{margin: 'auto', width: '100%', maxWidth: 200}} alt="loading"/>
                        </div>
                }

            </FlipMove>
        </>
    );
}
