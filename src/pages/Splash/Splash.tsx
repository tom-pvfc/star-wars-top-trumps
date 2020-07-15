import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IStoreState } from '../../_reducers';
import { ACTIONS } from '../../controllers/App/Actions';
import { iActionType } from '../../models/models';
import { SplashData } from '../../components/ui/SplashData/SplashData';
import { LinkButton } from '../../components/ui/Button/Button';
import { Header } from '../../components/ui/Header/Header';

export interface SplashProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    deckChosen?: string;
    setDeckType: (type: string) => iActionType;
}

const INIT_STATE: SplashState = {

}

export interface SplashState {

}

export class Splash extends React.Component<SplashProps, SplashState>{

    constructor(props: SplashProps) {
        super(props);
        this.state = INIT_STATE;
    }

    setDeck = (type: string) => {
        //saves chosen deck to redux
        this.props.setDeckType(type);
    }

    render() {
        const { props, state } = this;
        const cls = this.props.className || "";

        return (
            <div className={"splash " + cls}>
                <Header
                    title={"Welcome to Star Wars Top Trumps!"}
                    intro={"Choose if you want to play with the Character deck or Starship deck"}
                />

                {
                    //if a deck has been chosen then show button
                    props.deckChosen !== "" &&
                    <div className="splash__button">
                        <h2>
                            {`Continue to game with the ${props.deckChosen} deck!`}
                        </h2>
                        <LinkButton key={`btn-${props.deckChosen}`} className="animated zoomIn delay-4" href={`#${this.props.deckChosen}`}>
                            Lets Play!
                        </LinkButton>
                    </div>
                }

                <SplashData
                    setDeck={this.setDeck}
                />

            </div>
        )
    }
}

const mapStateToProps = (state: IStoreState, ownProps): Partial<SplashProps> => {
    return {
        deckChosen: state.app.deckChosen
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setDeckType: ACTIONS.SET_DECK_TYPE
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
