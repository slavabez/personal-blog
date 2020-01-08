import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

const GET_PROFILE_INFO = graphql`
  {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          base64
          width
          height
          src
          srcSet
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
`;

const Header: React.FC = () => {
  const data = useStaticQuery(GET_PROFILE_INFO);

  console.log(data);

  return <Wrapper>I'm the header</Wrapper>;
};

export default Header;
