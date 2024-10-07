
let globals = require('../config.js').globals;

const resolvers = {

    Query: {
        scener: (parent, { id }, context, info) => getScener(id),
        sceners: (parent, { id }, context, info) => getSceners(id),
    },

    Mutation: {
        createScener: (parent, { data }, context, info) => createScener(data),

        updateScener: (parent, { id }, context, info) => updateScener(id),

        deleteScener: (parent, { id }, context, info) => deleteScener(id),
    },

    //////////
    Scener: {
        Handles: ({ HandleIDs }, args, context, info) => getHandles(HandleIDs),
    },

}

getScenerFile = id => `${globals.data_path}/scener/${Math.floor(id/1000)}/${id}/scener.${id}.json`;

// Object loader
getScener = id => {
    return loadJSON(getScenerFile(id));
}
getSceners = idArray => {
    data = [];
    try {
        idArray.forEach( id => {
            // Add object
            data.push(getScener(id));
        }) 
    }
    catch(err) {
        //console.log(err);
    }

    return data;
}

// Load object by ID or ID array
addScener = (id, context) => {
    addSceners([id], context);
    return id;
}
addSceners = (idArray, context) => {
    try {
        idArray.forEach( id => {
            // Add object if it isn't already added
            if (!objectExists(context, 'Sceners', id)) {
                data = getScener(id);
                addElementToObjectArray( context, 'Sceners', data );
            }                
        }) 
    }
    catch(err) {
        //console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getScenerFile, getScener, addScener, addSceners }

