import * as React from 'react'


export interface SplashDataProps {
    className?: string;
    setDeck: (type: string) => void;

}

export function SplashData(props: SplashDataProps) {

    let cls = props.className || "";

    return (
        <div className={`splash-data  ${cls}`}>
            <div className="splash-data__wrapper">
                <div className="splash-data__wrapper--card" onClick={() => { props.setDeck("people") }}>
                    <h1>Character deck</h1>
                </div>

                <div className="splash-data__wrapper--card" onClick={() => { props.setDeck("starships") }}>
                    <h1>Starship deck</h1>
                </div>
            </div>
        </div>
    )
}