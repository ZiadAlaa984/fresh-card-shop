import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationMetadata } from "@/types/Products";

export default function PaginationNumberless({
  PaginationMetadata,
  page,
  setPage,
}: {
  PaginationMetadata: PaginationMetadata;
  page: number;
  setPage: (page: number) => void;
}) {
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < PaginationMetadata.numberOfPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="w-full mx-auto max-w-xs">
      <Pagination className="w-full">
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={`border ${
                page <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-disabled={page <= 1}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm text-muted-foreground">
              Page {PaginationMetadata.currentPage} of{" "}
              {PaginationMetadata.numberOfPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={`border ${
                page >= PaginationMetadata.numberOfPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              aria-disabled={page >= PaginationMetadata.numberOfPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
