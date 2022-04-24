import React from 'react';
import {css} from "@emotion/react";



export function calcPercentage(rank,bought,viewed){

    //let price = (this.props.top===true?1:-1) * (this.props.game.bought !==0)?(this.props.game.rank / this.props.game.bought):0;
    return 0.01*rank;
}

export function OverLayerLoading({show}) {

    const overlayer_loader = css`
              position: fixed;
              height: 100vh;
              width: 100%;
              top: 0;
              left: 0;
              z-index: 2000;
              background-color: rgba(17, 17, 17, .8);
              display: flex;
              align-items: center;
              justify-content: center;
             .loader {
             
              width: 250px;
              height: 250px;
            }
    `;

    return (
        <div css={overlayer_loader} hidden={!show}>

            loading
        </div>
    );
}
