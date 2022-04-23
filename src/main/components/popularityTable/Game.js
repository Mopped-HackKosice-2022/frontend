import React, {Component} from 'react';
import {css} from "@emotion/react";

const row_style = css`
        border-radius: 5px;
        overflow: hidden;
        background-color: lightgrey;
        padding:10px;
        margin-bottom:10px;
        &:first-child{
            background-color: lightgreen;
        }
        font-size: 1rem;

        
        h3{
        font-size: 1.3rem;
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

const img = css`
object-fit:cover;
width:100%;
height:100%;
`;

export default class Game extends Component {


    render(){
        const style = { zIndex: 100 - this.props.index };

        return (
            <li id={this.props.game.id} style={style} css={row_style} onClick={()=>this.props.openDetail(this.props.game)}>

                <div className="row">
                    <div className="col-md-12">
                        <h3>{this.props.game.id}</h3>
                        <div css={subinfo}>
                            <p>Category: {this.props.game.category}</p>
                            <p>Sub Category: {this.props.game.subCategory}</p>
                            <h3 className="m-0 d-flex align-items-center">Price: <div style={{width:'90px',textAlign: 'right'}}>{this.props.game.price}€</div></h3>
                        </div>

                    </div>
                </div>

            </li>
        );
    }

}