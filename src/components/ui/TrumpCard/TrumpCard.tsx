import * as React from 'react'
import { useState } from 'react';
import { iCard } from '../../../models/models';

export interface TrumpCardsProps {
    className?: string;
    data: iCard;
    deckType: "people" | "starships";
    winningCard: iCard;
}

export function TrumpCard(props: TrumpCardsProps) {

    let cls = props.className || "";
    
    // console.log("my card " , props.winningCard)

    const [toggleStatus, setToggle] = useState(false);


    return (
        <div className={`trump-card  ${cls} ${props.winningCard.name == props.data.name ? "trump-card__winner" : ""}`  }>
            <div className="trump-card__wrapper">
                <h1>
                    {
                        props.data.name
                    }
                </h1>
                {
                    // people deck data
                    props.deckType == "people" ?
                        <div className="trump-card__wrapper--data">
                            <p>
                                {
                                   "Height: " + props.data.height + "cm"
                                }
                            </p>
                            <p>
                                {
                                   "Gender: " + props.data.gender
                                }
                            </p>
                            <p>
                                {
                                   "Birth Year: " + props.data.birth_year
                                }
                            </p>
                            <p>
                                {
                                   "Weight: " + props.data.mass
                                }
                            </p>
                        </div>
                        :
                        // starship deck data
                        <div className="trump-card__wrapper--data">
                            <p>
                                {
                                   "Hyper Drive Rating: " + props.data.hyperdrive_rating
                                }
                            </p>
                            <p>
                                {
                                   "manufacturer: " + props.data.manufacturer
                                }
                            </p>
                            <p>
                                {
                                   "model: " + props.data.model
                                }
                            </p>
                            <p>
                                {
                                   "Starship Class: " + props.data.starship_class
                                }
                            </p>
                        </div>
                }

                <div className="trump-card__more" onClick={() => setToggle(!toggleStatus)}>
                    Click here Show more Info
                </div>
                {
                    toggleStatus && 
                    <div className="animated fadeIn delay-2">
                        More info!
                    </div>
                }

            </div>
            {
                props.winningCard.name == props.data.name && 
                <div className="trump-card__status animated fadeIn delay-4">
                    Winner!
                </div>
            }
        </div>
    )
}