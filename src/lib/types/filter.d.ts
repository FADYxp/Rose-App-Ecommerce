declare type ProductSearchParamsProps = {
  searchParams: {
    occasion?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    rateCount?: number;
    page? : number
  };
};
