// @ts-nocheck
import Link from "next/link";
import groq from "groq";
import client from "../client";

const Index = () => {
  return (
    <div>
      {/* {posts.length > 0 &&
        posts.map(
          ({ _id, title = "", slug = "", publishedAt = "" }) =>
            slug && (
              <li key={_id}>
                <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                  {title}
                </Link>{" "}
                ({new Date(publishedAt).toDateString()})
              </li>
            )
        )} */}
    </div>
  );
};

// export async function getServerSideProps() {
//   const posts = await client.fetch(groq`
//       *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
//     `);
//   return {
//     props: {
//       posts,
//     },
//   };
// }

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/post/home",
      permanent: true, // make this true if you want the redirect to be cached by the search engines and clients forever
    },
  };

  return {
    props: {},
  };
}

export default Index;
