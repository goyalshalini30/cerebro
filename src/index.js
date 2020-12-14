import * as React from "react";
import { render } from "react-dom";
import GraphiQL from "graphiql";

import "graphiql/graphiql.min.css";

import "./styles.css";

const URL = "https://swapi-graphql.netlify.app/.netlify/functions/index";

function graphQLFetcher(graphQLParams) {
  return fetch(URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams),
    credentials: "omit"
  }).then(response => response.json());
}

const container = document.getElementById("root");

const defaultQuery = `
query ExampleQuery {
  data: allFilms {
    edges {
      node {
        id
        title
        producers
        episodeID
        created
      }
    }
  }
}
`;

const App = () => {
  const [value, setValue] = React.useState(null);
  React.useEffect(() => {
    setTimeout(() => {
      setValue("something");
    }, 1000);
  }, []);

  return (
    <div id="wrapper">
      {value ? (
        <GraphiQL
          fetcher={graphQLFetcher}
          defaultQuery={defaultQuery}
          variables={null}
        />
      ) : null}
      ,
    </div>
  );
};

render(<App />, container);
