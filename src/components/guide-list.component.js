import React, { Component } from "react";
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';
import {
  retrieveShows,
  findShowsByTitle
} from "../actions/guide.actions";
import { userActions } from "../actions/user.actions";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class ShowsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveShow = this.setActiveShow.bind(this);
    this.findByTitle = this.findByTitle.bind(this);

    this.state = {
      currentShow: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveShows();
    this.props.getUsers();
    console.log(`THIS PROPS IN MOUNT: ${this.props}`);
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentShow: null,
      currentIndex: -1,
    });
  }

  setActiveShow(show, index) {
    this.setState({
      currentShow: show,
      currentIndex: index,
    });
  }

  findByTitle() {
    this.refreshData();

    this.props.findShowsByTitle(this.state.searchTitle);
  }

  getShowCards(show, index, currentIndex, user) {
    const isAdult = show.show.genres.includes("Adult");
    const allAccess = user.userType === "administrator";
    const card = <Card 
    className={(index === currentIndex ? "bg-dark mb-3 text-white" : "")}
    style={
      {
        height: `calc(100% - 30px)`,
        cursor: `pointer`
    }}
    onClick={() => this.setActiveShow(show, index)}
    key={index}>
      <Card.Img variant="top" src={show.show.image ? show.show.image.medium : `https://www.reelviews.net/resources/img/default_poster.jpg`} />
      <Card.Body>
        <Card.Title>{show.show.name}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted" style={{whiteSpace: `nowrap`, overflow: `hidden`, textOverflow: `ellipsis`}}>{show.show.network ? show.show.network.name : "-"}</small>
      </Card.Footer>
    </Card>
    // check for adult content
    if(isAdult && !allAccess) {
      // console.log('RESTRICTED');
    }else{
      return card;
    }
  }

  render() {
    const { searchTitle, currentShow, currentIndex } = this.state;
    const { user, guide } = this.props;
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 3 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };
    return (
      <div className="list row">
        <div className="col-lg-12">
          <div className="input-group mb-3 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search shows by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.findByTitle}
                >
                  Search
                </button>
              </div>
            </div>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={this.props.deviceType !== "mobile" ? false : false}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
            
              {guide &&
                guide.map((show, index) => (
                  this.getShowCards(show, index, currentIndex, user)
                ))}
            </Carousel>
        </div>
        <div className="col-lg-12">
          {currentShow ? (
            <div>
              <h4>{currentShow.show.name}</h4>
              {currentShow.name ? 
              <div>
                <label>
                  <strong>{currentShow.name}</strong>
                </label>{" "}
              </div> : ""}
              <div>
                <label>
                  <strong>Summary:</strong>
                </label>{" "}
                <div dangerouslySetInnerHTML={{ __html: currentShow.show.summary }} />
              </div>
              <div>
                <label>
                  <strong>Genres</strong>
                </label>{" "}
                {currentShow.show.genres.map((genre, index) => (
                    <li key={index}>
                      {genre}
                    </li>
                  ))}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentShow.show.status}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Hi <b>{user.firstName}</b>! You're logged in as {user.userType}. Select a show above to see it's information...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { authentication, guide } = state;
  const { user } = authentication;
  return { user, guide };
}

const actionCreators = {
  getUsers: userActions.getAll,
  retrieveShows: retrieveShows,
  findShowsByTitle: findShowsByTitle
}

export default connect(mapState, actionCreators)(ShowsList);