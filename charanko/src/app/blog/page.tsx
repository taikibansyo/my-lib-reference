"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
}

const GET_POSTS = gql`
  query GetAllPosts {
    posts(first: 10) {
      nodes {
        id
        slug
        title
        excerpt
        date
      }
    }
  }
`;

export default function Blog() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts: Post[] = data?.posts?.nodes || [];

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold underline">
          Next.js with Headless WordPress
        </h1>
        <div className="mt-5 space-y-2">
          {posts.map((post: Post) => {
            const { id, slug, title } = post;
            return (
              <Link
                key={id}
                href={`/blog/${slug}`}
                className="block p-4 border rounded hover:bg-gray-50"
              >
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                {post.excerpt && (
                  <div
                    className="text-gray-600 text-sm"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                )}
                {post.date && (
                  <time className="text-gray-500 text-xs mt-2 block">
                    {new Date(post.date).toLocaleDateString("ja-JP")}
                  </time>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
