import React from "react";
import StatsMapOverlay from "./StatsMapOverlay";
import MapDrawer from "../../Common/DrawerCustomBeta2";
import MapDrawerContentFilters from "./MapDrawerContentFilters";
import MapDrawerContentComments from "./MapDrawerContentComments";
import MapContent from "./MapContent";
import { Button } from "@material-ui/core";
import { ArrowForwardIos, Comment } from "@material-ui/icons";
import "leaflet/dist/leaflet.css";
import {
  getProvinceBasicStats,
  getCityBasicStats,
  getComments,
  addComment,
  toggleCommentUpvote
} from "../../../Common/MockApiConnections";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.moneyIncludesDictionary
});
class MapPage extends React.Component {
  state = {
    filerDrawerOpen: false,
    commentDrawerOpen: false,
    comments: [],
    commentsFetching: false,
    selectedCityId: null,
    selectedProvinceId: null,
    cityStats: null,
    provinceStats: null,
    countryStats: null,
    cityStatsFetching: false,
    provinceStatsFetching: false,
    selectedStatistic: null,
    parametersState: {
      ageRangeValue: { min: 10, max: 90 },
      moneyIncludes: this.props.moneyIncludes.map(
        moneyInclude => moneyInclude.id
      )
    }
  };

  clickedOnCity = id => {
    const selectedCity = this.state.cityStats.list.find(x => x.id === id);
    this.setState(state => ({
      selectedCityId: id,
      selectedStatistic: selectedCity
    }));
  };

  clickedOnProvince = id => {
    this.fetchCityStats(id);
    const selectedProvince = this.state.provinceStats.list.find(
      x => x.id === id
    );
    this.setState(state => ({
      selectedCityId: null,
      selectedProvinceId: id,
      selectedStatistic: selectedProvince
    }));
  };

  clickedOnCountry = () => {
    this.setState(state => ({
      selectedCityId: null,
      selectedProvinceId: null,
      cityStats: null,
      selectedStatistic: state.countryStats
    }));
  };

  fetchCityStats = provId => {
    //delay in order to let zoom animation end
    const delay = 300;
    this.setState({
      cityStatsFetching: true
    });
    setTimeout(
      () =>
        getCityBasicStats(provId)
          .then(data => {
            this.setState({
              cityStatsFetching: false,
              cityStats: data.cityData
            });
          })
          .catch(err => {
            console.log("failed to getch basic city map data", err);
            this.setState({
              cityStatsFetching: false
            });
          }),
      delay
    );
  };

  fetchProvinceStats = () => {
    this.setState({
      provinceStatsFetching: true
    });
    getProvinceBasicStats()
      .then(data => {
        // add min max to provinces
        data.provinceData.min = data.provinceData.list.reduce(
          (prev, curr) => (curr.avg < prev.avg ? curr : prev),
          data.provinceData.list[0]
        ).avg;
        data.provinceData.max = data.provinceData.list.reduce(
          (prev, curr) => (curr.avg > prev.avg ? curr : prev),
          data.provinceData.list[0]
        ).avg;
        this.setState({
          provinceStatsFetching: false,
          provinceStats: data.provinceData,
          countryStats: data.countryData,
          selectedStatistic: data.countryData
        });
      })
      .catch(err => {
        console.log("failed to getch basic map data", err);
        this.setState({
          provinceStatsFetching: false
        });
      });
  };

  componentDidMount = () => {
    this.fetchProvinceStats();
  };

  submitFilters = parameters => {
    this.setState({ filerDrawerOpen: false, parametersState: parameters });
  };

  openCommentDrawer = () => {
    this.setState({
      commentDrawerOpen: true,
      commentsFetching: true,
      comments: []
    });
    this.fetchComments();
  };

  fetchComments = () => {
    getComments(this.state.selectedProvinceId, this.state.selectedCityId)
      .then(data => this.setState({ comments: data, commentsFetching: false }))
      .catch(err => {
        console.log("failed to fetch comments");
        this.setState({ commentsFetching: false, comments: [] });
      });
  };

  handleCommentUpvoteChange = commentId => {
    const oldLikedState = this.state.comments.find(c => c.id === commentId)
      .liked;
    // perform change locally for greater UX
    this.setState(state => ({
      comments: state.comments.map(x =>
        x.id === commentId
          ? { ...x, liked: !x.liked, upvotes: x.upvotes + (x.liked ? -1 : 1) }
          : x
      )
    }));
    // propably should noify back end about upvote change
    toggleCommentUpvote(commentId, !oldLikedState);
  };

  handleCommentPost = text => {
    // notify back end, and only then update comment list (?)
    addComment(this.state.selectedProvinceId, this.state.selectedCityId, {
      content: text
    });
    this.fetchComments();
  };

  render() {
    const drawerWidth = "300px";
    const drawerWithSmallPad = "316px";
    const drawerWidthLargePad = "332px";

    const filterDrawer = (
      <MapDrawer
        width={drawerWidth}
        open={this.state.filerDrawerOpen}
        onClose={() => this.setState({ filerDrawerOpen: false })}
      >
        <MapDrawerContentFilters
          style={{ width: drawerWidth, padding: "16px" }}
          onClick={this.submitFilters}
          filterState={
            !this.state.filerDrawerOpen && this.state.parametersState
          }
          moneyIncludes={this.props.moneyIncludes}
        />
      </MapDrawer>
    );
    const filterDrawerButton = (
      <Button
        style={{
          padding: "20px 16px",
          position: "absolute",
          top: "0px",
          left: this.state.filerDrawerOpen ? drawerWidthLargePad : "0px",
          zIndex: "999",
          transition: "all 0.225s ease",
          transform: this.state.filerDrawerOpen
            ? "rotate(180deg)"
            : "rotate(0deg)"
        }}
        onClick={() =>
          this.setState(state => ({
            filerDrawerOpen: !state.filerDrawerOpen
          }))
        }
      >
        <ArrowForwardIos />
      </Button>
    );

    const commentDrawer = (
      <MapDrawer
        width={drawerWidth}
        open={this.state.commentDrawerOpen}
        onClose={() => this.setState({ commentDrawerOpen: false })}
      >
        <MapDrawerContentComments
          style={{ width: drawerWidth, padding: "8px" }}
          comments={this.state.comments}
          onCommentUpvoteChange={this.handleCommentUpvoteChange}
          onCommentPost={this.handleCommentPost}
        />
      </MapDrawer>
    );
    const commentDrawerButton = (
      <Button
        style={{
          padding: "20px 16px",
          position: "absolute",
          top: "64px",
          left: this.state.commentDrawerOpen ? drawerWithSmallPad : "0px",
          zIndex: "999",
          transition: "all 0.225s ease"
        }}
        onClick={() =>
          this.state.commentDrawerOpen
            ? this.setState({ commentDrawerOpen: false })
            : this.openCommentDrawer()
        }
      >
        <Comment />
      </Button>
    );

    return (
      <div style={{ position: "relative", ...this.props.style }}>
        <MapContent
          provinceData={this.state.provinceStats}
          cityData={this.state.cityStats}
          clickedOnCity={this.clickedOnCity}
          clickedOnProvince={this.clickedOnProvince}
          clickedOnCountry={this.clickedOnCountry}
        />
        <StatsMapOverlay
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            minWidth: "20%",
            minWidth: "256px",
            zIndex: "999"
          }}
          stats={this.state.selectedStatistic}
        />
        {filterDrawer}
        {commentDrawer}
        {filterDrawerButton}
        {commentDrawerButton}
      </div>
    );
  }
}
export default connect(mapStateToProps)(MapPage);
