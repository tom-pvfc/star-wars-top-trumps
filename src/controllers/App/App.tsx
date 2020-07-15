import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, } from 'react-router-dom';
import { ACTIONS } from './Actions';
import { AppProps, inAppState, inAppInitialState } from './StateAndProps';
import Splash from '../../pages/Splash/Splash';
import ResultsPage from '../../pages/ResultsPage/ResultsPage';
import TopTrumpsPage from '../../pages/TopTrumpsPage/TopTrumpsPage';

export const STATE_KEY = 'app';

class App extends React.Component<AppProps, inAppState>{
    constructor(props: AppProps) {
        super(props);
        this.state = inAppInitialState;
    }

   
    render() {
        return (
            <div className={`app`}>
                <Router hashType="noslash">
                    <Switch>
                        <Route exact path="/" component={Splash} />
                        <Route exact path="/results" component={ResultsPage} />
                        <Route exact path="/:key?" component={TopTrumpsPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
};

function mapStateToProps(state: any, ownProps) {
    return {
        appState: state.app
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ 
    loadData: ACTIONS.DATA_LOADED
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
