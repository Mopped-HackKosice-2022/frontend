import React, {Component} from 'react';
import {css} from "@emotion/react";
import {calcPercentage} from "../../../core/helpers/Helper";


const subinfo = css`
    display:flex;
    align-items: center;
    justify-content: space-between;
`;


export default class Game extends Component {


    render(){

        const row_style = css`
        cursor:pointer;
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

        const price = calcPercentage(this.props.game.rank);
        return (
            <li id={this.props.game.id} style={style} css={row_style} onClick={()=>this.props.openDetail(this.props.game,this.props.top)}>

                <div className="row">
                    <div className="col-md-12">
                        <h3>{this.props.game.gameId}</h3>
                        <div css={subinfo}>
                            <p>Category: {this.props.game.category}</p>
                            <p>Sub Category: {this.props.game.subCategory}</p>
                            <h3 className="m-0 d-flex align-items-center">
                                Price:
                                <div style={{width:'90px',textAlign: 'right'}}>{this.props.game.price}€</div>
                                <small style={{paddingLeft: 5,fontWeight: 'bold',color:`rgb(${this.props.fontcolor})`}}>{price>=0?'+':null}{price!==0?price.toFixed(5):0}%</small>
                            </h3>
                        </div>

                    </div>
                </div>

            </li>
        );
    }

}