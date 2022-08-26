import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';

export default function Post(data){
    //console.log(post);<Image width="640" height="426" src={post.featuredImage.node.sourceUrl} />
    const post = data.post;
    console.log(data);
    return (
        <>
        <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" defer></script>
        </Head>
        <div className="container">
            <div className="row py-3">
                <div className="col-md-12">
                    {post.featuredImage!=null && <Image width="5472" height="3648" src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg" alt={post.title} layout="responsive"/> }
                    {/*<Image width="600" height="400" src={post.featuredImage.node.sourceUrl} alt={post.title}/>*/}
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                </div>
            </div>
        </div>
        </>
    )

}

export async function getStaticProps(context) {
    // Call an external API endpoint to get post
    const res = await fetch('https://1213f06464.nxcli.net/graphql',{
        method:'POST',
        headers:{'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query SinglePost($id: ID!, $idType: PostIdType!) {
                    post(id: $id, idType: $idType) {
                        title
                        slug
                        content
                        featuredImage {
                            node {
                                sourceUrl
                            }
                        }
                    }
                }
            `,
            variables: {
                id: context.params.slug,
                idType: 'SLUG'
            }
        }) 
    })
    const json = await res.json()
    return {
        props: {
            post: json.data.post,
        },
    }
}

export async function getStaticPaths() {
    const res = await fetch('https://1213f06464.nxcli.net/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query AllPostsQuery {
                posts {
                    nodes {
                        slug
                    }
                }
            }
        `})
    })
    const json = await res.json()
    const posts = json.data.posts.nodes;
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))

    return { paths, fallback: false }
  }