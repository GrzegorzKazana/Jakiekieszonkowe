import React from "react";
import StatsMapOverlay from "./StatsMapOverlay";
import MapDrawer from "../../Common/DrawerCustomBeta2";
import MapDrawerContentFilters from "./MapDrawerContentFilters";
import MapDrawerContentComments from "./MapDrawerContentComments";
import MapContent from "./MapContent";
import { Button, LinearProgress } from "@material-ui/core";
import { ArrowForwardIos, Comment } from "@material-ui/icons";
import "leaflet/dist/leaflet.css";
import {
  getCountryBasicStats,
  getProvinceBasicStats,
  getCityBasicStats
} from "../../../Common/MockApiConnections/MapStatsApi";
import {
  getComments,
  addComment,
  toggleCommentUpvote
} from "../../../Common/MockApiConnections/CommentsApi";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.moneyIncludesDictionary,
  ...state.schoolTypeDictionary
});
class MapPage extends React.Component {
  defaultFilterParameters = {
    ageRangeValue: { min: 1, max: 99 },
    moneyIncludes: this.props.moneyIncludes.map(
      moneyInclude => moneyInclude.id
    ),
    schoolTypeId: ""
  };

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
    countryStatsFetching: false,
    selectedStatistic: null,
    parametersState: this.defaultFilterParameters,
    parametersActive: false
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
        getCityBasicStats(
          provId,
          this.state.parametersActive,
          this.state.parametersState
        )
          .then(data => {
            //if city is currently selected and refetching stats e.g. after filter change
            //selected statistic needs to be updated
            this.setState(state =>
              state.selectedProvinceId !== null && state.selectedCityId !== null
                ? {
                    cityStatsFetching: false,
                    cityStats: data.cityData,
                    selectedStatistic: data.cityData.list.find(
                      cd => cd.id === state.selectedCityId
                    )
                  }
                : {
                    cityStatsFetching: false,
                    cityStats: data.cityData
                  }
            );
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
    getProvinceBasicStats(
      this.state.parametersActive,
      this.state.parametersState
    )
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
        //if province is currently selected and refetching stats e.g. after filter change
        //selected statistic needs to be updated
        this.setState(state =>
          state.selectedProvinceId !== null && state.selectedCityId === null
            ? {
                provinceStatsFetching: false,
                provinceStats: data.provinceData,
                selectedStatistic: data.provinceData.list.find(
                  pd => pd.id === state.selectedProvinceId
                )
              }
            : {
                provinceStatsFetching: false,
                provinceStats: data.provinceData
              }
        );
      })
      .catch(err => {
        console.log("failed to getch basic map data", err);
        this.setState({
          provinceStatsFetching: false
        });
      });
  };

  fetchCountryStats = () => {
    this.setState({
      countryStatsFetching: true
    });
    getCountryBasicStats(
      this.state.parametersActive,
      this.state.parametersState
    )
      .then(data =>
        //if city is currently selected and refetching stats e.g. after filter change
        //selected statistic needs to be updated
        {
          this.setState(state =>
            state.selectedProvinceId === null && state.selectedCityId === null
              ? {
                  countryStatsFetching: false,
                  countryStats: data.countryData,
                  selectedStatistic: data.countryData
                }
              : {
                  countryStatsFetching: false,
                  countryStats: data.countryData
                }
          );
        }
      )
      .catch(err => {
        console.log("failed to fetch country data");
        this.setState({
          countryStatsFetching: false
        });
      });
  };

  componentDidMount = () => {
    this.fetchCountryStats();
    this.fetchProvinceStats();
  };

  submitFilters = parameters => {
    this.setState(
      {
        parametersActive: true,
        filerDrawerOpen: false,
        parametersState: parameters
      },
      () => {
        this.fetchCountryStats();
        this.fetchProvinceStats();
        this.fetchCityStats(this.state.selectedProvinceId);
      }
    );
  };

  resetFilters = () => {
    this.setState(
      {
        parametersActive: false,
        filerDrawerOpen: false,
        parametersState: this.defaultFilterParameters
      },
      () => {
        this.fetchCountryStats();
        this.fetchProvinceStats();
        this.fetchCityStats(this.state.selectedProvinceId);
      }
    );
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
      .then(data =>
        this.setState({ comments: data.list, commentsFetching: false })
      )
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
    toggleCommentUpvote(commentId, !oldLikedState)
      .then(data =>
        this.setState({ comments: data.list, commentsFetching: false })
      )
      .catch(err => {
        console.log("failed to refetch comments");
        this.setState({ commentsFetching: false, comments: [] });
      });
  };

  handleCommentPost = text => {
    // notify back end, and in return get new comment list
    this.setState({ commentsFetching: true });
    addComment(this.state.selectedProvinceId, this.state.selectedCityId, {
      content: text
    })
      .then(data =>
        this.setState({ comments: data.list, commentsFetching: false })
      )
      .catch(err => {
        console.log("failed to refetch comments");
        this.setState({ commentsFetching: false, comments: [] });
      });
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
          onFilterClick={this.submitFilters}
          onResetClick={this.resetFilters}
          filterState={
            !this.state.filerDrawerOpen && this.state.parametersState
          }
          moneyIncludes={this.props.moneyIncludes}
          schoolTypes={this.props.schoolType}
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

    const progressBar = (
      <LinearProgress
        color="secondary"
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          zIndex: "1000"
        }}
      />
    );

    return (
      <div style={{ position: "relative", ...this.props.style }}>
        {(this.state.countryStatsFetching ||
          this.state.provinceStatsFetching ||
          this.state.cityStatsFetching) &&
          progressBar}
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
