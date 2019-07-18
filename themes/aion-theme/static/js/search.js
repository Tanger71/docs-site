// Define major search variables.
summaryInclude = 60;
const fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.0,
    tokenize: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [{
            name: "title",
            weight: 0.1
        },
        {
            name: "section",
            weight: 0.2
        },
        {
            name: "contents",
            weight: 0.3
        },
        {
            name: "description",
            weight: 0.4
        }
    ]
};
const results_table = document.querySelector('#results_table');
const search_query_output = document.querySelector('#search_query');

// Define search query.
let searchQuery = param("s");
if (searchQuery) {
    $("#search-query").val(searchQuery);
    executeSearch(searchQuery);
}
search_query_output.innerHTML = searchQuery;

// Try and find articles with the search query in it using the `/index.json` file.
function executeSearch(searchQuery) {
    $.getJSON("/index.json", function (data) {
        let pages = data;
        let fuse = new Fuse(pages, fuseOptions);
        let result = fuse.search(searchQuery);

        if(result.length > 0) {
            result.forEach(printResult);
        } else {
            results_table.innerHTML = "<h4><i>No results returned. Try broadening your search terms.</i></h4>"
        }
    });
}

// Output the results, if there are any.
function printResult(result) {
    results_table.innerHTML += `<h3><a href="${result.item.permalink}">${result.item.title}</a></h3>`;
    if(result.item.description) {
        results_table.innerHTML += `<p>${result.item.description.substring(0, 300)}...</a></p>`;
    } else {
        results_table.innerHTML += `<p><i>Cannot display page contents.</i></p>`;
    }
    results_table.innerHTML += `<p><a href="${result.item.permalink}"><code>${result.item.permalink}</code></a></p><hr>`;
}

// Get search query out of the URL bar.
function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}