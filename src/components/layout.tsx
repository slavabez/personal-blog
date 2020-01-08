import React, { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import theme from "./../utils/theme";

import "../utils/normalize.css";
import "../utils/global.css";
import Header from "./Header";

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
      "header main"
      "header footer";
  }
`;

const Main = styled.main`
  grid-area: main;
`;

const Footer = styled.footer`
  grid-area: footer;
`;

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <PageWrapper>
      <Header />
      <Main>{children}</Main>
      <Footer>I'm the footer, yo</Footer>
    </PageWrapper>
  );
};

export default Layout;
