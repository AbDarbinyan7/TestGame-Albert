import Head from "next/head";
import styles from "../styles/Home.module.css";
import GameStart from "./Home/Home";
import React, { useState, useEffect } from "react";
import { CountContext } from "../Context";

export default function Home() {
  const [count, setCount] = useState<any>(2);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GameStart />
    </div>
  );
}
