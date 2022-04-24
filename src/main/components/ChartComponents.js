import React from "react";
import {AreaChart, Area, XAxis, YAxis,Tooltip,Legend, ResponsiveContainer} from 'recharts';

export function TooltipChartComponent(){
    return (<></>
    );
}

export const tootip = {

}

export function LegendChartComponent({verticalAlign,height,width}){
    return (
        <Legend verticalAlign="bottom" height={50} width={300} iconType={'circle'}/>
    );
}