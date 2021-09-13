import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_BASE +
  process.env.NEXT_PUBLIC_MUSEUMOBJECT_PATH;

const fetchMuseumObject = (mid) => {
  const url = API_BASE + `/${mid}`;
  console.log(url);
  return axios.get(url);
};

const AttributeField = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="font-bold">{title}</h2>
    {children}
  </div>
);
const MuseumObject = (data) => (
  <div className="flex flex-col">
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
    <AttributeField title="Creator">
      {data.creator.map((creator) => (
        <p>{creator.name}</p>
      ))}
    </AttributeField>
    <AttributeField title="Description">
      <p>{data.description}</p>
    </AttributeField>
    <AttributeField title="Location">
      {data.objectlocation_set.map((location) => (
        <p>{location.term}</p>
      ))}
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
