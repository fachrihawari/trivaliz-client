import countries from './src/data/countries.json';

const lean = countries.map((country) => {
  return {
    flag: country.flags.png,
    name: country.name.common,
    code: country.cca2,
  }
})

await Bun.write('./src/data/countries.json', JSON.stringify(lean, null, 2));
