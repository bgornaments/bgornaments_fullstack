import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import info2 from "/src/assets/info2.png";
import cancel from "/src/assets/close.png";

const searchClient = algoliasearch(
  "JZU84CV28J",
  "8e44481b9e0e30933ae3d22cda10b04e"
);
const index = searchClient.initIndex("kinvision");

interface Hit {
  objectID: string;
  title: string;
  description: string;
  url?: string;
}

interface MeaningProps {
  option: string;
  onCancel: () => void;
}

const Meaning: React.FC<MeaningProps> = ({ option, onCancel }) => {
  const [results, setResults] = useState<Hit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (option) {
        setLoading(true);
        setError(null);

        try {
          const { hits } = await index.search<Hit>(option, {
            attributesToRetrieve: ["title", "description", "url"],
            getRankingInfo: true,
          });
          setResults(hits);
        } catch (error) {
          console.error("Search error:", error);
          setError("Failed to fetch results");
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [option]);

  const firstResult = results[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FFF9F5] rounded-3xl shadow-lg w-[30vw] h-[60vh] flex justify-center items-center">
        <div className="w-[90%] h-[90%] border border-[#B9944C] rounded-2xl flex flex-col items-center justify-center">
          <div className="flex flex-col items-center h-screen no-scrollbar text-center gap-[2vh] w-full overflow-scroll no-scrollbar">
            <div className="flex justify-end w-[95%] mt-[1.5vh]">
              <img
                src={cancel}
                onClick={onCancel}
                alt=""
                className="xs:w-[1rem] md:w-[1.4rem] xl:w-[1rem] cursor-pointer"
              />
            </div>
            <div className="flex justify-center items-center gap-[1vw] max-w-[80%]">
              <img
                src={info2}
                alt=""
                className="xs:w-[1rem] md:w-[1.4rem] xl:w-[2rem]"
              />
              <h2 className="xs:text-[1rem] md:text-[1.7rem] xl:text-[1.3rem] text-customGreen font-serif font-extrabold leading-relaxed">
                {option}
              </h2>
            </div>
            <div className="max-w-[85%] text-customBlack xs:text-[0.8rem] md:text-[1.4rem] xl:text-[1rem] text-center">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!firstResult && !loading && !error && <p>No results found.</p>}
              {firstResult && (
                <ul>
                  <li key={firstResult.objectID}>
                    <strong>
                      {firstResult.title.charAt(0).toUpperCase() +
                        firstResult.title.slice(1)}
                    </strong>
                    : {firstResult.description}
                    {firstResult.url && (
                      <div className="my-[2vh] flex flex-col justify-center items-center">
                        <p className="xs:text-[0.4rem] md:text-[1rem] xl:text-[0.8rem] text-[#B9944C]">Image for Reference</p>
                        <div >

                        <img
                          src={firstResult.url}
                          alt={firstResult.title}
                          className="w-[15rem] rounded-xl mt-2"
                        />
                        </div>
                      </div>
                    )}
                  </li>
                </ul>
              )}
            </div>
          </div>

          <button
            onClick={onCancel}
            className="my-[2vh] px-4 py-2  text-[#B9944C] border border-[#B9944C] rounded-xl flex items-end justify-end align-bottom"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meaning;
