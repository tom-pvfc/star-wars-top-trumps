import * as React from 'react';
import { DP } from '../../../constants';
import { DialogProps } from './Dialog';
import { SCREEN_WIDTH, RES_URL } from '../../../config';
import I18n from '../../../services/I18n';

export function SHOW_EMBED_DIALOG() {
    DP.show((res, rej) => {
        return (
            <EmbedComponent />
        )
    }, GET_DIALOG_OPTS())
}

export function SHOW_INFO_DIALOG() {
    DP.show((res, rej) => {
        return (
            <InfoComponent />
        )
    }, GET_DIALOG_OPTS())
}


const GET_DIALOG_OPTS = (): DialogProps => {
    if (SCREEN_WIDTH.IS_SMALL()) {
        return {
            wrapHeight: "full-height",
            wrapWidth: 'full-width'
        }
    } else {
        return {
            wrapHeight: "large-height",
            wrapWidth: "full-width",
            position: "bottom"
        }
    }
}


export const InfoComponent: React.SFC<any> = (props) => {
    let infoHtml = { __html: I18n.t("informationCopy") }
    return (
        <div className="info-container container">
            <div className="row">
                <div className="col s12">
                    <h1 className="center dialog__header">{I18n.t("infoTitle")}</h1>
                </div>
            </div>
            <div className="row">
                <div className="center col s12 m12 " dangerouslySetInnerHTML={infoHtml}></div>
            </div>
        </div>
    )
}

export const EmbedComponent: React.SFC<any> = (props) => {
    return (
        <div className="embed-container container">

            <div className="row">
                <div className="col s12">
                    <h1 className="dialog__header center">{I18n.t("embedCopyTitle")}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                </div>
            </div>

        </div>
    )
}
