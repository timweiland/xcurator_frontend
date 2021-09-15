import RowRecommendation from "@components/CategoryRecommendations/RowRecommendation";

export default function MainRecommendations(): JSX.Element {
  return (
    <div>
      <h1 className="font-bold text-3xl">Recommended for you</h1>
      <div className="mt-8 lg:mt-32 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-20">
        {[
          "Your highlights",
          "Your surprise",
          "Recommended by experts",
          "Based on your interests",
          "Related media",
          "Based on your time budget",
        ].map((title, index) => {
          return <RowRecommendation title={title} start={index * 10} />;
        })}
      </div>
    </div>
  );
}
