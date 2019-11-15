interface IRating {
  id: number;
  description: string;
  ratingValue: number;
}

class Rating implements IRating {
    id: number;
    description: string;
    ratingValue: number;

    constructor() {
        this.id = 0;
        this.description = "";
        this.ratingValue = 0;
    }
}

export {
  IRating,
  Rating
}