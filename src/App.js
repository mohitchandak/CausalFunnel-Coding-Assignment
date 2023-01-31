import React, { useState, useEffect } from "react";
import './App.css';
function App() {
  const [issue, setIssue] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.github.com/repos/facebook/react/issues?pulls=false&page=${page}`, {
      headers: {
        Authorization: "Bearer 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",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        setIssue((prevIssues) => [...prevIssues, ...res]);
        setIsLoading(false);
        if (res.length === 0) setHasMore(false);
        else setPage(page + 1);
      });
  }, [page]);


  var findCreationTime = (dateCreated) => {
    var creation_dt = Date.parse(dateCreated);
    var curr_dt = Date.now();
    var diff = curr_dt - creation_dt;
    diff = Math.floor(diff / 1000);
    var secs_diff = diff % 60;
    diff = Math.floor(diff / 60);
    var mins_diff = diff % 60;
    diff = Math.floor(diff / 60);
    var hours_diff = diff % 24;
    diff = Math.floor(diff / 24);
    if (hours_diff > 0) {
      return hours_diff;
    }
    return mins_diff;
  }

  return (
    <div className="App margin: 25px;">
      <div className="align-items-center justify-content-center">
        <ul className="list-group mw-100 align-items-center justify-content-center">
          {issue.map((data) => (
            <li key={data.id} className="list-group-item" style={{ width: "700px" }}>
              <div className="d-flex flex-row bd-highlight">
                <svg
                  className="octicon octicon-issue-opened open"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path style={{ "fill": "#3fb950" }} d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  <path fillRule="evenodd" style={{ "fill": "#3fb950" }} d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                </svg>
                <h5 className="p-2 bd-highlight">
                  <a target={"_blank"} rel="noreferrer" href={data.html_url}>
                    {data.title}
                  </a>
                  <div>{data.labels.name}</div>
                </h5>
              </div>
              <div>
              {data.labels.length !== 0 ? data.labels.map(e => <div className="issue_label" style={{ backgroundColor: `#${e.color}` }}><strong style={{ color: 'black' }}>{e.name}</strong></div>) : ''}
                <span style={{ color: "#8b949e !important" }}>
                  #{data.number} opened {findCreationTime(data.created_at)} hours ago by {data.user.login}
                </span>
              </div>
            </li>
          ))}
        </ul>
        {isLoading ? <div>Loading...</div> : ""}
        {!hasMore ? <div>No more issues to show</div> : ""}
      </div>
    </div>

  );
}

export default App;