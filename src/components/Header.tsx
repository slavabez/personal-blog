import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "styled-components";
import Image from "gatsby-image";
import theme from "../utils/theme";

const GET_PROFILE_INFO = graphql`
  {
    avatar: file(absolutePath: { regex: "/laptop_pic.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 450) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

const Wrapper = styled.header`
  grid-area: header;
  text-align: center;
  
  height: 80px;

  background-color: ${theme.mainContrast};
  color: ${theme.mainColor};
  box-shadow: 0 5px 10px #646464;
  
  padding: 10px;

  display: flex;
  flex-direction: row;

  @media (min-width: 768px) {
    flex-direction: column;
    height: auto;

    border-right: 1px solid ${theme.mainContrast};

    width: 200px;
    padding: 1.5rem;
    
    box-shadow: 5px 0 10px #646464;
  }
  
  @media (min-width: 1024px) {
    width: 350px;
  }
`;

const TopOrLeftSection = styled.div`
  display: flex;
  flex-direction: row;

  a {
    width: 80px;
    height: 80px;
  }

  img {
    width: calc(100% - 4px) !important;
    height: calc(100% - 4px) !important;
    border: 2px solid ${theme.mainColor};
  }
  
  @media (min-width: 768px) {
    flex-direction: column;
    border-bottom: 2px solid ${theme.mainContrast};
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    
    a {
      width: auto;
      height: auto;
      margin-bottom: 1rem;
    }
  }
`;

const BotOrRightSection = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  align-items: center;
  justify-content: space-evenly;

  @media (min-width: 768px) {
    flex-direction: column;
    flex: 0;

    a {
      margin: 0.25rem 0;
      font-size: 1.8rem;
    }
  }

  a {
    color: ${theme.mainColor};
    text-decoration: none;
    font-weight: 500;
    font-size: 1.8rem;
  }
`;

const NameSpan = styled.span`
  display: none;
  font-size: 2.2rem;
  font-weight: 700;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const data = useStaticQuery(GET_PROFILE_INFO);
  const { author, social } = data.site.siteMetadata;

  return (
    <Wrapper>
      <TopOrLeftSection>
        <Link to={"/"}>
          <Image
            fluid={data.avatar.childImageSharp.fluid}
            alt={author}
            imgStyle={{
              borderRadius: `50%`
            }}
          />
        </Link>
        <NameSpan>Slava</NameSpan>
        <NameSpan>Bezgachev</NameSpan>
      </TopOrLeftSection>
      <BotOrRightSection>
        <Link to="/about">About</Link>
        <Link to="/">Blog</Link>
        <a href="https://github.com/slavabez/" target="_blank">
          GitHub
        </a>
      </BotOrRightSection>
    </Wrapper>
  );
};

export default Header;
