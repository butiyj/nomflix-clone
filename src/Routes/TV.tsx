import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { getTvTops, IGetTvTopsResult } from "../api";
import { makeImagePath } from "../utils";
import Banner from "./Components/Banner";
import {
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  Box,
  BoxVariants,
  ButtonGroup,
  Info,
  infoVariants,
  Loader,
  NextPage,
  NextPageVariants,
  offset,
  Overlay,
  Row,
  Slider,
  Wrapper,
} from "./Components/useStyled";
import useWindowDimensions from "./Components/useWindowDimension";

function TV() {
  const { data, isLoading } = useQuery<IGetTvTopsResult>(
    ["tv", "top_rated"],
    getTvTops
  );
  const { scrollY } = useViewportScroll();
  const width = useWindowDimensions();
  const histroy = useNavigate();
  const [hover, setHover] = useState(false);

  const handleMouseIn = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxCliecked = (movieId: number) => {
    histroy(`${process.env.PUBLIC_URL}/tv/${movieId}`);
  };
  const onOverlayClick = () => {
    histroy(`${process.env.PUBLIC_URL}/tv`);
  };
  const bigMovieMatch = useMatch(`${process.env.PUBLIC_URL}/tv/:movieId/*`);
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            backdrop_path={data?.results[0].backdrop_path || ""}
            title={data?.results[0].name || ""}
            overview={data?.results[0].overview || ""}
          ></Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                initial={{ x: width + 5 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 5 }}
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={BoxVariants}
                      onClick={() => onBoxCliecked(movie.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(
                        movie.backdrop_path || movie.poster_path,
                        "w500"
                      )}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <ButtonGroup>
              <NextPage
                whileHover="hover"
                initial="normal"
                variants={NextPageVariants}
                onClick={incraseIndex}
                onMouseOver={handleMouseIn}
                onMouseOut={handleMouseOut}
              >
                <h3>{hover ? "〉" : ""}</h3>
              </NextPage>
            </ButtonGroup>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  scrolly={scrollY.get()}
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.name}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default TV;
