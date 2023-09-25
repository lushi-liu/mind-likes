import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResults from "@/components/shared/NoResults";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "aaxz asdsda",
    tags: [
      { _id: "1", name: "java" },
      { _id: "2", name: "mongoose" },
    ],
    author: {
      _id: "1",
      name: "Louis Liu",
      picture: "Louis.jpg",
    },
    upvotes: 15,
    views: 167,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "OHOH OHOH OHOH",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "mongoose" },
    ],
    author: {
      _id: "1",
      name: "Lushi Liu",
      picture: "Louis.jpg",
    },
    upvotes: 15093,
    views: 45000600,
    answers: [],
    createdAt: new Date("2023-09-01T12:00:00.000Z"),
  },
];

export default function Home() {
  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          position="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          extraClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          extraClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResults
            title="There are no questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </div>
  );
}
