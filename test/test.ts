import uid36 from "../src";

for (let i = 0; i < 100; i++) {
  const id = uid36.time();
  console.log(id);
}
