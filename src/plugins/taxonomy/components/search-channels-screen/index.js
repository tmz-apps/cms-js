import React, { lazy } from 'react';
import { Button, Card, Table } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import SearchChannelsSort from '@triniti/schemas/triniti/taxonomy/enums/SearchChannelsSort.js';
import { CreateModalButton, Icon, Loading, Screen } from '@tmz-apps/cms-js/components/index.js';
import Collaborators from '@tmz-apps/cms-js/plugins/raven/components/collaborators/index.js';
import nodeUrl from '@tmz-apps/cms-js/plugins/ncr/nodeUrl.js';
import useRequest from '@tmz-apps/cms-js/plugins/pbjx/components/useRequest.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import usePolicy from '@tmz-apps/cms-js/plugins/iam/components/usePolicy.js';
import createRowClickHandler from '@tmz-apps/cms-js/utils/createRowClickHandler.js';

const CreateChannelModal = lazy(() => import('@tmz-apps/cms-js/plugins/taxonomy/components/create-channel-modal/index.js'));

function SearchChannelsScreen(props) {
  const { request } = props;
  const { response, pbjxError } = useRequest(request);
  const policy = usePolicy();
  const canCreate = policy.isGranted(`${APP_VENDOR}:channel:create`);
  const canUpdate = policy.isGranted(`${APP_VENDOR}:channel:update`);
  const navigate = useNavigate();

  return (
    <Screen
      header="Channels"
      activeNav="Taxonomy"
      primaryActions={
        <>
          {canCreate && <CreateModalButton text="Create Channel" icon="plus-outline" modal={CreateChannelModal} />}
        </>
      }
    >
      {(!response || pbjxError) && <Loading error={pbjxError} />}

      {response && response.has('nodes') && (
        <Card>
          <Table hover responsive>
            <tbody>
            {response.get('nodes').map(node => {
              const handleRowClick = createRowClickHandler(navigate, node);
              return (
                <tr key={`${node.get('_id')}`} className="cursor-pointer" onClick={handleRowClick}>
                  <td className="td-title">{node.get('title')}</td>
                  <td className="text-nowrap px-1 py-1"><Collaborators nodeRef={node.generateNodeRef().toString()} /></td>
                  <td className="td-icons" data-ignore-row-click={true}>
                    <Link to={nodeUrl(node, 'view')}>
                      <Button color="hover" tabIndex="-1">
                        <Icon imgSrc="eye" alt="view" />
                      </Button>
                    </Link>
                    {canUpdate && (
                      <Link to={nodeUrl(node, 'edit')}>
                        <Button color="hover" tabIndex="-1">
                          <Icon imgSrc="pencil" alt="edit" />
                        </Button>
                      </Link>
                    )}
                    <a href={nodeUrl(node, 'canonical')} target="_blank" rel="noopener noreferrer">
                      <Button color="hover">
                        <Icon imgSrc="external" alt="open" />
                      </Button>
                    </a>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        </Card>
      )}
    </Screen>
  );
}

export default withRequest(SearchChannelsScreen, 'triniti:taxonomy:request:search-channels-request', {
  persist: true,
  initialData: {
    count: 50,
    sort: SearchChannelsSort.TITLE_ASC.getValue(),
  }
});
