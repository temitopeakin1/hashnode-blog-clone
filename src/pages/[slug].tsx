// import Post from "@/components/post";
// import { getPostBySlug } from "@/lib/request";
// import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";


// export async function generateMetaData({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const data = await getPostBySlug(params.slug);
//   return {
//     title: data.title,
//   };
// }

// export default async function BlogPage({ params }: { params: { slug: string } }) {
//     const  queryClient = new QueryClient();

//     await queryClient.prefetchQuery({
//         queryKey: ["post", params.slug], // two query keys are passed here
//         queryFn: () => getPostBySlug(params.slug), // a queryFn
//     })
//   return <div className="max-w-7xl w-full px-3 xl:p-0 mx-auto">
//     <HydrationBoundary state={dehydrate(queryClient)}>
//         <Post slug ={params.slug}/>
//         </HydrationBoundary>
//     </div>;
// }

import Post from "@/components/post";
import { getPostBySlug } from "@/lib/request";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const queryClient = new QueryClient(); // Declare queryClient outside the function

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  await queryClient.prefetchQuery({
    queryKey: ["post", params.slug],
    queryFn: () => getPostBySlug(params.slug),
  });

  const data = await getPostBySlug(params.slug);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title: data.title,
      params,
    },
  };
}

const BlogPage: React.FC<{ params: { slug: string }; title: string }> = ({ params, title }) => (
  <div className="max-w-7xl w-full px-3 xl:p-0 mx-auto">
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post slug={params.slug} />
    </HydrationBoundary>
  </div>
);

export default BlogPage;
