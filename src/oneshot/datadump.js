import fetch from "node-fetch";
import fs from "fs";

const headers = {
  Accept: "application/json",
};

const doWork = async () => {
  try {
    const groupId = parseInt(process.argv[2]);
    if (isNaN(groupId)) throw new Error();

    const lingPropertyMap = new Map();

    const lr = await fetch(
      `https://terraling.com/groups/${groupId}/lings/depth/0/list`,
      {
        headers,
      }
    );
    const lings = await lr.json();

    lings.forEach((ling) => {
      lingPropertyMap.set(ling.id, new Map());
    });

    const pr = await fetch(
      `https://terraling.com/groups/${groupId}/properties/depth/0/list`,
      {
        headers,
      }
    );
    const properties = await pr.json();

    for (const property of properties) {
      const pvr = await fetch(
        `https://terraling.com/groups/${groupId}/properties/${property.id}`,
        {
          headers,
        }
      );
      const propertyValues = await pvr.json();

      propertyValues.property_lings.forEach((propertyValue) => {
        const propertyMap = lingPropertyMap.get(propertyValue.id);
        propertyMap.set(property.id, propertyValue.value);
      });
    }

    let output = "ling_id,ling_name," + properties.map((p) => p.name).join(",");

    lings.forEach((ling) => {
      const array = [ling.id, ling.name];
      const map = lingPropertyMap.get(ling.id);

      properties.forEach((property) => {
        if (map.has(property.id)) {
          array.push(map.get(property.id));
        } else {
          array.push("");
        }
      });

      output += "\n" + array.join(",");
    });

    const ds = new Date().toISOString().split("T")[0];

    fs.writeFileSync(`${groupId}-${ds}.csv`, output, "utf8");
  } catch (err) {
    console.log(`Error: ${err}\n\n\nUsage: npm dump -- [groupId]`);
  }
};

doWork();
