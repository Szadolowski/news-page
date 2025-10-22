import Link from "next/link";

export default function News() {
  return (
    <>
      <h1>News Page</h1>
      <ul className="news-list">
        <li>
          <Link href={"/news/ciekawy"}>Jakiś ciekawy news</Link>
        </li>
        <li>
          <Link href={"/news/inny-ciekawy"}>Inny ciekawy news</Link>
        </li>
      </ul>
    </>
  );
}
