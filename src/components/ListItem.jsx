import { Link } from "react-router-dom";

import * as api from "../api/api";

export const ListItem = ({ item, mediaType }) => {
  console.log(mediaType);

  return (
    <Link
      key={item.id}
      to={`${mediaType}/${item.id}`}
      state={{ type: mediaType }}
    >
      <div>
        <h3>{item.title}</h3>
        <img src={`${api.IMG_URL}${item.poster_path}`} alt="" />
      </div>
    </Link>
  );
};
