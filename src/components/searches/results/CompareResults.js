import React from 'react';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

function CompareResults({ data, resultData }) {
  let lings = resultData.rows[0].lings;
  let num = lings.length;
  let depth = lings[0].depth;

  lings = lings.reduce((arr, ling) => { arr.push(ling.name); return arr; }, [])

  return (
    <h2>Comparing {num} {CapitalCase(TargetToPlural(2, (depth > 0 ? data.overviewData.ling1_name : data.overviewData.ling0_name)))}: {lings.join(", ")}</h2>
  )
}

export default CompareResults;
