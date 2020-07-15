import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IStoreState } from '../../_reducers';
import { Header } from '../../components/ui/Header/Header';
import { Link } from 'react-router-dom';
import { LinkButton } from '../../components/ui/Button/Button';

export interface ResultsPageProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    results?: string[];
}

const INIT_STATE: ResultsPageState = {

}

export interface ResultsPageState {

}

export class ResultsPage extends React.Component<ResultsPageProps, ResultsPageState> {

    constructor(props: ResultsPageProps) {
        super(props);
        this.state = INIT_STATE;
    }

    mode = (array) => {
        if (array.length == 0)
            return null;
        let modeMap = {};
        let maxEl = array[0], maxCount = 1;
        for (let i = 0; i < array.length; i++) {
            let el = array[i];
            if (modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;
            if (modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }

    render() {
        const { props, state } = this;
        const cls = this.props.className || "";

        if(!props.results || props.results.length == 0){
            return location.href = '';
        }

        // console.log("final results ", props.results)

        //find most common
        let commonName = this.mode(props.results)

        return (
            <div className={"results-page " + cls}>
                <div className="results-page__wrapper">
                    <Header
                        title={"Results Page!"}
                        intro={`We hope you enjoyed the app!`}
                    />
                    <div className="results-page__wrapper--number">
                        <p>
                            Number of winners - {props.results.length}
                        </p>
                    </div>
                    <div className="results-page__wrapper--biggest">
                        <p>
                            Biggest winner: {commonName}
                        </p>
                    </div>
                    <div className="results-page__wrapper--winners">
                        <p>
                            all winners -
                    </p>
                        {
                            props.results.map((name, i) => {
                                return <p key={"namei" + i}>
                                    {
                                        name
                                    }
                                </p>
                            })
                        }
                    </div>
                    <LinkButton href="#">
                        Back to start
                    </LinkButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IStoreState, ownProps): Partial<ResultsPageProps> => {
    return {
        results: state.app.results
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
