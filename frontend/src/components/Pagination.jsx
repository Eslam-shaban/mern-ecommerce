

const Pagination = ({ pagination, onPageChange }) => {
    // console.log(pagination)
    return (
        <div className="pagination flex justify-center gap-4 my-8">
            <button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={`w-20 text-sm px-2 py-2 rounded-lg ${(pagination.currentPage === 1) ? " bg-gray-300" : "bg-gray-300 cursor-pointer hover:bg-amber-600 hover:text-amber-50"} `}
            >
                Previous
            </button>
            <span className="self-center">
                {pagination.totalPages < 1 ? "No pages available" : `Page ${pagination.currentPage} of ${pagination.totalPages}`}

            </span>
            <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className={`w-20 px-4 py-2 rounded-lg ${(pagination.currentPage === pagination.totalPages) || (pagination.totalPages < 1) ? " bg-gray-300" : "bg-gray-300 cursor-pointer hover:bg-amber-600 hover:text-amber-50"} `}
            >
                Next
            </button>
        </div>
    );
};


export default Pagination;
