import { StepBack, StepForward } from "lucide-react";
import React, { FC } from "react";

interface PageProps {
  setCurrentPageNo: any;
  pageCount: any;
  currentPageNo: any;
}

const Pagination: FC<PageProps> = ({
  setCurrentPageNo,
  pageCount,
  currentPageNo,
}) => {
  return (
    <div className="flex gap-10 items-center justify-center mb-10">
      <StepBack
        className="cursor-pointer"
        onClick={() =>
          setCurrentPageNo((prev: number) => (prev > 0 ? prev - 1 : prev))
        }
      />
      {Array.from({ length: pageCount }, (_, i) => (
        <div
          key={i}
          onClick={() => setCurrentPageNo(i)}
          className={`${
            i === currentPageNo
              ? "bg-orange-500 cursor-pointer text-white rounded-full w-10 h-10 flex items-center justify-center"
              : "bg-yellow-400 cursor-pointer text-white rounded-full w-10 h-10 flex items-center justify-center"
          }`}
        >
          {i + 1}
        </div>
      ))}
      <StepForward
        className="cursor-pointer"
        onClick={() =>
          setCurrentPageNo((prev: number) =>
            prev < pageCount - 1 ? prev + 1 : prev
          )
        }
      />
    </div>
  );
};

export default Pagination;
