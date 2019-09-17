import React from "react";
import App, { Container as NextContainer } from "next/app";
import Head from "next/head";
import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "../components/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/styles.less"

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user;
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    const props = {
      ...pageProps,
      user: this.state.user,
    };

    return (
      <NextContainer>
        <Head>
          <title>Travel Thoughts!</title>
        </Head>
        <Navbar user={this.state.user} />
          <Jumbotron>
            <Component {...props} />
          </Jumbotron>
      </NextContainer>
    );
  }
}

export default MyApp;