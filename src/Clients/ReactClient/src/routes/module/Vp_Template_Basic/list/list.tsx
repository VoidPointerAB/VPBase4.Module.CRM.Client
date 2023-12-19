import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import { rowIdsGetter } from "components/module/DataTable/DataTable";
import { ExportTemplateConsumer } from 'components/module/ExportTemplateConsumer/ExportTemplateConsumer';

import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

import Table from './Table';

import { GET_VP_TEMPLATE_BASIC_LIST } from 'graphQL/module/queries/Vp_Template_Basic/getList';
import { getVp_Template_Basics, getVp_Template_Basics_vp_Template_Basics } from 'graphQL/module/generatedTypes/getVp_Template_Basics';

class List extends React.Component {
    public render() {
        return (
            <Query<getVp_Template_Basics, getVp_Template_Basics_vp_Template_Basics> query={GET_VP_TEMPLATE_BASIC_LIST}>
                {({ loading, error, data }) => {
                    const queryPreData = queryPreDataHandler({ loading, error, data });
                    if (queryPreData) {
                        return queryPreData;
                    }

                    if (!data || !data.vp_Template_Basics) {
                        return null;
                    }

                    return (
                        <div className="d-flex flex-column">
                            <section className="ibox-content row no-gutters mb-3">
                                <div>
                                    <Link className="btn btn-success" to="/Vp_Template_Basic/New">
                                        <FA icon="plus" /> New
                                    </Link>
                                </div>

                                <ExportTemplateConsumer
                                    entityType="VP_Template_Basic"
                                    entityIdGetter={() => rowIdsGetter('vP_Template_BasicId')}
                                    wrapperClassName="ml-2"
                                />
                            </section>

                            <IBox>
                                <Table items={data.vp_Template_Basics} />
                            </IBox>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default List;
