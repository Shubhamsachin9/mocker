"use client";
import React, { useState } from "react";
import { eq } from "drizzle-orm";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { useEffect } from "react";
import { Button } from "../../../../../components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FeedBack = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  };
  return (
    <div className="py-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-green-500">Congratulations</h2>
          <h2 className="font-bold text-2xl">
            Here is Your interview Feedback
          </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating:{" "}
            <strong>7/10</strong>
          </h2>
          <h2 className="tex-sm text-gray=500">
            Find below interview question with correct answer, Your answer and
            feeback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 flex justify-between bg-secondary rounded-lg my-2 gap-7 w-full text-left">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-500">
                      <strong>Your Answer:</strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-500">
                      <strong>Correct Answer:</strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback:</strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default FeedBack;
