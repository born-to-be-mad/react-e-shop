import React from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection-page.component";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded
} from "../../redux/shop/shop.selectors";

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  render() {
    const { match, fetching, loading } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={fetching} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={!loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  fetching: selectIsCollectionFetching,
  loading: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollections: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
