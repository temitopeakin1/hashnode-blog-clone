import Post from "@/components/post";
import { getPostBySlug } from "@/lib/request";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";


export async function generateMetaData({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPostBySlug(params.slug);
  return {
    title: data.title,
  };
}

export default async function Blog({ params }: { params: { slug: string } }) {
    const  queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["post", params.slug], // two query keys are passed here
        queryFn: () => getPostBySlug(params.slug), // a queryFn
    })
  return <div className="max-w-7xl w-full px-3 xl:p-0 mx-auto">
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Post slug ={params.slug}/>
        </HydrationBoundary>
    </div>;
}

