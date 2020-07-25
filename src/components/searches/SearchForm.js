import React, { useState, useEffect } from 'react';

import SelectTable from '../shared/SelectTable';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

function SearchForm({ data }) {
  const [selectArr, setSelectArr] = useState([]);
  const [searchTypesArr, setSearchTypesArr] = useState([]);

  const searchTypes = [{"name": "Any"}, {"name": "Compare"}, {"name": "Cross"}]

  return (
    <>
      <h2>Search type</h2>
      <SelectTable data={searchTypes} columnMap={["name"]} selectArr={searchTypesArr} setSelectArr={setSearchTypesArr} maxSelect={1} />
      <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))}</h2>
      <SelectTable data={data.lingData} columnMap={["name"]} selectArr={selectArr} setSelectArr={setSelectArr} maxHeight="250px" />
    </>
  )
}

export default SearchForm;
