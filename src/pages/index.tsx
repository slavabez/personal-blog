import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "styled-components";
import theme from "../utils/theme";
import { ArrowSvg } from "../components/svgs";

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
  box-shadow: 4px 4px 8px 2px #cdcdcd;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

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

  small {
    align-self: flex-end;
  }

  section {
    width: 90%;
  }
`;

const ReadMore = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const HeaderSection = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
            <HeaderSection>
              <h3>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <ReadMore>
                <Link to={node.fields.slug}>
                  <ArrowSvg />
                </Link>
              </ReadMore>
            </HeaderSection>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt
                }}
              />
            </section>
            <small>{node.frontmatter.date}</small>
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
