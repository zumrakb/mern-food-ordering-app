import { useParams } from "react-router-dom";

function SearchPage() {
  const { city } = useParams();
  return <div className="max-w-7xl mx-auto">user searched for {city}</div>;
}

export default SearchPage;
