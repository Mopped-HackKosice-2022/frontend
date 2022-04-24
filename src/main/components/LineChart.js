import React  from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip} from 'recharts';
import PropTypes from 'prop-types';


function LineChart({
                        data,
                        dataKey
                      }) {

        return (
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>

                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={'#e2811f'} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={'#e2811f'} stopOpacity={0}/>
                        </linearGradient>
                    </defs>

                    <YAxis fontSize={10} axisLine={false} padding={0}/>

                    <Tooltip contentStyle={{ fontSize: '13px', borderRadius:15,border:'none'}} />

                    <CartesianGrid startOffset={10} strokeDasharray="4" opacity={.2} vertical={false} />

                    <Area type="monotone" dataKey={dataKey} stroke={'#f32300'} strokeWidth={3} fillOpacity={.8} fill="url(#gradient)"  activeDot={{ r: 5 }} />
                </AreaChart>
            </ResponsiveContainer>
        );

}

LineChart.propTypes = {
    data: PropTypes.array,
}

export default LineChart