interface IRating {
  id: number;
  description: string;
  ratingValue: number;
  iconName: string;
}

class Rating implements IRating {
    id: number;
    description: string;
    ratingValue: number;
    iconName: string;

    constructor() {
        this.id = 0;
        this.description = "";
        this.ratingValue = 0;
        this.iconName = "";
    }
}

export {
  IRating,
  Rating
}