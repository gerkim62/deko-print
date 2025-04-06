// lib/utils/pagination.ts
export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
  
  export function getPaginationInfo(
    totalItems: number,
    currentPage: number,
    pageSize: number
  ): PaginationInfo {
    const totalPages = Math.ceil(totalItems / pageSize);
    
    return {
      currentPage,
      totalPages,
      pageSize,
      totalItems,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }
  