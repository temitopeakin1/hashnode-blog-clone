// Import necessary dependencies
import Post from "@/components/post";
import { getPostBySlug } from "@/lib/request";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

// Function to generate metadata
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

// Page component
export default async function BlogPage({ params }: { params?: { slug: string } }) {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  // Add a conditional check for params before prefetching the query
  if (params?.slug) {
    // Prefetch the query for better performance
    await queryClient.prefetchQuery({
      queryKey: ["post", params.slug],
      queryFn: () => getPostBySlug(params.slug),
    });
  }

  // Return the JSX with the HydrationBoundary wrapping the component tree
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-7xl w-full px-3 xl:p-0 mx-auto">
        {/* Use nullish coalescing to provide a default value */}
        <Post slug={params?.slug ?? 'default-slug'} />
      </div>
    </HydrationBoundary>
  );
}
