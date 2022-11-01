import Head from "next/head";
import styles from "../styles/Home.module.css";
import GameStart from "./Home/Home";
import React, { useState } from "react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game - Find the right place</title>
        <meta name="description" content="Play and enjoy the game" />
        <link rel="icon" href="/favicon.ico" />

        <script
          src="https://kit.fontawesome.com/fd2210338a.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <GameStart />
    </div>
  );
}
