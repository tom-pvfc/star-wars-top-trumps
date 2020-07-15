import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IStoreState } from '../../_reducers';
import MapViewer from '../../components/ui/MapViewer/MapViewer';
import MainHeader from '../../components/ui/MainHeader/MainHeader';
import { RES_URL } from '../../config';
import Banner from '../../components/ui/Banner/Banner';

export interface HomePageProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    sectionData: any;
}

const INIT_STATE: HomePageState = {

}

export interface HomePageState {

}

export class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps) {
        super(props);
        this.state = INIT_STATE;
    }

    render() {
        const { props, state } = this;
        const cls = this.props.className || "";
        return (
            <div className={"home-page " + cls}>
                <div className="home-page__wrapper">
                    <MainHeader
                        title={props.sectionData.title}
                    />
                    <div className="home-page__wrapper--banner">
                      <Banner />
                    </div>
                    <div className="home-page__wrapper--maps">
                        <MapViewer />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IStoreState, ownProps): Partial<HomePageProps> => {
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
