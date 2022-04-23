import React from 'react';
import {css} from "@emotion/react";

function OverLayer({show,setShow,click_dissmiss,children}) {
    return (
        <div css={css`
              position: fixed;
              height: 100vh;
              width: 100%;
              top: 0;
              left: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index:1500;
           
    `} hidden={!show}>
            <div style={{zIndex:1501}}>
                {children}
            </div>
            <div css={css`
              position: fixed;
              height: 100vh;
              width: 100%;
              top: 0;
              left: 0;
              z-index: 1010;
              background-color: rgba(17, 17, 17, .8);
       
    `} onClick={()=> click_dissmiss ?setShow(!show): null}/>
        </div>
    );
}







export default OverLayer;