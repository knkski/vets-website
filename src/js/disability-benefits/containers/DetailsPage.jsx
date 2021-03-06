import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ClaimDetailLayout from '../components/ClaimDetailLayout';
import { setUpPage, isTab, scrollToTop, setFocus } from '../utils/page';

class DetailsPage extends React.Component {
  componentDidMount() {
    document.title = 'Details - Your Disability Compensation Claim';
    if (!isTab(this.props.lastPage)) {
      if (!this.props.loading) {
        setUpPage();
      } else {
        scrollToTop();
      }
    } else {
      setFocus('.va-tab-trigger--current');
    }
  }
  componentDidUpdate(prevProps) {
    if (!this.props.loading && prevProps.loading && !isTab(this.props.lastPage)) {
      setUpPage(false);
    }
  }
  render() {
    const { claim, loading } = this.props;

    let content = null;
    if (!loading) {
      content = (
        <div className="claim-details">
          <div className="claim-types">
            <h6>Claim Type</h6>
            <p>{claim.attributes.claimType || 'Not Available'}</p>
          </div>
          <div className="claim-conditions-list">
            <h6>Your Claimed Conditions</h6>
            {claim.attributes.contentionList
            ? claim.attributes.contentionList.map((contention, index) =>
              <li key={index}>{contention}</li>
              )
            : 'Not Available'
            }
          </div>
          <div className="claim-date-recieved">
            <h6>Date Received</h6>
            <p>{moment(claim.attributes.dateFiled).format('MMM D, YYYY')}</p>
          </div>
          <div className="claim-va-representative">
            <h6>Your Representative for VA Claims</h6>
            <p>{claim.attributes.vaRepresentative || 'Not Available'}</p>
          </div>
        </div>
      );
    }

    return (
      <ClaimDetailLayout
          claim={claim}
          currentTab="Details"
          loading={loading}>
        {content}
      </ClaimDetailLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.claimDetail.loading,
    claim: state.claimDetail.detail,
    lastPage: state.routing.lastPage
  };
}

export default connect(mapStateToProps)(DetailsPage);

export { DetailsPage };
