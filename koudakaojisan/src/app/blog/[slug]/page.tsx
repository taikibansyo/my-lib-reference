"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  date?: string;
  author?: {
    node: {
      name: string;
    };
  };
}

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      excerpt
      date
      author {
        node {
          name
        }
      }
    }
  }
`;

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;

  const { loading, error, data } = useQuery(GET_POST_BY_SLUG, {
    variables: { slug },
  });

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error: {error.message}</div>;
  if (!data?.post) return <div className="p-8">Post not found</div>;

  const post: Post = data.post;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.date && (
            <time className="text-gray-600">
              {new Date(post.date).toLocaleDateString("ja-JP")}
            </time>
          )}
          {post.author?.node?.name && (
            <p className="text-gray-600 mt-2">By {post.author.node.name}</p>
          )}
        </header>
        
        {post.excerpt && (
          <div className="text-lg text-gray-700 mb-8 italic">
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        )}
        
        <div 
          className="prose prose-lg max-w-full break-words"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}