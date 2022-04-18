import styled from "styled-components";
import { makeImagePath } from "../../utils";
const SBanner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;
interface IBannerInfo {
  backdrop_path: string;

  title: string;
  overview: string;
}
function Banner({ backdrop_path, title, overview }: IBannerInfo) {
  return (
    <SBanner bgPhoto={makeImagePath(backdrop_path || "")}>
      <Title>{title}</Title>
      <Overview>{overview}</Overview>
    </SBanner>
  );
}

export default Banner;
