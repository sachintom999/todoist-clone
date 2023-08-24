const slugify = require("slugify");
const Project = require("../models/project")
const Label = require("../models/label")


function generateUniqueSlug(name,model) {

    

   





    const baseSlug = slugify(name, { lower: true });
    let slug = baseSlug;
    let counter = 1;

    // Check if the slug is already in use, if so, append a counter
    while (model.exists({ slug: slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}


module.exports = {generateUniqueSlug}
