import { PostMetadata } from "@/lib/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";
import Image from "next/image";

export default function Blogcard({ post }: { post: PostMetadata }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        {post.coverImage && (
          // <img
          //   className="rounded-lg h-full"
          //   src={post.coverImage.url}
          //   alt={post.title}
          // />
          <Image
            src={post.coverImage.url}
            alt={post.title}
            width={400}
            height={400}
          />
        )}
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">
          <Link href={`/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <div className="mt-4 flex gap-3 items-center">
          {post.author.profilePicture && (
            //  <img
            //     src={post.author.profilePicture}
            //     className="rounded-full h-7 w-7"
            //   />
            <Image
              src={post.author.profilePicture}
              alt={post.author.profilePicture}
              width={40}
              height={40}
              className="rounded-full h-7 w-7"
            />
          )}
          {post.author.name}
        </div>
        <p className="text-gray-500 line-clamp-4 mt-3">
          {post.subtitle || post.content.text}
        </p>
      </CardContent>
    </Card>
  );
}
