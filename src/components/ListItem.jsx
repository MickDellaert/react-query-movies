import { Link } from "react-router-dom";

import * as api from "../api/api";

export const ListItem = ({ item, mediaType, searched }) => {
  // console.log(mediaType);
  // console.log("searched" + searched);


  return (
    <Link
      to={`${mediaType}/${item.id}`}
      state={{ type: mediaType, searched:searched }}
    >
      <div>
        <h3>{item.title}</h3>
        <img src={`${api.IMG_URL}${item.poster_path}`} alt="" />
      </div>
    </Link>
  );
};
