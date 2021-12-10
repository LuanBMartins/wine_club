export class Review {
    user_id: string;
    name: String;
    review: String;
    date: String;
    score: Number;
}

export class Wine {
    id: number;
    name: string;
    producer: string;
    image: string;
    country: string;
    type: string;
    grape: string;
    harmonizing: Array<string>;;
    score: number;
    reviews: Array<Review>;
}
