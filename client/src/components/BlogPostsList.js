import React from 'react'

export const BlogPostsList = ({blogPosts}) => {
  return (
  <ul className="blog-posts-list">
    {blogPosts.map((post, index) => {
      return <li key={index} className="blog-post">
                <h3 className="blog-post__header">{post.heading}</h3>
                <div className="blog-post__message">{post.message}</div>
                <div className="blog-post__date">{post.date}</div>
            </li>
    })}
  </ul>
  )
}