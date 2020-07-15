import * as React from 'react';

export interface HeaderProps {
    className?: string;
    title: string;
    intro: string;
}

export interface HeaderState {

}

export class Header extends React.Component<HeaderProps, HeaderState>{
    el: HTMLDivElement;
    constructor(p: HeaderProps) {
        super(p);
    }

    render() {
        const { props, state } = this,
            cls = this.props.className || "";

        return (
            <div className={"header " + cls} ref={e => this.el = e}>
                <div className="header__wrapper">
                    <h1 className="header__wrapper--title">
                        {
                            props.title
                        }
                    </h1>
                    <p className="header__wrapper--intro">
                        {
                            props.intro
                        }
                    </p>
                </div>
            </div>
        )
    }
}
