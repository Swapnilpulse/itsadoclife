import React from 'react';
import Link from 'next/link';

const Mainnavigation = ({posts}) => {
  return (
    <>Main Navigation
    {/*<nav>
        <ul className="main-navigation">
        {
            posts.map(post =>
                <li>
                    <Link href={post.path}>sd<a>{post.label}</a></Link>
                </li>
            )
        }
        </ul>
    </nav>*/}
    </>
  );
}

export default Mainnavigation;

export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://1213f06464.nxcli.net/graphql',{
      method:'POST',
      headers:{'Content-Type': 'application/json' },
      body: JSON.stringify({
          query:`
          query GET_MENU_BY_NAME {
            menus(id: "Top Navigation", idType: NAME) {
              name
              menuItems {
                nodes {
                  label
                  path
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
        posts: json.data.menus.menuItems.nodes,
      },
    }
  }
