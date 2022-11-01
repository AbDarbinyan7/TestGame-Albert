import React from "react";
import Head from "next/head";

import GameStart from "./Home/Home";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game - Find the right place</title>
        <meta name="description" content="Play and enjoy the game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameStart />
    </div>
  );
}
