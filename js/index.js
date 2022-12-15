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
    let searchFilter = $("#search")

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



    let sortingMethod = "#header-name"



    // sort,
    sortName(tableBody)
    // filter,
    showData(tableBody, startRange, endRange)
    // update footer detail
    updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
    // set page numbers
    getPageNumbers(pageNumberDiv, tableLength.val(), exampleTable.length, currentPage)
    //
    setPageBtnEventListener(exampleTable, tableBody, currentPage, tableLength.val(), showingFrom, showingTo, totalCount)

    searchFilter.on("keyup", (current) => {
        let value = searchFilter.val().toLowerCase()
        // unhide all,
        // search every row,
        // if it matches the criteria then 


        exampleTable.filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      }).slice(5).remove();
    });

    //  --------------------------------------------------
    // Event Listeners -----------------------------------
    //  --------------------------------------------------
    // length change
    tableLength.on("change", () => {
        endRange = tableLength.val()
        updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
        showData(tableBody, startRange, endRange)
        // every time the length changes, update how many pages there are.
        getPageNumbers(pageNumberDiv, endRange, exampleTable.length, 1)

        setPageBtnEventListener(exampleTable, tableBody, currentPage, tableLength.val(), showingFrom, showingTo, totalCount)
    })

    $(".header").on("click", (e) => {
        handleSort(`#${$(e.currentTarget).attr("id")}`)
    })

    // Sorting function --------------------------------------------------
    const handleSort = (sortMethod) => {
        let sortType = "asc"
        console.log(sortMethod)
        // unhide everything before sort
        $(`tbody tr`).each((idx, currentRow) => {
            currentRow.style.display = ""
        })
        if (sortMethod === sortingMethod) {
            if ($(`${sortMethod} div`).hasClass("sort-asc")) {
                sortType = "desc"
                $(".sort-asc").addClass("sort-desc")
                $(".sort-asc").removeClass("sort-asc")
            } else {
                $(".sort-desc").addClass("sort-asc")
                $(".sort-desc").removeClass("sort-desc")

            }
        } else {
            sortingMethod = sortMethod
            $(".sort-asc").removeClass("sort-asc")
            $(".sort-desc").removeClass("sort-desc")
            $(`${sortMethod} div`).addClass("sort-asc")
        }

        // sort everything
        if (sortingMethod === "#header-name") {
            sortName(tableBody, sortType)
        } else if (sortMethod === "#header-position") {
            sortPosition(tableBody, sortType)
        } else if (sortMethod === "#header-office") {
            sortOffice(tableBody, sortType)
        } else if (sortMethod === "#header-age") {
            sortAge(tableBody, sortType)
        } else if (sortMethod === "#header-start") {
            sortStartDate(tableBody, sortType)
        } else if (sortMethod === "#header-salary") {
            sortSalary(tableBody, sortType)
        }

        // re-hide everything
        showData(tableBody, startRange, endRange)
        // update page number
        getPageNumbers(pageNumberDiv, tableLength.val(), exampleTable.length, 1)
        // update footer detail
        updateInfo(exampleTable, 1, tableLength.val(), showingFrom, showingTo, totalCount)

        setPageBtnEventListener(exampleTable, tableBody, currentPage, tableLength.val(), showingFrom, showingTo, totalCount)

    }


})

//  --------------------------------------------------
//      End of main
//  --------------------------------------------------

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
    div.html(`<button id="btn-previous" class="page-btn btn" >Previous</button>`)
    for (let i = 1; i <= Math.ceil(total / showLength); i++) {
        div.append(`<button id="btn-${i}" class="page-btn btn ${i === activePage ? "active" : ""}" >${i}</button>`)
    }
    div.append(`<button id="btn-next" class="page-btn btn" >Next</button>`)
}

const setPageBtnEventListener = (table, tableBody, currentPage, tableLength, from, to, total) => {
    $(".page-btn").on("click", (e) => {
        let goToPage = ""
        if (e.target.innerText === "Next") {
            if (!$(`#btn-${currentPage + 1}`).length) return
            goToPage = currentPage + 1
        } else if (e.target.innerText === "Previous") {
            if (!$(`#btn-${currentPage - 1}`).length) return
            goToPage = currentPage - 1
        } else {
            goToPage = parseInt(e.target.innerText)

        }
        console.log(goToPage)
        if (goToPage !== currentPage) {
            console.log(`change page to ${goToPage}`)
            // call for page change
            showData(tableBody, goToPage * tableLength - tableLength + 1, goToPage * tableLength)
            updateInfo(table, goToPage * tableLength - tableLength + 1, goToPage * tableLength, from, to, total)
            currentPage = goToPage
            $(`.btn`).removeClass(" active ")
            $(`#btn-${goToPage}`).addClass("active")
        }
    })
}

// Sorting --------------------------------------------------

const sortName = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(1)', a).text().localeCompare($('td:nth-child(1)', b).text());
        } else {
            return $('td:nth-child(1)', b).text().localeCompare($('td:nth-child(1)', a).text());
        }
    }).appendTo(tableBody)
}

const sortPosition = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(2)', a).text().localeCompare($('td:nth-child(2)', b).text());
        } else {
            return $('td:nth-child(2)', b).text().localeCompare($('td:nth-child(2)', a).text());
        }
    }).appendTo(tableBody)
}
const sortOffice = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(3)', a).text().localeCompare($('td:nth-child(3)', b).text());
        } else {
            return $('td:nth-child(3)', b).text().localeCompare($('td:nth-child(3)', a).text());
        }
    }).appendTo(tableBody)
}
const sortAge = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(4)', a).text().localeCompare($('td:nth-child(4)', b).text());
        } else {
            return $('td:nth-child(4)', b).text().localeCompare($('td:nth-child(4)', a).text());
        }
    }).appendTo(tableBody)
}
const sortStartDate = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(5)', a).text().localeCompare($('td:nth-child(5)', b).text());
        } else {
            return $('td:nth-child(5)', b).text().localeCompare($('td:nth-child(5)', a).text());
        }
    }).appendTo(tableBody)
}
const sortSalary = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(6)', a).text().localeCompare($('td:nth-child(6)', b).text());
        } else {
            return $('td:nth-child(6)', b).text().localeCompare($('td:nth-child(6)', a).text());
        }
    }).appendTo(tableBody)
}