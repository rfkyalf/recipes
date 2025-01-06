export interface Recipe {
  data: {
    categories: [
      {
        title: string;
        image: string;
        slug: string;
      }
    ];
    newestRecipes: [
      {
        title: string;
        image: string;
        slug: string;
        calory?: string;
        duration: string;
        difficulty: string;
      }
    ];
  };
}

export interface FetchError {
  statusCode: number;
  message: string;
}
