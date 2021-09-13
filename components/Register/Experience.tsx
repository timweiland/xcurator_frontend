import { useState } from "react";
import SelectableCard from "@components/Form/SelectableCard";

import classNames from "classnames";

const options = [
  {
    value: "beginner",
    title: "Beginner",
    description: "I don't know much about history.",
  },

  {
    value: "intermediate",
    title: "Intermediate",
    description:
      "I have a fair amount of prior knowledge, but not at a deep level.",
  },
  {
    value: "expert",
    title: "Expert",
    description: "I know my stuff!",
  },
];

export default function Experience({ experience, setExperience, onContinue }) {
  let initialSelection = -1;
  for (let i = 0; i < options.length; i++) {
    if (experience == options[i].value) {
      initialSelection = i;
    }
  }
  const [selected, setSelected] = useState(initialSelection);
  return (
    <div>
      <p className="text-center text-lg">
        How much do you know about history? Please select the card that best
        describes your experience with history.
      </p>
      <div className="flex flex-col sm:flex-row items-center my-10">
        {options.map((option, index) => (
          <SelectableCard
            title={option.title}
            description={option.description}
            selected={index == selected}
            onClick={() => {
              setSelected(index);
              setExperience(option.value);
            }}
            className="my-4 w-full sm:w-auto sm:mx-4 sm:my-0"
          />
        ))}
      </div>
      <button
        className={classNames(
          "block w-full sm:w-1/2 mt-6 mx-auto py-2 px-4 border border-transparent font-bold rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          {
            "bg-green-500": selected != -1,
            "hover:bg-green-600": selected != -1,
            "bg-gray-500": selected == -1,
            "cursor-pointer": selected != -1,
            "cursor-not-allowed": selected == -1,
          }
        )}
        onClick={onContinue}
        disabled={selected == -1}
      >
        Continue
      </button>
    </div>
  );
}
