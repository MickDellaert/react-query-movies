import { Link } from "react-router-dom";
import { useEffect } from "react";

import * as api from "../api/api";

export const ListItem = ({ item, tvItem, type, setType }) => {



  return (
    <Link key={item.id} to={`movie/${item.id}`}>
      <div type={type} onClick={() => setType("movie")}>
        <h3>{item.title}</h3>
        <img src={`${api.IMG_URL}${item.poster_path}`} alt="" />
      </div>
    </Link>
  );
};
