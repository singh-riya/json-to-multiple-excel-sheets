import { useState } from "react";
import "./Pagination.css";

export default function Paginate({
  currentPage = 1,
  pageSize = 7,
  total,
  rowsPerPage = [],
  setTablePagination,
}) {
  // let maxPages = 10;
  // let items = [];
  // let leftSide = currentPage - 2;
  // if (leftSide <= 0) leftSide = 1;
  // let rightSide = currentPage + 2;
  // if (rightSide > maxPages) rightSide = maxPages;
  // for (let number = leftSide; number <= rightSide; number++) {
  //   items.push(
  //     <button
  //       key={number}
  //       className={
  //         number === currentPage ? "round-effect active" : "round-effect"
  //       }
  //       onClick={() => {
  //         setTablePagination("currentPage", number);
  //       }}
  //     >
  //       {number}
  //     </button>
  //   );
  // }
  const nextPage = () => {
    setTablePagination("currentPage", currentPage + 1);
  };

  const prevPage = () => {
    setTablePagination("currentPage", currentPage - 1);
  };

  const paginationRender = (
    <div className="flex-container">
      <div> Current page: {currentPage} </div>
      <div>
        <select
          onChange={(e) => setTablePagination("pageSize", e.target.value)}
        >
          {rowsPerPage.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="paginate-ctn">
        <button
          className="round-effect"
          disabled={currentPage <= 1}
          onClick={prevPage}
        >
          {"<"}
        </button>
        {/* {items} */}
        <button
          className="round-effect"
          // disabled={}
          onClick={nextPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
  return paginationRender;
}
