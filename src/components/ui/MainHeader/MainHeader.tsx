import * as React from 'react';

const MainHeader = (props) => {
    
    let title = props.title;

    return (
        <div className="main-header">
            <h1 className="main-header__title">
                {
                    title
                }
            </h1>
        </div>
    )
}

export default MainHeader;