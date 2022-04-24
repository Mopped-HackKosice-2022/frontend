import React, {Component} from 'react';
import {css} from "@emotion/react";
import {calcPercentage} from "../../../core/helpers/Helper";


export default class Category extends Component {


    render(){

        const row_style = css`
        border-radius: 10px;
        overflow: hidden;
        background-color: #252525;
        color: #EFEFEF;
        padding:10px;
        margin-bottom:10px;
        &:first-of-type{
            background-image:  linear-gradient(-18deg, #252525 0%,rgba(${this.props.color},.5) 100%);
        }
         &:nth-of-type(2){
            background-image:  linear-gradient(-18deg, #252525 0%,rgba(${this.props.color},.25) 100%);
        }
         &:nth-of-type(3){
            background-image:  linear-gradient(-18deg, #252525 0%,rgba(${this.props.color},.1) 100%) ;
        }
        font-size: 1rem;

        
        h3{
        font-size: 1.3rem;
            white-space: nowrap;
            overflow: hidden;
            word-break: keep-all;
            
        }
        `;

        const style = { zIndex: 100 - this.props.index };

        return (
            <li id={this.props.category.id} style={style} css={row_style}>

                <div className="row">
                    <div className="col-md-12">
                        <h3>{this.props.category.category}</h3>
                    </div>
                </div>

            </li>
        );
    }

}