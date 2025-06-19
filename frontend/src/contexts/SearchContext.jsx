// ----------------------------first approach Auto Search----------------------------------
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchError, setSearchError] = useState(null);

    return (
        <SearchContext.Provider value={{ searchQuery, searchError, setSearchQuery, setSearchError }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    return useContext(SearchContext);
};

//--------------------------------second approach Button Search-------------------------------------
// import { createContext, useContext, useState } from "react";
// import API from "../api/axiosInstance";

// const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchedProducts, setSearchedProducts] = useState([]);
//     const [searchError, setSearchError] = useState(null);

//     const handleSearch = async () => {
//         if (!searchQuery.trim()) {
//             setSearchedProducts([]);
//             setSearchError(null);
//             return;
//         }

//         try {
//             const { data } = await API.get(`/products/search?search=${searchQuery}`);
//             setSearchedProducts(data.products);
//             setSearchError(null);
//         } catch (error) {
//             console.error("Error searching products:", error);
//             setSearchedProducts([]);
//             setSearchError("Search failed. Try again.");
//         }
//     };

//     return (
//         <SearchContext.Provider
//             value={{
//                 searchQuery,
//                 setSearchQuery,
//                 searchedProducts,
//                 handleSearch,
//                 searchError,
//             }}
//         >
//             {children}
//         </SearchContext.Provider>
//     );
// };

// export const useSearch = () => useContext(SearchContext);



