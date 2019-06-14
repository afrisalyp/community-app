/**
 * render work Item
 */
import _ from 'lodash';
import React from 'react';
import PT from 'prop-types';
import ReactSVG from 'react-svg';
import moment from 'moment';
import { isomorphy } from 'topcoder-react-utils';

import './styles.scss';

let assets;
if (isomorphy.isClientSide()) {
  assets = require.context('assets/images/profile', false, /svg/);
}

export default function Item(props) {
  const {
    work,
    index,
    onDeleteItem,
    onEditItem,
  } = props;

  const hasSecondLine = () => {
    if (_.isEmpty(work.timePeriodFrom) && _.isEmpty(work.timePeriodTo)
      && _.isEmpty(work.position) && !work.working) {
      return false;
    }

    return true;
  };

  return (
    <div styleName="container">
      <div styleName="work-info">
        <div styleName="work-icon">
          <ReactSVG path={assets('./ico-work.svg')} />
        </div>
        <div styleName={`work-parameters${hasSecondLine() ? '' : ' single-line'}`}>
          <div styleName={`parameter-first-line${hasSecondLine() ? '' : ' single-line'}`}>
            { `${work.company}${_.isEmpty(work.industry) ? '' : ` | ${work.industry}`}${_.isEmpty(work.cityTown) ? '' : ` | ${work.cityTown}`}` }
          </div>
          <div styleName="parameter-second-line">
            { `${!_.isEmpty(work.timePeriodFrom) ? moment(work.timePeriodFrom).format('YYYY') : ''}${!_.isEmpty(work.timePeriodTo) ? ` - ${moment(work.timePeriodTo).format('YYYY')}` : ''}${!_.isEmpty(work.position) && (!_.isEmpty(work.timePeriodTo) || !_.isEmpty(work.timePeriodFrom)) ? ' | ' : ''}${!_.isEmpty(work.position) ? `${work.position}` : ''}` }
          </div>
          {
            work.working && (
              <div styleName="parameter-second-line">
                Current
              </div>
            )
          }
          <div styleName="parameter-second-line-mobile">
            <p>
              {`${!_.isEmpty(work.timePeriodFrom) ? moment(work.timePeriodFrom).format('YYYY') : ''}${!_.isEmpty(work.timePeriodTo) ? ` - ${moment(work.timePeriodTo).format('YYYY')}` : ''}`}
            </p>
            <p>
              {`${!_.isEmpty(work.position) ? `${work.position}` : ''}`}
            </p>
            {
              work.working && (
                <p>Current</p>
              )
            }
          </div>
        </div>
      </div>
      <div styleName="operation-container">
        <a
          styleName="edit"
          onKeyPress={() => onEditItem(index)}
          tabIndex={0}
          role="button"
          onClick={() => onEditItem(index)}
        >
          <img src={assets('./ico-edit.svg')} alt="edit-icon" />
          <p>
            Edit
          </p>
        </a>
        <a
          styleName="delete"
          onKeyPress={() => onDeleteItem(index)}
          tabIndex={0}
          role="button"
          onClick={() => onDeleteItem(index)}
        >
          <img src={assets('./ico-trash.svg')} alt="delete-icon" />
          <p>
            Delete
          </p>
        </a>
      </div>
    </div>
  );
}

Item.propTypes = {
  work: PT.shape().isRequired,
  index: PT.number.isRequired,
  onDeleteItem: PT.func.isRequired,
  onEditItem: PT.func.isRequired,
};
