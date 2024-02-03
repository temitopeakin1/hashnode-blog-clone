import Post from "@/components/post";
import { getPostBySlug } from "@/lib/request";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";


export async function generateStaticParams({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPostBySlug(params.slug);
  return {
    title: data.title,
  };
}

export default async function BlogPage({ params }: { params?: { slug: string } }) {
    const  queryClient = new QueryClient();

      // Add a conditional check for params before prefetching the query
      if (params?.slug) {
        await queryClient.prefetchQuery({
            queryKey: ["post", params.slug],
            queryFn: () => getPostBySlug(params.slug),
        });
    }

  return   <div className="max-w-7xl w-full px-3 xl:p-0 mx-auto">
  <HydrationBoundary state={dehydrate(queryClient)}>
    {/* Use nullish coalescing to provide a default value */}
    <Post slug={params?.slug ?? 'default-slug'} />
  </HydrationBoundary>
</div>
}

