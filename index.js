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

    let exampleTable = $("#example tbody tr")

    let showingFrom = $("#showingFrom")
    let showingTo = $("#showingTo")
    let totalCount = $("#totalEntries")

    let startRange = 1
    let endRange = tableLength.val()
    let pageNumberDiv = $("#pageNumberDiv")
    let currentPage = 1

    updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
    showData(exampleTable, startRange, endRange)
    getPageNumbers(pageNumberDiv, tableLength.val(), exampleTable.length, currentPage)


    // Event Listeners --------------------------------------------------

    // length change
    tableLength.on("change", () => {
        endRange = tableLength.val()
        updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
        showData(exampleTable, startRange, endRange)
        getPageNumbers(pageNumberDiv, endRange, exampleTable.length, currentPage)
    })
    // page change
    // startRange should equal page * showLength - showLength + 1
    // endRange should equal page * showLength

    // every time the length changes, update how many pages there are.
    $(".page-btn").on("click", (e) => {
        const goToPage = parseInt(e.target.innerText)
        if (goToPage !== currentPage) {
            console.log(`change page to ${goToPage}`)
            // call for page change

            showData(exampleTable, goToPage * tableLength.val() - tableLength.val() + 1, goToPage * tableLength.val())
            updateInfo(exampleTable, goToPage * tableLength.val() - tableLength.val() + 1, goToPage * tableLength.val(), showingFrom, showingTo, totalCount)
            currentPage = goToPage
            $(`.btn`).removeClass(" active ")
            $(`#btn-${goToPage}`).addClass("active")
        }

    })

})

// functions --------------------------------------------------
const updateInfo = (table, startRange, endRange, from, to, total) => {
    from.html(startRange)
    to.html(endRange > table.length ? table.length : endRange)
    total.html(table.length)
}
const showData = (table, start, end) => {
    for (let i = 0; i < table.length; i++) {
        if (i >= start && i <= end) {
            table[i].style.display = ""
        } else {
            table[i].style.display = "none"
        }
    }
}
const getPageNumbers = (div, showLength, total, activePage) => {
    div.html(`<button id="btn-previous" class="btn" >Previous</button>`)
    for (let i = 1; i <= Math.ceil(total / showLength); i++) {
        console.log(`<button class="page-btn btn" >${i}</button>`)
        div.append(`<button id="btn-${i}" class="page-btn btn ${i === activePage ? "active" : ""}" >${i}</button>`)
    }
    div.append(`<button id="btn-next" class="btn" >Next</button>`)
}
const previousPress = () => {}
const nextPress = () => {}