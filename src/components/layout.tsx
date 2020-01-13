import React, { ReactNode } from "react";
import styled from "styled-components";

import "../utils/normalize.css";
import "../utils/global.css";
import Header from "./Header";

interface Props {
  location?: Location;
  title: string;
  children?: ReactNode;
}

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Main = styled.main`
  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <PageWrapper>
      <Header />
      <Main>{children}</Main>
    </PageWrapper>
  );
};

export default Layout;
