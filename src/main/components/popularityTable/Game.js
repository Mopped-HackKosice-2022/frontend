import React, {Component} from 'react';
import {css} from "@emotion/react";
import noimg from "../../../assets/images/no_img.png";

const row_style = css`
        border-radius: 5px;
        overflow: hidden;
        background-color: lightgrey;
        padding:10px;
        margin-bottom:10px;
        &:first-child{
            background-color: lightgreen;
        }
        
        h1{
            white-space: nowrap;
            overflow: hidden;
            word-break: keep-all;
        }
        `;

const subinfo = css`
    display:flex;
    align-items: center;
    justify-content: space-between;
`;

export default class Game extends Component {


    render(){
        const style = { zIndex: 100 - this.props.index };

        return (
            <li id={this.props.id} style={style} css={row_style}>

                <div className="row">
                    <div className="col-md-3">
                        <img src={noimg} alt="No img" className="img-fluid"/>
                    </div>
                    <div className="col-md-9">
                        <h4>{this.props.id}</h4>
                        <div css={subinfo}>
                            <p>Category: {this.props.category}</p>
                            <p>Sub Category: {this.props.subCategory}</p>
                        </div>

                        <h3 style={{textAlign:'right'}}>Price: {this.props.price}</h3>
                    </div>
                </div>

            </li>
        );
    }

}