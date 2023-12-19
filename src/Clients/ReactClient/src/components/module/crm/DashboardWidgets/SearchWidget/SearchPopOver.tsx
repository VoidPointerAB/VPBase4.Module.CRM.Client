import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18next from 'i18next';

import { PopOver } from '../../PopOver/PopOver';
import AddIcon from 'components/module/crm/icons/AddIcon';
import EditIcon from 'components/module/crm/icons/EditIcon';

interface ISearchPopOverProps {
  id: string,
  type: 'CONTACTCOMPANY' | 'CONTACTPERSON' | 'ACTIVITY'
  history: any,
}

interface IState {
  popOverId: string,
  popOverOpen: boolean
}

class SearchPopOver extends React.Component<ISearchPopOverProps, IState> {
  public state = {
    popOverId: '',
    popOverOpen: false,
  };

  public toggle = () => this.setState((prevState: IState) => ({ popOverId: this.props.id, popOverOpen: !prevState.popOverOpen }))

  public render() {
    let editType: 'CONTACTCOMPANY' | 'CONTACTPERSON' | 'ACTIVITY' = 'ACTIVITY';
    let addPersonIcon = null;
    let addActivityIcon = null;
    switch (this.props.type) {
      case 'CONTACTCOMPANY':
        editType = 'CONTACTCOMPANY'
        addPersonIcon = <AddIcon companyId={this.props.id} history={this.props.history} type={'PERSON'} text={i18next.t('addButton.addPerson')} icon={'user-plus'} />
        addActivityIcon = <AddIcon companyId={this.props.id} history={this.props.history} type={'ACTIVITY'} text={i18next.t('addButton.addActivity')} icon={'calendar-plus'} />
        break;
      case 'CONTACTPERSON':
        editType = 'CONTACTPERSON'
        addActivityIcon = <AddIcon personId={this.props.id} history={this.props.history} type={'ACTIVITY'} text={i18next.t('addButton.addActivity')} icon={'calendar-plus'} />
        break;
      case 'ACTIVITY':
        editType = 'ACTIVITY'
        break;
      default:
        editType = 'ACTIVITY'
    }
    const getKeyTranslator = (type: string) => {
      switch (type) {
          case 'CONTACTCOMPANY':
              return "buttonLabels.editCompany"
          case 'CONTACTPERSON':
              return "buttonLabels.editPerson"
          case 'ACTIVITY':
              return "buttonLabels.editActivity"
          default:
              return ""
      }
    } 
    return (
      <span>
        <Button className="popover-hide-active" id={`entity-${this.props.id}`} onClick={this.toggle} style={{backgroundColor: "transparent", border: "none"}} color="transparent" outline={false} active={false} >
          <div className="mr-1 search-menu-icon px-2">
            <FontAwesomeIcon icon="ellipsis-v" size="1x" />
          </div>
        </Button>
        <PopOver placement='left' isOpen={this.state.popOverOpen} target={`entity-${this.props.id}`} toggle={this.toggle}>
          {addPersonIcon !== null ? addPersonIcon : ''}
          {addActivityIcon !== null ? addActivityIcon : ''}
          <EditIcon id={this.props.id} history={this.props.history} type={editType} text={i18next.t(getKeyTranslator(this.props.type))} />
        </PopOver>
      </span>
    );
  }
}

export default SearchPopOver
