import React, {useContext, useEffect, useState} from 'react';

const DataProviderContext = React.createContext(null);

export function useDataProvider() {
    return useContext(DataProviderContext);
}

function DataProvider({children}) {

    const [data, setData] = useState(null);

    useEffect(() => {

    }, []);


    const DATA = {
        data, setData
    };

    return (
        <DataProviderContext.Provider value={DATA}>
            {children}
        </DataProviderContext.Provider>
    );
}

export default DataProvider;