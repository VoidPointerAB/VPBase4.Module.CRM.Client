Use sites like https://www.mockaroo.com/ or https://www.generatedata.com/ to produce mock data. If the data is relevant
for others, put it in a file in this directory, and export as a variable:

// mockData.ts...
export const data = { prop1: "abc", prop2: "123" };

If you want to keep the data to yourself, have "local" (example.local.ts) in the name of the file, .gitignore will keep it from being version controlled.
