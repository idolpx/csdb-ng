
const fs = require('fs');

const release = require('./resolvers.release.js');
const group = require('./resolvers.group.js');
const scener = require('./resolvers.scener.js');
const handle = require('./resolvers.handle.js');
const event = require('./resolvers.event.js');
const bbs = require('./resolvers.bbs.js');
const sid = require('./resolvers.sid.js');

let resolvers = {
    ...release.resolvers,
    ...group.resolvers,
    ...scener.resolvers,
    ...handle.resolvers,
    ...event.resolvers,
    ...bbs.resolvers,
    ...sid.resolvers,
    Query: {
        ...release.resolvers.Query,
        ...group.resolvers.Query,
        ...scener.resolvers.Query,
        ...handle.resolvers.Query,
        ...event.resolvers.Query,
        ...bbs.resolvers.Query,
        ...sid.resolvers.Query,
    },
    Mutation: {
        ...release.resolvers.Mutation,
        ...group.resolvers.Mutation,
        ...scener.resolvers.Mutation,
        ...handle.resolvers.Mutation,
        ...event.resolvers.Mutation,
        ...bbs.resolvers.Mutation,
        ...sid.resolvers.Mutation,
    }
}

// console.log(resolvers);

// Util Functions
loadJSON = filename => {
    console.log(filename);

    if ( !fs.existsSync(filename) )
        return null;
        
    const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});

    if ( !data )
        console.log(`Empty or missing file [${filename}]`);

    return JSON.parse(data);
}

// Add element to object array
addElementToObjectArray = (object, array, element) => {
    if ( element != null ) {
        // Does the array exist?
        if (typeof object[array] != "undefined") {
            // No - Add it
            object[array].push(element);
        } else {
            // No - Create the array
            object[array] = [element];
        }        
    }
}

// Check to see if ID exists in array
objectExists = (object, array, id) => {
    let found = false;
    try {
        if (object[array] !== undefined) {
            if (object[array].find(element => element.ID === id)) {
                found = true;
                // console.log(`found: ${found}, id: ${id}`);
            }
        }
    }
    catch(err) {
        //
    }

    return found;
}

module.exports = { resolvers }