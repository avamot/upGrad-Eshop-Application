export const setFilter = category => {
    return {
        type: "SET_FILTER",
        filter: category
    };
};

export const clearFilter = () => {
    return {
        type: "CLEAR_FILTER"
    };
};