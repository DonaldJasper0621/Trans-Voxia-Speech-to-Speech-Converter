import { useParams } from "react-router-dom";

const AnalyticsPage = () => {
  const { aID } = useParams();
  return <h1>Analytics / {aID}</h1>;
};

export default AnalyticsPage;
