// import { useQuery } from "@tanstack/react-query";

// import { useParams } from "react-router-dom";

// import * as api from "../api/api";

// export const TvDetails = ({type}) => {
//   const { id } = useParams();
//   // const {tvId} = useParams();

//   console.log(id);

//   let tvId = "id" + id;

//   console.log(tvId);

//   const { data: tvDetails, isLoading: tvDetailsLoading } = useQuery(
//     ["getTvDetails", id, type],
//     () => api.getTvDetails(id, type),
//     {
//       enabled: type === "tv",
//     }
//   );

//   if (tvDetailsLoading) {
//     return <h2>"Loading"</h2>;
//   }

//   return (
//     <>
//       <h3>TvDetails</h3>
//       {tvDetails && <h2>{tvDetails.original_name}</h2>}
//     </>
//   );
// };
