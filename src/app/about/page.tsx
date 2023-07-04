"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { BoxPlotWithoutPopover } from "@/components/boxplot";
import { theme } from "../../../tailwind.config";

export default function About() {
  const params = useSearchParams();
  const router = useRouter();

  return (
    <>
      <div className="m-3 grid grid-cols-3">
        <button
          className="px-2 py-1 rounded-xl border border-textDark text-textDark mx-3"
          onClick={() => router.push(`/${params.get("return") ?? "login"}`)}
        >
          back
        </button>
      </div>
      <h1 className="text-textDark place-self-center text-3xl">About</h1>
      <div className="w-full px-4 pt-4 text-textDark">
        Welcome to our About page, designed to provide you with answers to
        common questions and assist you in navigating our app with ease.
        <div className="mx-auto w-full max-w-md rounded-2xl border border-textDark p-2 mt-3">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>What is Appollon?</span>
                  <ChevronUpIcon
                    className={`${
                      !open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-textDark">
                  Appollon is a music analytics app that integrates with
                  Spotify, providing users with comprehensive insights into
                  their listening behavior, including genre preferences and
                  playlist analysis.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>How does the login work?</span>
                  <ChevronUpIcon
                    className={`${
                      !open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-textDark">
                  The login process for Appollon utilizes Spotify&apos;s API,
                  enabling seamless authentication and access to your
                  personalized music statistics and analysis.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Where do the stats come from?</span>
                  <ChevronUpIcon
                    className={`${
                      !open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-textDark">
                  The statistics offered by Appollon are derived from aggregated
                  and combined data sourced from Spotify&apos;s API, ensuring
                  accurate and comprehensive insights into your music listening
                  habits.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>What do the audio features mean?</span>
                  <ChevronUpIcon
                    className={`${
                      !open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-textDark">
                  <p>
                    The Spotify API provides several audio features that offer
                    valuable insights into the characteristics of songs:
                  </p>
                  <br />
                  <ol className="list-disc list-outside pl-4">
                    <li>
                      <strong>Danceability:</strong> A measure of how suitable a
                      track is for dancing, ranging from 0 to 1.
                    </li>
                    <li>
                      <strong>Energy:</strong> Represents the intensity and
                      activity level of a song, with higher values indicating
                      more energetic tracks.
                    </li>
                    <li>
                      <strong>Loudness:</strong> Indicates the overall loudness
                      of a track in decibels (dB), with negative values
                      representing quieter songs.
                    </li>
                    <li>
                      <strong>Valence:</strong> Reflects the positivity or
                      happiness of a track, ranging from 0 to 1, where higher
                      values indicate more positive songs.
                    </li>
                    <li>
                      <strong>Tempo:</strong> Represents the tempo or beats per
                      minute (BPM) of a track, indicating its speed or pace.
                    </li>
                    <li>
                      <strong>Instrumentalness:</strong> Indicates the
                      likelihood of a track being instrumental, with higher
                      values suggesting a higher chance of lack of vocals.
                    </li>
                    <li>
                      <strong>Duration:</strong> The duration of a song
                      represents the length of time it plays from start to
                      finish. It is typically measured in minutes and seconds.
                      The song duration is a fundamental attribute that provides
                      an understanding of how long a track plays, allowing users
                      to gauge the length and structure of their favorite songs.
                    </li>
                  </ol>
                  <br />
                  <p>
                    These audio features provide valuable data for analyzing and
                    understanding the musical characteristics and preferences of
                    users.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>How do I read the plots?</span>
                  <ChevronUpIcon
                    className={`${
                      !open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-textDark">
                  To interpret the plot, a boxplot displays the distribution of
                  a dataset, showcasing the median, quartiles, and any potential
                  outliers, allowing users to assess the spread and central
                  tendency of the data in a concise visual representation.
                  <br />
                  <div className="my-4">
                    <BoxPlotWithoutPopover
                      data={[0, 1, 0.5, 3, 2, 2.5, 2, 2.5, 3, 3, 3, 4]}
                      scale={[0, 1, 2, 3, 4, 5]}
                      boxColor={theme.extend.colors.primary}
                      medianColor={theme.extend.colors.textLight}
                      textColor={theme.extend.colors.textDark}
                      svgWidth={300}
                      svgHeight={100}
                    />
                  </div>
                  <ol className="list-disc list-outside pl-4">
                    <li>
                      <strong>Median:</strong> The median is the middle value of
                      the dataset, with 50% of the data falling below this value
                      (this is the black line).
                    </li>
                    <li>
                      <strong>Quartiles:</strong> The quartiles are the three
                      values that divide the dataset into four equal groups,
                      each containing 25% of the data.
                    </li>
                    <li>
                      <strong>Interquartile Range (IQR):</strong> The IQR is the
                      range between the first and third quartiles, representing
                      the middle 50% of the data. The IQR is represented by the
                      box in the plot.
                    </li>
                    <li>
                      <strong>Whiskers:</strong> The whiskers extend from the
                      box to the minimum and maximum values of the dataset,
                      excluding any outliers.
                    </li>
                    <li>
                      <strong>Outliers:</strong> Outliers are values that fall
                      outside the range of the dataset, represented by the
                      circles in the plot.
                    </li>
                  </ol>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>How to disconnect from Spotify</span>
                  <ChevronUpIcon
                    className={`${
                      !open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-textDark">
                  To disconnect from Spotify, simply follow the steps outlined
                  in{" "}
                  <a
                    className="underline inline-flex items-center"
                    href="https://support.spotify.com/us/article/spotify-on-other-apps/"
                  >
                    Spotify&apos;s Guide
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1 text-textDark" />
                  </a>
                  . This guide provides clear instructions on how to disconnect
                  your Spotify account from our app, ensuring a seamless and
                  hassle-free disconnection process.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  );
}
