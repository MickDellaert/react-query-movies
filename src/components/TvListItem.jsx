import { Link } from "react-router-dom";

import * as api from "../api/api";

export const TvListItem = ({ item, type, setType }) => {

  return (
    <Link key={item.id} to={`tv/${item.id}`}>
      <div type={type} onClick={() => setType("tv")}>
        <h3>{item.original_name}</h3>
        <img src={`${api.IMG_URL}${item.poster_path}`} alt="" />
      </div>
    </Link>
  );
};