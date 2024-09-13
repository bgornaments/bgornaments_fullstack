import React, { useState } from "react";
import filter_1 from "/src/assets/filter_1.png";
import filter_2 from "/src/assets/filter_2.png";
import filter_3 from "/src/assets/filter_3.png";
import filter_4 from "/src/assets/filter_4.png";

type FilterKeys = "material" | "gemstone" | "design" | "type";

interface FilterSidebarProps {
  filters: { material: string; gemstone: string; design: string; type: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      material: string;
      gemstone: string;
      design: string;
      type: string;
    }>
  >;
  resetFilters: () => void;
  sidebarVisible: boolean;

}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  resetFilters,
  sidebarVisible,
}) => {
  const [expanded, setExpanded] = useState<{ [key in FilterKeys]: boolean }>({
    material: false,
    gemstone: false,
    design: false,
    type: false,
  });

  const filterOptions = [
    {
      name: "type" as FilterKeys,
      label: "Jewelry Type",
      image: filter_4,
      options: [
        "Rings",
        "Necklaces",
        "Bracelets",
        "Earrings",
        "Bangles",
        "Pendants",
        "Chains",
      ],
    },
    {
      name: "material" as FilterKeys,
      label: "Material",
      image: filter_1,
      options: ["Gold", "Silver", "Rose gold", "Platinum"],
    },
    {
      name: "gemstone" as FilterKeys,
      label: "Gemstone Type",
      image: filter_2,
      options: ["Diamond", "Emerald", "Ruby"],
    },
    {
      name: "design" as FilterKeys,
      label: "Design Style",
      image: filter_3,
      options: ["Classic", "Modern", "Vintage"],
    },
  ];

  const toggleExpand = (filterName: FilterKeys) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [filterName]: !prevExpanded[filterName],
    }));
  };

  const handleFilterChange = (filterName: FilterKeys, option?: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: option || "",
    }));
  };

  return (
    <aside
      className={`w-full  p-8 fixed top-14 left-0 md:static ${
        sidebarVisible ? "bg-[#ffffff]" : ""
      } z-50`}
    >
      {filterOptions.map((filter) => (
        <div className="mb-6" key={filter.name}>
          <h3
            className={`text-lg ${
              expanded[filter.name] ? "" : ""
            } text-customBlack/70 mb-4 cursor-pointer flex items-center font-custom tracking-widest font-black`}
            onClick={() => toggleExpand(filter.name)}
          >
            <img
              src={filter.image}
              alt={`${filter.label} icon`}
              className="w-4 mr-2"
            />
            {filter.label}
          </h3>
          {expanded[filter.name] && (
            <div>
              <div className="flex flex-wrap gap-2 mb-2 mx-2">
                {filter.options.map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-1 xs:text-[2.3vw] md:text-[1.1vw] lg:text-[0.8vw] rounded-xl cursor-pointer shadow-md transition-all ${
                      filters[filter.name] === option
                        ? "bg-navbar text-customBlack/70"
                        : "bg-transparent text-customBlack/70 border border-navbar"
                    }`}
                    onClick={() => handleFilterChange(filter.name, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                className="text-lightGolden xs:text-[2.3vw] md:text-[1.1vw] lg:text-[0.8vw] hover:underline mx-3 opacity-80"
                onClick={() => handleFilterChange(filter.name)}
              >
                Clear choice
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-[10vw] justify-center md:justify-start">
        <button
          className="text-lightGolden text-sm hover:underline opacity-80"
          onClick={resetFilters}
        >
          Reset
        </button>
        <div className={`md:hidden ${sidebarVisible ? "block" : "hidden"} `}>
          <button className="text-lightGolden text-sm hover:underline opacity-80">
            Close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
