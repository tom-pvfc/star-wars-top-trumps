import * as React from 'react'
import { iCard } from '../../../models/models';
import { TrumpCard } from '../TrumpCard/TrumpCard';


export interface TrumpCardsProps {
    className?: string;
    card1: iCard;
    card2: iCard;
    deckType: "people"|"starships";
    winningCard: iCard;
}

export function TrumpCards(props: TrumpCardsProps) {
    
    let cls = props.className || "";

    return (
        <div className={`trump-cards  ${cls}`}>
            <div className="trump-cards__wrapper">
                <div className="trump-cards__wrapper--card">
                    <TrumpCard
                        data={props.card1}
                        deckType={props.deckType}
                        winningCard={props.winningCard}
                    />
                </div>
                <div className="trump-cards__wrapper--card">
                    <TrumpCard 
                        data={props.card2}
                        deckType={props.deckType}
                        winningCard={props.winningCard}
                    />
                </div>
            </div>
        </div>
    )
}