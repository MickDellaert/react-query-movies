// import { useQuery, useQueries } from "@tanstack/react-query";

// // import { ManyQueries } from "./ManyQueries";

// import * as api from "../../api/api";
// import { SliderContainer } from "./SliderContainer";

// export const SliderData = () => {
//   const itemNumber = 4;
//   const totalNumber = 6;

//   const { isLoading: trendingLoading, data: trendingData } = useQuery(
//     ["trending-movies"],
//     api.getTrending
//   );

//   // const double = [...sliced, ...sliced];
//   // const doubleIndexed = double.map((item, key) => ({ key, ...item }));

//   // const triple = [...sliced, ...sliced, ...sliced];
//   // const tripleIndexed = triple.map((item, key) => ({ key, ...item }));

//   const userQueries = useQueries({
//     queries: tripleIndexed.map((item) => {
//       return {
//         queryKey: ["getManyDetails", item.id, item.media_type],
//         queryFn: () => api.getDetails(item.id, item.media_type),
//         enabled: tripleIndexed,
//       };
//     }),
//   });

//   if (trendingLoading) {
//     return <h2>"Loading"</h2>;
//   }

//   const sliced = trendingData.results.slice(0, totalNumber);
//   const triple = [...sliced, ...sliced, ...sliced];
//   const tripleIndexed = triple.map((item, key) => ({ key, ...item }));

//   console.log(sliced);

//   // const firstCopy = trendingData.results.slice(0, itemNumber);
//   // const lastCopy = trendingData.results.slice(
//   //   totalNumber - itemNumber,
//   //   totalNumber
//   // );

//   // const combined = [...lastCopy, ...sliced, ...firstCopy];
//   // console.log(sliced);
//   // console.log(combined);

//   // console.log(firstCopy)
//   // console.log(lastCopy)

//   // const userQueriesIndexed = userQueries.map((item, key) => ({ key, ...item }));

//   return (
//     <>
//       {/* <SliderContainer
//         trendingData={trendingData}
//         tripleIndexed={tripleIndexed}
//         // userQueriesIndexed={userQueriesIndexed}
//         itemNumber={itemNumber}
//       /> */}
//     </>
//   );
// };
