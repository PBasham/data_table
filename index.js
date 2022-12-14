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
    let totalCount = $("#totalCount")

    let startRange = 1
    let endRange = tableLength.val()


    updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
    showData(exampleTable, startRange, endRange)
    
    // Event Listeners --------------------------------------------------
    
    // length change
    tableLength.on("change", () => {
        endRange = tableLength.val()
        updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
        showData(exampleTable, startRange, endRange)
    })
    // page change
    // startRange should equal page * showLength - showLength + 1
    // endRange should equal page * showLength

    // every time the length changes, update how many pages there are.


})

// functions --------------------------------------------------
const updateInfo = (table, startRange, endRange, from, to, total) => {
    from.html(startRange)
    to.html(endRange)
    total.html(table.length)
}
const showData = (table, start, end) => {
    for (let i = 0; i < table.length; i++) {
        if (i > start && i <= end) {
            table[i].style.display = ""
        } else {
            table[i].style.display = "none"
        }
    }
}