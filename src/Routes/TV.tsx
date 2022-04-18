import { useQuery } from "react-query";
import { getTvTops, IGetTvTopsResult } from "../api";
import Banner from "./Components/Banner";
import { Loader, Wrapper } from "./Components/useStyled";

function TV() {
  const { data, isLoading } = useQuery<IGetTvTopsResult>(
    ["tv", "top_rated"],
    getTvTops
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
        </>
      )}
    </Wrapper>
  );
}

export default TV;
