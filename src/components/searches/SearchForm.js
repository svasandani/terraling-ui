import React, { useState, useEffect } from 'react';

import SelectTable from '../shared/SelectTable';

function SearchForm({ data }) {
  const [selectArr, setSelectArr] = useState([]);

  useEffect(() => {
    console.log(selectArr);
  }, [selectArr]);

  return (
    <SelectTable data={data.lingData} columnMap={["name"]} selectArr={selectArr} setSelectArr={setSelectArr} />
  )
}

export default SearchForm;
