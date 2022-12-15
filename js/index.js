/**TO DO
 * Add eventListeners for show limit
 * Add eventListeners for page chagnge clicks
 * Add eventListener for onChange on searchBar
 * Add search bar live-search functionality
 * This should search through each column??? damn, 
 * so like a long OR query
 * create variable for the active filter
*/

console.log("Connected to js file")
// set up document for js code
$(document).ready(() => {

    console.log("DOM has loaded")


    let tableLength = $("#table-length")

    let table = $("#example")
    let tableBody = $("#example tbody")
    let exampleTable = $("#example tbody tr")

    let showingFrom = $("#showingFrom")
    let showingTo = $("#showingTo")
    let totalCount = $("#totalEntries")

    let startRange = 1
    let endRange = tableLength.val()
    let pageNumberDiv = $("#pageNumberDiv")
    let currentPage = 1

    // sort,
    sortName(tableBody)
    // filter,
    showData(tableBody, startRange, endRange)
    //
    updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
    //
    getPageNumbers(pageNumberDiv, tableLength.val(), exampleTable.length, currentPage)
    //




    // Event Listeners --------------------------------------------------

    // length change
    tableLength.on("change", () => {
        endRange = tableLength.val()
        updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
        showData(tableBody, startRange, endRange)
        // every time the length changes, update how many pages there are.
        getPageNumbers(pageNumberDiv, endRange, exampleTable.length, 1)

        $(".page-btn").on("click", (e) => {
            const goToPage = parseInt(e.target.innerText)
            if (goToPage !== currentPage) {
                console.log(`change page to ${goToPage}`)
                // call for page change

                showData(tableBody, goToPage * tableLength.val() - tableLength.val() + 1, goToPage * tableLength.val())
                updateInfo(exampleTable, goToPage * tableLength.val() - tableLength.val() + 1, goToPage * tableLength.val(), showingFrom, showingTo, totalCount)
                currentPage = goToPage
                $(`.btn`).removeClass(" active ")
                $(`#btn-${goToPage}`).addClass("active")
            }

        })
    })

    // page change
    $(".page-btn").on("click", (e) => {
        const goToPage = parseInt(e.target.innerText)
        if (goToPage !== currentPage) {
            console.log(`change page to ${goToPage}`)
            // call for page change

            showData(tableBody, goToPage * tableLength.val() - tableLength.val() + 1, goToPage * tableLength.val())
            updateInfo(exampleTable, goToPage * tableLength.val() - tableLength.val() + 1, goToPage * tableLength.val(), showingFrom, showingTo, totalCount)
            currentPage = goToPage
            $(`.btn`).removeClass(" active ")
            $(`#btn-${goToPage}`).addClass("active")
        }

    })

})

// functions --------------------------------------------------
const showData = (table, start, end) => {
    table.find("tr").each((idx, currentRow) => {
        if (idx + 1 >= start && idx + 1 <= end) {
            currentRow.style.display = ""
        } else {
            currentRow.style.display = "none"
        }
    })
}
const updateInfo = (table, startRange, endRange, from, to, total) => {
    from.html(startRange)
    to.html(endRange > table.length ? table.length : endRange)
    total.html(table.length)
}
const getPageNumbers = (div, showLength, total, activePage) => {
    div.html(`<button id="btn-previous" class="btn" >Previous</button>`)
    for (let i = 1; i <= Math.ceil(total / showLength); i++) {
        console.log(`<button class="page-btn btn" >${i}</button>`)
        div.append(`<button id="btn-${i}" class="page-btn btn ${i === activePage ? "active" : ""}" >${i}</button>`)
    }
    div.append(`<button id="btn-next" class="btn" >Next</button>`)
}
const previousPress = () => { }
const nextPress = () => { }




// Sorting --------------------------------------------------
const sortName = (tableBody) => {

    tableBody.find("tr").sort((a, b) => {
        {
            return $('td:first', a).text().localeCompare($('td:first', b).text());
        }
        //    else 
        //    {
        //     return $('td:first', b).text().localeCompare($('td:first', a).text());
        //    }
    }).appendTo(tableBody)
}