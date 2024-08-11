import { useState } from "react";

import { Select } from "./component/CustomSelect";

const countryList = [
  { label: "Angola", value: 1 },
  { label: "Armenia", value: 2 },
  { label: "Azerbaijan", value: 3 },
  { label: "Bahrain", value: 4 },
  { label: "Bangladesh", value: 5 },
  { label: "Bhutan", value: 6 },
  { label: "Brunei", value: 7 },
  { label: "Cambodia", value: 8 },
  { label: "China", value: 9 },
  { label: "Georgia", value: 10 },
  { label: "India", value: 11 },
  { label: "Indonesia", value: 12 },
  { label: "Iran", value: 13 },
  { label: "Iraq", value: 14 },
  { label: "Israel", value: 15 },
  { label: "Japan", value: 16 },
  { label: "Jordan", value: 17 },
  { label: "Kazakhstan", value: 18 },
  { label: "Kuwait", value: 19 },
  { label: "Kyrgyzstan", value: 20 },
];

function App() {
  const [value, setValue] = useState([countryList[0]]);
  const [searchData, setSearchData] = useState("");

  console.log("Search Data:", searchData);
  console.log("Selected Data:", value);

  return (
    <>
      <h1 className="kzui-heading">
        Custom Select Component{" "}
        <span className="kzui-text__red"> Version 2.0</span>
      </h1>

      <div className="kzui-box">
        <Select
          isMulti={true}
          options={countryList}
          value={value}
          onChangeHandler={(data) => setValue(data)}
          isSearchable={true}
          placeholder="Search Country"
          onSearchHandler={(data) => setSearchData(data)}
          isClearable={true}
          isDisabled={false}
        />
      </div>
    </>
  );
}

export default App;
