


const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER, 
      password: process.env.DB_PASS,
    },
});


const resolvers = {

    Query: {
        search: (parent, { query }, context, info) => getResults(query),
    },

}

getResults = async (query) => {

    const source = 'release'
    const sql = `SELECT id, name, tags FROM \`${source}\` WHERE MATCH(\`NAME\`) AGAINST('${query}' IN BOOLEAN MODE)`;

    //console.log(sql);
    const rows = await knex
        .select('id', 'name', 'tags', 'data')
        .from('release')
        .whereRaw('MATCH(\`NAME\`) AGAINST(? IN BOOLEAN MODE)', query);

    data = [];
    try {
        rows.forEach( row => {
            // Add object
            console.log(row.data);
            data.push(JSON.parse(row.data));
        }) 
    }
    catch(err) {
        console.log(err);
        console.log(data);
    }

    return data;
}

module.exports = { resolvers }

/*
{"ID":9333,"Name":"Revenge of the Teenage Mutant Pacman","Type":"C64 One-File Demo","ScreenShot":["/release/9/9333/9333.png"],"ReleasedBy":{"GroupIDs":[240]},"Credits":[{"CreditType":"Music","HandleIDs":[3664,945]},{"CreditType":"Code","HandleIDs":[724]},{"CreditType":"Graphics","HandleIDs":[724]}],"DownloadLinks":[{"Link":"http://csdb.dk/getinternalfile.php/829/rottmp.zip","CounterLink":"https://csdb.dk/release/download.php?id=8902","Downloads":1072,"Status":"Ok","hash":"XXH128:4b2456c54eda892829a1a533d37e3c7e","Filename":"rottmp.zip"},{"Link":"/release/9/9333/rottmp.zip","CounterLink":"","Downloads":0,"Filename":"rottmp.zip","Status":"Ok","hash":"XXH128:4b2456c54eda892829a1a533d37e3c7e"}],"Comments":[{"UserComment":[{"Date":1165276800,"Text":"Excellent Action-field-screen. This demo made a great impact on me and still has some interresting stuff that reminds me of groups like BUDS/NATO, Flash Inc, etc. This type of screens might be seen a before hand version of what we today are call LAYERS. Back then it was "action field" or something similar...","HandleID":1671}]}],"ReleaseDate":[{"Year":1992}],"CreditsHandleIDs":[3664,724,945],"SIDIDs": [21566, 14993]}
*/