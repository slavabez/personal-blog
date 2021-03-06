import React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import theme from "../utils/theme";

interface Props {
  data: {
    markdownRemark: any;
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  pageContext: any;
}

export const Article = styled.article`
  padding: 0.5rem;
  // box-shadow: 4px 4px 4px #cdcdcd;
  // border-radius: 10px;
  margin-bottom: 1rem;
  max-width: 800px;

  &:last-of-type {
    margin-bottom: 0;
  }

  h3 {
    margin: 1rem 0;

    a {
      color: ${theme.mainContrast};
      text-decoration: none;
    }
  }
  
  @media(min-width: 768px) {
    padding: 0;
  }
`;

export const PagesNav = styled.nav`
  padding: 0 1rem;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  }
`;

const BlogPostTemplate = (props: Props) => {
  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;
  const { previous, next, slug } = props.pageContext;

  return (
    <Layout title={siteTitle} location={slug}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          {post.frontmatter.date ? <p>{post.frontmatter.date}</p> : null}
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </Article>

      <PagesNav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </PagesNav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
