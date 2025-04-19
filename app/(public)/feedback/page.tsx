"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define types for the form data
type FeedbackFormValues = {
  rating: number;
  experience:
    | "very-satisfied"
    | "satisfied"
    | "neutral"
    | "dissatisfied"
    | "very-dissatisfied";
  comments: string;
  phone: string;
};

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [starRating, setStarRating] = useState<number>(0);

  const form = useForm<FeedbackFormValues>({
    defaultValues: {
      rating: 0,
      experience: "satisfied",
      comments: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    // Include the star rating in the form data
    data.rating = starRating;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Create FormData object
      const formData = new FormData();

      // Append form fields to FormData
      formData.append("rating", data.rating.toString());
      formData.append("experience", data.experience);
      formData.append("comments", data.comments);
      formData.append("phone", data.phone);

      // Send data to Formspree using FormData
      const response = await fetch("https://formspree.io/f/mdkeqkgg", {
        method: "POST",
        body: formData,
        redirect: "manual",
      });

      console.log(response.status, response.statusText);

      console.log("Form submitted:", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError(
        error instanceof Error ? error.message : "Unknown error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarRating = (value: number) => {
    setStarRating(value);
  };

  if (submitted) {
    return (
      <div className="w-full min-h-screen max-w-md mx-auto my-10">
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800 text-lg font-medium">
            Thank you for your feedback!
          </AlertTitle>
          <AlertDescription className="text-green-700">
            We appreciate you taking the time to share your thoughts. Your
            feedback helps us improve our services.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen max-w-md mx-auto my-10">
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <CardTitle className="text-xl font-bold text-slate-800">
            Deko Print Feedback
          </CardTitle>
          <CardDescription className="text-slate-500">
            Please share your experience with our service
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 pt-6 bg-white">
              {/* Star Rating */}
              <FormField
                name="rating"
                render={() => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-slate-700">
                      How would you rate your overall experience?
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            className="focus:outline-none"
                            onClick={() => handleStarRating(value)}
                          >
                            <Star
                              size={24}
                              className={
                                value <= starRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    {starRating === 0 && form.formState.isSubmitted && (
                      <FormMessage className="text-red-500 text-sm">
                        Please provide a rating
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Experience */}
              <FormField
                control={form.control}
                name="experience"
                rules={{ required: "Please select an option" }}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-slate-700">
                      How was your experience with our app?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="very-satisfied"
                            id="very-satisfied"
                          />
                          <Label
                            htmlFor="very-satisfied"
                            className="text-slate-600"
                          >
                            Very Satisfied
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="satisfied" id="satisfied" />
                          <Label htmlFor="satisfied" className="text-slate-600">
                            Satisfied
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="neutral" id="neutral" />
                          <Label htmlFor="neutral" className="text-slate-600">
                            Neutral
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="dissatisfied"
                            id="dissatisfied"
                          />
                          <Label
                            htmlFor="dissatisfied"
                            className="text-slate-600"
                          >
                            Dissatisfied
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="very-dissatisfied"
                            id="very-dissatisfied"
                          />
                          <Label
                            htmlFor="very-dissatisfied"
                            className="text-slate-600"
                          >
                            Very Dissatisfied
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Comments */}
              <FormField
                control={form.control}
                name="comments"
                rules={{
                  required: "Please share your thoughts",
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-slate-700">
                      What can we improve?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what you liked or what we could do better..."
                        className="min-h-24 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Phone instead of Email */}
              <FormField
                control={form.control}
                name="phone"
                rules={{
                  pattern: {
                    value: /^[0-9+\-\s()]{7,20}$/,
                    message: "Please enter a valid phone number",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Phone (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(123) 456-7890"
                        className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-slate-500">
                      We'll only use this to follow up on your feedback if
                      needed
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Error message */}
              {submissionError && (
                <div className="text-red-500 text-sm">
                  Error submitting form: {submissionError}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end border-t border-slate-200 p-4 bg-slate-50">
              <Button
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default FeedbackForm;
