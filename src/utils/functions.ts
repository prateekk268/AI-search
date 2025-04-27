export const getMovieText = (input: {
  movieName: string;
  rating: number;
  audienceRating: string;
  description: string;
}): string => {
  const movieText = `
Movie Name: ${input.movieName}
Rating: ${input.rating}
Audience Rating: ${input.audienceRating}
Description: ${input.description}
`;

  return movieText;
};


