import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const index = ({posts}) => {
    //console.log(posts);
  return (
    <>
    <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" defer></script>
    </Head>
    <div className='container'>
      <h1>Blogs</h1>
      <div className="row py-3">
      {
        posts.nodes.map(post =>
            
            <div className="col-md-6 mb-4" key={post.postId}>
              <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                <a className="card p-3">
                    {post.slug}
                  <p className='fs-3 mb-0 fw-bold'>{post.title}</p>
                  <div dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
                </a>
              </Link>
            
            </div>
          )
      }
      </div>
    </div>
    </>
  );
}

export default index;

export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://1213f06464.nxcli.net/graphql',{
      method:'POST',
      headers:{'Content-Type': 'application/json' },
      body: JSON.stringify({
          query:`
          query allposts {
            posts {
              nodes {
                title
                slug
                uri
                postId
                excerpt
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
          `
      })
      
    })
    const json = await res.json()
    //const posts = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts: json.data.posts,
      },
    }
  }
