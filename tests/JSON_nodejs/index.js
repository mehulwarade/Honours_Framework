const editJsonFile = require("edit-json-file");
 //https://www.npmjs.com/package/edit-json-file
// If the file doesn't exist, the content will be an empty object by default.
let file = editJsonFile(`${__dirname}/foo.json`, {
    autosave: true
});
 
// Set a couple of fields
file.set("planet", "Earth");
file.set("city\\.name", "anytown");
file.set("name.first", "Johnny");
file.set("name.last", "B.");
file.set("is_student", false);
 
 
// Output the content
// console.log(file.get());
// { planet: 'Earth',
//   city.name: 'anytown',
//   name: { first: 'Johnny', last: 'B.' },
//   is_student: false }
 

 
// Get one field
console.log(file.get("name.first"));
// => Johnny
 
// This will save it to disk
file.set("b.new.field.as.objesct", {
    hello: "worsld"
});

console.log(file.get());
 
// Output the whole thing
// console.log(file.toObject());
// { planet: 'Earth',
//   name: { first: 'Johnny', last: 'B.' },
//   is_student: false,
//   a: { new: { field: [Object] } } }