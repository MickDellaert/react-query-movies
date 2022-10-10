import React from "react";

import * as api from "../../api/api";

import { useQuery, useQueries } from "@tanstack/react-query";


export const ManyQueries = ({trendingData}) => {

  const sliced = trendingData.results.slice(0, 10);

  // const getManyDetails = (id, type) => {
  //   return axios.get(
  //     `https://api.themoviedb.org/3/${type}/${id}?api_key=d4208ada7ca0b82909b61d7d3afd76fa&append_to_response=videos,images`
  //   );
  // };

  const userQueries = useQueries({
    queries: sliced.map((item) => {
      return {
        queryKey: ["getManyDetails", item.id, item.media_type],
        queryFn: () => api.getDetails(item.id, item.media_type),
      };
    }),
  });

  console.log(userQueries);

  const test = [1, 2, 3, 4, 5];

  const renderExtraPrev = () => {
    let output = [];
    for (let index = 0; index < 3; index++) {
      output.push(test[5 - 1 - index]);
    }
    output.reverse();
    return output;
  };

  const renderExtraNext = () => {
    let output = [];
    for (let index = 0; index < 3; index++) {
      output.push(test[index]);
    }
    return output;
  };

  if (userQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  // const sizeRef = useRef();


  // useLayoutEffect(() => {
  //   if (sizeRef.current) {
  //     setWidth(sizeRef.current.offsetWidth);
  //     setHeight(sizeRef.current.offsetHeight);
  //   }
  // });

  // const [width, setWidth] = useState(0);


  return (
    <>
      <div>ManyQueries</div>
      <div className="test-div">
        <div>{renderExtraPrev()}</div>
        <div>{test}</div>
        <div>{renderExtraNext()}</div>
      </div>
      <div>Many Details</div>
      <div>
        {userQueries.map((many) => (
          <div key={many.data.id}>
            <h3>{many.data.title}</h3>
            <h3>{many.data.original_name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
