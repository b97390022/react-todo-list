import { useState, createContext, useContext, useMemo } from "react";

export const fetchContext = createContext(null);

export const useFetchContext = () => {
    return useContext(fetchContext);
};

export const RequireFetchContext = ({ children }) => {
    const [checkBoxs, setCheckBoxs] = useState([]);
    const [deletes, setDeletes] = useState([]);
    const isCheckBoxFetch = useMemo(() => {
        return checkBoxs.length > 0;
    }, [checkBoxs]);
    const isDelete = useMemo(() => {
        return deletes.length > 0;
    }, [deletes]);

    return (
        <fetchContext.Provider
            value={{
                isCheckBoxFetch,
                checkBoxs,
                setCheckBoxs,
                isDelete,
                deletes,
                setDeletes,
            }}
        >
            {children}
        </fetchContext.Provider>
    );
};