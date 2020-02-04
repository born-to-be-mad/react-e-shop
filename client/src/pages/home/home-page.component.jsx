import React, { Profiler } from "react";

import { HomePageContainer } from "./home-page.styles";

import Directory from "../../components/directory/directory.component";

const HomePage = () => {
  return (
    <HomePageContainer>
      <Profiler
        id="Directory"
        onRender={(id, phase, actualDuration) => {
          console.log({
            id,
            phase, //mount or rerender
            actualDuration //time in ms
          });
        }}
      >
        <Directory />
      </Profiler>
    </HomePageContainer>
  );
};

export default HomePage;
