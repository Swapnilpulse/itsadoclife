import React from 'react';

const menu = ({posts}) => {
    //console.log({posts});
  return (
    <div>
      {
        posts.nodes.map(post =>
            
            <div className="col-md-6 mb-4" key={post.databaseId}>
              {post.label}
            </div>
          )
      }
    </div>
  );
}

export default menu;


export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://1213f06464.nxcli.net/graphql',{
      method:'POST',
      headers:{'Content-Type': 'application/json' },
      body: JSON.stringify({
          query:`
          query GET_MENU_BY_NAME {
            menu(id: "Main Navigation", idType: NAME) {
              count
              id
              databaseId
              name
              slug
              menuItems {
                nodes {
                  id
                  databaseId
                  title
                  url
                  cssClasses
                  description
                  label
                  linkRelationship
                  target
                  parentId
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
        posts: json.data.menu.menuItems,
      },
    }
  }