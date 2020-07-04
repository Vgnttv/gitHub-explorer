import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { fetchRepos } from "../../actions/repos";
import { setSearch } from "../../actions/search";
import { setCurrentPage } from "../../actions/pagination";
import { clientId } from "../../constants";
import { SearchBox } from "./components";
import "./ReposListContainer.css";
const ReposList = lazy(() => import("./components/ReposList"));
const Pagination = lazy(() => import("./components/Pagination"));

class ReposListContainer extends Component {
  componentDidMount() {
    this.props.fetchRepos();
  }

  handleInput = event => {
    this.props.setSearch(event.target.value);
  };

  render() {
    const {
      repos,
      search,
      time,
      setCurrentPage,
      pagination,
      loading
    } = this.props;
    const currentPage = pagination;
    const reposPerPage = 10;
    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const filteredRepos = repos.filter(repo =>
      repo.name.toLowerCase().includes(search.toLowerCase())
    );
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const currentRepos = search ? filteredRepos : repos;
    const totalRepos = currentRepos.length;
    const reposToDisplay = currentRepos.slice(
      indexOfFirstRepo,
      indexOfLastRepo
    );
    const href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    const timeText = time ? `Time to load: ${time}ms` : "Loading...";
    return (
      <div className="container" data-cy="timeToLoadList">
        <div className="topContainer">
          <a className="gitHubRedirect" href={href}>
            Sign in with GitHub
          </a>
          <div className="time">{timeText}</div>
        </div>
        <div className="wrapper">
          <SearchBox search={search} handleInput={this.handleInput} />
          <Suspense fallback={<div>Loading...</div>}>
            <ReposList repos={reposToDisplay} loading={loading} />
            <Pagination
              reposPerPage={reposPerPage}
              totalRepos={totalRepos}
              paginate={paginate}
            />
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pagination: state.pagination,
  repos: state.repos.value,
  loading: state.repos.loading,
  search: state.search.value,
  time: state.time
});
const mapDispatchToProps = dispatch => {
  return {
    fetchRepos: () => dispatch(fetchRepos()),
    setSearch: value => dispatch(setSearch(value)),
    setCurrentPage: number => dispatch(setCurrentPage(number))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReposListContainer);
