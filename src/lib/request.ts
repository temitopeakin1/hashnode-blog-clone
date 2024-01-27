// to get blog name

import { env } from "./env";
import request, { gql } from "graphql-request";
import {
  GetPostsArgs,
  GetPostsResponse,
  PublicationName,
  SubscribeToNewsletterResponse,
} from "./types";

const endpoint = env.NEXT_PUBLIC_HASHNODE_ENDPOINT;
const publicationId = env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID;

export async function getBlogName() {
  const query = gql`
    query getBlogName($publicationId: ObjectId!) {
      publication(id: $publicationId) {
        title
        displayTitle
        favicon
      }
    }
  `;
  const response = await request<PublicationName>(endpoint, query, {
    publicationId,
  });

  return {
    title: response.publication.title,
    displayTitle: response.publication.displayTitle,
    favicon: response.publication.favicon,
  };
}

// note , in this code below, the type of object is the getpostsargs
export async function getPosts({ first = 12, pageParam = "" }: GetPostsArgs) {
  const query = gql`
    query getPosts($publicationId: ObjectId!, $first: Int!, $after: String) {
      publication(id: $publicationId) {
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              subtitle
              slug
              content {
                text
              }
              coverImage {
                url
              }
              author {
                name
                profilePicture
              }
            }
            cursor
          }
        }
      }
    }
  `;

  const response = await request<GetPostsResponse>(endpoint, query, {
    publicationId,
    first,
    after: pageParam,
  });
  return response.publication.posts.edges;
}

// subscribe to notifications
export async function subscribeToNewsLetter(email: string) {
  const mutation = gql`
    mutation subscribeToNewsLetter($publicationId: ObjectId!, email: String!) {
      subscribeToNewsLetter (
        input: {email: $email, publicationId: $publicationId}    
      ) {
        status
      }
    }
  `;

  const response = await request<SubscribeToNewsletterResponse>(
    endpoint,
    mutation,
    {
      publicationId,
      email,
    }
  );
  return response;
}