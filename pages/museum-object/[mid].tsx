import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import classNames from "classnames";

import SimpleGallery from "@components/Gallery/SimpleGallery";
const MarkerMap = dynamic(() => import("@components/Map/MarkerMap"), {
  ssr: false,
});

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_BASE +
  process.env.NEXT_PUBLIC_MUSEUMOBJECT_PATH;

const fetchMuseumObject = (mid) => {
  const url = API_BASE + `/${mid}`;
  console.log(url);
  return axios.get(url);
};

const AttributeField = ({ title, children, condition }) =>
  condition && (
    <div className="mt-4">
      <h2 className="font-bold">{title}</h2>
      {children}
    </div>
  );

AttributeField.defaultProps = {
  condition: true,
};

const locationTypeMap = {
  creation_location: "Creation",
};

const getLocationTypeName = (locationType) => {
  if (locationType in locationTypeMap) {
    return locationTypeMap[locationType];
  }
  return locationType;
};

const Location = ({ location, term }): JSX.Element => {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-white">
      <h3 className="font-bold text-center">{term}</h3>
      {location && !(location.lat == 0 && location.lon == 0) && (
        <MarkerMap
          position={[location.lat, location.lon]}
          label={term}
          className="w-full h-56 md:h-96 mt-2"
        />
      )}
    </div>
  );
};

const SubjectTag = ({ name }): JSX.Element => {
  return (
    <span className="bg-gray-100 border-black border rounded-lg p-2">
      {name}
    </span>
  );
};

const MuseumObject = (data) => (
  <div className="flex flex-col">
    <h1 className="text-3xl font-bold">{data.objecttitle_set[0].title}</h1>
    {data.objectimage_set.length > 0 && (
      <SimpleGallery
        imagePaths={data.objectimage_set.map((img) => img.image)}
        className="relative w-3/4 h-96 bg-white mt-4"
      />
    )}
    <AttributeField title="Title">
      {data.objecttitle_set.map((title) => (
        <p>{title.title}</p>
      ))}
    </AttributeField>
    <AttributeField title="Collection">
      {data.collection.map((collection) => (
        <div>
          <h3>{collection.name}</h3>
          <p>{collection.museum.name}</p>
          <p>Domain: {collection.domain.name}</p>
        </div>
      ))}
    </AttributeField>
    <AttributeField title="Creator" condition={data.creator.length > 0}>
      {data.creator.map((creator) => (
        <p>{creator.name}</p>
      ))}
    </AttributeField>
    <AttributeField title="Description" condition={data.description !== ""}>
      <p>{data.description}</p>
    </AttributeField>
    <AttributeField title="Tags" condition={data.subject.length > 0}>
      <div className="flex flex-row space-x-1 mt-2">
        {data.subject.map((tag) => (
          <SubjectTag name={tag.name} />
        ))}
      </div>
    </AttributeField>
    <AttributeField
      title="Location"
      condition={data.objectlocation_set.length > 0}
    >
      <Tab.Group className="w-full lg:w-1/2 mt-2 shadow-md" as="div">
        <Tab.List className="flex p-1 space-x-1 bg-primary-800 rounded-xl">
          {data.objectlocation_set.map((location) => (
            <Tab
              key={location.location_type.name}
              className={({ selected }) =>
                classNames(
                  "px-2.5 md:px-4 py-2.5 text-sm leading-5 font-medium text-primary-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-pink-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {getLocationTypeName(location.location_type.name)}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {data.objectlocation_set.map((location) => (
            <Tab.Panel>
              <Location {...location} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </AttributeField>
  </div>
);
const MuseumObjectView = () => {
  const router = useRouter();
  const { mid } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [museumObject, setMuseumObject] = useState(null);
  if (mid !== undefined && isLoading) {
    fetchMuseumObject(mid).then((result) => {
      console.log(result);
      setMuseumObject(result.data);
      setIsLoading(false);
    });
  }

  return <div>{isLoading ? "Loading..." : MuseumObject(museumObject)}</div>;
};

export default MuseumObjectView;
