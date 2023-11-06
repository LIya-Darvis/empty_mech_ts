import React, {FC} from "react";
import Card from "./Card";
import { ICard } from "../types/types";

interface CardListProps {
    mainCards: ICard[];
}

export const CardList: FC<CardListProps> = ({mainCards}) => {
    return (
        <div>
            {mainCards.map(mainCard =>
                <div key={mainCard.id}>
                        {mainCard.id} {mainCard.title} {mainCard.access}
                </div>
            )}

        </div>
    )
};

export default CardList;