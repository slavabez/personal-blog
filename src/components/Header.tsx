import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "styled-components";
import Image from "gatsby-image";

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
`;

const TopOrLeftSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const BotOrRightSection = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  align-items: center;
  justify-content: space-evenly;
`;

const Header: React.FC = () => {
  const data = useStaticQuery(GET_PROFILE_INFO);
  const { author, social } = data.site.siteMetadata;

  console.log(data);

  return (
    <Wrapper>
      <TopOrLeftSection>
        <Link to={"/"}>
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            style={{
              marginBottom: 0,
              maxWidth: 50,
              maxHeight: 50,
              borderRadius: `50%`
            }}
            imgStyle={{
              borderRadius: `50%`
            }}
          />
        </Link>
      </TopOrLeftSection>
      <BotOrRightSection>
        <Link to={"/about"}>About</Link>
        <Link to={"/blog"}>Blog</Link>
        <a href="https://github.com/slavabez/" target="_blank">
          Github
        </a>
      </BotOrRightSection>
    </Wrapper>
  );
};

export default Header;
