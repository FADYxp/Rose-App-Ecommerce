declare type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
};

export type MostPopularTabsProps = {
  occasions: Occasion[];
  activeOccasion: string;
};

export type OccProps = {
  searchParams?: {
    occasion?: string;
  };
};

export type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productsCount: number;
};

export type OccasionsResponse = {
  message: string;
  metadata: {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
  occasions: Occasion[];
};

export type DeleteOccasionResponse = {
  message: string;
  document: Occasion;
};

export type GetOccasionResponse = {
  message: string;
  occasion: Occasion;
};
