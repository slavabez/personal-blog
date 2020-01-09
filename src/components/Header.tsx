import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "styled-components";
import Image from "gatsby-image";
import theme from "../utils/theme";

const GET_PROFILE_INFO = graphql`
  {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
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

  padding: 1rem;
  max-height: calc(85px - 2rem);

  display: flex;
  flex-direction: row;

  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: center;

    min-height: calc(100vh - 2rem);
    width: 200px;
  }
`;

const TopOrLeftSection = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 768px) {
    flex-direction: column;
    border-bottom: 2px solid ${theme.mainContrast};
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
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
      font-size: 1.3rem;
    }
  }

  a {
    // text-transform: uppercase;
    text-decoration: none;
    font-weight: 700;
    color: ${theme.mainContrast};
  }
`;

const NameSpan = styled.span`
  display: none;
  font-size: 2rem;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const data = useStaticQuery(GET_PROFILE_INFO);
  const { author, social } = data.site.siteMetadata;

  const imageStyle =
    typeof window !== "undefined" && window && window.innerWidth && window.innerWidth < 768
      ? {
          marginBottom: 0,
          maxWidth: 50,
          maxHeight: 50,
          borderRadius: `50%`
        }
      : {
          marginBottom: 0,
          maxWidth: 150,
          maxHeight: 150,
          borderRadius: `50%`
        };

  return (
    <Wrapper>
      <TopOrLeftSection>
        <Link to={"/"}>
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            style={imageStyle}
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
