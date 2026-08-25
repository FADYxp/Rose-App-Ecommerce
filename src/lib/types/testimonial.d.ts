declare type User = {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type TestimonialProps = {
  _id: string;
  user: User;
  rating: number;
  content: string;
  updatedAt: string;
};
