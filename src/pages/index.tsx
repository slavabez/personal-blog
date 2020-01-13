import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "styled-components";
import theme from "../utils/theme";

interface Props {
  data: {
    allMarkdownRemark: any;
    site: {
      siteMetadata: {
        title: string;
        description: string;
      };
    };
  };
}

const ArticleListItem = styled.article`
  padding: 0.5rem;
  box-shadow: 0 0 5px #cdcdcd;
  border-radius: 10px;
  margin-bottom: 1rem;

  h3 {
    margin: 0.5rem 0;
    font-size: 1.8rem;

    a {
      color: ${theme.mainContrast};
      text-decoration: none;
    }
  }

  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    max-width: 800px;
  }
`;

const ReadMore = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BlogIndex = (props: Props) => {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;
  const siteDescription = data.site.siteMetadata.description;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout title={siteTitle}>
      <SEO title="All posts" description={siteDescription} />
      {posts.map(({ node }: any) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <ArticleListItem key={node.fields.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt
                }}
              />
            </section>
            <ReadMore>
              <Link to={node.fields.slug}>Read more...</Link>
            </ReadMore>
          </ArticleListItem>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
