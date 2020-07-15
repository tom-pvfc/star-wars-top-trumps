import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IStoreState } from '../../_reducers';
import { iActionType, iCard } from '../../models/models';
import { TrumpCards } from '../../components/ui/TrumpCards/TrumpCards';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import { Button, LinkButton } from '../../components/ui/Button/Button';
import { ACTIONS } from '../../controllers/App/Actions';
import { Header } from '../../components/ui/Header/Header';


export interface TopTrumpsPageProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    addResults: (name: string) => iActionType;
}

const INIT_STATE: TopTrumpsPageState = {
    card1: null,
    card2: null,
    data: null,
    deckType: "people",
    winningCard: null,
    showSpinner: true
}

export interface TopTrumpsPageState {
    card1: iCard;
    card2: iCard;
    data: any;
    deckType: "people" | "starships",
    winningCard: any;
    showSpinner: boolean;
}

export class TopTrumpsPage extends React.Component<TopTrumpsPageProps, TopTrumpsPageState> {

    constructor(props: TopTrumpsPageProps) {
        super(props);
        this.state = INIT_STATE;
    }

    componentDidMount() {
        // console.log("loaded ", this.props.deckChosen)

        if (this.props.match.params.key == "people" || this.props.match.params.key == "starships") {
            this.setState({
                deckType: this.props.match.params.key
            })
        }

        this.setSpinnerTime();

        setTimeout(() => {
            this.getData();
        }, 300)

        // if (this.state.data) {
        //     this.chooseRandomCards();
        // }
    }

    componentDidUpdate(prevProps: TopTrumpsPageProps, prevState: TopTrumpsPageState) {
        if (this.props.match.params.key !== prevProps.match.params.key) {
            if (this.props.match.params.key == "people" || this.props.match.params.key == "starships") {
                this.setState({
                    deckType: this.props.match.params.key
                })
            }
        }

        if (this.state.data !== prevState.data && this.state.data !== null) {
            this.chooseRandomCards();
        }
    }

    setSpinnerTime = () => {
        setTimeout(() => {
            this.setState({
                showSpinner: false
            })
        }, 500)
    }

    getData = () => {
        //http://swapi.dev/api/people/?search=&page=2
        if (this.state.deckType == "people") {
            let rdmIdx = this.generateRandomIndex(Math.random(), 8);
            
            fetch(`http://swapi.dev/api/people/?search=&page=${rdmIdx}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        //get data
                        this.setState({
                            data: result
                        })
                    },
                    (error) => {
                        console.log("error calling API ", error)
                        //error
                    }
                )
        }
        else {
            let rdmIdx = this.generateRandomIndex(Math.random(), 3);
            fetch(`http://swapi.dev/api/starships/?search=&page=${rdmIdx}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        //get data
                        this.setState({
                            data: result
                        })
                    },
                    (error) => {
                        console.log("error calling API ", error)
                        //error
                    }
                )
        }
    }

    generateRandomIndex = (val: number, maxVal: number) => {
        let nu = Math.floor(val * maxVal);
        return nu;
    }

    chooseRandomCards = () => {
        if (this.state.data.results) {
            let rdmIdx = this.generateRandomIndex(Math.random(), this.state.data.results.length);
            let rdmIdx2 = this.generateRandomIndex(Math.random(), this.state.data.results.length);
            // console.log("random number ", rdmIdx);

            while (rdmIdx == rdmIdx2) {
                rdmIdx2 = this.generateRandomIndex(Math.random(), this.state.data.results.length)
            }

            this.setState({
                card1: this.state.data.results[rdmIdx],
                card2: this.state.data.results[rdmIdx2]
            })

            setTimeout(() => {
                this.findWinner();
            }, 100)
        }
    }

    findWinner = () => {
        let card1 = this.state.card1;
        let card2 = this.state.card2;

        switch (this.state.deckType) {
            case "people":
                // if(card1.height > card2.height){
                this.setState({
                    winningCard: card1.height > card2.height ? card1 : card2
                })
                // }
                break;
            case "starships":
                this.setState({
                    winningCard: card1.hyperdrive_rating > card2.hyperdrive_rating ? card1 : card2
                })
                break;
        }

        setTimeout(() => {
            // console.log("winner saved ", this.state.winningCard.name)
            this.props.addResults(this.state.winningCard.name)
        }, 100)

        this.setSpinnerTime();

    }

    playAgain = () => {
        this.setState({
            showSpinner: true
        })

        this.getData();

        if (this.state.data) {
            this.chooseRandomCards();
        }

        // setTimeout(() => {
        //     this.getData();
        // }, 300)
    }

    render() {
        const { props, state } = this;
        const cls = this.props.className || "";

        //this will return to home page if the url is not one of the two category's
        if (this.props.match.params.key !== "people" && this.props.match.params.key !== "starships") {
            window.location.href = "";
        }

        // console.log("winningCard", state.winningCard)

        if (!state.card1 || !state.card2) {
            return <Spinner />
        }

        return (
            <div className={"top-trumps-page " + cls}>
                <div className="top-trumps-page__wrapper">
                    <Header
                        title={"Welcome to Star Wars Top Trumps - The Game!"}
                        intro={`You have chosen to play with the ${state.deckType} deck!`}
                    />
                    {
                    state.showSpinner ?
                        <Spinner />
                        :
                        (state.card1 && state.card2 && state.winningCard) &&
                        <TrumpCards
                            card1={state.card1}
                            card2={state.card2}
                            deckType={state.deckType}
                            winningCard={state.winningCard}
                        />
                    }

                    <div className="top-trumps-page__wrapper--buttons">
                        <Button className="top-trumps-page__wrapper--reset" onClick={this.playAgain}>
                            Play Again
                        </Button>

                        <LinkButton className="top-trumps-page__wrapper--results" href="#results">
                            Show Results
                        </LinkButton>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IStoreState, ownProps): Partial<TopTrumpsPageProps> => {
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    addResults: ACTIONS.ADD_RESULTS
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TopTrumpsPage);
