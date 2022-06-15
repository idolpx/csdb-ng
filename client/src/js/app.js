const GRAPHQL_URL = 'https://csdb.idolpx.com/';

async function getRelease(id) {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    getRelease(id: ${id}) {
                        ID
                        Name
                        AKA
                        Type
                        GfxType
                        Rating
                        ReleaseDate {
                            Operator
                            Day
                            Month
                            Year
                            Comment
                        }
                        ReleasedAt
                        Achievement {
                            Compo
                            Place
                        }
                        ReleasedBy {
                            GroupIDs
                            HandleIDs
                        }
                        Credits {
                            CreditType
                            HandleID
                        }
                        Website
                        ScreenShot
                        DownloadLinks {
                            CounterLink
                            Downloads
                            Filename
                            Link
                            Status
                            crc32
                        }
                        OtherLinks {
                            Title
                            Link
                            CounterLink
                            Clicks
                        }
                        Comments {
                            Summary {
                            Date
                            ScenerID
                            Text
                            }
                            Trivia {
                            Date
                            ScenerID
                            Text
                            }
                            Goofs {
                            Date
                            ScenerID
                            Text
                            }
                            HiddenPart {
                            Date
                            ScenerID
                            Text
                            }
                            ProductionNote {
                            Date
                            ScenerID
                            Text
                            }
                            UserComment {
                            Date
                            ScenerID
                            Text
                            }
                        }
                        SIDIDs
                        Groups {
                            ID
                            Name
                        }
                        Sceners {
                            ID
                            Country
                        }
                        Handles {
                            ID
                            Handle
                        }
                        Events {
                            ID
                            Name
                            Tagline
                        }
                        SIDs {
                            ID
                            Name
                            HVSCPath
                        }
                        Tags
                    }            
                }
        `,
        }),
    });

    const {
        data
    } = await response.json();
    return data.getRelease;
}


getRelease(1).then((release) => {
    const title = document.querySelector('h1');
    title.textContent = release.Name;
    const screenshot = document.querySelector('img');
    screenshot.src = release.ScreenShot;
});
