import "../styles/global.css";
// a importação dos arquivos globais deve ser aqui, 
// tudo aquilo que se usa em todas as pgs

import { ChallengesProvider } from "../context/ChallengesContext";

function MyApp({ Component, pageProps }) {
 
  return (
    <Component {...pageProps}/>
  );
}

export default MyApp;
