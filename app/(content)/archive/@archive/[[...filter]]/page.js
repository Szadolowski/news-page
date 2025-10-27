import Link from "next/link";

import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";

export default function FilteredNewsPage({ params }) {
  const filter = params.filter;

  const selectYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news;
  let links = getAvailableNewsYears();

  if (selectYear && !selectedMonth) {
    news = getNewsForYear(selectYear);
    links = getAvailableNewsMonths(selectYear);
  }

  if (selectYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>No news found for the chosen filter!</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (selectYear && !getAvailableNewsYears().includes(+selectYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectYear).includes(+selectedMonth))
  ) {
    throw new Error("Invalid filter.");
  }
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectYear
                ? `/archive/${selectYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
