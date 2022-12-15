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



    let sortingMethod = "#header-name"

    const handleSort = (sortMethod) => {
        let sortType = "asc"
        console.log(sortMethod)
        // console.log()
        $(`tbody tr`).each((idx, currentRow) => {
            currentRow.style.display = ""
        })
        // unhide everything
        console.log(sortMethod === sortingMethod)
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
            console.log($(`${sortMethod} div`))
            $(`${sortMethod} div`).addClass("sort-asc")
        }


        if (sortingMethod === "#header-name") {
            console.log("Sorting by name ", sortType)
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
    }
    
    $(".header").on("click", (e) => {
        handleSort(`#${$(e.currentTarget).attr("id")}`)
    })

    // sort,
    sortName(tableBody)
    // filter,
    showData(tableBody, startRange, endRange)
    // update footer detail
    updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
    // set page numbers
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
        div.append(`<button id="btn-${i}" class="page-btn btn ${i === activePage ? "active" : ""}" >${i}</button>`)
    }
    div.append(`<button id="btn-next" class="btn" >Next</button>`)
}
const previousPress = () => { }
const nextPress = () => { }




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