import Link from "next/link";

import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;

  const selectYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news;
  let links = await getAvailableNewsYears();

  if (selectYear && !selectedMonth) {
    news = await getNewsForYear(selectYear);
    links = getAvailableNewsMonths(selectYear);
  }

  if (selectYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>No news found for the chosen filter!</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  const availableYears = await getAvailableNewsYears();

  if (
    (selectYear && !availableYears.includes(selectYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectYear).includes(selectedMonth))
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
