import React, { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import theme from "./../utils/theme"

interface Props {
  location?: Location;
  title: string;
  children?: ReactNode;
}

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-areas:
    "header"
    "main"
    "footer";
    
   background-color: ${theme.mainColor};
   color: ${theme.mainContrast};

  @media (min-width: 768px) {
    grid-template-areas:
      "header main main"
      "header footer footer";
  }
`;

const Header = styled.header`
  grid-area: header;
  text-align: center;
`;
const Main = styled.main`
  grid-area: main;
`;
const Footer = styled.footer`
  grid-area: footer;
`;

const Layout: React.FC<Props> = ({ children, location, title }: Props) => {
  const rootPath = `/`;
  let header;

  if (location && location.pathname === rootPath) {
    header = (
      <h1>
        <Link to={`/`}>{title}</Link>
      </h1>
    );
  } else {
    header = (
      <h3>
        <Link to={`/`}>{title}</Link>
      </h3>
    );
  }
  return (
    <PageWrapper>
      <Header>{header}</Header>
      <Main>{children}</Main>
      <Footer>Some content here lol</Footer>
    </PageWrapper>
  );
};

export default Layout;
